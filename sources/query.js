exports.dropParticipantQuery = `
  DROP TABLE IF EXISTS participant
`;
exports.dropTestSubjectQuery = `
  DROP TABLE IF EXISTS test_subject
`;
exports.dropTestStepQuery = `
  DROP TABLE IF EXISTS test_step
`;
exports.dropQuestionQuery = `
  DROP TABLE IF EXISTS question
`;
exports.dropQuestionCaseQuery = `
  DROP TABLE IF EXISTS base_case
`;
exports.dropDataQuery = `
  DROP TABLE IF EXISTS data
`;
exports.dropAnswerQuery = `
  DROP TABLE IF EXISTS answer
`;

exports.insertParticipantQuery = `
  INSERT INTO participant(phone_num, age, gender, grade, major, day, progress) VALUES (?, ?, ?, ?, ?, ?, ?)
`;
exports.insertTestStep11Query = `
  INSERT INTO test_step(step, trial, question_id, left_subject_1, right_subject_1) VALUES (?, ?, ?, ?, ?)
`;
exports.insertTestStep21Query = `
  INSERT INTO test_step(step, trial, question_id, left_subject_1, left_subject_2, right_subject_1) VALUES (?, ?, ?, ?, ?, ?)
`;
exports.insertTestStep12Query = `
  INSERT INTO test_step(step, trial, question_id, left_subject_1, right_subject_1, right_subject_2) VALUES (?, ?, ?, ?, ?, ?)
`;
exports.insertTestSubjectQuery = `
  INSERT INTO test_subject(subject, word1, word2, word3, word4, word5) VALUES (?, ?, ?, ?, ?, ?)
`;
exports.insertQuestionQuery = `
  INSERT INTO question(question_id, content, type, sub_content) VALUES (?, ?, ?, ?)
`;
exports.insertSubQuestionQuery = `
  INSERT INTO sub_question(number, content, question_id) VALUES (?, ?, ?)
`;
exports.insertBaseCaseQuery = `
  INSERT INTO base_case(number, content, is_assay, question_id) VALUES (?, ?, ?, ?)
`;
exports.insertTableCaseQuery = `
  INSERT INTO table_case(number, content, question_id) VALUES (?, ?, ?)
`;
exports.insertSubCaseQuery = `
  INSERT INTO sub_case(number, content, sub_question_id) VALUES (?, ?, ?)
`;
exports.insertDataQuery = `
  INSERT INTO data(day, test_data, phone_num, question_id) VALUES (?, ?, ?, ?)
`;
exports.insertAnswerQuery = `
  INSERT INTO answer(day, answer_data, phone_num) VALUES (?, ?, ?)
`;