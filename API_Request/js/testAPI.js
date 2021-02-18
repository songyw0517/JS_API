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