const path = require('path');
const fs = require('fs');

const getElementData = function (tagName, lang, filePath) {
  let attrString = '';
  if (lang) {
    attrString += ` lang="${lang}"`;
  }
  if (tagName === 'style' && filePath.indexOf('.scoped.') > -1) {
    attrString += ' scoped';
  }

  return `\n<${tagName}${attrString}>\n${
    fs.readFileSync(filePath, 'utf-8')
  }\n</${tagName}>\n`;
};

module.exports = function (javascriptSource, filePath) {
  let vueFileContents = `<script>${javascriptSource}</script>`;

  // Get other files

  const cssLangMap = {
    '.css': 'css',
    '.styl': 'stylus',
    '.scss': 'scss',
    '.scoped.scss': 'scss',
    '.sass': 'sass',
    '.less': 'less',
  };
  const htmlLangMap = {
    '.html': 'html',
    '.pug': 'pug',
  };

  const dirPath = path.dirname(filePath);

  fs.readdirSync(dirPath).forEach((fileName) => {
    if (/(^\.|^#.+#$)/.test(fileName)) {
      // Ignore hidden and temporary files
      return;
    }

    const separateFilePath = path.resolve(dirPath, fileName);
    const ext = path.extname(separateFilePath);
    if (cssLangMap[ext]) {
      vueFileContents += getElementData.call(this, 'style', cssLangMap[ext], separateFilePath);
    } else if (htmlLangMap[ext]) {
      vueFileContents += getElementData.call(this, 'template', htmlLangMap[ext], separateFilePath);
    }
  });

  return vueFileContents;
};
