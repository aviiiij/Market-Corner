from flask import Flask,render_template,request,flash
from flask_cors import CORS, cross_origin
from newsapi import NewsApiClient
import requests,random,string
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

newsapi = NewsApiClient(api_key='6d00c7e55c784d84b0f24f28defb09a6')
N=20
randomkey=''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(N))
app.secret_key = randomkey
all_articles = lambda x:(newsapi.get_everything(
    q=x,
    sources='bbc-news,the-verge',
    domains='bbc.co.uk,techcrunch.com',
    from_param='2021-12-01',
    to='2020-12-12',
    language='en',
    sort_by='relevancy',
    page=1
))
@app.route('/<ticker>')
def hello_world(ticker):
    data = requests.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+ticker+'&outputsize=compact&apikey=DLNKMATBLTI7J8SR')
    data = data.json()
    response=[]
    for something in data:
        if something=='Meta Data':
            continue
        data=data[something]
    for a in data:
        temp={'timestamp':a}
        for x in data[a]:
            temp[x[3:]]=data[a][x]
        response.append(temp)
    print('complete')
    return {'series':response}

@app.route('/news/<search_term>')
def search(search_term):
    temp=all_articles(search_term)['articles']
    if not temp:
        return {'all_articles':all_articles('finance')['articles']}
    return {'all_articles':temp}

@app.route('/graph')
def render_graph_page():
    return render_template('graph.html')

@app.route('/news')
def render_news_page():
    return render_template('news.html')

if __name__ == '__main__':
    app.debug=True
    app.run()