const request = require('request');


const krakenApiOpen = (time, asset1, asset2, callback) => {
    let correctedTime = (time*1000000)

    if(asset1 === 'BTC') {
        asset1 ='XBT'
    }



let url = `https://api.kraken.com/0/public/Trades?pair=${asset2}${asset2}&since=${correctedTime}`;

request({url, json:true}, (error, {body}) => {
    if(error) {
        callback('Unable to connect to location services!', undefined)
    }else if(body.error.length !== 0) {
        callback('Unable to find rates', undefined);
    }else if(!body.result.XXBTZUSD) {
        callback('Unable to find rates', undefined);
    }else {

        callback(undefined, {
            open:body.result.XXBTZUSD[0][0];
        })
    }

    });

}