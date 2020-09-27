const dotenv = require('dotenv')
const express = require('express')
const app = express()

dotenv.config(); // .env(환경 변수 파일)를 환경변수에 설정 

const port = process.env.PORT; // 직접 지정한 환경변수 이용

app.get('/', (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})