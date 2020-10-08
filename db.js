const sqlite = require('sqlite3').verbose()
const md5 = require('md5')
const { dropParticipantQuery, createParticipantQuery, createDataQuery, insertParticipantQuery, dropDataQuery } = require('./sources/query')

const db = new sqlite.Database('./db/myDB.db', sqlite.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }
  else {
    console.log('Connected to the mydb database.');
    db.run(dropParticipantQuery);
    db.run(dropDataQuery);
    db.run(createParticipantQuery, (err) => {
      if (err) { /** Already created Table */ }
      else {
        db.run(insertParticipantQuery, [md5("01012345678"), 18, 2, 22, "none", 1]);
        db.run(insertParticipantQuery, [md5("01066775544"), 18, 1, 22, "none", 1]);
        db.run(insertParticipantQuery, [md5("01087654321"), 21, 1, 31, "none", 1]);
        db.run(insertParticipantQuery, [md5("01075757575"), 50, 2, 40, "컴퓨터공학", 1]);
      }
    });
    db.run(createDataQuery, (err) => {
      if (err) { /** Already created Table */ }
      else { /** Insert dummy-data */ }
    });
  }
});

module.exports = db;