const dropQuery = `
  DROP TABLE IF EXISTS participant
`;

const insertQuery = `
  CREATE TABLE IF NOT EXISTS participant(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_num VARCHAR(20),
    password VARCHAR(20)
  )
`;

const dummyDataQuery = `
  INSERT INTO participant(phone_num, password) values
    ('01012345678', 'daenamuhelicopter'),
    ('01094385742', 'wordpass'),
    ('01039947369', 'password')
`;

const selectAllQuery = `
  SELECT * FROM participant
`;

exports.dropQuery = dropQuery;
exports.insertQuery = insertQuery;
exports.dummyDataQuery = dummyDataQuery;
exports.selectAllQuery = selectAllQuery;