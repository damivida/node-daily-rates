const request = require('request');

const coinBaseProApi = (time, asset1, asset2, callback) => {

    let isoStart = new Date(parseFloat(time)).toISOString();
    let isoEnd = new Date().toISOString();
    
    
    console.log(isoStart);
    console.log(isoEnd);

    //console.log(typeof(parseFloat(time)));

    let url = `https://api.pro.coinbase.com/products/${asset1}-${asset2}/candles?start=${isoStart}&end=${isoEnd}&granularity=86400`

        request({url, json:true}, (error, {body}) => {
            if(error) {
                callback('Unable to connect to location services', undefined);
            }else if(body.message) {
                console.log(body)
                callback('Unable to find rates', undefined)
            }else {
                console.log(body[body.length-1][3]);
                callback(undefined, {
                    open:body[body.length-1][3],
                    high:body[body.length-1][2],
                    low:body[body.length-1][1],
                    close:body[body.length-1][4],
                    volume:body[body.length-1][5]
                });
            }
        });
    
}


module.exports = coinBaseProApi;




