const router = require('express').Router()
const db = require('../../db')

router.get("/all", (req, res) => {
  db.all(`SELECT * FROM infomation`, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "msg": "SUCCESS", "data": rows[0] });
  });
});

module.exports = router;