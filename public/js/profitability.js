
//const poolDisplay = require('../../src/functions/poolDisplay');

const profForm = document.querySelector('form');
const profApiMessage1 = document.querySelector('#profApiMessage1');
const getCoin = document.querySelector('#coin');
const getMethod = document.querySelector('#method');
const profMessage1 = document.querySelector('#profMessage1');
const profMessage2 = document.querySelector('#profMessage2')
const poolNameSelector = document.querySelector('#poolName');
const poolListSelector = document.querySelector('#poolList');
let poolMessage1 = document.querySelector('#miningPoolsAve1');
let poolMessage2 = document.querySelector('#miningPoolsAve2');


profForm.addEventListener('submit', (e) => {
    e.preventDefault();

    poolMessage1.textContent = '';
    poolMessage2.textContent = '';
    
    poolListSelector.innerHTML = '';

    const coin = getCoin.value;
    const method = getMethod.value;

    if (!coin) {
        console.log('Coin coin')
    }

//Method to display available pools-----------
    
if(coin === 'eth') {
    poolMessage1.textContent = 'Mining pools available for ETH via API: WhatToMine, ViaBtc, Poolin.';
    poolMessage2.textContent = 'Mining pools available for ETH via Crawler: Mining Pool Hub, Coinotron, F2Pool.' 
    poolNameSelector.textContent = "Getting data...";
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
    poolMessage1.textContent = 'Please select one of available coins and methods';
    poolNameSelector.textContent = '';
}

//-----------

if(!coin || !method) {
    poolMessage1.textContent = 'Please select one of available coins and methodsss'
}

    let html = '';
    fetch(`/miningPools/${coin}/${method}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(error);
            }else if (method == 'api' || 'crawler') {

               let poolName = '';
               let res = '';
               let prop = '';

               let html = '';

               for (key in data) {

                 pools = data[key];
                 poolName = key + '</br></br>';

                 for (keys in pools) {
                    resPools = pools[keys];
                    
                    for (keys in resPools) {
                        prop = resPools[keys];

                        if (keys == 'poolName') {
                            keys = '<strong>' + keys + '</strong>';
                        }

                        if (keys == 'url') {

                           prop = '<a href="' + resPools[keys] + '" target = "_blank">mining claculator</a></br>';      
                        }
                        html += keys + ': ';
                        html += prop;
                        html += '</br>'
                        html += '</br>'
                    }
                 }                
               }
            
              // console.log(html)
            //document.getElementById('poolList').innerHTML = html;
            
           poolNameSelector.innerHTML = poolName;
           poolListSelector.innerHTML = html;
            
    }

           /*  console.log(data)
            profMessage1.textContent = 'UI is under construction, data is visible in console.';
 */
        })
    })


    
})