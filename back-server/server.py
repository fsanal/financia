from flask import Flask
from flask_cors import CORS
from database import scan_headline

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
	return 'Hello World!'

@app.route('/scan_headline')
def scan_headlines():
	items = scan_headline()
	data = []

	for item in items:
		id = item[0]
		headline = item[1]
		date = item[2]
		sentiment_score = float(item[3])
		data.append([id, headline, date, sentiment_score])

	return {
		'data': data
	}

if __name__ == '__main__':
	app.run(host='0.0.0.0')
