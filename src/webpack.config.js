const path = require("path");
const autoprefixer = require("autoprefixer"); // 자동으로 다른 브라우저에서도 호환 되도록 코드 추가해줌

const MiniExtractCSS = require("mini-css-extract-plugin"); // css의 텍스트를 추출하기 위해

const MODE = process.env.WEBPACK_ENV; // mode 옵션에 따라 코드 압축 유무가 이뤄짐
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUT_DIR = path.join(__dirname, "static"); // 디렉토리 경로이기 때문에 .join 사용

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE], // old 브라우저에 없는 무언가를 모방(async 등),들어가는 파일
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader",
      },
      {
        test: /\.(scss)$/,
        use: [
          MiniExtractCSS.loader, // .css 파일들의 text 추출
          "css-loader", // .css 가져옴
          {
            loader: "postcss-loader", // 특정 플러그인 css에 대해 실행
            options: {
              plugin() {
                return [autoprefixer({ browsers: "cover 99.5%" })]; // 시중의 브라우저 99.5% 호환
              },
            },
          },
          "sass-loader", // .scss를 .css로 변환
        ],
      },
    ],
  },
  output: {
    path: OUTPUT_DIR, // 나가는 파일 위치
    filename: "[name].js",
  },
  plugins: [new MiniExtractCSS()], // 플러그인 실행과 저장 설정
}; // webpack은 밑에서 위로 읽음

module.exports = config;
