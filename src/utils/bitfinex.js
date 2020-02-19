const request = require('request');

const bitfinexApi = (time, asset1, asset2, callback) => {


    let url = `https://api-pub.bitfinex.com/v2/candles/trade:1D:t${asset1}${asset2}/hist?&start=${time}&sort=1`;
    //let url = `https://api-pub.bitfinex.com/v2/candles/trade:1D:tBTCUSD/hist?&start=1581120000000&sort=1`;


    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location sevices', undefined);
        }else if(body[error]) {
            callback('Unable to find rates', undefined);
            console.log(error)
        }else if (body.length === 0) {
            callback('Unable to find rates', undefined);
        }else {
            //console.log(body);
            callback(undefined, {
                open:parseFloat(body[0][1]),
                high:parseFloat(body[0][3]),
                low:parseFloat(body[0][4]),
                close:parseFloat(body[0][2]),
                volume:parseFloat(body[0][5])
            });
        }
    });


}

module.exports  = bitfinexApi;