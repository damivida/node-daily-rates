const dailyRatesForm = document.querySelector('form');
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

});