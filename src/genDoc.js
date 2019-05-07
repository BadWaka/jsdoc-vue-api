const jsdocVueApi = require('./jsdoc-vue-api');
const fs = require('fs');
const path = require('path');

// 组件目录
let compsPath = path.resolve(__dirname, '../src/components');

fs.readdir(compsPath, (err, files) => {
    if (err) {
        console.error(err);
    }
    files.forEach((file, fileIndex) => {
        let compPath = `${compsPath}/${file}/${file}.vue`;
        let docObj = jsdocVueApi.parseVue(compPath, compsPath);
        jsdocVueApi.writeMD(docObj, `${compsPath}/${file}`, file);
    });
});