const sqlite = require('sqlite3').verbose()

const db = new sqlite.Database('./myDB.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  else {
    console.log('Connected to the mydb database.');
  }
});

module.exports = db;