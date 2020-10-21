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
exports.insertTestSubject11Query = `
  INSERT INTO test_subject(subject, left_subject1_id, right_subject1_id) VALUES (?, ?, ?)
`;
exports.insertTestSubject21Query = `
  INSERT INTO test_subject(subject, left_subject1_id, left_subject2_id, right_subject1_id) VALUES (?, ?, ?, ?)
`;
exports.insertTestSubject12Query = `
  INSERT INTO test_subject(subject, left_subject1_id, right_subject1_id, right_subject2_id) VALUES (?, ?, ?, ?)
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
  INSERT INTO data(day, time, test_data, phone_num) VALUES (?, ?, ?, ?)
`;
exports.insertAnswerQuery = `
  INSERT INTO answer(answer_data, phone_num, question_id) VALUES (?, ?, ?)
`;