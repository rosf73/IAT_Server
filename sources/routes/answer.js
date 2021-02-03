const router = require('express').Router()
const crypto = require('crypto')

const db = require('../../db')
const { insertAnswerQuery, insertDataQuery, updateDayQuery } = require('../query')

router.get("/download", (req, res) => {
  db.all(`SELECT * FROM answer`, (err, rows) => {
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

router.post("/upload", async (req, res) => {
  var errors = [];
  if (!req.body.phone_num) {
    errors.push("No phone number specified");
  }
  if (!req.body.day) {
    errors.push("No day specified");
  }
  if (!req.body.answer_data) {
    errors.push("No answer_data specified");
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }
  
  const participants = await db.query(`SELECT phone_num, day, iv FROM participant`, []);
  const participant = await Promise.all(
    participants.filter(elem => {
      const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.CIPHER_KEY, Buffer.from(elem.iv, 'hex'));
      let result = decipher.update(elem.phone_num, 'base64', 'utf8');
      result += decipher.final('utf8');
    
      return req.body.phone_num === result;
    })
  );
  
  var map_answer_data = await Promise.all(
    req.body.answer_data.map(async elem => {
      var num_set = elem.number.match(/\d+/g);

      var question = await db.query(`SELECT type FROM question WHERE question_id = ${Number(num_set[0])}`, []);

      elem.type = true;
      if (question[0].type === 4 && elem.number.length <= 3) {
        var id = await db.query(`
          SELECT sub_question_id FROM sub_question
          WHERE question_id = ${Number(num_set[0])}
          and number = ${Number(num_set[1])}
        `, []);
        await db.query(insertDataQuery, [req.body.day, elem.answer, participant[0].phone_num, id[0].sub_question_id]);
        elem.type = false;
      }

      return elem;
    })
  );
  var filtered_answer_data = await Promise.all(
    map_answer_data.filter(elem => elem.type !== false)
  );
  var answers = "";
  var reduced_answer_data = await Promise.all(
    filtered_answer_data.map(elem => {
      answers += elem.answer + ",";

      return elem;
    })
  );

  var params =[req.body.day, answers, participant[0].phone_num];
  db.run(insertAnswerQuery, params, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    db.run(updateDayQuery, [participant[0].day + 1, participant[0].phone_num], (err, result) => {
      if (err) {
        res.status(400).json({ "error": err.message })
        return;
      }
      res.send("SUCCESS" + participant[0].day);
    });
  });
});

module.exports = router;
