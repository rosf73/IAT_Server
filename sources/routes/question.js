const router = require('express').Router()
const e = require('express');
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
      }
      if (elem.type === 4) { // IAT type
        const steps_result = await db.query(`SELECT * FROM test_step WHERE question_id = ${elem.question_id}`, []);
        const word_set = [];
        const map_steps_result = await Promise.all(
          steps_result.map(async e => {
            const title = [];
            const left = [], right = [];
            const left_subject_1 = await db.query(`SELECT * FROM test_subject WHERE subject = "${e.left_subject_1}"`, []);
            title.push(left_subject_1[0].subject);
            left.push(left_subject_1[0].word1);
            left.push(left_subject_1[0].word2);
            left.push(left_subject_1[0].word3);
            left.push(left_subject_1[0].word4);
            left.push(left_subject_1[0].word5);

            if (e.step === 3)
              word_set.push({
                subject: left_subject_1[0].subject,
                words: [ left_subject_1[0].word1, left_subject_1[0].word2, left_subject_1[0].word3, left_subject_1[0].word4, left_subject_1[0].word5 ]
              });
            if (e.left_subject_2 !== null && e.left_subject_2 !== undefined && e.left_subject_2 !== "") {
              const left_subject_2 = await db.query(`SELECT * FROM test_subject WHERE subject = "${e.left_subject_2}"`, []);
              title.push(left_subject_2[0].subject);
              left.push(left_subject_2[0].word1);
              left.push(left_subject_2[0].word2);
              left.push(left_subject_2[0].word3);
              left.push(left_subject_2[0].word4);
              left.push(left_subject_2[0].word5);

              if (e.step === 3) 
                word_set.push({
                  subject: left_subject_2[0].subject,
                  words: [ left_subject_2[0].word1, left_subject_2[0].word2, left_subject_2[0].word3, left_subject_2[0].word4, left_subject_2[0].word5 ]
                });
            }
            else title.push("");

            const right_subject_1 = await db.query(`SELECT * FROM test_subject WHERE subject = "${e.right_subject_1}"`, []);
            title.push(right_subject_1[0].subject);
            right.push(right_subject_1[0].word1);
            right.push(right_subject_1[0].word2);
            right.push(right_subject_1[0].word3);
            right.push(right_subject_1[0].word4);
            right.push(right_subject_1[0].word5);

            if (e.step === 3)
              word_set.push({
                subject: right_subject_1[0].subject,
                words: [ right_subject_1[0].word1, right_subject_1[0].word2, right_subject_1[0].word3, right_subject_1[0].word4, right_subject_1[0].word5 ]
              });
            if (e.right_subject_2 !== null && e.right_subject_2 !== undefined && e.right_subject_2 !== "") {
              const right_subject_2 = await db.query(`SELECT * FROM test_subject WHERE subject = "${e.right_subject_2}"`, []);
              title.push(right_subject_2[0].subject);
              right.push(right_subject_2[0].word1);
              right.push(right_subject_2[0].word2);
              right.push(right_subject_2[0].word3);
              right.push(right_subject_2[0].word4);
              right.push(right_subject_2[0].word5);
            }
            else title.push("");
            
            e.title = title;
            e.left = left;
            e.right = right;
            delete e.step_id;
            delete e.step;
            delete e.question_id;
            delete e.left_subject_1;
            delete e.left_subject_2;
            delete e.right_subject_1;
            delete e.right_subject_2;
            return e;
          })
        );
        elem.words = word_set;
        elem.steps = map_steps_result;
      }
      if (elem.type === 5) { // assay type
        /** assay case control */
      }
      delete elem.sub_content;
      delete elem.content;
      delete elem.question_id;

      return elem;
    })
  );
  res.json({ "msg": "SUCCESS" , "data": map_result });
});

module.exports = router;