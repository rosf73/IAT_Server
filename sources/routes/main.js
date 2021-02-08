const router = require('express').Router()
const crypto = require('crypto')

const db = require('../../db')
const template = require('../statics/template')

router.get("/", async (req, res) => {
  const questions = await db.query(`SELECT type, sub_content FROM question ORDER BY question_id ASC`, []);
  const answers = await db.query(`SELECT day, answer_data, phone_num FROM answer ORDER BY answer_id ASC`, []);
  const data = await db.query(`SELECT * FROM data ORDER BY data_id ASC`, []);
  const map_answers = await Promise.all(
    answers.map(async elem => {
      const user = await db.query(`SELECT * FROM participant WHERE phone_num = '${elem.phone_num}'`, []);

      const participants = await db.query(`SELECT phone_num, progress, iv FROM participant`, []);
      let participant = await Promise.all(
        participants.filter(e => elem.phone_num === e.phone_num)
      );
      participant = await Promise.all(
        participant.map(e => {
          const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.CIPHER_KEY, Buffer.from(e.iv, 'hex'));
          let result = decipher.update(e.phone_num, 'base64', 'utf8');
          result += decipher.final('utf8');
    
          e.phone_num = result;
          return e;
        })
      );
      
      elem.phone_num = participant[0].phone_num;
      elem.age = user[0].age;
      elem.gender = user[0].gender;
      elem.major = user[0].major;
      elem.grade = user[0].grade;
      elem.meeting = user[0].meeting;
      return elem;
    })
  );
  const map_data = await Promise.all(
    data.map(async elem => {
      const sub_question = await db.query(`SELECT * FROM sub_question WHERE sub_question_id = ${elem.sub_question_id}`, []);
      
      const participants = await db.query(`SELECT phone_num, progress, iv FROM participant`, []);
      let participant = await Promise.all(
        participants.filter(e => elem.phone_num === e.phone_num)
      );
      participant = await Promise.all(
        participant.map(e => {
          const decipher = crypto.createDecipheriv('aes-256-cbc', process.env.CIPHER_KEY, Buffer.from(e.iv, 'hex'));
          let result = decipher.update(e.phone_num, 'base64', 'utf8');
          result += decipher.final('utf8');
    
          e.phone_num = result;
          return e;
        })
      );

      elem.phone_num = participant[0].phone_num;
      elem.question = sub_question[0].question_id + "_" + sub_question[0].number;
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
  for (var i = 0; i < map_answers.length; i++) {
    a_str += map_answers[i].answer_data;
    a_str += map_answers[i].age + "," + map_answers[i].gender + "," + map_answers[i].major + "," + map_answers[i].grade + "," + map_answers[i].day + "," + map_answers[i].phone_num.substring(0, 3) + "-" + map_answers[i].phone_num.substring(3) + "," + map_answers[i].meeting + "\n";
  }

  var d_str = "step,반응 시간(ms),z점수\n";
  for (var i = 0; i < map_data.length; i++) {
    d_str += map_data[i].phone_num.substring(0, 3) + "-" + map_data[i].phone_num.substring(3) + "," + map_data[i].question + "\n" + map_data[i].test_data;
  }
  
  var title = '관리자 페이지 입니다.';
  var html = template.MAIN_HTML(title, `
    <p style="display: none" id="question">${q_str}나이,성별,전공,학교급,날짜,전화번호,면담여부,</p>
    <p style="display: none" id="answer">${a_str}</p>
    <p style="display: none" id="data">${d_str}</p>
  `);
  res.writeHead(200);
  res.end(html);
});

router.get("/manage", async (req, res) => {
  const giftable = await db.query(`SELECT giftable FROM information`, []);

  var html = template.MANAGE_HTML(giftable[0].giftable);
  res.writeHead(200);
  res.end(html);
});

router.get("/admin", async (req, res) => {
  var html = template.ADMIN_HTML();
  res.writeHead(200);
  res.end(html);
});

router.post("/update_giftable", async (req, res) => {
  const giftable = await db.query(`SELECT giftable FROM information`, []);

  db.run(`UPDATE information SET giftable = ${!(giftable[0].giftable)} WHERE giftable = ${giftable[0].giftable}`, (err, result) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.writeHead(302, {Location: `/manage`});
    res.end();
  });
});

router.post("/clear_data", (req, res) => {
  db.run(`DELETE FROM answer WHERE answer_id > 0`, (err) => {
    db.run(`DELETE FROM data WHERE data_id > 0`, (err) => {
      db.run(`DELETE FROM participant WHERE age > -10000`, (err) => {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        res.writeHead(302, {Location: `/admin`});
        res.end();
      });
    });
  });
});

module.exports = router;
