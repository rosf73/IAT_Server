module.exports = {
  HTML: (title) => {
    return `
      <!doctype html>
      <html>
      <head>
        <title>IAT 관리자 페이지</title>
        <link rel="stylesheet" type="text/css" href="/styleSheet/index.css">
        <script src="/controller/buttonScript.js"></script>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>${title}</h1>
        <ul class="dbtn">
          <li class="btn_set">
            <input type="image" src="./resources/download.png" alt="설문결과 다운로드 버튼" id="answers_download"
              onclick="clickAnswers()" onmouseover="mouseOverAnswers()" onmouseout="mouseOutAnswers()">
            <div>설문결과 다운로드(.csv)</div>
          </li>
          <li class="btn_set">
            <input type="image" src="./resources/download.png" alt="검사결과 다운로드 버튼" id="data_download"
            onclick="clickData()" onmouseover="mouseOverData()" onmouseout="mouseOutData()">
            <div>검사결과 다운로드(.csv)</div>
          </li>
        </ul>
      </body>
      </html>
    `;
  }
}