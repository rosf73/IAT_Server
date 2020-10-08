const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, ".env") }); // .env(환경 변수 파일)를 환경변수에 설정