const router = require('express').Router()
const md5 = require('md5')
const db = require('../../db')
const { insertDataQuery } = require('../query')

router.get("/download", (req, res) => {
  db.get(`SELECT * FROM data`, (err, rows) => {
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

router.post("/upload", (req, res) => {
  var errors = [];
  if (!req.body.phone_num) {
    errors.push("No phone number specified");
  }
  if (!req.body.day) {
    errors.push("No day specified");
  }
  if (!req.body.time) {
    errors.push("No time specified");
  }
  if (!req.body.test_data) {
    errors.push("No test_data specified");
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }

  var params =[req.body.day, req.body.time, req.body.test_data, md5(req.body.phone_num)];
  db.run(insertDataQuery, params, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.send("SUCCESS_UPLOAD");
  });
});

module.exports = router;