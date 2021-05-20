const express = require('express');
const router = express.Router();
const NewsAPI = require('newsapi');
const axios = require('axios');

const dotenv = require('dotenv'); // load env file
dotenv.config();

const alpha1 = process.env.alpha1;
const alpha2 = process.env.alpha2;
const alpha3 = process.env.alpha3;
const newsKey = process.env.news_api_key;
//console.log(alpha1);

const newsapi = new NewsAPI(newsKey);


// Register
router.get('/news/:query', (req, res) => {
    newsapi.v2.everything({
        q: req.params.query,
        language: 'en',
        sortBy: 'relevancy',
        pageSize: 10,
        page: 1
    }).then(response => {
        result = { newsholder: response.articles }
        res.status(200).send(result);
        /*
          {
            status: "ok",
            articles: [...]
          }
        */
    });

})


router.get('/api/series/:ticker', (req, res) => {
    console.log('request recieved');
    axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.params.ticker}&apikey=${alpha1}`)
        .then(response => {
            result = [];
            for (var key in response.data) {
                if (key == 'Meta Data') {
                    continue;
                }

                for (var timestamp in response.data[key]) {
                    var temp = {
                        'timestamp': timestamp,
                        'open': response.data[key][timestamp]['1. open'],
                        'high': response.data[key][timestamp]['2. high'],
                        'low': response.data[key][timestamp]['3. low'],
                        'close': response.data[key][timestamp]['4. close']
                    }
                    result.push(temp);
                }
            }
            res.send({ 'series': result });
        })
        .catch(error => {
            console.log(error);
        })
})


router.get('/api/overview/:ticker', (req, res) => {
    console.log('request recieved');
    axios.all([
            axios.get('https://www.alphavantage.co/query?function=OVERVIEW&symbol=' + req.params.ticker + '&apikey=' + alpha2),
            axios.get('https://www.alphavantage.co/query?function=EARNINGS&symbol=' + req.params.ticker + '&apikey=' + alpha3)
        ])
        .then(axios.spread((response1, response2) => {
            // Both requests are now complete
            var mergedData = {
                "name": response1.data.Name,
                "description": response1.data.Description,
                "earnings": response2.data.annualEarnings,
                "exchange": response1.data.Exchange,
                "currency": response1.data.Currency,
                "sector": response1.data.Sector
            }
            res.send(mergedData);
        }))
        .catch(err => {
            console.log(err);
        })

})

module.exports = router;