const express = require('express');
const axios = require('axios');
const router = new express.Router();

const averageFunc = require('../../functions/averageFunc');



//---------------------------------------ETH API CALL
router.get('/miningPools/ETH/api', (req, res) => {

    const whatToMineUrl = `https://whattomine.com/coins/151.json?hr=1&p=0.0&fee=0&cost=0&hcost=0.07`;
    const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=ETH`;
    const poolInUrl = 'https://api-prod.poolin.com/api/public/v2/basedata/coins/block_stats';
  
    const whatToMineRequest = axios.get(whatToMineUrl);
    const viaBtcRequest = axios.get(viaBtcUrl);
    const poolInRequest = axios.get(poolInUrl);
  
  
    axios.all([whatToMineRequest, viaBtcRequest, poolInRequest]).then(axios.spread((...responses) => {
      const whatToMineResponse = responses[0].data;
      const viaBtcResponse = responses[1].data;
      const poolInResponse = responses[2].data;
  
      //via btc
      const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["ETH"];
      const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
      const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));
  
      const whatToMineData = {
        poolName: "WhatToMine",
        profitability: whatToMineResponse["estimated_rewards"],
        url: 'https://whattomine.com/coins/151-eth-ethash?hr=1&p=420.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'
      }
  
      const viaBtcData = {
        poolName: "ViaBtc",
        fee: feeVia,
        miningRewardWithFee:miningRewardWithFeeVia,
        profitability: profitabilityVia,
        url: 'https://www.viabtc.com/tools/calculator?symbol=ETH'
      }
  
      const poolInData = {
        poolName: "Poolin",
        profitability: poolInResponse["data"]["ETH"]["rewards_per_unit"],
        url: 'https://www.poolin.com/tools/mini-calc?type=eth'
      }
  
  
      let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability), parseFloat(poolInData.profitability)];
  
      const avgEthMiningProf = {
        avgETHProf: averageFunc(allProfArr)
      }
  
      const ethMiningPools = { whatToMineData, viaBtcData, poolInData, avgEthMiningProf };
      res.send({ ethMiningPools });
  
    })).catch(errors => {

      res.send({errors})
    })
  
  });


  //-----------------------------ETC API CALL
 
  router.get('/miningPools/ETC/api', (req, res) => {
  
    const whatToMineUrl = `https://whattomine.com/coins/162.json?hr=1&p=0.0&fee=0&cost=0&hcost=0.07`;
    const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=ETC`;
  
  
    const whatToMineRequest = axios.get(whatToMineUrl);
    const viaBtcRequest = axios.get(viaBtcUrl);
  
  
    axios.all([whatToMineRequest, viaBtcRequest]).then(axios.spread((...responses) => {
      const whatToMineResponse = responses[0].data;
      const viaBtcResponse = responses[1].data;
  
  
      //via btc
      const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["ETC"];
      const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
      const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));
  
  
      const whatToMineData = {
        poolName: "WhatToMine",
        profitability: whatToMineResponse["estimated_rewards"],
        url: 'https://whattomine.com/coins/162-etc-ethash'
      }
  
      const viaBtcData = {
        poolName: "ViaBtc",
        fee: feeVia,
        miningRewardWithFee:miningRewardWithFeeVia,
        profitability: profitabilityVia,
        url: 'https://www.viabtc.com/tools/calculator?symbol=ETC'
      }
  
  
  
  
      let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability)];
  
      const avgEtcMiningProf = {
        avgETCProf: averageFunc(allProfArr)
      }
  
      const etcMiningPools = { whatToMineData, viaBtcData, avgEtcMiningProf };
      res.send({ etcMiningPools });
  
    })).catch(errors => {

      res.send({errors});
      //console.log(errors);
    })
  
  });

  //-------------------------LTC API CALL----------------------------------------------------

  router.get('/miningPools/LTC/api', (req, res) => {
  
    const whatToMineUrl = `https://whattomine.com/coins/4.json?hr=1&p=0.0&fee=0&cost=0&hcost=0.07`;
    const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=LTC`;
    const poolInUrl = 'https://api-prod.poolin.com/api/public/v2/basedata/coins/block_stats';
  
    const whatToMineRequest = axios.get(whatToMineUrl);
    const viaBtcRequest = axios.get(viaBtcUrl);
    const poolInRequest = axios.get(poolInUrl);
  
  
    axios.all([whatToMineRequest, viaBtcRequest, poolInRequest]).then(axios.spread((...responses) => {
      const whatToMineResponse = responses[0].data;
      const viaBtcResponse = responses[1].data;
      const poolInResponse = responses[2].data;
  
      //via btc
      const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["LTC"]/1000;
      const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
      const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));
  
      let poolInProf = poolInResponse["data"]["LTC"]["rewards_per_unit"];
      poolInProf = poolInProf / 1000;
      poolInProf = poolInProf.toFixed(8);
  
  
      const whatToMineData = {
        poolName: "WhatToMine",
        profitability: whatToMineResponse["estimated_rewards"],
        url: 'https://whattomine.com/coins/4-ltc-scrypt?hr=1&p=1050.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'
      }
  
      const viaBtcData = {
        poolName: "ViaBtc",
        fee: feeVia,
        miningRewardWithFee:miningRewardWithFeeVia,
        profitability: profitabilityVia,
        url: 'https://www.viabtc.com/tools/calculator?symbol=LTC'
      }
  
      const poolInData = {
        poolName: "Poolin",
        profitability: poolInProf,
        url: 'https://www.poolin.com/tools/mini-calc?type=ltc',
      }
  
  
      let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability), parseFloat(poolInData.profitability)];
  
      const avgLtcMiningProf = {
        avgLtcProf: averageFunc(allProfArr)
      }

      const ltcMiningPools = { whatToMineData, viaBtcData, poolInData, avgLtcMiningProf };

   
     res.send({ ltcMiningPools });
  
    })).catch(errors => {
      res.send({errors})
    })
  
  });

//--------------------------------BTC API CALL

router.get('/miningPools/BTC/api', (req, res) => {
  

  //const coinWarzApiKey = '82e0dce42b7a420a8a11fbc892fb7b29';

  const whatToMineUrl = `https://whattomine.com/coins/1.json?hr=1000&p=0.0&fee=0&cost=0&hcost=0.07`;
  const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=BTC`;
  const poolInUrl = 'https://api-prod.poolin.com/api/public/v2/basedata/coins/block_stats';
  const btcComUrl = 'https://btc.com/service/price/coins-income';
 // const coinWarzUrl = `https://www.coinwarz.com/v1/api/profitability?apikey=${coinWarzApiKey}&algo=sha-256`

  const whatToMineRequest = axios.get(whatToMineUrl);
  const viaBtcRequest = axios.get(viaBtcUrl);
  const poolInRequest = axios.get(poolInUrl);
  const btcComRequest = axios.get(btcComUrl);
  //const coinWarzRequest = axios.get(coinWarzUrl);


  axios.all([whatToMineRequest, viaBtcRequest, poolInRequest, btcComRequest]).then(axios.spread((...responses) => {
    const whatToMineResponse = responses[0].data;
    const viaBtcResponse = responses[1].data;
    const poolInResponse = responses[2].data;
    const btcComResponse = responses[3].data;

    //via btc
    const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["BTC"];
    const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
    const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));

    const whatToMineData = {
      poolName: "WhatToMine",
      profitability: whatToMineResponse["btc_revenue"],
      url: 'https://whattomine.com/coins/1-btc-sha-256?hr=1000000&p=2800.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'
    }

    const viaBtcData = {
      poolName: "ViaBtc",
      fee: feeVia,
      miningRewardWithFee:miningRewardWithFeeVia,
      profitability: profitabilityVia,
      url: 'https://www.viabtc.com/tools/calculator?symbol=BTC'
    }

    const poolInData = {
      poolName: "Poolin",
      profitability: poolInResponse["data"]["BTC"]["rewards_per_unit"],
      url: 'https://www.poolin.com/tools/mini-calc?type=btc'
    }

    const btcComData = {
      poolName: "BtcCom",
      profitability: btcComResponse["data"]["btc"]["income_optimize_coin"].toFixed(8).toString(),
      url: 'https://btc.com/tools/mini-mining-calculator'
    }



    let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability), parseFloat(poolInData.profitability), parseFloat(btcComData.profitability)];

    const avgBtcMiningProf = {
      avgBtcProf: averageFunc(allProfArr)
    }

    const btcMiningPools = { whatToMineData, viaBtcData, poolInData, btcComData, avgBtcMiningProf };
    res.send({ btcMiningPools });

  })).catch(errors => {

    res.send({errors})
    //console.log(errors);
  })

});


//--------------------------------BCH API CALL---------------------

router.get('/miningPools/BCH/api', (req, res) => {
  
  const whatToMineUrl = `https://whattomine.com/coins/193.json?hr=1000&p=0.0&fee=0&cost=0&hcost=0.07`;
  const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=BCH`;
  const poolInUrl = 'https://api-prod.poolin.com/api/public/v2/basedata/coins/block_stats';
  const btcComUrl = 'https://btc.com/service/price/coins-income';

  const whatToMineRequest = axios.get(whatToMineUrl);
  const viaBtcRequest = axios.get(viaBtcUrl);
  const poolInRequest = axios.get(poolInUrl);
  const btcComRequest = axios.get(btcComUrl);


  axios.all([whatToMineRequest, viaBtcRequest, poolInRequest, btcComRequest]).then(axios.spread((...responses) => {
    const whatToMineResponse = responses[0].data;
    const viaBtcResponse = responses[1].data;
    const poolInResponse = responses[2].data;
    const btcComResponse = responses[3].data;


    //via btc
    const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["BCH"];
    const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
    const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));


    const whatToMineData = {
      poolName: "WhatToMine",
      profitability: whatToMineResponse["estimated_rewards"],
      url: 'https://whattomine.com/coins/193-bch-sha-256?hr=1000&p=2800.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'
    }

    const viaBtcData = {
      poolName: "ViaBtc",
      fee: feeVia,
      miningRewardWithFee:miningRewardWithFeeVia,
      profitability: profitabilityVia,
      url: 'https://www.viabtc.com/tools/calculator?symbol=BCH'
    }

    const poolInData = {
      poolName: "Poolin",
      profitability: poolInResponse["data"]["BCH"]["rewards_per_unit"],
      url: 'https://www.poolin.com/tools/mini-calc?type=btc'
    }

    const btcComData = {
      poolName: "BtcCom",
      profitability: btcComResponse["data"]["bch"]["income_optimize_coin"].toFixed(8).toString(),
      url: 'https://btc.com/tools/mini-mining-calculator'
    }


    let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability), parseFloat(poolInData.profitability), parseFloat(btcComData.profitability)];

    const avgBchMiningProf = {
      avgBchProf: averageFunc(allProfArr)
    }

    const bchMiningPools = { whatToMineData, viaBtcData, poolInData, btcComData, avgBchMiningProf };
    res.send({ bchMiningPools });

  })).catch(errors => {
    res.send({errors});
  })

});


//--------------------------------DASH API CALL---------------------
router.get('/miningPools/DASH/api', (req, res) => {
  
  const whatToMineUrl = `https://whattomine.com/coins/34.json?hr=1000&p=0.0&fee=0&cost=0&hcost=0.07`;
  const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=DASH`;
  const poolInUrl = 'https://api-prod.poolin.com/api/public/v2/basedata/coins/block_stats';

  const whatToMineRequest = axios.get(whatToMineUrl);
  const viaBtcRequest = axios.get(viaBtcUrl);
  const poolInRequest = axios.get(poolInUrl);


  axios.all([whatToMineRequest, viaBtcRequest, poolInRequest]).then(axios.spread((...responses) => {
    const whatToMineResponse = responses[0].data;
    const viaBtcResponse = responses[1].data;
    const poolInResponse = responses[2].data;

    let whatToMineProf = whatToMineResponse["estimated_rewards"] / 1000;
    whatToMineProf = whatToMineProf.toFixed(8).toString();

   /*  let viaBtcProf = viaBtcResponse["data"][0]["profit"]["DASH"] / 1000;
    viaBtcProf = viaBtcProf.toFixed(8).toString(); */

    //via btc
    const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["DASH"]/1000;
    const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
    const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));


    let poolInProf = poolInResponse["data"]["DASH"]["rewards_per_unit"] / 1000;
    poolInProf = poolInProf.toFixed(8).toString();


    const whatToMineData = {
      poolName: "WhatToMine",
      profitability: whatToMineProf,
      url: 'https://whattomine.com/coins/34-dash-x11?hr=1000&p=1800.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'
    }

    const viaBtcData = {
      poolName: "ViaBtc",
      fee: feeVia,
      miningRewardWithFee:miningRewardWithFeeVia,
      profitability: profitabilityVia,
      url: 'https://www.viabtc.com/tools/calculator?symbol=DASH'
    }

    const poolInData = {
      poolName: "Poolin",
      profitability: poolInProf,
      url: 'https://www.poolin.com/tools/mini-calc?type=dash'
    }


    let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability), parseFloat(poolInData.profitability)];

    const avgDashMiningProf = {
      avgDashProf: averageFunc(allProfArr)
    }

    const dashMiningPools = { whatToMineData, viaBtcData, poolInData, avgDashMiningProf };
    res.send({ dashMiningPools });

  })).catch(errors => {
    res.send({errors});
  })

});


//--------------------------------ZEC API CALL---------------------

router.get('/miningPools/ZEC/api', (req, res) => {
  
  const whatToMineUrl = `https://whattomine.com/coins/166.json?hr=1000&p=0.0&fee=0&cost=0&hcost=0.07`;
  const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=ZEC`;
  const poolInUrl = 'https://api-prod.poolin.com/api/public/v2/basedata/coins/block_stats';

  const whatToMineRequest = axios.get(whatToMineUrl);
  const viaBtcRequest = axios.get(viaBtcUrl);
  const poolInRequest = axios.get(poolInUrl);


  axios.all([whatToMineRequest, viaBtcRequest, poolInRequest]).then(axios.spread((...responses) => {
    const whatToMineResponse = responses[0].data;
    const viaBtcResponse = responses[1].data;
    const poolInResponse = responses[2].data;

    let whatToMineProf = whatToMineResponse["estimated_rewards"] / 1000;
    whatToMineProf = whatToMineProf.toFixed(8).toString();

    //via btc
    const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["ZEC"]/1000;
    
    const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
    const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));

    let poolInProf = poolInResponse["data"]["ZEC"]["rewards_per_unit"] / 1000;
    poolInProf = poolInProf.toFixed(8).toString();


    const whatToMineData = {
      poolName: "WhatToMine",
      profitability: whatToMineProf,
      url: 'https://whattomine.com/coins/166-zec-equihash?hr=1000&p=1420.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'
    }

    const viaBtcData = {
      poolName: "ViaBtc",
      fee: feeVia,
      miningRewardWithFee:miningRewardWithFeeVia,
      profitability: profitabilityVia,
      url: 'https://www.viabtc.com/tools/calculator?symbol=ZEC'
    }

    const poolInData = {
      poolName: "Poolin",
      profitability: poolInProf,
      url: 'https://www.poolin.com/tools/mini-calc?type=zec'
    }


    let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability), parseFloat(poolInData.profitability)];

    const avgZecMiningProf = {
      avgZecProf: averageFunc(allProfArr)
    }

    const zecMiningPools = { whatToMineData, viaBtcData, poolInData, avgZecMiningProf };
    res.send({ zecMiningPools });

  })).catch(errors => {
    res.send({errors});
  })

});


//--------------------------------XMR API CALL---------------------

router.get('/miningPools/XMR/api', (req, res) => {
  
  const whatToMineUrl = `https://whattomine.com/coins/101.json?hr=1000&p=0.0&fee=0&cost=0&hcost=0.07`;
  const viaBtcUrl = `https://www.viabtc.com/res/tools/calculator?coin=XMR`;
 // const moneroCryptoPoolUrl = `https://monero.crypto-pool.fr:8091/stats`;
 
  const whatToMineRequest = axios.get(whatToMineUrl);
  const viaBtcRequest = axios.get(viaBtcUrl);
  //const moneroCryptoPoolRequest = axios.get(moneroCryptoPoolUrl)
  
  axios.all([whatToMineRequest, viaBtcRequest]).then(axios.spread((...responses) => {
    const whatToMineResponse = responses[0].data;
    const viaBtcResponse = responses[1].data;
    //const moneroCryptoPoolResponse = responses[0].data;
    

    let whatToMineProf = whatToMineResponse["estimated_rewards"] / 1000;
    whatToMineProf = whatToMineProf.toFixed(8).toString();

    //via btc
    const miningRewardWithFeeVia = viaBtcResponse["data"][0]["profit"]["XMR"]/1000;
    const feeVia = viaBtcResponse["data"][0]["pps_fee_rate"]*100;
    const profitabilityVia = parseFloat((miningRewardWithFeeVia / ((100 - feeVia) / 100)).toFixed(8));


    const whatToMineData = {
      poolName: "WhatToMine",
      profitability: whatToMineProf,
      url: 'https://whattomine.com/coins/101-xmr-cryptonightr?hr=1000&p=270.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'
    }

    const viaBtcData = {
      poolName: "ViaBtc",
      fee: feeVia,
      miningRewardWithFee:miningRewardWithFeeVia,
      profitability: profitabilityVia,
      url: 'https://www.viabtc.com/tools/calculator?symbol=ETC'
    }

   
    let allProfArr = [parseFloat(whatToMineData.profitability), parseFloat(viaBtcData.profitability)];

    const avgXmrMiningProf = {
      avgXmrProf: averageFunc(allProfArr)
    }

    const xmrMiningPools = { whatToMineData, viaBtcData, avgXmrMiningProf };
    res.send({ xmrMiningPools });

  })).catch(errors => {
    res.send({errors});
  })

});

//--------------------------------XMC API CALL---------------------

router.get('/miningPools/XMC/api', (req, res) => {
  
  const coinCalculatorsUrl = 'https://www.coincalculators.io/api?name=monero-classic&hashrate=1&power=0&poolfee=0&powercost=0&difficultytime=24';
  const fairHashUrl = 'https://xmc.fairhash.org/api/stats?update';

  const coinCalculatorsRequest = axios.get(coinCalculatorsUrl);
  const fairHashRequest = axios.get(fairHashUrl);


  axios.all([coinCalculatorsRequest, fairHashRequest]).then(axios.spread((...responses) => {
    const coincalculatorsResponse = responses[0].data;
    const fairHashResponse = responses[1].data;

    const coinCalculatorsData = {
      poolName: "CoinCalculators",
      profitability: coincalculatorsResponse["rewardsInDay"].toFixed(8).toString(),
      url: 'https://www.coincalculators.io/coin/monero-classic?Hashrate=1&HashFactor=h&Watt=140&ElectricityPrice=0&PoolFee=0&HardwareCost=0&LH=&Difficulty=24'
    }


    //-- fairhash calc
    let networkDiff = fairHashResponse["network"]["difficulty"];
    let netLastRew = fairHashResponse["network"]["reward"];
    netLastRew = netLastRew/1000000000000
    const fee = 0.0;
    let profitability = ((netLastRew*86400)/networkDiff)+(((netLastRew*86400)/networkDiff)*fee);
    profFairHash =profitability.toFixed(8);

    const fairHashData = {
      poolName: "FairHash",
      difficulty: fairHashResponse["network"]["difficulty"].toString(),
      profitability: profFairHash,
      url: 'https://xmc.fairhash.org/'
    }

    let allProfArr = [parseFloat(coinCalculatorsData.profitability), parseFloat(fairHashData.profitability)];

    const avgXmcMiningProf = {
      avgXmcProf: averageFunc(allProfArr)
    }

    const xmcMiningPools = { coinCalculatorsData, fairHashData, avgXmcMiningProf };
    res.send({ xmcMiningPools });

  })).catch(errors => {
    res.send({errors});
  })

});


//--------------------------------BEAM API CALL---------------------
router.get('/miningPools/BEAM/api', (req, res) => {
  
  const whatToMineUrl = `https://whattomine.com/coins/294.json?hr=1&p=0.0&fee=0&cost=0&hcost=0.0`
  const coinCalculatorsUrl = 'https://www.coincalculators.io/api?name=beam&hashrate=1&power=0&poolfee=0&powercost=0&difficultytime=24';

  const whatToMineRequest = axios.get(whatToMineUrl);
  const coinCalculatorsRequest = axios.get(coinCalculatorsUrl);


  axios.all([whatToMineRequest, coinCalculatorsRequest]).then(axios.spread((...responses) => {
    const whatToMineResponse = responses[0].data;
    const coincalCulatorsResponse = responses[1].data;

    const whatToMineData = {
      poolName: "WhatToMine",
      profitability: whatToMineResponse["estimated_rewards"],
      url: 'https://whattomine.com/coins/294-beam-beamhashiii?hr=1&p=390.0&fee=0.0&cost=0.0&hcost=0.0&commit=Calculate'

    }

    const coinCalculatorsData = {
      poolName: "CoinCalculators",
      profitability: coincalCulatorsResponse["rewardsInDay"].toFixed(8).toString(),
      url: 'https://www.coincalculators.io/coin/beam?Hashrate=1&HashFactor=h&Watt=200&ElectricityPrice=0.0&PoolFee=0&HardwareCost=0&LH=&Difficulty=24'
    }


    let allProfArr = [parseFloat(coinCalculatorsData.profitability), parseFloat(whatToMineData.profitability)];

    const avgBeamMiningProf = {
      avgBeamProf: averageFunc(allProfArr)
    }

    const beamMiningPools = { whatToMineData, coinCalculatorsData, avgBeamMiningProf };
    res.send({ beamMiningPools });

  })).catch(errors => {
    res.send({errors});
  })

});


  module.exports = router;