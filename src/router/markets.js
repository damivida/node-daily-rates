const express = require('express');
const router = new express.Router();

const poloniexApi = require('../utils/poloniex');
const binanceApi = require('../utils/binance');
const hitBtcApi = require('../utils/hitbtc');
const gateIoApi = require('../utils/gateio');
const bitfinexApi = require('../utils/bitfinex');
const krakenApi = require('../utils/kraken');
const coinBaseProApi = require('../utils/coinBasePro');

const averageFuncToFixed8 = require('../functions/averageFuncToFixed8');
const averageFuncToFixed2 = require('../functions/averageFuncToFixed2')
const averageFunc = require('../functions/averageFunc');



//GET POLONIEX API
router.get('/poloniex', (req, res) => {

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

        let vwap = averageFunc([high, low, close]);
        let average = averageFunc([high,low,close,open]);
        let link = `https://poloniex.com/exchange/${req.query.asset2}_${req.query.asset1}`;
        
        

        //console.log(average);
        //console.log(vwap);

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
            vwap,
            link
        });
    });
});


//GET BINANCE API
router.get('/binance', (req, res) => {

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
    
            let vwap = averageFunc([high, low, close]);
            let average = averageFunc([high,low,close,open]);
            let link = `https://www.binance.com/en/trade/${req.query.asset1}_${req.query.asset2}?layout=pro`;
    
            res.send({
                exchange: 'Binance',
                unixTime: req.query.time,
                pair: `${req.query.asset1}/${req.query.asset2}`,
                open: open.toFixed(8),
                high: high.toFixed(8),
                low: low.toFixed(8),
                close: close.toFixed(8),
                volume: volume.toFixed(8),
                average,
                vwap,
                link
            });
        })
    

});


//GET HITBTC API
router.get('/hitbtc', (req, res) => {

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
        let vwap = averageFunc([high, low, close]);
        let average = averageFunc([high,low,close,open]);
        let link = `https://hitbtc.com/${req.query.asset1}-to-${req.query.asset2}`;

        res.send({
            exchange: 'HitBtc',
            unixTime: req.query.time,
            pair: `${req.query.asset1}/${req.query.asset2}`,
            open: open.toFixed(10),
            high: high.toFixed(10),
            low: low.toFixed(10),
            close: close.toFixed(10),
            volume: volume.toFixed(10),
            average,
            vwap,
            link

        });
    });
});


//GET GATEIO API
router.get('/gateio', (req, res) => {
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
        let vwap = averageFunc([high, low, close]);
        let average = averageFunc([high,low,close,open]);
        let link = `https://www.gate.io/trade/${req.query.asset1}_${req.query.asset2}`;


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
            vwap,
            link
        });
    });
});


//GET BITFINEX API
router.get('/bitfinex', (req, res) => {
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

        //average calc
        let vwap = averageFunc([high, low, close]);
        let average = averageFunc([high,low,close,open]);
        let link = `https://www.bitfinex.com/t/${req.query.asset1}:${req.query.asset2}`


            res.send({
                exchange: 'Bitfinex',
                unixTime: req.query.time,
                pair: `${req.query.asset1}/${req.query.asset2}`,
                open: open.toFixed(8),
                high: high.toFixed(8),
                low: low.toFixed(8),
                close: close.toFixed(8), 
                volume: volume.toFixed(8),
                average,
                vwap,
                link
            });
      
    });
});


//GET KRAKEN API
router.get('/kraken', (req, res) => {
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

            let vwap = averageFunc([high, low, close]);
            let average = averageFunc([high,low,close,open]);
            let link = `https://trade.kraken.com/charts/KRAKEN:${req.query.asset1}-${req.query.asset2}`;

            res.send({
                exchange: 'Kraken',
                unixTime: req.query.time,
                pair:`${req.query.asset1}/${req.query.asset2}`,
                open: open.toFixed(8),
                high: high.toFixed(8),
                low: low.toFixed(8),
                close: close.toFixed(8),
                volume: volume.toFixed(8),
                average,
                vwap,
                link
            });
        })   
    })
});


//COINBASE PRO API
router.get('/coinbasepro', (req, res) => {
    if (!req.query.time || !req.query.asset1 || !req.query.asset2) {
        return res.send({
            error: 'Please provide correct time and asset'
        })
    }

    coinBaseProApi(req.query.time, req.query.asset1, req.query.asset2, (error, {open, high, low, close, volume } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }


        //average calc
        let vwap = averageFunc([high, low, close]);
        let average = averageFunc([high,low,close,open]);


        res.send({
            exchange: 'Gate.io',
            unixTime: req.query.time,
            pair: `${req.query.asset1}/${req.query.asset2}`,
            open: open.toFixed(2),
            high: high.toFixed(2),
            low: low.toFixed(2),
            close: close.toFixed(2),
            volume: volume.toFixed(8),
            average,
            vwap
        });
    });
});

//ALL MARKETS
router.get('/exchangeAverage', (req, res) => {
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
                        average:allExchangeAverageStr
                   })
                });
            });
        });
    });
});


module.exports = router;