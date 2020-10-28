const router = require('express').Router()
const md5 = require('md5')
const db = require('../../db')
const { insertAnswerQuery, insertDataQuery } = require('../query')

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

  var map_answer_data = await Promise.all(
    req.body.answer_data.map(async elem => {
      var question = await db.query(`SELECT type FROM question WHERE question_id = ${Number(elem.number.substring(0, 1))}`, []);

      if (question[0].type === 4) {
        await db.query(insertDataQuery, [req.body.day, elem.answer, md5(req.body.phone_num), Number(elem.number)]);
      }

      elem.number = question[0].type;
      return elem;
    })
  );
  var filtered_answer_data = await Promise.all(
    map_answer_data.filter(elem => elem.number !== 4)
  );
  var answers = "";
  var reduced_answer_data = await Promise.all(
    filtered_answer_data.map(elem => {
      answers += elem.answer + ",";

      return elem;
    })
  );

  var params =[req.body.day, answers, md5(req.body.phone_num)];
  db.run(insertAnswerQuery, params, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.send("SUCCESS_UPLOAD");
  });
});

module.exports = router;