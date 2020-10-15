const router = require('express').Router()
const md5 = require('md5')
const db = require('../../db')
const { insertParticipantQuery } = require('../query')

router.get("/all", (req, res) => {
  db.all(`SELECT * FROM participant`, (err, rows) => {
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

router.post('/signin', (req, res) => {
  var sql = "SELECT progress FROM participant WHERE phone_num = ?";
  var params = [md5(req.body.phone_num)];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    if (row)
      res.send("EXIST" + row.progress);
    else
      res.send("NO_EXIST");
  });
});

router.post("/signup", (req, res) => {
  var errors = [];
  if (!req.body.phone_num) {
    errors.push("No phone number specified");
  }
  if (!req.body.age) {
    errors.push("No age specified");
  }
  if (!req.body.gender) {
    errors.push("No gender specified");
  }
  if (!req.body.grade) {
    errors.push("No grade specified");
  }
  if (!req.body.major) {
    errors.push("No major specified");
  }
  if (!req.body.day) {
    errors.push("No day specified");
  }
  if (req.body.progress === null || req.body.progress === undefined) {
    errors.push("No progress specified");
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }

  var params =[md5(req.body.phone_num), req.body.age, req.body.gender, req.body.grade, req.body.major, req.body.day, req.body.progress];
  db.run(insertParticipantQuery, params, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.send("SUCCESS_SIGNUP");
  });
})

module.exports = router;