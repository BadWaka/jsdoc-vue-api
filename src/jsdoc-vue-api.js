/**
 * @file
 */
const jsdocApi = require('jsdoc-api');
const fs = require('fs');
const path = require('path');
const vueTemplateCompiler = require('vue-template-compiler');
const babel = require('@babel/core');

/**
 * 对数据进行处理，得到描述文档的 JSON object
 *
 * @param {Object} jsObj js 代码本体的对象
 * @param {Object} jsdocObj jsdoc-api 解析出来的对象
 *
 * @return {Object} docObj 分类清晰的 json object，可以直接读取 props、events、methods
 */
const getDocObj = (jsObj, jsdocObj) => {

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
                // console.log('commentItem.meta.code', commentItem.meta.code);
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
};

/**
 * 解析 .vue 文件
 *
 * @param {string} filePath 要解析的 .vue 文件路径
 *
 * @return {Object} docObj 分类清晰的 json object，可以直接读取 props、events、methods
 */
const parseVue = (filePath) => {

    // 转换成绝对路径
    filePath = path.resolve(__dirname, filePath);

    // 判断是否 .vue 文件
    let extname = path.extname(filePath);
    if (extname !== '.vue') {
        console.error('不是 .vue 文件');
        return null;
    }

    // vue 文件内容字符串
    let fileStr = fs.readFileSync(filePath, 'utf8');

    // 使用 vue-template-compiler 编译 .vue 单文件组件
    let sfcObj = vueTemplateCompiler.parseComponent(fileStr);
    // sfcObj.template 模板
    // sfcObj.script 脚本
    // sfcObj.styles 样式

    // 用 eval 执行 js 部分，得到 js 对象
    sfcObj.script.content = sfcObj.script.content.replace(/import /g, '// import ');
    sfcObj.script.content = sfcObj.script.content.replace(/'c-/g, '//\'c-');
    let jsObj = eval(babel.transformSync(sfcObj.script.content).code);
    // fs.writeFile('./test/jsObj.json', JSON.stringify(jsObj), (err) => {
    //     if (err) {
    //         console.log('err', err);
    //     }
    // });

    // 用 jsdoc-api 解析，得到 jsdoc 解析结果对象
    let jsdocObj = jsdocApi.explainSync({
        source: sfcObj.script.content
    });
    // fs.writeFile('./test/jsdocObj.json', JSON.stringify(jsdocObj), (err) => {
    //     if (err) {
    //         console.log('err', err);
    //     }
    // });

    // 得到最后输出的对象
    let docObj = getDocObj(jsObj, jsdocObj);
    // fs.writeFile('./test/docObj.json', JSON.stringify(docObj), (err) => {
    //     if (err) {
    //         console.log('err', err);
    //     }
    // });

    return docObj;
};

/**
 * 写入 markdown
 *
 * @param {Object} docObj 分类清晰的 json object，可以直接读取 props、events、methods
 * @param {string} dirPath 文件夹路径
 * @param {string} name 文档名
 */
const writeMD = (docObj, dirPath, name) => {

    // 转换成绝对路径
    dirPath = path.resolve(__dirname, dirPath);
    console.log('文件夹路径', dirPath);

    // .md 文件的路径
    let mdPath = `${dirPath}/README.md`;

    // .md 文件的内容
    let mdContent = `# ${name}\n\n## API\n`;

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

    fs.readFile(mdPath, 'utf8', (err, data) => {
        // 文件不存在
        // if (err) {
        fs.writeFile(mdPath, mdContent, 'utf8', () => {
            console.log('没有 README.md，写入成功');
        });
        // }
        // 文件存在
        // else {
        //     // 每次会重新覆盖掉 ## API 以下的部分
        //     let index = data.indexOf('----------');
        //     console.log('index', index, 'data', data.charAt(index));
        //     if (index === -1) {
        //         // 追加文件
        //         fs.appendFile(mdPath, mdContent, 'utf8', () => {
        //             console.log('有 README.md，写入成功');
        //         });
        //     }
        //     else {
        //         fs.truncate(mdPath, index + 100, (err) => {
        //             if (!err) {
        //                 console.log('删除成功');
        //             }
        //             // 追加文件
        //             // fs.appendFile(mdPath, mdContent, 'utf8', () => {
        //             //     console.log('有 README.md，写入成功');
        //             // });
        //         });
        //     }
        // }
    });

};

module.exports = {
    parseVue,
    writeMD
};