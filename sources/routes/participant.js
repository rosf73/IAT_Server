const router = require('express').Router()
const crypto = require('crypto')

const db = require('../../db')
const { insertParticipantQuery } = require('../query')

router.get("/all", (req, res) => {
  db.all(`SELECT * FROM participant`, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({ "msg": "SUCCESS", "data": rows });
  });
});

router.post("/signin", (req, res) => {
  const cipher = crypto.createCipheriv('aes-256-cbc', process.env.CIPHER_KEY); // aes245cbc 알고리즘으로 전화번호 암호화
  let result = cipher.update(req.body.phone_num, 'utf8', 'base64');
  result += cipher.final('base64');

  db.get("SELECT progress FROM participant WHERE phone_num = ?", result, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    db.all(`SELECT * FROM question`, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      if (row) {
        if (row.progress === rows.length)
          res.send("PASS");
        else
          res.send("EXIST"+row.progress);
      }
      else
        res.send("NO_EXIST");
    });
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

  const cipher = crypto.createCipheriv('aes-256-cbc', process.env.CIPHER_KEY); // aes245cbc 알고리즘으로 전화번호 암호화
  let result = cipher.update(req.body.phone_num, 'utf8', 'base64');
  result += cipher.final('base64');

  var params =[result, req.body.age, req.body.gender, req.body.grade, req.body.major, req.body.day, req.body.progress];
  db.run(insertParticipantQuery, params, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.send("SUCCESS_SIGNUP");
  });
})

module.exports = router;