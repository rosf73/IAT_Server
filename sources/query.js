exports.dropParticipantQuery = `
  DROP TABLE IF EXISTS participant
`;

exports.dropDataQuery = `
  DROP TABLE IF EXISTS data
`;

exports.dropAnswerQuery = `
  DROP TABLE IF EXISTS answer
`;

exports.createParticipantQuery = `
  CREATE TABLE IF NOT EXISTS participant (
    phone_num VARCHAR(20) NOT NULL PRIMARY KEY,
    age INT NOT NULL,
    gender INT NOT NULL,
    grade INT NOT NULL,
    major VARCHAR(30) NOT NULL,
    day INT NOT NULL,
    progress INT NOT NULL
  )
`;
/*
  gender : 1(남) 2(여)
  grade : 11(중1) 21(고1) 31(대1) 35(대5이상) 36(대졸취준) 40(기타)
*/

exports.createTestSubjectQuery = `
  CREATE TABLE IF NOT EXISTS test_subject (
    test_id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    subject VARCHAR(10) NOT NULL,
    word1 VARCHAR(10) NOT NULL,
    word2 VARCHAR(10) NOT NULL,
    word3 VARCHAR(10) NOT NULL,
    word4 VARCHAR(10) NOT NULL,
    word5 VARCHAR(10) NOT NULL
  )
`;

exports.createTestStepsQuery = `
  CREATE TABLE IF NOT EXISTS test_step (
    step INT NOT NULL PRIMARY KEY,
    left_subject1_id INT NOT NULL FOREIGN KEY,
    left_subject2_id INT FOREIGN KEY,
    right_subject1_id INT NOT NULL FOREIGN KEY,
    right_subject2_id INT FOREIGN KEY
  )
`;

exports.createQuestionQuery = `
  CREATE TABLE IF NOT EXISTS question (
    question_id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    content VARCHAR(200) NOT NULL
  )
`;

exports.createCaseQuery = `
  CREATE TABLE IF NOT EXISTS case (
    case_id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    number INT NOT NULL,
    content VARCHAR(100) NOT NULL,
    question_id INT NOT NULL FOREIGN KEY
  )
`;

exports.createDataQuery = `
  CREATE TABLE IF NOT EXISTS data (
    data_id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    day DATETIME NOT NULL,
    test_data VARCHAR(500) NOT NULL,
    phone_num VARCHAR(20) NOT NULL FOREIGN KEY,
    step INT NOT NULL FOREIGN KEY
  )
`;

exports.createAnswerQuery = `
  CREATE TABLE IF NOT EXISTS answer (
    answer_id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    answer_data VARCHAR(200) NOT NULL,
    phone_num VARCHAR(20) NOT NULL FOREIGN KEY,
    question_id INT NOT NULL FOREIGN KEY
  )
`;

exports.insertParticipantQuery = `
  INSERT INTO participant(phone_num, age, gender, grade, major, day, progress) VALUES (?, ?, ?, ?, ?, ?, ?)
`;

exports.insertDataQuery = `
  INSERT INTO data(day, time, test_data, phone_num) VALUES (?, ?, ?, ?)
`;

exports.insertAnswerQuery = `
  INSERT INTO answer(day, answer_data, phone_num) VALUES (?, ?, ?)
`;