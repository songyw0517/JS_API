from flask import *
from flask_cors import CORS
from flask_jwt_extended import * # jwt를 사용하기 위함

app = Flask(__name__)
app.config.update(
    DEBUG = True,
    JWT_SECRET_KEY = 'friday'
)
jwt = JWTManager(app)
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

@app.route('/form_POST', methods = ['POST'])
def form_POST():
    data = request.get_json()
    print("현재 받은 데이터 : ", data)
    print("id = ", data['ID'])
    print("데이터 타입 : ", type(data))
    return data

@app.route('/Simple_Login', methods = ['POST'])
def Simple_Login():
    admin_id = "Song"
    admin_pw = "1234"
    data = request.get_json()
    user_id = data['ID']
    user_pw = data['PW']
    if (user_id == admin_id and # 로그인
        user_pw == admin_pw):
        print("로그인 완료")
        return jsonify(
            result = "Success",
            access_token = create_access_token(identity = user_id,
                                            expires_delta = False)
            # "identity": 해당 토큰의 고유성을 식별하기 위한 정보 
            # (서버는 해당 토큰을 요청받은 후, 토큰 내에 있는 
            # 이 identity값을 통해 사용자를 식별하기 때문에 고유한 값이 필요하다. 
            # 단, 클라이언트 단에서 계속 유지되는 정보이기 때문에 
            # 비밀번호를 비롯한 중요 개인정보는 identity로 지정하는 것은 
            # 지양하길 바란다.)
            # 
            # "expires_delta": 해당 토큰의 만료일자 
            # (토큰이 유효하게 사용될 수 있는 만료기간을 설정할 수 있다. 
            # 필자의 경우, 실습을 위해 False를 입력하여 
            # 유효기간을 무기한으로 설정해주었다)
            # 
        )
    else:
        print("로그인 실패")
        return jsonify(
            result = "Invalid Params!"
        )
@app.route('/Check_Token', methods = ['GET'])
@jwt_required()
def Check_Token():
    return "권한이 있습니다."

    '''
    cur_user = get_jwt_identity()
    if cur_user is None:
        return "User Only!"
    else:
        return "Hi!," + cur_user
    '''
@app.route('/xmlRequest', methods = ['POST'])
def xmlRequest():
    data = request.get_json()
    print(data)
    return data
if __name__== '__main__':
    app.run(debug=True)

# 스페셜 네임을 위에 쓸 경우 : 그 파일을 바로 다이렉트로 실행할 때 사용
