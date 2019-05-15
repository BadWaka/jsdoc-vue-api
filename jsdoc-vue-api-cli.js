#! /usr/bin/env node
const path = require('path');
const jsdocVueApi = require('./src/jsdoc-vue-api');
const chalk = require('chalk');
const packageJson = require('./package.json');

// 获得传入的第三个参数
// process.argv 第一个参数是 node 可执行文件，第二个参数是被执行的 jsdoc-vue-api-cli.js，从第三个参数开始，才是真正用户传入的
let arvg2 = process.argv[2];

// 查看帮助信息
if (!arvg2 || arvg2 === '-h' || arvg2 === '--help') {
    console.log(getHelpInfo());
    return;
}

// 查看版本
if (arvg2 === '-V' || arvg2 === '--version') {
    console.log(`${packageJson.version}`);
    return;
}

// 不是 .vue 文件
if (path.extname(arvg2) !== '.vue') {
    throw 'not vue file';
}

// vue 文件，进行转换操作
if (path.extname(arvg2) === '.vue') {
    console.log('当前进程的工作目录', process.cwd());
    handleVueFile();
}

/**
 * 得到帮助信息
 *
 * @return string helpInfo
 */
function getHelpInfo() {
    // console.log(`${chalk.magenta('usage:')} ${chalk.blue('jva vue_file [readme_dirpath]')}      generate README.md by vue file`);
    return `
${chalk.magenta('Usage:')} jva vueFilePath [readmeDirPath]

${chalk.magenta('Options:')}
    -V, --version                   output version number
    -h, --help                      output usage help infomation
    `
}

/**
 * 处理 .vue 文件
 */
function handleVueFile() {
    /**
     * vue 文件路径
     */
    let vueFilePath = process.argv[2];
    // 如果没有扔一个 error
    if (!vueFilePath) {
        throw "I need .vue file!"
    }
    // 得到绝对路径
    vueFilePath = path.resolve(process.cwd(), vueFilePath);
    console.log('.vue 文件路径 vueFilePath', vueFilePath);

    /**
     * readme 文件存放路径
     */
    let readmeDirPath = process.argv[3];
    // 如果没有，就在 .vue 文件当前目录下创建
    if (!readmeDirPath) {
        readmeDirPath = path.dirname(vueFilePath)
    }
    readmeDirPath = path.resolve(process.cwd(), readmeDirPath);
    console.log('文档文件夹路径 readmeDirPath', readmeDirPath);

    // 得到文档数据对象
    let docObj = jsdocVueApi.parseVue(vueFilePath);

    // 写入 markdown
    jsdocVueApi.writeMD(docObj, readmeDirPath);
}

