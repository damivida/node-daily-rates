let averageFuncToFixed8 = (num1,num2,num3,num4) => {

    //calc average
    let arr = [num1,num2,num3,num4];
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let avg = arr.reduce(reducer)/(arr.length);


/*    function roundTo(n, digits) {
    if (digits === undefined) {
        digits = 0;
    }

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    return Math.round(n) / multiplicator;
   } */

   function toFixed(number, decimals) {
    return (Number(number) + 1 / Math.pow(10, Number(decimals) + 1)).toFixed(decimals)
}


let avgRounded = toFixed(avg, 8);

console.log(avgRounded);
return avgRounded;


   /*  let average = (num1+num2+num3+num4)/4;
    return average.toFixed(8); */
    
}

module.exports = averageFuncToFixed8;