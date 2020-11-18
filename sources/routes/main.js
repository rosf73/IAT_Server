const router = require('express').Router()
const fs = require('fs')

const db = require('../../db')
const template = require('../statics/template')

router.get("/", async (req, res) => {
  const questions = await db.query(`SELECT * FROM question ORDER BY question_id ASC`, []);
  const answers = await db.query(`SELECT * FROM answer ORDER BY answer_id ASC`, []);
  
  var title = '관리자 페이지 입니다.';
  var html = template.HTML(title);
  res.writeHead(200);
  res.end(html);
});

router.get("/download", (req, res) => {
  res.end('download');
});

module.exports = router;