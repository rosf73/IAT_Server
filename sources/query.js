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
    day INT NOT NULL
  )
`;
/*
  gender : 1(남) 2(여)
  grade : 11(중1) 21(고1) 31(대1) 35(대5이상) 36(대졸취준) 40(기타)
*/

exports.createDataQuery = `
  CREATE TABLE IF NOT EXISTS data (
    data_id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    day INT NOT NULL,
    time INT NOT NULL,
    test_data VARCHAR(500) NOT NULL,
    phone_num VARCHAR(20) NOT NULL FOREIGN KEY
  )
`;

exports.createAnswerQuery = `
  CREATE TABLE IF NOT EXISTS answer (
    answer_id INT NOT NULL PRIMARY KEY AUTOINCREMENT,
    day INT NOT NULL,
    answer_data VARCHAR(300) NOT NULL,
    phone_num VARCHAR(20) NOT NULL FOREIGN KEY
  )
`;

exports.insertParticipantQuery = `
  INSERT INTO participant(phone_num, age, gender, grade, major) VALUES (?, ?, ?, ?, ?)
`;

exports.insertDataQuery = `
  INSERT INTO data(day, time, test_data, phone_num) VALUES (?, ?, ?, ?)
`;

exports.insertAnswerQuery = `
  INSERT INTO answer(day, answer_data, phone_num) VALUES (?, ?, ?)
`;