
const getHours = (askedUnixTime) => {

const curDate = new Date();
let newDateOnly = curDate.toJSON().slice(0,10);

const starTime = '01:00:00';

const dateTime = newDateOnly + ' ' + starTime;

const unixDateTime = Date.parse(dateTime)

const timeInSec =  (unixDateTime - askedUnixTime)/1000;
const timeInMin = timeInSec/60
const timeInHour = timeInMin/60


if(timeInHour === -1) {
    timeInHour = 0;
}
return(timeInHour);

}


const hForgate = getHours(1580947200000);

console.log(hForgate);