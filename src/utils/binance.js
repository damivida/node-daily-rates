const axios = require ('axios');

const binanceApi = (time, asset) => {

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

//binanceApi();

module.exports = binanceApi;