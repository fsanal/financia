from flask import Flask, request
from flask_cors import CORS
from database import scan_headline, search_headlines_database, scan_events, get_headlines_for_event

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
	return 'Hello World!'

@app.route('/search_headlines', methods=["POST"])
def search_headlines():
	body = request.get_json()
	searchQuery = body['searchQuery']
	startdate = None
	enddate = None
	if 'startdate' in body:
		startdate = body['startdate']
	if 'enddate' in body:
		enddate = body['enddate']
	data = search_headlines_database(searchQuery, startdate, enddate)
	print('withinServer', data)
	for item in data:
		item['sentiment_score'] = float(item['sentiment_score'])
	return {
		'data': data
	}

@app.route('/scan_headline', methods=["POST"])
def scan_headlines():
	
	data = scan_headline()

	for item in data:
		item['sentiment_score'] = float(item['sentiment_score'])
	
	return {
		'data': data
	}

@app.route('/scan_event')
def scan_event():
	data = scan_events()

	return {
		'data': data
	}

@app.route('/event_headlines')
def event_headlines():
	event_id = request.args.get('event_id')
	data = get_headlines_for_event(event_id)

	for item in data:
		item['sentiment_score'] = float(item['sentiment_score'])

	return {
		'data': data
	}

if __name__ == '__main__':
	app.run(host='0.0.0.0')
