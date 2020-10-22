const router = require('express').Router()
const md5 = require('md5')
const db = require('../../db')

router.get("/all", async (req, res) => {
  const sql = `SELECT * FROM question ORDER BY question_id ASC`;
  const result = await db.query(sql, []);

  const map_result = await Promise.all(
    result.map(async elem => {
      elem.number = elem.question_id;
      elem.question = elem.content;

      if (elem.type === 1) { // base type
        const case_result = await db.query(`SELECT * FROM base_case WHERE question_id = ${elem.question_id}`, []);
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
        elem.cases = map_case_content_result;
        elem.is_assay = map_case_assay_result;
        delete elem.sub_content;
      }
      if (elem.type === 2) { // table type
        const sub_question_result = await db.query(`SELECT content FROM sub_question WHERE question_id = ${elem.question_id}`, []);
        const map_sub_question_result = await Promise.all(
          sub_question_result.map(async e => {
            var temp = e.content;
            return temp;
          })
        );
        const table_case_result = await db.query(`SELECT content FROM table_case WHERE question_id = ${elem.question_id}`, []);
        const map_table_case_result = await Promise.all(
          table_case_result.map(async e => {
            var temp = e.content;
            return temp;
          })
        );
        elem.sub_contents = map_sub_question_result;
        elem.cases = map_table_case_result;
        delete elem.sub_content;
      }
      if (elem.type === 3) { // listed_type
        const sub_question_result = await db.query(`SELECT sub_question_id, content FROM sub_question WHERE question_id = ${elem.question_id}`, []);
        const map_sub_question_result = await Promise.all(
          sub_question_result.map(async e => {
            const sub_case_result = await db.query(`SELECT content FROM sub_case WHERE sub_question_id = ${e.sub_question_id}`, []);
            const map_sub_case_result = await Promise.all(
              sub_case_result.map(async e => {
                var temp = e.content;
                return temp;
              })
            );
            e.cases = map_sub_case_result;
            delete e.sub_question_id;
            return e;
          })
        );
        elem.sub_questions_count = elem.sub_content;
        elem.sub_contents = map_sub_question_result;
        delete elem.sub_content;
      }
      if (elem.type === 4) { // IAT type
        /** test control */
      }
      if (elem.type === 5) { // assay type
        /** assay case control */
      }
      delete elem.content;
      delete elem.question_id;

      return elem;
    })
  );
  res.json({ "msg": "SUCCESS" , "data": map_result });
});

module.exports = router;