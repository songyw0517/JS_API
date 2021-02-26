function fetch_get(){
    fetch('http://127.0.0.1:5000')
    .then(function(response){
        response.text()
        .then(function(text){
            document.getElementById('spread').innerHTML = text;
        })
    })
}

function fetch_post(){
    sendData = {
        "name":"Seo", 
        "age":22, 
        "job":"programmer"
    }
    fetch('http://127.0.0.1:5000//POST', {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(sendData),
    })
    .then((data) => data.text())
    .then((text) => document.getElementById('spread').innerHTML = text)
}
function test(){
    fetch('https://jsonplaceholder.typicode.com/todos/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    id: 101,
    title: 'test content',
    completed: false,
    }),
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
}

function fetch_form_post(){
  var id = document.querySelector('#id').value;
  var pw = document.querySelector('#pw').value;
  var info = {
    ID:id,
    PW:pw
  };
  fetch("http://127.0.0.1:5000//form_POST", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(info) // str형식으로 보냄
  })
  .then((response)=>console.log(typeof(response), response));
}

function Check_Token(){
  auth = "Bearer "+localStorage.getItem('access_token');
  addHeader = new Headers();
  addHeader.append("Authorization", auth);
  
  fetch("http://127.0.0.1:5000//Check_Token", {
    headers: addHeader,
  })
  .then((response)=>response.text())
  .then((text) => alert(text));
}


function Simple_Login(){
  var id = document.querySelector('#id').value;
  var pw = document.querySelector('#pw').value;
  var info = {
    ID:id,
    PW:pw
  };
  fetch("http://127.0.0.1:5000//Simple_Login", {
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },
    body:JSON.stringify(info) // str형식으로 보냄
  })
  .then((response)=>response.json())
  .then(function(data){
    for(var key in data){
      localStorage.setItem(key, data[key]); 
    }
  })
}

function Logout(){
  localStorage.clear()
}
function seoJS(){
  //////////////////////////
  //////////////API 요청하는 곳
  ///////////////////////////
  var id = document.querySelector('#id').value;
  var pw = document.querySelector('#pw').value;

  var xmlHttp = new XMLHttpRequest();       // XMLHttpRequest 객체를 생성함.

  xmlHttp.onreadystatechange = function() { // onreadystatechange 이벤트 핸들러를 작성함.
      // 서버상에 문서가 존재하고 요청한 데이터의 처리가 완료되어 응답할 준비가 완료되었을 때
      if(this.status == 200 && this.readyState == 4) {
        var temp = JSON.parse(xmlHttp.response)
        if (temp['result']=="success"){
          localStorage.setItem('access_token', temp['access_token']);
        }
        // 요청한 데이터를 문자열로 반환함          
      }
  };

  xmlHttp.open("POST", "http://127.0.0.1:5000//xmlRequest", false);
  xmlHttp.send();
  }
/* 메소드 : get
 * 주소 : ~
 * 인자 : 
 *  body : ~
 *  header :~
 * 반환값 : ~
 *
 * 토큰을 받아서 저장해서 
 * api를 호출해서 처리해라
 * 
 * 
 */
