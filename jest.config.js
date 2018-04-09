module.exports = {
  transform: {
    "index\\.js$": "<rootDir>/vue-separate-jest.js",
    "^.+\\.js$": "babel-jest"
  }
};