
const dailyRatesForm = document.querySelector('form');
const searchExchange = document.querySelector('#exchange');
const searchAsset = document.querySelector('#asset');
const searchAsset2 = document.querySelector('#asset2');
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
const messageTwelve = document.querySelector('#message-12')
const message13 = document.querySelector('#message-13')


let exchangesAvailable = document.querySelector('#exchangesToSellect');

dailyRatesForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const exchange = searchExchange.value;
    const asset = searchAsset.value;
    const asset2 = searchAsset2.value;
    const time = searchTime.value;

    if (exchange === 'poloniex') {
        let assetsOnPoloniex = document.querySelector('#assetsToCollect');
        assetsOnPoloniex.textContent = 'Daily rates to collect: DOGE_BTC, DASH_BTC, ETH_BTC, REP_BTC, LTC_BTC, XMR_BTC, ZEC_BTC, ETC_BTC, BTC_USDT.';
        exchangesAvailable.textContent = '';

    } else if (exchange === 'binance') {
        let assetsOnBinance = document.querySelector('#assetsToCollect');
        assetsOnBinance.textContent = 'Daily rates to collect: BTG_BTC, EOS_BTC, BTC_USDT, BTC_EUR';
        exchangesAvailable.textContent = '';

    } else if (exchange === 'hitbtc') {
        let assetsOnHitBtc = document.querySelector('#assetsToCollect');
        assetsOnHitBtc.textContent = 'Daily rates to collect: ETN_BTC, XMC_BTC, DGB_BTC';
        exchangesAvailable.textContent = '';

    } else if (exchange === 'gateio') {
        let assetsOnGateIo = document.querySelector('#assetsToCollect');
        assetsOnGateIo.textContent = 'Daily rates to collect: BEAM_BTC';
        exchangesAvailable.textContent = '';

    } else if (exchange === 'bitfinex') {
        let assetsOnBitfinex = document.querySelector('#assetsToCollect');
        assetsOnBitfinex.textContent = 'Daily rates to collect: BTC_USD, BTC_EUR';
        exchangesAvailable.textContent = '';

    } else if (exchange === 'kraken') {
        let assetsOnKraken = document.querySelector('#assetsToCollect');
        assetsOnKraken.textContent = 'Daily rates to collect: BTC_USD, BTC_EUR';
        exchangesAvailable.textContent = '';
    } else if (exchange === 'exchangeAverage') {
        let assetsAllEx = document.querySelector('#assetsToCollect');
        assetsAllEx.textContent = 'Pairs available: DOGE_BTC, DASH_BTC, ETH_BTC, LTC_BTC, XMR_BTC, ZEC_BTC, ETC_BTC, EOS_BTC';
        exchangesAvailable.textContent = 'Markets available: Poloniex, Binance, HitBtc, Gate.io';
    }


    //convert UTC time in unix time in millisecounds
    const unixTime = (startDate) => {

        //geting UTC time offset
        let date = new Date();
        let n = date.getTimezoneOffset();
        let hourOffSet = (n/60)*-1;

    //settig offest to 2 on dates before time change on 25.10 
   // temp solution this has to be corrected in the future
   const inputUnixTime  = Date.parse(startDate);

   if(inputUnixTime <= 1603584000000) {
      hourOffSet += 1;
   }

        //adjusting time
        let timeRange = [0,0, ':', 0,0, ':', 0,0];
        timeRange[1] = hourOffSet;
        let adjustedTime = timeRange.join('');

        //const starTime = '01:00:00';
        const dateTime = startDate + ' ' + adjustedTime;

        const unixDateTime = Date.parse(dateTime)
        
        return unixDateTime;

    }

    

    console.log(time);
    const startDate = unixTime(time);

    messageOne.textContent = "Getting data...";


    //fetch the api from client side
    fetch(`/${exchange}?time=${startDate}&asset1=${asset}&asset2=${asset2}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                messageOne.textContent = data.error;
                message13.textContent = '';
               /*  messageTwo.textContent = '';
                messageThree.textContent = ''
                messageFour.textContent = ''
                messageFive.textContent = ''
                messageSix.textContent = ''
                messageSeven.textContent = ''
                messageEight.textContent = ''
                messageNine.textContent = ''
                messageTen.textContent = ''
                messageEleven.textContent = '';
                messageTwelve.textContent = '';
 */
            } else  {
                /*  console.log(exchange)
                 console.log(data.unixTime);
                 console.log(`Date: ${time}`);
                 console.log(data.pair);
                 console.log(data.weightedAverage); */
                 let html = '';

                 for(key in data) {

                    let fieldName = key;
                    let value = data[key];

                    if(fieldName == 'exchange') {
                        fieldName = '<span style="color: rgb(43, 46, 226); font-weight: bold">' + fieldName + '</span>';
                        value = '<span style="color: rgb(43, 46, 226); font-weight: bold">' + value + '</span>';
                    }

                    if(fieldName == 'average') {
                        fieldName = '<span style="color: rgb(53, 0, 139)">' + fieldName + '</span>';
                        value = '<span style="color: rgb(53, 0, 139)">' + value + '</span>';
                    }

                    if(fieldName == 'vwap') {
                        fieldName = '<span style="color: rgb(184, 48, 75)">' + fieldName + '</span>';
                        value = '<span style="color: rgb(184, 48, 75)">' + value + '</span>';
                    }

                    if(fieldName == 'link') {

                        value = '<a href="' + value + '" target = "_blank">market chart</a></br>';
                    }
                

                    html +=  fieldName + ": ";
                    html += value;
                    html += '</br>'
                    html += '</br>'; 
                         
                 }
                // console.log(html)


              /*   messageOne.textContent = `Exchange: ${data.exchange}`;
                messageTwo.textContent = `Unix Time: ${data.unixTime}`;
                messageThree.textContent = `Date: ${time}`;
                messageFour.textContent = `Pair: ${data.pair}`;
                messageFive.textContent = `Open: ${data.open}`;
                messageSix.textContent = `High: ${data.high}`;
                messageSeven.textContent = `Low: ${data.low}`;
                messageEight.textContent = `Close: ${data.close}`;
                messageNine.textContent = `Volume: ${data.volume}`;
                messageTen.textContent = `Average: ${data.average}`;
                messageEleven.textContent = `VWAP: ${data.vwap}`; */
                message13.innerHTML = html;
                messageOne.textContent = ''


               /*  if(exchange === 'poloniex') {
                    messageEleven.textContent = `Weighted Average: ${data.weightedAverage}`;
                    messageTwelve.textContent = `VWAP:  ${data.vwap}`;
                } */

                
            } /* else {

                messageOne.textContent = 'All Markets Average:';
                messageTwo.textContent = `Unix Time: ${data.unixTime}`;
                messageThree.textContent = `Date: ${time}`;
                messageFour.textContent = `Altcoin: ${data.pair}`;
                messageFive.textContent = `Poloniex: ${data.polAvg}`;
                messageSix.textContent = `Binance: ${data.binAvg}`;
                messageSeven.textContent = `HitBtc: ${data.hitAvg}`;
                messageEight.textContent = `Gate.io: ${data.gateAvg}`;
                messageEleven.textContent = `All Markets Avg: ${data.allMarketsAvg}`;
                messageNine.textContent = '';
                messageTen.textContent = '';
            } */
        })
    });
});

