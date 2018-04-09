const vueJest = require('vue-jest')
const bundleSeparate = require('./vuize-loader')

module.exports = function (src, filePath, jestConfig) {
  // bundle the separate files to a .vue file
  const vueFileContents = bundleSeparate(src, filePath)

  // vue-jest transform
  return vueJest.process(vueFileContents, filePath, jestConfig)
}