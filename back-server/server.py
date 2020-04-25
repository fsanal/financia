from flask import Flask, request
from flask_cors import CORS
from database import scan_headline, search_headlines_database, scan_events, get_headlines_for_event
from rake_nltk import Rake

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

@app.route('/keywords')
def keywords():
	r = Rake()
	event_id = request.args.get('event_id')
	data = get_headlines_for_event(event_id)
	headlines = []
	keywords = []

	for event in data:
		headlines.append(event['headline'])

	for headline in headlines:
		r.extract_keywords_from_text(headline)
		keywords.append(r.get_ranked_phrases()[0])

	return {
		'data': keywords
	}

if __name__ == '__main__':
	app.run(host='0.0.0.0')
