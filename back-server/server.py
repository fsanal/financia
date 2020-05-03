from flask import Flask, request
from flask_cors import CORS
from database import (
    scan_headline,
    search_headlines_database,
    scan_events,
    get_headlines_for_event,
    get_impactful_events,
    get_events_min_volumes
)
from rake_nltk import Rake
from textblob import TextBlob

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
    event_id = request.args.get('event_id')
    data = get_headlines_for_event(event_id)
    headlines = []
    keywords = []

    for event in data:
        headlines.append(event['headline'])

    for headline in headlines:
        blob = TextBlob(headline)
        keywords.append(blob.noun_phrases)

    return {
        'data': keywords
    }


@app.route('/keyword_text')
def keyword_text():
    text = request.args.get('text')
    blob = TextBlob(text)

    return {
        'data': blob.noun_phrases
    }


@app.route('/impactful_events')
def impactful_events():
    threshold = request.args.get('threshold')
    data = get_impactful_events(threshold)

    return {
        'data': data
    }


@app.route('/min_volumes')
def min_volumes():
    data = get_events_min_volumes()

    return {
        'data': data
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0')
