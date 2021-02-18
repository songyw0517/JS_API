# 2021.02.18
## ISSUE
### Flask
1. API를 POSTMAN으로 만들려고 했던점
- 내가 하려던 것은 API를 요청하면 데이터를 반환하는 것을 원했다.
- But, POSTMAN은 API 요청만 하는 프로그램이다.
- 따라서 API를 만들 수 없었음...

2. CORS Error
- 서버를 생성하여 요청을 보냈으나 CORS 에러로 요청을 거부했다.
- 찾아보니 flask_cors를 사용하면 간단히 해결되는 일이었다.
``` python
# 설정 : cmd -> pip install flask_cors로 설치
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
```
- 이러면 해결

3. 스페셜 네임을 무시함
- API의 get 메소드를 해결하고나서 POST메소드를 작성한 후에 발생했다.
- 많은 삽질 후에? 어쩌다보니
``` python
if __name__== '__main__':
    app.run(debug=True)
```
- 의 위치를 바꾸었는데 정상적으로 작동한 것이다...
- 이전의 코드
    ``` python
    @app.route('/', methods = ['GET'])
    def waitGetRequest():
        data = {"name":"Song", "age":25}
        return data
    if __name__== '__main__':
        app.run(debug=True)
    @app.route('/POST', methods = ['POST'])
    def waitPOSTRequest():
        data = request.get_data()
        print("receive data = ", data)
        return data
    ```
- 고친 코드
    ``` python
    @app.route('/', methods = ['GET'])
    def waitGetRequest():
        data = {"name":"Song", "age":25}
        return data
    @app.route('/POST', methods = ['POST'])
    def waitPOSTRequest():
        data = request.get_data()
        print("receive data = ", data)
        return data
    if __name__== '__main__':
        app.run(debug=True)
    ```
- 파이썬에도 순서에 있어서 중요한 것이 스페셜 네임이라고 한다.
- 스페셜 네임을 위에 쓸 경우 : 그 파일을 바로 다이렉트로 실행할 때 사용

### JS
1. GET은 성공적으로 마무리했는데, POST부분에서는 두번째 인자를 사용하여 의아하여 대학 동기에게 물어봤고 다음과 같은 내용을 알 수 있었다. 
- GET과 POST의 차이
- GET : 
    - 주로 데이터를 읽거나 검색하는데 사용된다.
    - GET요청이 성공하면, XML이나 JSON과 함께 200 (OK) HTTP 응답 코드를 리턴한다.
    - 에러 발생시 주로 404 에러나 400 에러가 발생한다.
    - HTTP 명세에 의하면 GET 요청은 오로지 데이터를 읽을 때만 사용되고 수정할때는 사용하지 않는다.
    - 같은 요청을 여러번 하더라도 변함없이 항상 같은 응답을 받을 수 있다.
- POST :
    - 새로운 리소스를 생성할때 사용된다.
    - 성공적으로 생성을 완료하면 201 HTTP 응답을 반환한다.
    - POST 요청을 여러번 했을때 항상 같은 결과물이 나오지 않을 수 있다.
- [출처](https://im-developer.tistory.com/166)

### Question
1. POST 요청의 두번째 인자에 대해 알아보고 싶다. 특히 headers에 들어가는 'Content-Type'에 대해 알아보고 싶다.
``` javascript
fetch('https://jsonplaceholder.typicode.com/todos/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    id: 101,
    title: 'test content',
    completed: false,
    }),
```
