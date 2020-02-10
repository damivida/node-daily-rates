const request =  require('request');

//CALLBACK FUNCTION (HITBTC API)

const hitBtcApi = (time, asset1, asset2, callback) => {


    let url = `https://api.hitbtc.com/api/2/public/candles/${asset1}${asset2}?from=${time}&period=D1`;

    //let url = `https://api.hitbtc.com/api/2/public/candles/ETNBTC?from=1579046400000&period=D1`;


    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        }else if(body.error || body.length === 0) {
            callback('Unable to find rates', undefined);
        }else {
           
            callback(undefined, {
                open: parseFloat(body[0].open),
                high: parseFloat(body[0].max),
                low: parseFloat(body[0].min),
                close: parseFloat(body[0].close),
                volume: parseFloat(body[0].volumeQuote)

            })
        }
    });


}



module.exports = hitBtcApi;