const jsdocVueApi = require('../src/jsdoc-vue-api');
const path = require('path');

// TODO: test
let test = path.resolve(__dirname, './test.vue');
let docObj = jsdocVueApi.parseVue(test);
jsdocVueApi.writeMD(docObj, path.resolve(__dirname, './'));