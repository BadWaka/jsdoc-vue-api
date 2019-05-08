# jsdoc-vue-api

解析 .vue 文件，通过注释得到文档

## cli 使用

```sh
# 全局安装
npm i jsdoc-vue-api -g

# 使用 jva 命令；
# vueFilePath 为 .vue 文件的路径；
# readmeDirPath 可选，为生成的 readme.md 的文件夹路径，不传入则默认将 .md 文件放置在 .vue 文件同目录下
jva vueFilePath [readmeDirPath]
# 示例：jva ./src/components/Button/Button.vue
```

## node js API

```sh
npm i jsdoc-vue-api -D

```

## 测试

```
node test/test.js
```

## 发布包

```
npm publish --registry https://registry.npmjs.org/
```