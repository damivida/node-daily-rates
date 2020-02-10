const request =  require('request');

const gateIoApi = (time, asset1, asset2, callback) => {


    const getHours = (askedUnixTime) => {

        const curDate = new Date();
        let newDateOnly = curDate.toJSON().slice(0,10);
        
        const starTime = '00:00:00';
        
        const dateTime = newDateOnly + ' ' + starTime;
        
        const unixDateTime = Date.parse(dateTime)
        
        const timeInSec =  (unixDateTime - askedUnixTime)/1000;
        const timeInMin = timeInSec/60
        let timeInHour = timeInMin/60
        
        if(timeInHour === -1) {
            timeInHour = 0;
        }

        return(timeInHour);
        
        }
        
        
        const rangeHour = getHours(time);

    let url = `https://data.gateio.life/api2/1/candlestick2/${asset1}_${asset2}?group_sec=86400&range_hour=${rangeHour}`;
 

        request({url, json:true}, (error, {body}) => {
            if(error) {
                callback('Unable to connect to location services!', undefined);
            }else if (body.code || body.length === 0 || body.data.length === 0) {
                callback('Unable to find rates', undefined);
            }else {

                callback(undefined, {
                    open:parseFloat(body.data[0][5]),
                    high:parseFloat(body.data[0][3]),
                    low:parseFloat(body.data[0][4]),
                    close:parseFloat(body.data[0][2]),
                    volume:parseFloat(body.data[0][1])
                })
            }
        });
}

module.exports = gateIoApi;