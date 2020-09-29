const sqlite = require('sqlite3').verbose()
const express = require('express')

const { selectAllQuery } = require('./query')
require('./env')


const app = express()
const db = new sqlite.Database('./db/myDB.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mydb database.');
  }
});

const port = process.env.PORT; // 직접 지정한 환경변수 이용

app.get('/', (req, res) => {
  db.serialize();
  db.each(selectAllQuery, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.phone_num);
  });
  res.send("Hello, World! get");
});

app.post('/data', (req, res) => {
  console.log("hi");
  res.send("Hello, World! post");
});

var server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});

// 서버 종료 시 db close 및 server close
process.on('SIGINT', () => {
  server.close();
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Close the database connection.');
    }
  });
});