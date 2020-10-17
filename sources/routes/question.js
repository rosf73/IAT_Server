const router = require('express').Router()
const md5 = require('md5')
const db = require('../../db')

router.get("/all", async (req, res) => {
  const sql = `SELECT * FROM question`;
  const result = await db.query(sql, []);
  const map_result = await Promise.all(
    result.map(async elem => {
      const case_result = await db.query(`SELECT content, is_assay FROM question_case WHERE question_id = ${elem.question_id}`, []);
      const map_case_content_result = await Promise.all(
        case_result.map(async e => {
          var temp = e.content;
          return temp;
        })
      );
      const map_case_assay_result = await Promise.all(
        case_result.map(async e => {
          var temp = e.is_assay;
          return temp;
        })
      );
      elem.question = elem.content;
      elem.cases = map_case_content_result;
      elem.is_assay = map_case_assay_result;
      delete elem.content;
      delete elem.question_id;
      return elem;
    })
  );
  res.json({ "msg": "SUCCESS" , "data": map_result });
});

module.exports = router;