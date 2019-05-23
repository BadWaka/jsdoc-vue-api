/**
 * @file
 */
const jsdocApi = require('jsdoc-api');
const fs = require('fs');
const path = require('path');
const util = require('util');
const vueTemplateCompiler = require('vue-template-compiler');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const appendFile = util.promisify(fs.appendFile);

// 追加暗号，每次重新执行的时候，会覆盖掉暗号以下的部分
const appendCipher = '[//]: # (append cipher)';

/**
 * 解析 .vue 文件
 *
 * @param {string} vueFilePath 要解析的 .vue 文件路径
 *
 * @return {Object} docObj 分类清晰的 json object，可以直接读取 props、events、methods
 */
function parseVue(vueFilePath) {

    // 转换成绝对路径
    vueFilePath = path.resolve(__dirname, vueFilePath);

    // 判断是否 .vue 文件
    let extname = path.extname(vueFilePath);
    if (extname !== '.vue') {
        throw 'not vue file';
    }

    // vue 文件内容字符串
    let fileStr = fs.readFileSync(vueFilePath, 'utf8');

    // 使用 vue-template-compiler 编译 .vue 单文件组件，得到各个部分的代码；.template 模板；.script 脚本；.styles 样式
    let sfcObj = vueTemplateCompiler.parseComponent(fileStr);

    // 得到 js 可执行代码
    let jsCode = sfcObj.script.content;

    // 用 jsdoc-api 解析，得到 jsdoc 解析结果对象
    let jsdocObj = jsdocApi.explainSync({
        source: jsCode
    });

    // 得到最后输出的对象
    let docObj = getDocObj(jsdocObj);

    return docObj;
}

/**
 * 对数据进行处理，得到描述文档的 JSON object
 *
 * @param {Object} jsdocObj jsdoc-api 解析出来的对象
 *
 * @return {Object} docObj 分类清晰的 json object，可以直接读取 props、events、methods
 */
function getDocObj(jsdocObj) {

    let docObj = {
        props: {},
        slots: {},
        events: {},
        methods: {}
    };

    jsdocObj.forEach((commentItem, commentIndex) => {

        // props 相关
        if (commentItem.memberof && commentItem.memberof.indexOf('module.exports.props') !== -1) {

            // props
            if (commentItem.memberof === 'module.exports.props') {
                let metaCodeValue = commentItem.meta.code.value;
                if (typeof commentItem.meta.code.value === 'object') {
                    metaCodeValue = JSON.parse(commentItem.meta.code.value);
                }
                // 获取默认值
                let defaultValue = metaCodeValue.default;
                // 获取是否必须
                let required = metaCodeValue.required;
                // 获取子属性
                let properties = null;
                if (commentItem.properties) {
                    properties = commentItem.properties.map((propertie, propertieIndex) => {
                        propertie.type = propertie.type.names.join('|');
                        return propertie;
                    });
                }
                let propObj = {
                    name: commentItem.name,
                    description: commentItem.description,
                    defaultValue,
                    comment: commentItem.comment,
                    required,
                    properties,
                    ignore: commentItem.ignore
                };
                docObj.props[commentItem.name] = propObj;
            }

            // 属性的类型
            else if (/^module\.exports\.props\.(\w)*\.type$/.test(commentItem.longname)) {
                // 得到类型
                let type = commentItem.meta.code.value;
                let baseTypeArr = ['String', 'Number', 'Boolean'];
                if (baseTypeArr.indexOf(type) !== -1) {
                    type = type.toLowerCase();
                }
                // 得到属性名
                let propName = commentItem.longname.replace('module.exports.props.', '').replace('.type', '');
                // 把类型赋值给属性
                docObj.props[propName].type = type;
            }
        }

        // methods；注释必须存在，没有注释则认为是私有方法，不暴露
        else if (commentItem.memberof === 'module.exports.methods' && commentItem.comment) {
            // 获得参数
            let params = null;
            if (commentItem.params) {
                params = commentItem.params.map((param, paramIndex) => {
                    param.type = param.type.names.join('|');
                    return param;
                });
            }
            // 获得返回值
            let returns = null;
            if (commentItem.returns) {
                returns = commentItem.returns.map((returnItem, returnIndex) => {
                    returnItem.type = returnItem.type.names.join('|');
                    return returnItem;
                });
            }
            let methodObj = {
                name: commentItem.name,
                description: commentItem.description,
                params,
                returns: commentItem.returns,
                comment: commentItem.comment
            };
            docObj.methods[commentItem.name] = methodObj;
        }

        // events
        else if (commentItem.kind === 'event') {
            // 获取子属性
            let properties = null;
            if (commentItem.properties) {
                properties = commentItem.properties.map((propertie, propertieIndex) => {
                    propertie.type = propertie.type.names.join('|');
                    return propertie;
                });
            }
            let eventObj = {
                name: commentItem.name,
                description: commentItem.description,
                properties,
                comment: commentItem.comment
            };
            docObj.events[commentItem.name] = eventObj;
        }
    });

    return docObj;
}

/**
 * 写入 markdown
 *
 * @param {Object} docObj 分类清晰的 json object，可以直接读取 props、events、methods
 * @param {string} dirPath 文件夹路径
 */
async function writeMD(docObj, dirPath) {

    // 转换成绝对路径
    dirPath = path.resolve(__dirname, dirPath);

    // .md 文件的路径
    let mdPath = `${dirPath}/README.md`;

    // .md 文件的内容
    let mdContent = `${appendCipher}\n\n## API\n`;

    // Props
    if (docObj.props) {
        mdContent += '\n### Props\n\n';
        mdContent += '名称 | 类型 | 默认值 | 是否必选 | 描述 | 其他\n';
        mdContent += '--- | --- | --- | --- | --- | ---\n';
        for (let key in docObj.props) {
            let prop = docObj.props[key];
            mdContent += `${key} | ${prop.type} | ${prop.defaultValue || ''} | ${prop.required ? '是' : '否'} | ${prop.description} | ---\n`;
            // 判断每个 prop 是否有 properties 属性
            if (prop.properties) {
                prop.properties.forEach((propertie, propertieIndex) => {
                    mdContent += `>> ${propertie.name} | ${propertie.type} | ${propertie.defaultvalue || ''} | ${propertie.required ? '是' : '否'} | ${propertie.description} | ---\n`;
                });
            }
        }
    }

    // Events
    if (docObj.events) {
        mdContent += '\n### Events\n';
        for (let key in docObj.events) {
            let event = docObj.events[key];
            mdContent += `\n**${key}**: ${event.description}\n\n`;
            if (event.properties) {
                mdContent += `名称 | 类型 | 描述\n`;
                mdContent += `--- | --- | ---\n`;
                event.properties.forEach((propertie, propertieIndex) => {
                    mdContent += `${propertie.name} | ${propertie.type} | ${propertie.description}\n`;
                });
            }
        }
    }

    // Methods
    if (docObj.methods) {
        mdContent += '\n### Methods\n';
        for (let key in docObj.methods) {
            let method = docObj.methods[key];
            mdContent += `\n**${key}**: ${method.description}\n\n`;
            if (method.params) {
                mdContent += `名称 | 类型 | 描述\n`;
                mdContent += `--- | --- | ---\n`;
                method.params.forEach((param, paramIndex) => {
                    mdContent += `${param.name} | ${param.type} | ${param.description}\n`;
                });
            }
        }
    }

    try {
        let md = await readFile(mdPath, 'utf8');
        let index = md.indexOf(appendCipher);
        console.log('有 README.md', index);
        md = md.substring(0, index);
        await writeFile(mdPath, md + mdContent);
        console.log('追加成功');
    }
    catch (err) {
        console.error(err);
        if (err.errno === -2) {
            console.log('没有 README.md');
            await writeFile(mdPath, mdContent);
            console.log('写入成功');
        }
    }
}

module.exports = {
    parseVue,
    writeMD
};