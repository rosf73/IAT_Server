const router = require('express').Router()
const sqlite = require('sqlite3').verbose()

// const db = new sqlite.Database('../../db/myDB.db', sqlite.OPEN_READWRITE, (err) => {
//   if (err)
//     console.error(err.message);
//   else
//     console.log('Connected to the mydb database.');
// });

router.post('/signin', (req, res) => {
  // db.serialize();
  // db.get(`SELECT phone_num FROM participant WHERE phone_num = ${req.body.phone_num}`, (err, row) => {
  //   if (err) {
  //     console.error(err.message);
  //     res.send("ERROR");
  //   }
  //   else {
  //     if (row.phone_num !== undefined && row.phone_num !== null)
  //       res.send("EXIST");
  //     else
  //       res.send("NO_EXIST");
  //   }
  // });
  res.send("EXIST");
});

router.post('/signup', (req, res) => {
  // db.serialize();
  // db.
  res.send("SUCCESS_SIGNUP");
});

module.exports = router;