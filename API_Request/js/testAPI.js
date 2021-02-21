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