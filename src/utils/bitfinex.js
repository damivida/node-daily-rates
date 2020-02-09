const request = require('request');

const bitfinexApi = (time, asset1, asset2, callback) => {


    let url = `https://api-pub.bitfinex.com/v2/candles/trade:1D:t${asset1}${asset2}/hist?&start=${time}&sort=1`;
    //let url = `https://api-pub.bitfinex.com/v2/candles/trade:1D:tBTCUSD/hist?&start=1581120000000&sort=1`;


    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location sevices', undefined);
        }else if(body.error || body.length === 0) {
            callback('Unable to find rates', undefined);
        }else {

            callback(undefined, {
                open:body[0][1],
                high:body[0][3],
                low:body[0][4],
                close:body[0][2],
                volume:body[0][5]
            });
        }
    });


}

module.exports  = bitfinexApi;