module.exports = {
  MAIN_HTML: (title, data) => {
    return `
      <!doctype html>
      <html>
      <head>
        <title>IAT 관리자 페이지</title>
        <link rel="stylesheet" type="text/css" href="/styleSheet/index.css">
        <script src="/controller/buttonScript.js"></script>
        <meta charset="utf-8">
      </head>
      <body onkeydown="return keydowncheck();" onmousedown="return mousedowncheck();">
        <h1>${title}</h1>
        <a href="/manage" id="manage">[ 데이터 관리 페이지로 이동 ]</a>
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
        ${data}
      </body>
      </html>
    `;
  },
  MANAGE_HTML: () => {
    return `
      <!doctype html>
      <html>
      <head>
        <title>IAT 관리자 페이지</title>
        <link rel="stylesheet" type="text/css" href="/styleSheet/index.css">
        <script src="/controller/buttonScript.js"></script>
        <meta charset="utf-8">
      </head>
      <body onkeydown="return keydowncheck();" onmousedown="return mousedowncheck();">
        <h1>서버 데이터 관리 페이지입니다.</h1>
      </body>
      </html>
    `;
  }
}
