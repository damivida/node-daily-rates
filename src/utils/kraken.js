const request = require('request');

const highLowClosePrice = (time, asset1, asset2, callback) => {

let correctedTime = (time/1000)-86400;

if(asset1 === 'BTC') {
    asset1 = 'XBT';
}

    

let url = `https://api.kraken.com/0/public/OHLC?pair=${asset1}${asset2}&interval=1440&since=${correctedTime}`;


request({url, json:true}, (error, {body}) => {
    if(error) {
        callback('Unable to connect to location services!', undefined);

     } else if(body.error.length !== 0 ) {
            callback('Unable to find rates', undefined);
    }else if(!body.result.XXBTZUSD) {
        callback('Unable to find rates', undefined);
    }else if(body.result.XXBTZUSD[0][0] !== time/1000) {
        callback('Unable to find rates', undefined);
    }else {

        callback(undefined, {
            //open:parseFloat(body.result.XXBTZUSD[0][1]),
            high:parseFloat(body.result.XXBTZUSD[0][2]),
            low:parseFloat(body.result.XXBTZUSD[0][3]),
            close:parseFloat(body.result.XXBTZUSD[0][4]),
            volume:parseFloat(body.result.XXBTZUSD[0][6]),
        })
    }
});

}


const openPrice = (time, asset1, asset2, callback) => {
    let correctedTime = (time*1000000)

    if(asset1 === 'BTC') {
        asset1 ='XBT'
    }



let url = `https://api.kraken.com/0/public/Trades?pair=${asset1}${asset2}&since=${correctedTime}`;

request({url, json:true}, (error, {body}) => {
    if(error) {
        callback('Unable to connect to location services!', undefined)
    }else{

        callback(undefined, {
            open:parseFloat(body.result.XXBTZUSD[0][0])
        })
      }
   });

}


module.exports = {
    openPrice,
    highLowClosePrice
}