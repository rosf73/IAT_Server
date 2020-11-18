// import { db } from '../../../db'

async function initFirstRow() {
  var str = "";

  const sql = `SELECT type, sub_content FROM question ORDER BY question_id ASC`;
  // const questions = await db.query(sql, []);
  const questions = [];

  for (var i = 0; i < questions.length; i++) {
    if (questions[i].sub_content === 0) {
      str += (i+1)+",";
    }
    else for (var j = 0; j < questions[i].sub_content; j++) {
      if (questions[i].type === 4) // IAT
        str += (i+1)+"_"+(j+1)+"_D,";
      else
        str += (i+1)+"_"+(j+1)+",";
    }
  }
  str += "\n";

  return str;
}

/**
 * answers download button listener
 * */
async function clickAnswers() {
  var contents = initFirstRow();

  // const sql = `SELECT * FROM answer ORDER BY answer_id ASC`;
  // const data = await db.query(sql, []);

  // const map_data = await Promise.all(
  //   data.map(async elem => {
  //     contents += elem.phone_num
  //     return elem;
  //   })
  // );

  var downloadLink = document.createElement("a");
  var blob = new Blob([contents], { type: "text/csv;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "data.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
function mouseOverAnswers() {
  document.getElementById('answers_download').src = './resources/download_clicked.png';
}
function mouseOutAnswers() {
  document.getElementById('answers_download').src = './resources/download.png';
}

/**
 * data download button listener
 * */
async function clickData() {
}
function mouseOverData() {
  document.getElementById('data_download').src = './resources/download_clicked.png';
}
function mouseOutData() {
  document.getElementById('data_download').src = './resources/download.png';
}