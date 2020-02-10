//const axios = require ('axios');
const request =  require('request');

//BINANCE API(CALLBACK BASED)

const binanceApi = (time, asset1, asset2, callback) => {

let url = `https://api.binance.com/api/v1/klines?symbol=${asset1}${asset2}&interval=1d&startTime=${time}`;
//let url = `https://api.binance.com/api/v1/klines?symbol=XMRBTC&interval=1d&startTime=1578441600000`;

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        }else if (body.code || body.length === 0) {
            callback('Unable to find rates', undefined);
        }else {

           
            callback(undefined, {
                open: parseFloat(body[0][1]),
                high:parseFloat(body[0][2]),
                low:parseFloat(body[0][3]),
                close:parseFloat(body[0][4]),
                volume:parseFloat(body[0][5])
            })
        }
    }); 
}

module.exports = binanceApi;



