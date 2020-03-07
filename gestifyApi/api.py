from flask import Flask, render_template, make_response
from flask_restful import Resource, Api, request
import pprint
import requests
import base64
import spotipy
import spotipy.util as util
import json

app = Flask(__name__)
api = Api(app)

client_id = "d81ae7685f0240df9fc3e88c7698bc53"
secret_id = "439c9f6110554b16b95ae8add377da8a"
redirect_uri = "http://barda.life"
endpoint = "https://accounts.spotify.com/api/token"
auth_code = ""


def extract_auth_code(str):
	arr = str.split('&')
	return arr[0]

def getPersonalInfo(token):

	headers = {
			"Accept": "application/json",
			"Content-Type" : "application/json",
			'Authorization': 'Bearer {0}'.format(token)
		}
	
	r = requests.get("https://api.spotify.com/v1/me", headers=headers)

	response_data = json.loads(r.text)
	return response_data
	





class get_auth_code(Resource):
	def get(self):
		w = client_id + ":" + secret_id

		auth_code = request.args.get('code')
		
		auth_str = bytes('{}:{}'.format(client_id, secret_id), 'utf-8')
		b64_auth_str = base64.b64encode(auth_str).decode('utf-8')

		headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic {}'.format(b64_auth_str)
		}

		code_payload = {
			'grant_type': 'authorization_code',
			'code': str(auth_code),
			'redirect_uri': redirect_uri,
		}

		post_request = requests.post('https://accounts.spotify.com/api/token', data=code_payload, headers=headers)

		response_data = json.loads(post_request.text)

		#print(response_data)

		access_token = response_data.get('access_token')
		refresh_token = response_data.get('refresh_token')

		personal_data = getPersonalInfo(access_token)
		user_full_name = personal_data.get('display_name')
		name = user_full_name.split()[0]
		#print(name)


		headers = {'Content-Type': 'text/html'}

		return make_response(render_template('index.html', name=name), 200,headers)


api.add_resource(get_auth_code, '/')

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')
