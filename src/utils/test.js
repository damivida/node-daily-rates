let testFunction = () => {

   let obj = {};
    let array = ['btc', 'xmr', 'doge'];

   for(let i = 0; i < array.length; i++) {
       obj[i] = array[i];
   }
    console.log(obj);
}


testFunction();
