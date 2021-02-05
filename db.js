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

db.query = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (error, rows) => {
      if (error)
        reject(error);
      else
        resolve(rows);
    });
  });
}

module.exports = db;
