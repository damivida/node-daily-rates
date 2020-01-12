//conver UTC time unix time in millisecounds
const unixTime = (startDate) => {

    const starTime = '01:00:00';
    const dateTime = startDate + ' ' +starTime;

    const unixDateTime = Date.parse(dateTime)
    return unixDateTime;
}


module.exports = unixTime;