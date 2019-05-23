const jsdocVueApi = require('../src/jsdoc-vue-api');
const path = require('path');
const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

// TODO: test
let test = path.resolve(__dirname, './test.vue');
let docObj = jsdocVueApi.parseVue(test);
jsdocVueApi.writeMD(docObj, path.resolve(__dirname, './'));