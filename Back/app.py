import json
from flask import Flask,request
from flask_cors import CORS
from cryptography.fernet import Fernet

app = Flask(__name__)
CORS(app)


key = b'iULF7CgWBtlgAtAZKVsQ9xeK2HUfdMnCFyovQ2FMgYw='
fernet = Fernet(key)
print(key)

message = "hello geeks"
encMessage = fernet.encrypt(message.encode())
print("original string: ", message)
print("encrypted string: ", encMessage)
decMessage = fernet.decrypt(encMessage).decode() 
print("decrypted string: ", decMessage)

@app.route('/login',methods=['POST'])
def checkCredentials():
    f = open('db.json','rt')
    data = json.load(f)
    f.close()
    crededntials = request.get_json()
    for user in data['users']:
        token = user["password"]
        print(token)
        dec = fernet.decrypt(token).decode(encoding="utf-8")
        print(dec)
        if crededntials["userName"] == user["userName"] and crededntials["password"] == dec:
            res =  '200'
            break
        else:
            res = '401'
    print(res)
    return res

@app.route('/signup',methods=["POST"])
def addUser():
    f = open('db.json','rt')
    if (len(f.readline()) > 0):
        data = json.load(f)
    else:
        data = {"users":[]}
    f.close()
    credentials = request.get_json()
    if credentials in data['users']:
        res = '401'
    else:
        data['users'].append({"userName":credentials["userName"],"password":str(fernet.encrypt(credentials["password"].encode()),'utf-8')})
        res = '200'
    f = open('db.json','wt')
    print(data)
    f.write(f'{json.dumps(data)}')
    f.close()
    return res
    
if __name__ == '__main__':
    app.run(debug=True)
