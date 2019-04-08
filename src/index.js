const jsdocApi = require('jsdoc-api');
const fs = require('fs');
const path = require('path');
const vueTemplateCompiler = require('vue-template-compiler');
const babel = require('@babel/core');
const {
    getDocObj
} = require('./getDocObj');

/**
 * 解析 .vue 文件
 *
 * @param {string} filePath 要解析的 .vue 文件路径
 *
 * @return {object} docObj 返回一个数据对象
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
 * @param {object} docObj 文档 json 对象
 * @param {string} dirPath 文件夹路径
 */
const writeMD = (docObj, dirPath) => {

    // 转换成绝对路径
    dirPath = path.resolve(__dirname, dirPath);
    console.log('dirPath', dirPath);

    let mdPath = `${dirPath}/README.md`;
    let mdContent = '## API\naaa';

    fs.readFile(mdPath, 'utf8', (err, data) => {
        // 文件不存在
        if (err) {
            fs.writeFile(mdPath, mdContent, 'utf8', () => {
                console.log('没有 README.md，写入成功');
            });
        }
        // 文件存在
        else {
            let index = data.indexOf('## API');
            fs.truncate(mdPath, index, (err) => {
                if (!err) {
                    console.log('删除成功');
                }
                // 追加文件
                fs.appendFile(mdPath, mdContent, 'utf8', () => {
                    console.log('有 README.md，写入成功');
                });
            });
        }
    });

};

module.exports = {
    parseVue
};

let test = '../test/test.vue';
let docObj = parseVue(test);
writeMD(docObj, '../test');