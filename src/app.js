const path = require('path');
const express = require('express');
const hbs = require('hbs');

const poloniexApi = require('./utils/poloniex');
const binanceApi = require('./utils/binance');
const hitBtcApi = require('./utils/hitbtc');
const gateIoApi = require('./utils/gateio');
const bitfinexApi = require('./utils/bitfinex');
const krakenApi = require('./utils/kraken');
const averageFuncToFixed8 = require('./functions/averageFuncToFixed8')
const averageFuncToFixed2 = require('./functions/averageFuncToFixed2')



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

    if (!req.query.time || !req.query.asset1 || !req.query.asset2) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    poloniexApi(req.query.time, req.query.asset1, req.query.asset2, (error, {wta, high, low, close, open, volume } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }

      /*   let average = (high + low + close + open) / 4;
        average = parseFloat(average).toFixed(8);

        console.log(average); */


        let average = averageFuncToFixed8(high,low,close,open)

        res.send({
            exchange: 'Poloniex',
            unixTime: req.query.time,
            pair: `${req.query.asset1}/${req.query.asset2}`,
            open: open.toFixed(8),
            high: high.toFixed(8),
            low: low.toFixed(8),
            close: close.toFixed(8),
            volume: volume.toFixed(8),
            average,
            weightedAverage: wta.toFixed(8)
        });
    });
});


//GET BINANCE API
app.get('/binance', (req, res) => {

    if (!req.query.time || !req.query.asset1 || !req.query.asset2) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    binanceApi(req.query.time, req.query.asset1, req.query.asset2, (error, { open, high, low, close, volume } = {}) => {
        if (error) {
            return res.send({
                error: error
            });
        }


        //average calc    
        /* let average = (open + high + low + close) / 4;
        average = average.toFixed(8);
        average = parseFloat(average); */

        let average = averageFuncToFixed8(high,low,close,open)

        res.send({
            exchange: 'Binance',
            unixTime: req.query.time,
            pair: `${req.query.asset1}/${req.query.asset2}`,
            open: open.toFixed(8),
            high: high.toFixed(8),
            low: low.toFixed(8),
            close: close.toFixed(8),
            volume: volume.toFixed(8),
            average
        });
    })
});


//GET HITBTC API
app.get('/hitbtc', (req, res) => {

    if (!req.query.time || !req.query.asset1 || !req.query.asset2) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    hitBtcApi(req.query.time, req.query.asset1, req.query.asset2, (error, { open, high, low, close, volume } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        //average calc
        let average = averageFuncToFixed8(high,low,close,open)

        res.send({
            exchange: 'HitBtc',
            unixTime: req.query.time,
            pair: `${req.query.asset1}/${req.query.asset2}`,
            open: open.toFixed(10),
            high: high.toFixed(10),
            low: low.toFixed(10),
            close: close.toFixed(10),
            volume: volume.toFixed(10),
            average

        });
    });
});



//GET GATEIO API
app.get('/gateio', (req, res) => {
    if (!req.query.time || !req.query.asset1 || !req.query.asset2) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    gateIoApi(req.query.time, req.query.asset1, req.query.asset2, (error, {open, high, low, close, volume } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }


        //average calc
        let average = averageFuncToFixed8(high,low,close,open)


        res.send({
            exchange: 'Gate.io',
            unixTime: req.query.time,
            pair: `${req.query.asset1}/${req.query.asset2}`,
            open: open.toFixed(8),
            high: high.toFixed(8),
            low: low.toFixed(8),
            close: close.toFixed(8),
            volume: volume.toFixed(10),
            average,
        });
    });
});



//GET BITFINEX API
app.get('/bitfinex', (req, res) => {
    if(!req.query.time || !req.query.asset1 || !req.query.asset2 ) {
        return res.send({
            error: 'Please provide correst time and asset'
        })
    }

    bitfinexApi(req.query.time, req.query.asset1, req.query.asset2, (error, {open, high, low, close, volume} = {}) => {

        if (error) {
            return res.send({
                error
            });
        }

      

        if(req.query.asset1 === 'BTC') {

        //average calc
        let average = averageFuncToFixed2(high,low,close,open)


            res.send({
                exchange: 'Bitfinex',
                unixTime: req.query.time,
                pair: `${req.query.asset1}/${req.query.asset2}`,
                open: open.toFixed(2),
                high: high.toFixed(2),
                low: low.toFixed(2),
                close: close.toFixed(2), 
                volume: volume.toFixed(8),
                average 
            });

        }else {

            let average = averageFuncToFixed8(high,low,close,open)


            res.send({
                exchange: 'Bitfinex',
                unixTime: req.query.time,
                pair: `${req.query.asset1}/${req.query.asset2}`,
                open: open.toFixed(8),
                high: high.toFixed(8),
                low: low.toFixed(8),
                close: close.toFixed(8), 
                volume: volume.toFixed(8),
                average 
            });

        }
       
    });
});


//GET KRAKEN API
app.get('/kraken', (req, res) => {
    if(!req.query.time || !req.query.asset1 || !req.query.asset2) {
        return res.send({
            error: 'Please provide correst time and asset'
        });
    }

    krakenApi.highLowClosePrice(req.query.time, req.query.asset1, req.query.asset2, (error, { high, low, close, volume} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }

        krakenApi.openPrice(req.query.time, req.query.asset1, req.query.asset2, (error, {open} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            }

            let average = averageFuncToFixed2(high,low,close,open)

            res.send({
                exchange: 'Kraken',
                unixTime: req.query.time,
                pair:`${req.query.asset1}/${req.query.asset2}`,
                open: open.toFixed(2),
                high: high.toFixed(2),
                low: low.toFixed(2),
                close: close.toFixed(2),
                volume: volume.toFixed(10),
                average,
                weightedAverage: 'Currently not in use for Kraken'
            });
        })  
       
    })
});



//ALL EXCHANGES
app.get('/exchangeAverage', (req, res) => {
    if (!req.query.time || !req.query.asset1 || !req.query.asset2) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    //POLONIEX API
    poloniexApi(req.query.time, req.query.asset1, req.query.asset2, (error, data) => {
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
        let polAvgStr = polAvg.toFixed(8);
        

        //BINANCE API
        binanceApi(req.query.time, req.query.asset1, req.query.asset2, (error, data) => {
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
            let binAvgStr = binAvg.toFixed(8);
          


            //HIT BTC API
            hitBtcApi(req.query.time, req.query.asset1, req.query.asset2, (error, data) => {
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
                let hitAvgStr = hitAvg.toFixed(8);
                


                //GATEIO API
                gateIoApi(req.query.time, req.query.asset1, req.query.asset2, (error, data) => {
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
                    let gateAvgStr = gateAvg.toFixed(8);
                   

                    //ALL EXCHANGE AVERAGE
                    let allExchangeAverage = (polAvg + binAvg + hitAvg + gateAvg) / 4;
                    let allExchangeAverageStr = allExchangeAverage.toFixed(8);
                    
                    res.send({
                        unixTime: req.query.time,
                        pair: `${req.query.asset1}/${req.query.asset2}`,
                        polAvg:polAvgStr,
                        binAvg:binAvgStr,
                        hitAvg:hitAvgStr,
                        gateAvg:gateAvgStr,
                        allMarketsAvg:allExchangeAverageStr
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