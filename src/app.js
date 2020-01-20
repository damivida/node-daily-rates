const path = require('path');
const express = require('express');
const hbs = require('hbs');

const poloniexApi = require('./utils/poloniex');
const binanceApi = require('./utils/binance');
const hitBtcApi = require('./utils/hitbtc');
const gateIoApi = require('./utils/gateio');



const app = express();
const port = process.env.PORT || 8000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handelebars for views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Daily rates',
        name: 'Damir'
    });
});



app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About daily rates',
        name: 'Damir'
    })
});


app.get('/sudo', (req, res) => {

    res.send({
        DOGE_BTC:0.0000003,
        XMR_BTC:0.0005,
        someTestCode: 055

    });
});


app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help page',
        name: 'Damir'
    })
});

app.get('/test', (req, res) => {

    res.send(`You provided ${req.query.address} as the address and ${req.query.city} as a city`);
});

//GET POLONIEX API
app.get('/poloniex', (req, res) => {

    if(!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    poloniexApi(req.query.time, req.query.asset, (error, {wta,high,low,close,open,volume} = {}) => {
        if(error) {
            return res.send({
                error:error
            });
        }

let average = (high+low+close+open)/4;
average = parseFloat(average).toFixed(8);

console.log(average);

            res.send({
                exchange: 'Poloniex',
                unixTime: req.query.time,
                pair: req.query.asset,
                open,
                high,
                low,
                close,
                volume,
                average,
                weightedAverage: wta

            });
        
    });

});



//GET BINANCE API
app.get('/binance', (req, res) => {

    if(!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    binanceApi(req.query.time, req.query.asset, (error, {open, high, low, close, volume} = {}) => {
        if(error) {
            return res.send({
                error:error
            });
        }


    //average calc    
    let average = (open+high+low+close)/4;
    average = average.toFixed(8);
    average = parseFloat(average);

        res.send({
            exchange: 'Binance',
            unixTime: req.query.time,
            pair: req.query.asset,
            open,
            high, 
            low,
            close,
            volume,
            average,
            weightedAverage:'Currently not in use for Binance'

        });

    }) 


});


//GET HITBTC API

app.get('/hitbtc', (req, res) => {

    if(!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    hitBtcApi(req.query.time, req.query.asset, (error, {open, high, low, close, volume} = {}) => {
        if(error) {
            return res.send({
                error
            });
        }

    //average calc
    let average = (open+high+low+close)/4;
    average = average.toFixed(8);
    average = parseFloat(average);

        res.send({
            exchange: 'HitBtc',
            unixTime: req.query.time,
            pair: req.query.asset,
            open,
            high,
            low,
            close,
            volume,
            average,
            weightedAverage:'Currently not in use for HitBtc'

        });

    });
});



//GET GATEIO API
app.get('/gateio', (req, res) => {
    if(!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    gateIoApi(req.query.time, req.query.asset, (error, {open, high, low, close, volume} = {}) => {
        if(error) {
            return res.send({
                error
            });
        } 

        
    //average calc
    let average = (open+high+low+close)/4;
    average = average.toFixed(8);
    average = parseFloat(average);

    res.send({
        exchange: 'Gate.io',
        unixTime: req.query.time,
        pair: req.query.asset,
        open,
        high,
        low,
        close,
        volume,
        average,
        weightedAverage: 'Currently not in use for Gate.io'
    });



    });

});



/* app.get('/dailyRates', (req, res) => {

    if(!req.query.time || !req.query.asset || !req.query.exchange) {
        return res.send({
            error: 'Please provide correct data (check Exchange, asset or time input)'
        });
    }

    if(req.query.exchange === 'poloniex') {

        poloniexApi(req.query.time, req.query.asset, (error, {wta} = {}) => {
            if(error) {
                return res.send({
                    error:error
                });
            }
                res.send({
                unixTime: `Unix time: ${req.query.time}`,
                pair: `Pair: ${req.query.asset}_BTC`,
                weightedAverage: `Weighted Average: ${wta}`
                });
            
        });
        
    } else {
        return res.send({
            error: 'Please provide a valid exchange'
        })
    }


});
 */

app.get('*', (req, res) => {

    res.render('404', {
        title:'404',
        errorMessage: 'Page not found',
        name: 'Damir'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port} .`)
});