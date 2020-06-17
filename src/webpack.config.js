const path = require("path");
const MiniExtractCSS = require("mini-css-extract-plugin");

const MODE = process.env.WEBPACK_ENV; // mode 옵션에 따라 코드 압축 유무가 이뤄짐
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static"); // 디렉토리 경로이기 때문에 .join 사용

const config = {
  entry: ENTRY_FILE,
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          MiniExtractCSS.loader,
          "css.loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
  },
  plugins: [new MiniExtractCSS("styles.css")],
};

module.exports = config;
