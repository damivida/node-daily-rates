
const dailyRatesForm = document.querySelector('form');
const searchExchange = document.querySelector('#exchange');
const searchAsset = document.querySelector('#asset');
const searchTime = document.querySelector('#time');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');
const messageSix = document.querySelector('#message-6');
const messageSeven = document.querySelector('#message-7')
const messageEight = document.querySelector('#message-8')
const messageNine = document.querySelector('#message-9')
const messageTen = document.querySelector('#message-10')
const messageEleven = document.querySelector('#message-11')

dailyRatesForm.addEventListener('submit', (e) => {
    e.preventDefault();

   const exchange = searchExchange.value;
   const asset = searchAsset.value;
   const time = searchTime.value;



//convert UTC time in unix time in millisecounds
const unixTime = (startDate) => {

    const starTime = '01:00:00';
    const dateTime = startDate + ' ' +starTime;

    const unixDateTime = Date.parse(dateTime)
    return unixDateTime;
}
  const startDate = unixTime(time);

  messageOne.textContent = "Getting data...";

    
  //fetch the api from client side
   fetch(`/${exchange}?time=${startDate}&asset=${asset}`).then((response)=> {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error);
            messageOne.textContent = data.error;

        }else {
            console.log(exchange)
            console.log(data.unixTime);
            console.log(`Date: ${time}`);
            console.log(data.pair);
            console.log(data.weightedAverage);

            messageOne.textContent = `Exchange: ${data.exchange}`;
            messageTwo.textContent = `Unix Time ${data.unixTime}`;
            messageThree.textContent = `Date: ${time}`;
            messageFour.textContent = `Altcoin: ${data.pair}`;
            messageFive.textContent = `Open: ${data.open}`;
            messageSix.textContent = `High: ${data.high}`;
            messageSeven.textContent = `Low: ${data.low}`;
            messageEight.textContent = `Close: ${data.close}`;
            messageNine.textContent = `Volume: ${data.volume}`;
            messageTen.textContent = `Average: ${data.average}`;
            messageEleven.textContent = `Weighted Average: ${data.weightedAverage}`;
        }
     })
  });


});

