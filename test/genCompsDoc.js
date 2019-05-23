/**
 * @file 生成组件文档
 * @author wangkai37<1456683844@qq.com>
 */

const jsdocVueApi = require('../src/jsdoc-vue-api');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);

// 组件目录
let compsPath = path.resolve(__dirname, './components');

async function genCompsDoc() {
    let files = await readdir(compsPath);
    for (let i = 0; i < files.length; i++) {

        let compPath = `${compsPath}/${files[i]}`;

        // 判断是否为文件夹
        let compPathStat = await stat(compPath)
        if (compPathStat.isDirectory()) {

            console.log('compPath', compPath);

            // 目前只处理同名 .vue 文件
            let compVuePath = `${compPath}/${files[i]}.vue`;
            // console.log('compVuePath', compVuePath);

            // 拿到 doc 对象
            let docObj = jsdocVueApi.parseVue(compVuePath);

            // 写入文件
            jsdocVueApi.writeMD(docObj, compPath);
        }
    }
}

genCompsDoc();