const router = require('express').Router()

const db = require('../../db')

router.get("/download", (req, res) => {
  db.all(`SELECT * FROM data`, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

module.exports = router;