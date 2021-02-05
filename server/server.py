from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin
from newsapi import NewsApiClient
import requests
import sys
import os
from dotenv import load_dotenv
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

load_dotenv()
TOKEN1 = os.getenv('API_KEY')
TOKEN2 = os.getenv('ALPHA_KEY')
newsapi = NewsApiClient(api_key=TOKEN1)


@app.route('/<ticker>')
def hello_world(ticker):

    data = requests.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' +
                        ticker+'&outputsize=compact&apikey=TOKEN2')
    data = data.json()
    response = []
    for something in data:
        if something == 'Meta Data':
            continue
        data = data[something]
    for a in data:
        temp = {'timestamp': a}
        for x in data[a]:
            temp[x[3:]] = data[a][x]
        response.append(temp)
    print('complete')
    return {'series': response}


@app.route('/graph')
def render_graph_page():
    return render_template('graph.html')


@app.route('/news')
def render_news_page():
    print(request.args.get('q'))
    if request.args.get('q') == None:
        query = 'finance'
    else:
        query = request.args.get('q')
    all_articles = newsapi.get_everything(
        q=query,
        sources='bbc-news,the-verge',
        domains='bbc.co.uk,techcrunch.com',
        from_param='2021-12-01',
        to='2020-12-12',
        language='en',
        sort_by='relevancy',
        page=1
    )
    return render_template('news.html', all_articles=all_articles)


if __name__ == '__main__':
    app.debug = True
    app.run()
