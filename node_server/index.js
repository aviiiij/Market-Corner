const express = require('express')
var errorHandler = require('errorhandler')
const axios = require('axios')
const https = require('https')
const { appendFile } = require('fs')
var cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express()
const port = 3000

const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser());
app.use(cors());

const alpha1 = process.env.alpha1;
const alpha2 = process.env.alpha2;
const alpha3 = process.env.alpha3;


app.get('/news', (req, res) => {
    if (req.cookies['stock_code']) {
        console.log(req.cookies['stock_code']);
        res.send('Too many cookies are bad for health');
    } else {
        res.cookie('stock_code', 'AMZN').send('Here have a cookie');
    }

})


app.get('/api/series/:ticker', (req, res) => {
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


app.get('/api/overview/:ticker', (req, res) => {
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

app.get('*', function(req, res) {
    res.send('404 error handled', 404);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

app.use(errorHandler({ dumpExceptions: true, showStack: true }));