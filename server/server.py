from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from feedgen.feed import FeedGenerator
from flask import make_response
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


@app.route('/graph')
def render_graph_page():
    return render_template('graph.html', ak=TOKEN2)


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
    print(len(all_articles))
    if request.args.get('q') == None:
        return render_template('news.html', all_articles=all_articles)
    return jsonify(all_articles)

# @app.route('/news')
# def render_news():
#     return render_template('news.html', all_articles=[])

@app.route('/login')
def render_login_signup():
    return render_template('login.html')

@app.route('/rss')
def render_rss_feed():
    fg = FeedGenerator()
    fg.title('Feed title')
    fg.description('Feed description')
    fg.link(href='http://127.0.0.1:5000/news')
    rssfeed  = fg.rss_str(pretty=True) # Get the RSS feed as string
    fg.rss_file('rss.xml') # Write the RSS feed to a file
    all_articles = newsapi.get_everything(
        q='bitcoin',
        sources='bbc-news,the-verge',
        domains='bbc.co.uk,techcrunch.com',
        from_param='2021-12-01',
        to='2020-12-12',
        language='en',
        sort_by='relevancy',
        page=1
    )
    return render_template('feed.html',rssfeed=rssfeed,all_articles = all_articles)

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


if __name__ == '__main__':
    app.debug = True
    app.run()
