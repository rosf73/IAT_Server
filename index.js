const sqlite = require('sqlite3').verbose()
const express = require('express')

const { dropQuery, insertQuery, dummyDataQuery, selectAllQuery } = require('./query')
require('./env')

const app = express()

const db = new sqlite.Database('./db/myDB.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the mydb database.');
  }
});

db.serialize(() => {
  db.each(dropQuery);
  db.each(insertQuery);
  db.each(dummyDataQuery);
  db.each(selectAllQuery, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.phone_num + ' ' + row.password);
  });
});

const port = process.env.PORT; // 직접 지정한 환경변수 이용

app.get('/', (req, res) => {
  // const query = `SELECT * FROM person`;
  // db.serialize();
  // db.all(query, (err, row) => {
  //   res.render('show', {data : row});
  // });
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
});

db.close((err) => {
  if (err) {
      console.error(err.message);
  } else {
      console.log('Close the database connection.');
  }
});