#! /usr/bin/env node
const path = require('path');
const jsdocVueApi = require('./src/jsdoc-vue-api');
console.log('jsdoc-vue-api-cli', 'process.argv', process.argv);
console.log('当前进程的工作目录', process.cwd());

/**
 * vue 文件路径
 */
let vueFilePath = process.argv[2];
// 如果没有扔一个 error
if (!vueFilePath) {
    throw "I need .vue file!"
}
// 得到绝对路径
vueFilePath = path.resolve(__dirname, vueFilePath);
console.log('vueFilePath', vueFilePath);

/**
 * readme 文件存放路径
 */
let readmeDirPath = process.argv[3];
// 如果没有，就在 .vue 文件当前目录下创建
if (!readmeDirPath) {
    readmeDirPath = path.dirname(vueFilePath)
}
readmeDirPath = path.resolve(__dirname, readmeDirPath);
console.log('readmeDirPath', readmeDirPath);

// 得到文档数据对象
let docObj = jsdocVueApi.parseVue(vueFilePath);

// 写入 markdown
jsdocVueApi.writeMD(docObj, readmeDirPath);

