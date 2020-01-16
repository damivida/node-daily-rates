//const axios = require ('axios');
const request =  require('request');

//BINANCE API(CALLBACK BASED)

const binanceApi = (time, asset, callback) => {

let url = `https://api.binance.com/api/v1/klines?symbol=${asset}BTC&interval=1d&startTime=${time}`;
//let url = `https://api.binance.com/api/v1/klines?symbol=XMRBTC&interval=1d&startTime=1578441600000`;

    request({url, json:true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        }else if (body.code) {
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

// BINANCE API AXIOS(PROMISE BASED)
/* const binanceApi = (time, asset) => {

   let url = `https://api.binance.com/api/v1/klines?symbol=${asset}BTC&interval=1d&startTime=${time}`;
    //let url = 'https://api.binance.com/api/v1/klines?symbol=XMRBTC&interval=1d&startTime=1578873600000';

    axios.get(url).then(response => {

     const binanceRates = {
           open: response.data[0][1],
           high: response.data[0][2],
           low: response.data[0][3],
           close: response.data[0][4],
           volume: response.data[0][5],
       }  

       //console.log(binaceRates);
       return binanceRates.open;
       
        
    }).catch(error => console.error);

    
}
 */
//binanceApi();

