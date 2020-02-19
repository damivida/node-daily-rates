const request = require('request');

const highLowClosePrice = (time, asset1, asset2, callback) => {

let correctedTime = (time/1000)-86400;

if(asset1 === 'BTC') {
    asset1 = 'XBT';
}

    

let url = `https://api.kraken.com/0/public/OHLC?pair=${asset1}${asset2}&interval=1440&since=${correctedTime}`;


request({url, json:true}, (error, {body}) => {

let data = body.result;
let dataKeys = [];

for(key in data) {

    dataKeys.push(key);
}

let pair = dataKeys[0];
console.log(pair)

    if(error) {
        callback('Unable to connect to location services!', undefined);

     } else if(body.error.length !== 0 ) {
            callback('Unable to find rates', undefined);
    }else if(data[pair][0][0] !== time/1000) {
        callback('Unable to find rates', undefined);
    }else {

        callback(undefined, {
            //open:parseFloat(body.result.XXBTZUSD[0][1]),
            high:parseFloat(data[pair][0][2]),
            low:parseFloat(data[pair][0][3]),
            close:parseFloat(data[pair][0][4]),
            volume:parseFloat(data[pair][0][6]),
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


    let data = body.result;
    let dataKeys = [];
    
    for(key in data) {
    
        dataKeys.push(key);
    }
    
    let pair = dataKeys[0];
    console.log(pair)

    
    if(error) {
        callback('Unable to connect to location services!', undefined)
    }else{

        callback(undefined, {
            open:parseFloat(data[pair][0][0])
        })
      }
   });

}


module.exports = {
    openPrice,
    highLowClosePrice
}