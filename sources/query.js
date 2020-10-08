exports.dropParticipantQuery = `
  DROP TABLE IF EXISTS participant
`;

exports.dropDataQuery = `
  DROP TABLE IF EXISTS data
`;

exports.createParticipantQuery = `
  CREATE TABLE IF NOT EXISTS participant (
    phone_num VARCHAR(20) NOT NULL PRIMARY KEY,
    age INT NOT NULL,
    gender INT NOT NULL,
    grade INT NOT NULL,
    major VARCHAR(30) NOT NULL
  )
`;
/*
  gender : 1(남) 2(여)
  grade : 11(중1) 21(고1) 31(대1) 35(대5이상) 36(대졸취준) 40(기타)
*/

exports.createDataQuery = `
  CREATE TABLE IF NOT EXISTS data (
    phone_num VARCHAR(20) NOT NULL 
  )
`;

exports.insertParticipantQuery = `
  INSERT INTO participant(phone_num, age, gender, grade, major) values (?, ?, ?, ?, ?)
`;

exports.dummyDataQuery = `
  INSERT INTO participant(phone_num, age, gender, grade, major) values
    ('01012345678', 13, 1, 40, '컴퓨터'),
    ('01094385742', 49, 2, 40, '경영'),
    ('01039947369', 22, 2, 33, '수학교육')
`;

exports.selectAllQuery = `
  SELECT * FROM participant
`;