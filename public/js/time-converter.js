//conver UTC time unix time in millisecounds
/* const unixTime = (startDate) => {

    const starTime = '01:00:00';
    const dateTime = startDate + ' ' +starTime;

    const unixDateTime = Date.parse(dateTime)
    return unixDateTime;
}


module.exports = unixTime; */



const unixTime = (startDate) => {

/*     //geting UTC time offset
    let date = new Date();
    let n = date.getTimezoneOffset();
    let hourOffSet = (n/60)*-1;

    //adjusting time
    let timeRange = [0,0, ':', 0,0, ':', 0,0];
    timeRange[1] = hourOffSet;
    let adjustedTime = timeRange.join('');

    //const starTime = '01:00:00';
    const dateTime = startDate + ' ' + adjustedTime;

    const unixDateTime = Date.parse(dateTime)
    
    return unixDateTime; */


   const customDate =  Date(startDate);
   const currDate = new Date();
   const offset = currDate.getTimezoneOffset();
   let hourOffSet = (offset/60)*-1;



   //setig offest to 2 on dates before time change on 25.10
   const inputUnixTime  = Date.parse(startDate);

   if(inputUnixTime <= 1603584000000) {
      hourOffSet += 1;
   }


   //adjusting time
   let timeRange = [0,0, ':', 0,0, ':', 0,0];
   timeRange[1] = hourOffSet;
   let adjustedTime = timeRange.join('');
 
   const dateTime = startDate + ' ' + adjustedTime;
 

   const unixDateTime = Date.parse(dateTime)

   console.log(customDate);
   console.log(currDate);
   console.log(offset);
   console.log(hourOffSet);
   console.log(adjustedTime);
   console.log(dateTime);
   console.log(inputUnixTime);
   console.log(unixDateTime);

   
   return unixDateTime;

}
    
unixTime('2020-10-25');