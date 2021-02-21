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
2. MIME-Type, Content-Type이란 무엇인가?
> 우리가 클라이언트 브라우저로 어떤 자원을 보낼때(어떤 형태의 파일이나 문서 등), 웹 서버는 일련의 HTTP 헤더로 파일이나 자원을 포함하는 바이트의 Stream을 앞에 보낸다. 이런 헤더는 클라이언트에게 웹 서버와 커뮤니케이션 세부사항을 묘사한다. 예를 들어, 헤더는 사용되고 있는 웹 서버의 소프트웨어의 타입, 서버의 날짜와 시간, HTTP 프로토콜, 사용중인 커넥션 타입등을 지정한다. 헤더는 또한 클라이언트가 이런 가상 패스나 도메인에 대해서 저장해야 할 쿠키를 포함한다.

> 이와 관련해서 가장 주용한 것은 헤더는 또한 보내지는 자원의 content 타입이 포함되는 것이다. 이것은 Content-Type 헤더에 의해 지정되는데, 이 값은 표준 MIME-Type의 하나이다. MIME-Type을 살펴봄으로써 브라우져는 데이터를 나타내는데 어떤 종류의 파일 Stream인지를 알고 있다. HTML 페이지에 MIME-Type을 가진다.

- Content-Type의 종류
1) Multipart Related MIME 타입
  - Content-Type: Multipart/related <-- 기본형태
  - Content-Type: Application/X-FixedRecord

2) XML Media의 타입
 - Content-Type: text/xml
 - Content-Type: Application/xml
 - Content-Type: Application/xml-external-parsed-entity
 - Content-Type: Application/xml-dtd
 - Content-Type: Application/mathtml+xml
 - Content-Type: Application/xslt+xml



3) Application의 타입 
 - Content-Type: Application/EDI-X12 <--  Defined in RFC 1767 
 - Content-Type: Application/EDIFACT <--  Defined in RFC 1767 
 - Content-Type: Application/javascript <-- Defined in RFC 4329 
 - Content-Type: Application/octet-stream  : <-- 디폴트 미디어 타입은 운영체제 종종 실행파일, 다운로드를 의미
 - Content-Type: Application/ogg <-- Defined in RFC 3534
 - Content-Type: Application/x-shockwave-flash <-- Adobe Flash files
 - Content-Type: Application/json <-- JavaScript Object Notation JSON; Defined in RFC 4627 
 - Content-Type: Application/x-www-form-urlencode <-- HTML Form 형태
* x-www-form-urlencode와 multipart/form-data은 둘다 폼 형태이지만 x-www-form-urlencode은 대용량 바이너리 테이터를 전송하기에 비능률적이기 때문에 대부분 첨부파일은 multipart/form-data를 사용하게 된다.



4) 오디오 타입
- Content-Type: audio/mpeg <-- MP3 or other MPEG audio
- Content-Type: audio/x-ms-wma <-- Windows Media Audio;
- Content-Type: audio/vnd.rn-realaudio <--  RealAudio;  등등 

5) Multipart 타입
- Content-Type: multipart/mixed: MIME E-mail; 
- Content-Type: multipart/alternative: MIME E-mail;
- Content-Type: multipart/related: MIME E-mail <-- Defined in RFC 2387 and used by MHTML(HTML mail) 
- Content-Type: multipart/formed-data  <-- 파일 첨부



6) TEXT 타입 
- Content-Type: text/css
- Content-Type: text/html
- Content-Type: text/javascript
- Content-Type: text/plain
- Content-Type: text/xml

7) file 타입
- Content-Type: application/msword <-- doc
- Content-Type: application/pdf <-- pdf
- Content-Type: application/vnd.ms-excel <-- xls
- Content-Type: application/x-javascript <-- js
- Content-Type: application/zip <-- zip
- Content-Type: image/jpeg <-- jpeg, jpg, jpe
- Content-Type: text/css <-- css
- Content-Type: text/html <-- html, htm
- Content-Type: text/plain <-- txt
- Content-Type: text/xml <-- xml
- Content-Type: text/xsl <-- xsl

[출처: 나는 웹개발자!](https://iamawebdeveloper.tistory.com/88) 

# 2021.02.21
## 로그인, 로그아웃 구현
## JWT사용
## 쿠키 사용 못함
## ISSUE
1. 무슨이유인지는 모르겠지만 로컬호스트에서 쿠키 생성이 안되었다;
    ``` javascript
    function setCookie(name, value, days) {
            if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
            } else {
                var expires = "";
            }
            
            document.cookie = name + "=" + value + expires + "; path=/";
    }

    

    function getCookie(name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            
            for (i = 0; i < ARRcookies.length; i++) {     
                    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                    
                    x = x.replace(/^\s+|\s+$/g, "");

                    if (x == name) {
                            return unescape(y);
                    }
            }
    }
    ```
    - expires(만료기간)의 문제인줄알았는데, 생성자체가 안되었다. -> localstorage로 처리하게 됨
2. JWT 처리문제
- jwt 공부를 제대로 하지 않은 탓으로 생긴 이슈였다.
- 한번 로그인에 성공하여, 토큰을 LocalStorage에 저장하면,
``` javascript
for(var key in data){
      localStorage.setItem(key, data[key]); 
    }
여기서는 for 반복문을 돌려 모든 데이터를 저장했지만
access_token만 저장하면 좋을듯하다.
```
- 이후의 요청에 localStorage.getItem('access_token')의 값을 헤더에 포함하여 요청을 하면 된다.
``` javascript
auth = "Bearer "+localStorage.getItem('access_token');
  addHeader = new Headers();
  addHeader.append("Authorization", auth);
  
  fetch("http://127.0.0.1:5000//Check_Token", {
    headers: addHeader,
  })
```
- flask server에서는 @jwt_required()를 통해서 헤더에 부여한 토큰값이 있는지 확인하여 실행을 할지 정한다.
``` python
@app.route('/Check_Token', methods = ['GET'])
@jwt_required()
def Check_Token():
    return "권한이 있습니다."
```