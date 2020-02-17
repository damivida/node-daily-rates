let averageFuncToFixed8 = (num1,num2,num3,num4) => {
        
    let average = (num1+num2+num3+num4)/4;
    return average.toFixed(8);
    
}

module.exports = averageFuncToFixed8;