const express = require('express')
const http = require('http')
const path = require('path')
require('./env')

const port = process.env.PORT; // 직접 지정한 환경변수 이용
const app = express()

app.use(express.json()); // req body의 json 형태 수신 허용
app.use(express.static(path.join(__dirname + '/statics'))); // static 파일 폴더 지정

// route
app.use('/', require('./routes/main'));
app.use('/participant', require('./routes/participant'));
app.use('/test', require('./routes/test'));
app.use('/question', require('./routes/question'));
app.use('/data', require('./routes/data'));
app.use('/answer', require('./routes/answer'));
app.use('/information', require('./routes/information'));

http.createServer(app).listen(port, () => { // https를 위해 7540 포트 오픈 
  console.log(`Server running on http://localhost:${port}`);
});