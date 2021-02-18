from flask import Flask, request, render_template, url_for
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# index.html의 경우 허용되지 않은 사이트 임
# 모든 접근을 허용하기 위해서 CORS를 사용함

@app.route('/', methods = ['GET'])
def waitGetRequest():
    data = {"name":"Song", "age":25}
    return data

@app.route('/POST', methods = ['POST'])
def waitPOSTRequest():
    data = request.get_data()
    print("receive data = ", data)
    return data

@app.route('/index')
def testIndex():
    return "test"

if __name__== '__main__':
    app.run(debug=True)

# 스페셜 네임을 위에 쓸 경우 : 그 파일을 바로 다이렉트로 실행할 때 사용
