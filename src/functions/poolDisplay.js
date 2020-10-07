const poolDisplay = () => {
   
    if(coin === 'eth') {


        let mes1 = poolMessage1.textContent = 'Mining pools available for ETH via API: WhatToMine, ViaBtc, Poolin.';
        let mes2 = poolMessage2.textContent = 'Mining pools available for ETH via Crawler: Mining Pool Hub, Coinotron, F2Pool.' 
        let mes3 = poolNameSelector.textContent = "Getting data...";

        return {mes1,mes2,mes3}

   }else if(coin === 'etc') {
       poolMessage1.textContent = 'Mining pools available for ETC via API: WhatToMine, ViaBtc.';
       poolMessage2.textContent = 'Mining pools available for ETC via Crawler: Coinotron, F2Pool.' 
       poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'ltc') {
       poolMessage1.textContent = 'Mining pools available for LTC via API: WhatToMine, ViaBtc, Poolin';
       poolMessage2.textContent = 'Mining pools available for LTC via Crawler: LitecoinPool, F2Pool.'
       poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'btc') {
       poolMessage1.textContent = 'Mining pools available for BTC via API: WhatToMine, ViaBtc, Poolin, BtcCom.';
       poolMessage2.textContent = 'Mining pools available for BTC via Crawler: CoinWarz, F2Pool.'
       poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'bch') {
       poolMessage1.textContent = 'Mining pools available for BCH via API: WhatToMine, ViaBtc, Poolin, BtcCom';
        poolMessage2.textContent = 'Mining pools available for BCH via Crawler: CoinWarz.'
        poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'dash') {
       poolMessage1.textContent = 'Mining pools available for DASH via API: WhatToMine, ViaBtc, Poolin';
        poolMessage2.textContent = 'Mining pools available for DASH via Crawler: Mining Pool Hub, Coinotron, F2Pool.'
        poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'zec') {
        poolMessage1.textContent = 'Mining pools available for ZEC via API: WhatToMine, ViaBtc, Poolin';
        poolMessage2.textContent = 'Mining pools available for ZEC via Crawler: Mining Pool Hub, Coinotron, F2Pool.'
        poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'xmr') {
       poolMessage1.textContent = 'Mining pools available for XMR via API: WhatToMine, ViaBtc';
       poolMessage2.textContent = 'Mining pools available for XMR via Crawler: Monero.crypto-pooL, F2Pool, Minergate.'
       poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'xmc') {
       poolMessage1.textContent = 'Mining pools available for XMC via API: CoinCalculators, FairHash.';
       poolMessage2.textContent = 'No mining pools available via Crawler.'
       poolNameSelector.textContent = "Getting data...";
   }else if(coin === 'beam') {
       poolMessage1.textContent = 'Mining pools available for BEAM via API: WhatToMine, CoinCalculators';
       poolMessage2.textContent = 'Mining pools available for BEAM via Crawler: Crypt0zone.'
       poolNameSelector.textContent = "Getting data...";
   }else {
       return poolMessage1.textContent = 'Please select one of available coins';
       
   }

}


module.exports = poolDisplay();