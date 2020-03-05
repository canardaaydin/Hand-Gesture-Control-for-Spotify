from flask import Flask, render_template
from flask_restful import Resource, Api, request
import pprint

app = Flask(__name__)
api = Api(app)

def extract_auth_code(str):
	arr = str.split('&')
	return arr[0]

class get_auth_code(Resource):
	def get(self):
		print(request.args.get('code'))
		return render_template('index.html')

api.add_resource(get_auth_code, '/')

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0')
