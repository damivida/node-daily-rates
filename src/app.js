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


//GET POLONIEX API
app.get('/poloniex', (req, res) => {

    if (!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    poloniexApi(req.query.time, req.query.asset, (error, {wta, high, low, close, open, volume } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        let average = (high + low + close + open) / 4;
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

    if (!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    binanceApi(req.query.time, req.query.asset, (error, { open, high, low, close, volume } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }


        //average calc    
        let average = (open + high + low + close) / 4;
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
            weightedAverage: 'Currently not in use for Binance'

        });
    })
});


//GET HITBTC API
app.get('/hitbtc', (req, res) => {

    if (!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    hitBtcApi(req.query.time, req.query.asset, (error, { open, high, low, close, volume } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        //average calc
        let average = (open + high + low + close) / 4;
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
            weightedAverage: 'Currently not in use for HitBtc'

        });
    });
});



//GET GATEIO API
app.get('/gateio', (req, res) => {
    if (!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    gateIoApi(req.query.time, req.query.asset, (error, {open, high, low, close, volume } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }


        //average calc
        let average = (open + high + low + close) / 4;
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



//ALL EXCHANGES
app.get('/exchangeAverage', (req, res) => {
    if (!req.query.time || !req.query.asset) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    //POLONIEX API
    poloniexApi(req.query.time, req.query.asset, (error, data) => {
        if (error) {
            return res.send({
                error: error
            });
        }

        let polHigh = data.high;
        let polLow = data.low;
        let polClose = data.close;
        let polOpen = data.open;

        //avg calc
        let polAvg = (polHigh + polLow + polClose + polOpen) / 4
        polAvg = polAvg.toFixed(8);
        polAvg = parseFloat(polAvg);

        //BINANCE API
        binanceApi(req.query.time, req.query.asset, (error, data) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            let binOpen = data.open;
            let binHigh = data.high;
            let binLow = data.low;
            let binClose = data.close;

            let binAvg = (binOpen + binHigh + binLow + binClose) / 4;
            binAvg = binAvg.toFixed(8);
            binAvg = parseFloat(binAvg);


            //HIT BTC API
            hitBtcApi(req.query.time, req.query.asset, (error, data) => {
                if (error) {
                    return res.send({
                        error
                    });
                }

                let hitOpen = data.open;
                let hitHigh = data.high;
                let hitLow = data.low;
                let hitClose = data.close;

                let hitAvg = (hitOpen + hitHigh + hitLow + hitClose) / 4;
                hitAvg = hitAvg.toFixed(8);
                hitAvg = parseFloat(hitAvg);


                //GATEIO API
                gateIoApi(req.query.time, req.query.asset, (error, data) => {
                    if (error) {
                        return res.send({
                            error
                        });
                    }

                    let gateOpen = data.open;
                    let gateHigh = data.high;
                    let gateLow = data.low;
                    let gateClose = data.close;

                    let gateAvg = (gateOpen + gateHigh + gateLow + gateClose) / 4;
                    gateAvg = gateAvg.toFixed(8);
                    gateAvg = parseFloat(gateAvg);


                    //ALL EXCHANGE AVERAGE
                    let allExchangeAverage = (polAvg + binAvg + hitAvg + gateAvg) / 4;
                    allExchangeAverage = binAvg.toFixed(8);
                    allExchangeAverage = parseFloat(allExchangeAverage);
                    

                    res.send({
                        polAvg,
                        binAvg,
                        hitAvg,
                        gateAvg,
                        allExchangeAverage
                   })
                });
            });
        });
    });
});


app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Damir'
    })
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port} .`)
});