const keydowncheck = () => {
  if (event.keyCode == 123) return false;
  else result;
}
const mousedowncheck = () => {
  if (event.button == 2) alert("우클릭이 제한되어있습니다.");
}

/**
 * answers download button listener
 * */
async function clickAnswers() {
  var contents = document.getElementById('question').innerText + "\n" + document.getElementById('answer').innerText;

  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff"+contents], { type: "text/csv;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "설문데이터.csv";

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
  var contents = document.getElementById('data').innerText;

  var downloadLink = document.createElement("a");
  var blob = new Blob(["\ufeff"+contents], { type: "text/csv;charset=utf-8" });
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = "검사데이터.csv";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}
function mouseOverData() {
  document.getElementById('data_download').src = './resources/download_clicked.png';
}
function mouseOutData() {
  document.getElementById('data_download').src = './resources/download.png';
}
