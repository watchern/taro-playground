var fs = require("fs");
var path = require("path");

traverseFolder('src');

function replaceContent(filePath, sourceRegx, targetStr) {
  fs.readFile(filePath, function (err, data) {
    if (err) {
      // 正确处理错误，而不是return err
      console.error('读取文件错误:', err);
      return;
    }

    let str = data.toString();
    console.log(str.includes(sourceRegx), filePath, sourceRegx);

    // 确保sourceRegx是正则表达式且带有全局匹配标志
    let regex;
    if (typeof sourceRegx === 'string') {
      // 如果是字符串，转换为正则表达式并添加全局标志
      regex = new RegExp(sourceRegx, 'g');
    } else if (sourceRegx instanceof RegExp) {
      // 如果是正则表达式，但没有全局标志，添加全局标志
      if (!sourceRegx.global) {
        regex = new RegExp(sourceRegx.source, sourceRegx.flags + 'g');
      } else {
        regex = sourceRegx;
      }
    } else {
      console.error('sourceRegx必须是字符串或正则表达式');
      return;
    }

    console.log(str.includes(sourceRegx), filePath, regex);
    // 一次全局替换即可
    str = str.replace(regex, targetStr);
    if (str.includes(sourceRegx)) {
      console.log(str.includes(sourceRegx), sourceRegx)
      console.log('replace', filePath, sourceRegx, '->', targetStr)
    }
    fs.writeFileSync(filePath, str, function (err) {
      if (err) return err;
    });
  });
};

function traverseFolder(folderPath) {
  // 读取文件夹列表
  const files = fs.readdirSync(folderPath)
  // 遍历文件夹列表
  files.forEach(function (fileName) {
    // 拼接当前文件路径
    const filePath = path.join(folderPath, fileName)
    // 判断该路径是文件夹还是文件
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      // 如果是文件夹，递归遍历
      traverseFolder(filePath)
      // console.log('文件夹',filePath)
    } else {
      // 如果是文件，执行操作
      // console.log('文件',filePath)
      let mode = 'use'
      if (filePath.includes('.scss') && mode === 'use') {
        replaceContent(filePath, '@import', '@use');
        replaceContent(filePath, 'variables.scss";', 'variables.scss" as *;');
      }
      if (filePath.includes('.scss') && mode === 'import') {
        replaceContent(filePath, '\@use', '\@import');
        replaceContent(filePath, 'styles', 'tt');
        replaceContent(filePath, 'variables.scss" as *;', 'variables.scss";');
      }
    }
  })
}

