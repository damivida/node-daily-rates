const request = require('request');
//const axios = require('axios');

// CALLBACK FUNCTION (POLONIEX API)
const poloniexApi = (time, asset1, asset2, callback) => {


    let timeInSec = time / 1000
    let url = `https://poloniex.com/public?command=returnChartData&currencyPair=${asset2}_${asset1}&start=${timeInSec}&period=86400`;
    //let url = `https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=${timeInSec}&period=86400`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find rates', undefined);
        } else {

            callback(undefined, {
                wta: body[0].weightedAverage,
                open: body[0].open,
                high: body[0].high,
                low: body[0].low,
                close: body[0].close,
                volume: body[0].volume
                //asset:`${asset}/BTC - ${wta}`
            })
        }
    });


}


/* console.log(poloniexApi(1577318400000, 'XMR', (error, data) => {
    console.log('Error', error)
    console.log('Data', data)
})); */


module.exports = poloniexApi;










//-----------------------------------------------------------







