const router = require('express').Router()
const md5 = require('md5')
const db = require('../../db')

router.get("/all", (req, res) => {
  db.all(`SELECT * FROM question`, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    })
  });
});

module.exports = router;