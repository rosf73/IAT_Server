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

router.post("/signin", async (req, res) => {
  const participants = await db.query(`SELECT phone_num, progress, iv FROM participant`, []);
  const participant = await Promise.all(
    participants.filter(elem => {
      const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.CIPHER_KEY, Buffer.from(elem.iv, 'hex'));
      let result = decipher.update(elem.phone_num, 'base64', 'utf8');
      result += decipher.final('utf8');
    
      return req.body.phone_num === result;
    })
  );
  
  if (participant.length > 0)
    res.send("EXIST" + participant[0].progress);
  else
    res.send("NO_EXIST");
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
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }

  const iv = crypto.randomBytes(16); // For AES, this is always 16
  const cipher = crypto.createCipheriv('aes-256-cbc', process.env.CIPHER_KEY, iv); // aes245cbc 알고리즘으로 전화번호 암호화
  let result = cipher.update(req.body.phone_num, 'utf8', 'base64');
  result += cipher.final('base64');

  var params =[result, req.body.age, req.body.gender, req.body.grade, req.body.major, 1, 0, false, iv.toString('hex')];
  db.run(insertParticipantQuery, params, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.send("SUCCESS_SIGNUP");
  });
})

module.exports = router;