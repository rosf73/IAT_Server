const dotenv = require('dotenv')
const path = require('path') // 절대 경로 설정용

dotenv.config({ path: path.resolve(__dirname, ".env") }); // .env(환경 변수 파일)를 환경변수에 설정