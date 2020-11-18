const router = require('express').Router()
const fs = require('fs')

const db = require('../../db')
const template = require('../statics/template')

router.get("/", async (req, res) => {
  const questions = await db.query(`SELECT type, sub_content FROM question ORDER BY question_id ASC`, []);
  const answers = await db.query(`SELECT day, answer_data, phone_num FROM answer ORDER BY answer_id ASC`, []);
  const data = await db.query(`SELECT day, test_data, phone_num FROM data ORDER BY data_id ASC`, []);
  const map_answers = await Promise.all(
    answers.map(async elem => {
      const user = await db.query(`SELECT * FROM participant WHERE phone_num = ${elem.phone_num}`, []);

      elem.age = user[0].age;
      elem.gender = user[0].gender;
      elem.major = user[0].major;
      elem.grade = user[0].grade;
      return elem;
    })
  );

  var q_str = "";
  for (var i = 0; i < questions.length; i++) {
    if (questions[i].sub_content === 0) {
      q_str += (i+1)+",";
    }
    else for (var j = 0; j < questions[i].sub_content; j++) {
      if (questions[i].type === 4) // IAT
        q_str += (i+1)+"_("+(j+1)+")_D,";
      else
        q_str += (i+1)+"_("+(j+1)+"),";
    }
  }

  var a_str = "";
  for (var i = 0; i < answers.length; i++) {
    a_str += answers[i].answer_data;
    a_str += answers[i].age + "," + answers[i].gender + "," + answers[i].major + "," + answers[i].grade + "\n" + answers[i].day + "," + answers[i].phone_num + "\n";
  }

  var d_str = "step,반응 시간(ms),z점수\n";
  for (var i = 0; i < data.length; i++) {
    d_str += data[i].test_data;
  }
  
  var title = '관리자 페이지 입니다.';
  var html = template.MAIN_HTML(title, `
    <p style="display: none" id="question">${q_str}나이,성별,전공,학교급,날짜,전화번호,</p>
    <p style="display: none" id="answer">${a_str}</p>
    <p style="display: none" id="data">${d_str}</p>
  `);
  res.writeHead(200);
  res.end(html);
});

router.get("/download", (req, res) => {
  res.end('download');
});

module.exports = router;