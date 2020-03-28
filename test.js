
let date = new Date();
let n = date.getTimezoneOffset();
let hourOffSet = (n/60)*-1;

//console.log(hourOffSet)
//let offSetConve = dateOfSet *-1;

let timeRange = [0,0, ':', 0,0, ':', 0,0];

timeRange[1] = hourOffSet;
let adjustedTime = timeRange.join('');

console.log(adjustedTime);

let startDate = '2020-03-27';
//let startTime = '01:00:00';
const dateTime = startDate + ' ' + adjustedTime;

let unixTime = Date.parse(dateTime)

console.log(unixTime);




