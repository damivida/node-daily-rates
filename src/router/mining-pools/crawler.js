const express = require('express');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const router = new express.Router();

const profRound = require('../../functions/profRound');
const {coinotronDenom, coinotronDenomHs} = require('../../functions/functionsAll');


//-------------------------ETH scraping--------------------------------------
  
router.get('/miningPools/eth/crawler', (req, res) => {
  
    async function miningPoolHubETH(page) {

      try {

        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://ethereum.miningpoolhub.com/index.php?page=statistics&action=pool');
        const html = await page.content();
        const $ = cheerio.load(html);
    
        const poolName = 'Mining Pool Hub - ETH';
        let lastBlockTime = $('#main > div:nth-child(2) > article:nth-child(2) > div > table > tbody > tr:nth-child(8) > td').text();
        let hp = parseFloat($('#main > div:nth-child(2) > article:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(4)')
          .text()
          .replace(',', '')
          .replace(',', '')
          .replace(',', ''));
    
        let coinsPerDay = parseFloat($('#main > div:nth-child(2) > article:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(5)').text());
        let prof = (coinsPerDay / hp) * 1000;
        let profitability = profRound(prof)
        let url = 'https://ethereum.miningpoolhub.com/index.php?page=statistics&action=pool';
    
        //console.log({poolName, hp, coinsPerDay, profitability, lastBlockTime});
    
        return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
      
      } catch (error) {
        
        return error;
      }

  
    }
  
    //COINOTRON
    async function coinotronETH(page) {
  
      try {
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.coinotron.com/app?action=statistics');
        const html = await page.content();
        const $ = cheerio.load(html);
  
        const poolName = 'Coinotron - ETH';
        const lastBlockTime = $('#row0TableSolvedBlocksETH > td:nth-child(2)').text();
        let hp = parseFloat($('#row0TableBestMinersETH > td:nth-child(3)').text().replace('GH', ''));
        let hpDenom = $('#row0TableBestMinersETH > td:nth-child(3)').text();
        hpDenom = hpDenom.slice((hpDenom.length)-2,hpDenom.length);
        let coinsPerDay = parseFloat($('#row0TableBestMinersETH > td:nth-child(4)').text());
       
        let prof = coinotronDenom(hp, hpDenom, coinsPerDay);
        let profitability = profRound(prof);
       
        let url = 'https://www.coinotron.com/app?action=statistics';
  
  
        return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
  
      } catch (err) {
        return err;
        console.log(err);
  
      }
  
    }
  
    //F2POOL
    async function f2pool(page) {
      try {
  
        /* const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage(); */
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.f2pool.com/');
        const html = await page.content();
        const $ = cheerio.load(html);
  
  
        const poolName = 'F2Pool';
        const profWithFee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(10) > td > div > div > div.container-info.col-12.col-lg-6 > div > div.row.info-item.calc-inline.hash-val-container > div > div:nth-child(4) > span.pl-1.profit-val.info-value").text().trim());
        const fee = parseFloat($('#tab-content-main > table > tbody > tr:nth-child(10) > td > div > div > div.container-info.col-12.col-lg-6 > div > div:nth-child(5) > div.col-12.col-lg-4.item > div.info-value').text().replace('% PPS+', ''));
        const profitability = parseFloat((profWithFee / ((100 - fee) / 100)).toFixed(8));
        const url = 'https://www.f2pool.com/';
  
        //console.log({profWithFee, fee, profitability});
        return ({ poolName, profWithFee, fee, profitability, url });
  
      } catch (error) {
        
        return error;
      }
  
    }
  
  
    const scrapingETH = async () => {
      const browser = await puppeteer.launch({ headless: true , args: ["--no-sandbox"]});
      const page = await browser.newPage();
  
  
      //profitability calc
      let arrProf = [];
      const getSum = (total, numb) => {
        return total + numb;
      }
  
      let scrapMiningPoolHubETH = await miningPoolHubETH(page);
      let profMiningPoolHubETH = scrapMiningPoolHubETH.profitability;
      arrProf.push(profMiningPoolHubETH)
  
      let scrapCoinotronETH = await coinotronETH(page);
      let profCoinotronETH = scrapCoinotronETH.profitability;
      arrProf.push(profCoinotronETH)
  
      let scrapingF2PoolETH = await f2pool(page);
      let profF2PoolETH = scrapingF2PoolETH.profitability;
      arrProf.push(profF2PoolETH);
  
  
      //arrProf.reduce(getSum)
  
      let profAvg = arrProf.reduce(getSum);
      profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
  
      //--------------------------------
  
      const ethMiningPools = {
        miningPoolHubETH: scrapMiningPoolHubETH,
        coinotronETH: scrapCoinotronETH,
        f2PoolETH: scrapingF2PoolETH,
        avgETHProf: profAvg
      }
      //console.log(ethMining)
  
      res.send({ ethMiningPools });
      //return ethMining;
    }
  
    scrapingETH();
  
  });


   //---------------------ETC scraping---------------------------------
  
   router.get('/miningPools/etc/crawler', (req, res) => {
  
    //COINOTRON
    async function coinotronETC(page) {
  
      try {

        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.coinotron.com/app?action=statistics');
        const html = await page.content();
        const $ = cheerio.load(html);
    
        const poolName = 'Coinotron - ETC';
        const lastBlockTime = $('#row0TableSolvedBlocksETC > td:nth-child(2)').text();
        const hp = parseFloat($('#row0TableBestMinersETC > td:nth-child(3)').text().replace(' GH', ''));
        let hpDenom = $('#row0TableBestMinersETC > td:nth-child(3)').text();
        hpDenom = hpDenom.slice((hpDenom.length)-2,hpDenom.length);
        let coinsPerDay = parseFloat($('#row0TableBestMinersETC > td:nth-child(4)').text());
        
  
        let prof = coinotronDenom(hp, hpDenom, coinsPerDay);
            
        let profitability = profRound(prof);
  
        let url = 'https://www.coinotron.com/app?action=statistics';
    
        return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
        
      } catch (error) {
        return error;
      }
     
    }
  
  
    //F2POOL
    async function f2poolETC(page) {
      try {
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.f2pool.com/');
        const html = await page.content();
        const $ = cheerio.load(html);
  
  
        const poolName = 'F2Pool';
        const profWithFee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(12) > td > div > div > div.container-info.col-12.col-lg-6 > div > div.row.info-item.calc-inline.hash-val-container > div > div:nth-child(4) > span.pl-1.profit-val.info-value").text().trim());
        const fee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(12) > td > div > div > div.container-info.col-12.col-lg-6 > div > div:nth-child(5) > div.col-12.col-lg-4.item > div.info-value").text().replace('% PPS', ''));
        const profitability = parseFloat((profWithFee / ((100 - fee) / 100)).toFixed(8));
        const url = 'https://www.f2pool.com/';
  
        // console.log({profWithFee, fee, profitability});
        return ({ poolName, profWithFee, fee, profitability, url });
  
      } catch (error) {
        return error;
      }
  
    }

    
    const etcScraping = async () => {


      const browser = await puppeteer.launch({ headless: true , args: ["--no-sandbox"] });
      const page = await browser.newPage();
  
      //profitability calc
      let arrProf = [];
      const getSum = (total, numb) => {
        return total + numb;
      }
  
      let scrapCoinotronETC = await coinotronETC(page);
      let scrapF2PoolETC = await f2poolETC(page);
      let profCoinotronETC = scrapCoinotronETC.profitability;
      let profF2PoolETC = scrapF2PoolETC.profitability;
  
      arrProf.push(profCoinotronETC, profF2PoolETC)
  
      //arrProf.reduce(getSum);
  
      let profAvg = arrProf.reduce(getSum);
      profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
  
      //-------------------
  
      const etcMiningPools = {
        coinotronETC: scrapCoinotronETC,
        f2PoolETC: scrapF2PoolETC,
        avgETCProf: profAvg
      }
      //console.log(etcMining)
      res.send({ etcMiningPools });

     
    }
  
  etcScraping();

  });

  //--------------------------- LTC scraping -----------------------------------
  router.get('/miningPools/ltc/crawler', (req, res) => {
  
    async function liteCoinPool(page) {

      try {

        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.litecoinpool.org/stats');
        const html = await page.content();
        const $ = cheerio.load(html);
    
        const poolName = 'LitecoinPool - LTC';
        let lastBlockTime = $('#stats_pool_time_since_block').text();
        let hp = parseFloat($('#content > div > div > div.optional2.column > table > tbody > tr:nth-child(2) > td:nth-child(3)')
          .text()
          .replace(',', ''));
    
    
        let coinsPerDay = parseFloat($('#content > div > div > div.optional2.column > table > tbody > tr:nth-child(2) > td:nth-child(4)').text());
        let prof = (coinsPerDay / hp) / 1000;
        let profitability = profRound(prof)
        let url = 'https://www.litecoinpool.org/stats';
    
        return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
        
      } catch (error) {
        return error;
      }

    }
  
  
    async function f2poolETC(page) {
      try {
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.f2pool.com/');
        const html = await page.content();
        const $ = cheerio.load(html);
  
  
        const poolName = 'F2Pool';
        const profWithFee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(8) > td > div > div > div.container-info.col-12.col-lg-6 > div > div.row.info-item.calc-inline.hash-val-container > div > div:nth-child(4) > span.pl-1.profit-val.info-value").text().trim());
        const fee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(8) > td > div > div > div.container-info.col-12.col-lg-6 > div > div:nth-child(5) > div.col-12.col-lg-4.item > div.info-value").text().replace('% PPS', ''));
        let profitability = parseFloat((profWithFee / ((100 - fee) / 100)).toFixed(8));
        profitability = parseFloat((profitability / 1000).toFixed(8));
        const url = 'https://www.f2pool.com/';
  
        //console.log({ profWithFee, fee, profitability });
        return ({ poolName, profWithFee, fee, profitability, url });
  
      } catch (error) {
        return error;
      }
  
    }
  
  
    //--------------------------------------------MAIN
    const ltcScraping = async () => {
      const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
      const page = await browser.newPage();
  
      //---------------profitability calc
      let arrProf = [];
      const getSum = (total, numb) => {
        return total + numb;
      }
  
      let scrapLitecoinPool = await liteCoinPool(page);
      let scrapF2PoolLTC = await f2poolETC(page);
  
      let profLitecoinPool = scrapLitecoinPool.profitability;
      let profF2PoolLTC = scrapF2PoolLTC.profitability;
      arrProf.push(profLitecoinPool, profF2PoolLTC)
  
      let profAvg = arrProf.reduce(getSum);
      profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
  
      //-------------------
  
      const ltcMiningPools = {
        litecoinPoolLTC: scrapLitecoinPool,
        f2PoolLTC: scrapF2PoolLTC,
        avgLtcProf: profAvg
      }
  
      // console.log(ltcMining);
      res.send({ ltcMiningPools });
    }
    ltcScraping();
  
  });


  //-------------------------------------- BTC scraping---------------------------------------

  router.get('/miningPools/btc/crawler', (req, res) => {
  
  
    //F2POOL
    async function f2poolBTC(page) {
      try {
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.f2pool.com/');
        const html = await page.content();
        const $ = cheerio.load(html);
  
  
        const poolName = 'F2Pool';
        const profWithFee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(2) > td > div > div > div.container-info.col-12.col-lg-6 > div > div.row.info-item.calc-inline.hash-val-container > div > div:nth-child(4) > span.pl-1.profit-val.info-value").text().trim());
        const fee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(2) > td > div > div > div.container-info.col-12.col-lg-6 > div > div:nth-child(5) > div.col-12.col-lg-4.item > div.info-value").text().replace('% PPS+', ''));
        const profitability = parseFloat((profWithFee / ((100 - fee) / 100)).toFixed(8));
        const url = 'https://www.f2pool.com/';
  
        //console.log({profWithFee, fee, profitability});
        return ({ poolName, profWithFee, fee, profitability, url });
  
      } catch (error) {
        return error;
      }
  
    }
  
   //COIN WARZ
/*   async function coinWarzBTC(page) {
  
    try {
  
        page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.coinwarz.com/mining/bitcoin/calculator');
        const html = await page.content();
        const $ = cheerio.load(html);
  
  
        const poolName = 'CoinWarz';
        const hp = parseFloat($("[class='form-control numeric']").attr('value'));
        const coinsPerDay = parseFloat($("#left-col > main > section > section:nth-child(12) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text().trim());
        const difficulty = parseFloat($("[id=d]").attr('value'));
        const blockReward = parseFloat($("[id=r]").attr('value'));
        const url = "https://www.coinwarz.com/mining/bitcoin/calculator";
        const profitability = parseFloat((coinsPerDay / hp).toFixed(8));
        
  
        //console.log({ poolName, coinsPerDay, hp, profitability, url });
         return({poolName, coinsPerDay, hp, difficulty, blockReward, profitability, url});
  
  
    } catch (error) {

        return error;
        console.log(error);
    }
  
  } */
  
  
  //---BitinfoCharts
  
/*   async function bitinfochartsBTC(page) {
  
    try {
  
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://bitinfocharts.com/bitcoin/');
      const html = await page.content();
      const $ = cheerio.load(html);
  
      const trxfee = $('#tdid13 > span.text-success > abbr:nth-child(2)').text();
      //console.log(fee);
      return(trxfee);
  
    } catch (err) {
       return error;
    }
  
  } */
  
  
  
    const scrapingBTC = async () => {
      const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
      const page = await browser.newPage();
  
  
      //profitability calc
      let arrProf = [];
      const getSum = (total, numb) => {
        return total + numb;
      }
  
  
      let scrapF2PoolBTC = await f2poolBTC(page)
      //let scrapCoinWarzBTC = await coinWarzBTC(page);
  
      let profF2PoolBTC = scrapF2PoolBTC.profitability;
      //let profCoinWarzBTC = scrapCoinWarzBTC.profitability;
  
      //-- bitInfo charts
      /* let diffCoinWarzBTC = scrapCoinWarzBTC.difficulty;
      let blockReward = scrapCoinWarzBTC.blockReward;
      let trxFee = await bitinfochartsBTC(page);
      //trxFee = parseFloat(trxFee);
      let totalRew = parseFloat(trxFee) + blockReward;
      let profBitinfochartsBTC = (totalRew * 1000000000000 * 600 * 144) / (diffCoinWarzBTC * 4294967296)
      profBitinfochartsBTC = parseFloat(profBitinfochartsBTC.toFixed(8));
   */
      arrProf.push(profF2PoolBTC);
  
      
  
      let profAvg = arrProf.reduce(getSum);
      profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
  
      //--------------------------------
  
      const btcMiningPools = {
        f2PoolBTC: scrapF2PoolBTC,
       /*  coinwarzBTC: scrapCoinWarzBTC,
        bitInfoChartsBTC: { 
          poolName: "bitInfoCharts",
          trxFeeInBlock: parseFloat(trxFee),
          profitability: profBitinfochartsBTC,
        }, */
        
      }
  
      res.send({ btcMiningPools, profAvg });
  
    }
  
    scrapingBTC();
  
  });
  


 //-----------------------------------BCH scraping--------------------------------------
/*   app.get('/miningPools/bch/crawler', (req, res) => {
  
   //COIN WARZ
  async function coinWarzBCH(page) {
  
    try {
  
        page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.coinwarz.com/mining/bitcoincash/calculator');
        const html = await page.content();
        const $ = cheerio.load(html);
  
  
        const poolName = 'CoinWarz';
        const hp = parseFloat($("[class='form-control numeric']").attr('value'));
        const difficulty = parseFloat($("[id = 'd']").attr("value"));
        const blockReward = parseFloat($("[id = 'r']").attr("value"));
        const coinsPerDay = parseFloat($("#left-col > main > section > section:nth-child(12) > div > table > tbody > tr:nth-child(2) > td:nth-child(2)").text().trim());
        const url = "https://www.coinwarz.com/mining/bitcoincash/calculator";
        const profitability = parseFloat((coinsPerDay / hp).toFixed(8));
  
  
        //console.log({ poolName, coinsPerDay, hp, profitability, url });
         return({poolName, coinsPerDay, hp, difficulty, blockReward, profitability, url});
  
  
    } catch (error) {
        return error;
    }
  
  }
  
  
  //- bitInfo charts
  
  async function bitinfochartsBCH(page) {
  
    try {
  
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://bitinfocharts.com/bitcoin%20cash/');
      const html = await page.content();
      const $ = cheerio.load(html);
  
      const trxFee = $('#tdid13 > span.text-success > abbr:nth-child(2)').text();
      //console.log(trxFee);
      return(trxFee);
  
    } catch (err) {
        return error;
    }
  
  }
  
  
  
    const scrapingBCH = async () => {
      const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
      const page = await browser.newPage();
  
  
      //profitability calc
      let arrProf = [];
      const getSum = (total, numb) => {
        return total + numb;
      }
  
      let scrapCoinWarzBCH = await coinWarzBCH(page);
      let profCoinWarzBCH = scrapCoinWarzBCH.profitability;
  
      //-bitInfo charts
      let diffCoinWarzBCH = scrapCoinWarzBCH.difficulty;
      let blockReward = scrapCoinWarzBCH.blockReward;
      let trxFee = await bitinfochartsBCH(page);
  
      let totalRew = parseFloat(trxFee) + blockReward;
      let profBitinfochartsBCH = (totalRew * 1000000000000 * 600 * 144) / (diffCoinWarzBCH * 4294967296)
      profBitinfochartsBCH = parseFloat(profBitinfochartsBCH.toFixed(8));
      
      arrProf.push(profCoinWarzBCH, profBitinfochartsBCH)
  
      let profAvg = arrProf.reduce(getSum);
      profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
  
      //--------------------------------
  
      const bchMiningPools = {
        coinwarzBCH: scrapCoinWarzBCH,
        bitInfoChartsBCH: { 
          poolName: "bitInfoCharts",
          trxFeeInBlock: parseFloat(trxFee),
          profitability: profBitinfochartsBCH,
          url: "https://bitinfocharts.com/bitcoin%20cash/"
        }
      }
  
      res.send({ bchMiningPools });
  
    }
  
    scrapingBCH();
  
  }); */


  //---------------------------------------------- Dash scraping ---------------------------
  
  router.get('/miningPools/dash/crawler', (req, res) => {
  
    async function miningPoolHubDASH(page) {

      try {

      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://dash.miningpoolhub.com/index.php?page=statistics&action=pool');
      const html = await page.content();
      const $ = cheerio.load(html);
  
      const poolName = 'Mining Pool Hub - DASH';
      let lastBlockTime = $('#main > div:nth-child(2) > article:nth-child(2) > div > table > tbody > tr:nth-child(8) > td').text();
      let hp = parseFloat($('#main > div:nth-child(2) > article:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(4)')
        .text()
        .replace(',', '')
        .replace(',', '')
        .replace(',', ''));
  
      let coinsPerDay = parseFloat($('#main > div:nth-child(2) > article:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(5)').text());
      let prof = (coinsPerDay / hp) * 1000;
      let profitability = profRound(prof)
      let url = 'https://dash.miningpoolhub.com/index.php?page=statistics&action=pool';
  
      //console.log({poolName, hp, coinsPerDay, profitability, lastBlockTime});
  
      return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
        
      } catch (error) {
        return error;
      }
  
    }
  
    //COINOTRON
    async function coinotronDASH(page) {
  
      try {
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.coinotron.com/app?action=statistics');
        const html = await page.content();
        const $ = cheerio.load(html);
  
        const poolName = 'Coinotron - DASH';
        const lastBlockTime = $('#row0TableBestMinersDRK > td:nth-child(4)').text();
        let hp = parseFloat($('#row0TableBestMinersDRK > td:nth-child(3)').text().replace(' GH', ''));
        let coinsPerDay = parseFloat($('#row0TableBestMinersDRK > td:nth-child(4)').text());
        let hpDenom = $('#row0TableBestMinersDRK > td:nth-child(3)').text();
        hpDenom = hpDenom.slice((hpDenom.length)-2,hpDenom.length);


        let prof = coinotronDenom(hp, hpDenom, coinsPerDay);
        let profitability = profRound(prof)
  
        let url = 'https://www.coinotron.com/app?action=statistics';
  
  
      //  console.log({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
        return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
  
      } catch (error) {
        return error;
  
      }
  
    }
  
    //F2POOL
    async function f2poolDASH(page) {
      try {
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://www.f2pool.com/');
        const html = await page.content();
        const $ = cheerio.load(html);
  
  
        const poolName = 'F2Pool - DASH';
        const profWithFee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(18) > td > div > div > div.container-info.col-12.col-lg-6 > div > div.row.info-item.calc-inline.hash-val-container > div > div:nth-child(4) > span.pl-1.profit-val.info-value").text().trim());
        const fee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(18) > td > div > div > div.container-info.col-12.col-lg-6 > div > div:nth-child(5) > div.col-12.col-lg-4.item > div.info-value").text().replace("% PPS", ""));
        let profitability = parseFloat((profWithFee / ((100 - fee) / 100)).toFixed(8));
        profitability =  parseFloat((profitability/1000).toFixed(8));
        const url = 'https://www.f2pool.com/';
  
       // console.log({poolName, profWithFee, fee, profitability, url});
        return ({ poolName, profWithFee, fee, profitability, url });
  
      } catch (error) {
        return error;
      }
  
  }  
  
  
    const scrapingDASH = async () => {
      const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
      const page = await browser.newPage();
  
      //profitability calc
      let arrProf = [];
      const getSum = (total, numb) => {
        return total + numb;
      }
  
      let scrapMiningPoolHubDASH = await miningPoolHubDASH(page);
      let profMiningPoolHubDASH = scrapMiningPoolHubDASH.profitability;
      arrProf.push(profMiningPoolHubDASH)
  
      let scrapCoinotronDASH = await coinotronDASH(page);
      let profCoinotronDASH = scrapCoinotronDASH.profitability;
      arrProf.push(profCoinotronDASH)
  
      let scrapingF2PoolDASH = await f2poolDASH(page);
      let profF2PoolDASH = scrapingF2PoolDASH.profitability;
      arrProf.push(profF2PoolDASH);
  
  
      let profAvg = arrProf.reduce(getSum);
      profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
  
      //--------------------------------
  
      const dashMiningPools = {
        miningPoolHubDASH: scrapMiningPoolHubDASH,
        coinotronDASH: scrapCoinotronDASH,
        f2PoolDASH: scrapingF2PoolDASH,
        avgDASHProf: profAvg
      }
     
      res.send({ dashMiningPools });
     
    }

  
   

   //-terminate the proces after 

   const doPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        error: 'The call is to long, please repeate the process.' 
      });
      //reject('This is a promise reject after 3 sec...')
    }, 25000);
});

    
     scrapingDASH();

    doPromise.then((result) => {
       return res.send(result);
     }).catch((error) => {
       return res.send({error})
     })

  
  });


 //----------------------------------------ZEC scraping-----------------------------------
  
 router.get('/miningPools/zec/crawler', (req, res) => {
  
    async function miningPoolHubZEC(page) {
    
  
      try {
        
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://zcash.miningpoolhub.com/index.php?page=statistics&action=pool');
      const html = await page.content();
      const $ = cheerio.load(html);
    
      const poolName = 'Mining Pool Hub - ZEC';
      let lastBlockTime = $("#main > div:nth-child(2) > article:nth-child(2) > div > table > tbody > tr:nth-child(8) > td").text();
      let hp = parseFloat($("#main > div:nth-child(2) > article:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(4)")
        .text()
        .replace(',', '')
        .replace(',', '')
        .replace(',', ''));
    
      let coinsPerDay = parseFloat($("#main > div:nth-child(2) > article:nth-child(1) > div > table > tbody > tr:nth-child(1) > td:nth-child(5)").text());
      let prof = (coinsPerDay / hp)/1000;
      let profitability = profRound(prof)
      let url = 'https://zcash.miningpoolhub.com/index.php?page=statistics&action=pool';
    
      //console.log({poolName, hp, coinsPerDay, profitability, lastBlockTime});
    
      return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
  
      } catch (error) {
        return error;
      }
  
      
    
    }
    
      //COINOTRON
      async function coinotronZEC(page) {
    
        try {
    
          await page.setDefaultNavigationTimeout(0);
          await page.goto('https://www.coinotron.com/app?action=statistics');
          const html = await page.content();
          const $ = cheerio.load(html);
    
          const poolName = 'Coinotron - ZEC';
          const lastBlockTime = $('#row0TableSolvedBlocksZEC > td:nth-child(2)').text();
          let hp = parseFloat($("#row0TableBestMinersZEC > td:nth-child(3)").text().replace(' KH', ''));
          let hpDenom = $("#row0TableBestMinersZEC > td:nth-child(3)").text();
          hpDenom = hpDenom.slice((hpDenom.length)-2,hpDenom.length);
          let coinsPerDay = parseFloat($("#row0TableBestMinersZEC > td:nth-child(4)").text());
          
          let prof = coinotronDenomHs(hp, hpDenom, coinsPerDay);
            
          let profitability = profRound(prof);
  
          let url = 'https://www.coinotron.com/app?action=statistics';
    
    
          //console.log({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
          return ({ poolName, hp, coinsPerDay, profitability, lastBlockTime, url });
    
        } catch (error) {
         return error;
    
        }
    
      }
    
      //F2POOL
      async function f2poolZEC(page) {
        try {
     
          await page.setDefaultNavigationTimeout(0);
          await page.goto('https://www.f2pool.com/');
          const html = await page.content();
          const $ = cheerio.load(html);
    
    
          const poolName = 'F2Pool - ZEC';
          const profWithFee = parseFloat($("#tab-content-labs > table > tbody > tr:nth-child(2) > td > div > div > div.container-info.col-12.col-lg-6 > div > div.row.info-item.calc-inline.hash-val-container > div > div:nth-child(4) > span.pl-1.profit-val.info-value").text().trim());
          const fee = parseFloat($("#tab-content-labs > table > tbody > tr:nth-child(2) > td > div > div > div.container-info.col-12.col-lg-6 > div > div:nth-child(5) > div.col-12.col-lg-4.item > div.info-value").text().replace("% PPS", ""));
          let profitability = parseFloat((profWithFee / ((100 - fee) / 100)).toFixed(8));
          profitability =  parseFloat((profitability/1000).toFixed(8));
          const url = 'https://www.f2pool.com/';
    
         // console.log({poolName, profWithFee, fee, profitability, url});
          return ({ poolName, profWithFee, fee, profitability, url });
    
        } catch (error) {
          return error;
        }
    
    }  
    
      const scrapingZEC = async () => {
        const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
        const page = await browser.newPage();
    
        //profitability calc
        let arrProf = [];
        const getSum = (total, numb) => {
          return total + numb;
        }
    
        let scrapMiningPoolHubZEC = await miningPoolHubZEC(page);
        let profMiningPoolHubZEC = scrapMiningPoolHubZEC.profitability;
        arrProf.push(profMiningPoolHubZEC)
    
        let scrapCoinotronZEC = await coinotronZEC(page);
        let profCoinotronZEC = scrapCoinotronZEC.profitability;
        arrProf.push(profCoinotronZEC)
    
        let scrapingF2PoolZEC = await f2poolZEC(page);
        let profF2PoolZEC = scrapingF2PoolZEC.profitability;
        arrProf.push(profF2PoolZEC);
    
    
        let profAvg = arrProf.reduce(getSum);
        profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
    
        //--------------------------------
    
        const zecMiningPools = {
          miningPoolHubZEC: scrapMiningPoolHubZEC,
          coinotronZEC: scrapCoinotronZEC,
          f2PoolZEC: scrapingF2PoolZEC,
          avgZECProf: profAvg
        }
       
        res.send({ zecMiningPools });
       
      }
    
      scrapingZEC();
    
    });

//-------------------------------------- XMR scraping ----------------------
  
router.get('/miningPools/xmr/crawler', (req, res) => {
    
    async function moneroCryptoPool(page) {
  
      try {
  
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://monero.crypto-pool.fr/');
        const html = await page.content();
        const $ = cheerio.load(html);
    
        const poolName = 'Monero.crypto-pool';
        let networkDiff = $("#networkDifficulty").text();
        const netLastRew = $("#networkLastReward").text().replace(' XMR', '');
        const fee = 0.025;
        let profitability = ((netLastRew*86400)/networkDiff)+(((netLastRew*86400)/networkDiff)*fee);
        profitability = parseFloat(profitability.toFixed(8));
        let url = 'https://monero.crypto-pool.fr/';
    
        //console.log({networkDiff,netLastRew, profitability});
      return({poolName,networkDiff,netLastRew, profitability, url})
  
      } catch (error) {
          return error;
      }
  
  }
  
  
  async function minergateXMR(page) {
  
    try {
  
      await page.setDefaultNavigationTimeout(0);
      await page.goto('https://minergate.com/calculator/cryptonote');
      const html = await page.content();
      const $ = cheerio.load(html);
  
      const poolName = 'Minergate - XMR';
      let profitability = $("#app > div > div.main-app-container > div.container > div > div > div > div:nth-child(3) > table > tbody:nth-child(3) > tr:nth-child(1) > td:nth-child(3) > span:nth-child(1)").text();
     // console.log(profitability);
      profitability = parseFloat((profitability/1000).toFixed(8))
      let url = 'https://minergate.com/calculator/cryptonote';
  
  
      //console.log({ poolName, profitability,url });
      return ({ poolName, profitability, url  });
  
    } catch (error) {
      return error;
  
    }
  
  }
    
      //F2POOL
      async function f2poolXMR(page) {
        try {
     
          await page.setDefaultNavigationTimeout(0);
          await page.goto('https://www.f2pool.com/');
          const html = await page.content();
          const $ = cheerio.load(html);
    
    
          const poolName = 'F2Pool - XMR';
          const profWithFee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(20) > td > div > div > div.container-info.col-12.col-lg-6 > div > div.row.info-item.calc-inline.hash-val-container > div > div:nth-child(4) > span.pl-1.profit-val.info-value").text().trim());
          const fee = parseFloat($("#tab-content-main > table > tbody > tr:nth-child(20) > td > div > div > div.container-info.col-12.col-lg-6 > div > div:nth-child(5) > div.col-12.col-lg-4.item > div.info-value").text().replace("% PPS", ""));
          let profitability = parseFloat((profWithFee / ((100 - fee) / 100)).toFixed(8));
          profitability =  parseFloat((profitability/1000).toFixed(8));
          const url = 'https://www.f2pool.com/';
    
          //console.log({poolName, profWithFee, fee, profitability, url});
          return ({ poolName, profWithFee, fee, profitability, url });
    
        } catch (error) {
          return error;
        }
    
    }  
    
      const scrapingXMR = async () => {
        const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
        const page = await browser.newPage();
    
        //profitability calc
        let arrProf = [];
        const getSum = (total, numb) => {
          return total + numb;
        }
    
        let scrapingMoneroCryptoPool = await moneroCryptoPool(page);
        let profMoneroCryptoPool = scrapingMoneroCryptoPool.profitability;
        arrProf.push(profMoneroCryptoPool);
  
  
        let scrapingMinergateXMR = await minergateXMR(page);
        let profMiergateXMR = scrapingMinergateXMR.profitability;
        arrProf.push(profMiergateXMR);
  
        let scrapingF2PoolXMR = await f2poolXMR(page);
        let profF2PoolXMR = scrapingF2PoolXMR.profitability;
        arrProf.push(profF2PoolXMR); 
    
    
        let profAvg = arrProf.reduce(getSum);
        profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
    
        //--------------------------------
    
        const xmrMiningPools = {
          moneroCryptoPool: scrapingMoneroCryptoPool,
          f2PoolXMR: scrapingF2PoolXMR,
          minergateXMR: scrapingMinergateXMR,
          avgXmrMiningProf: profAvg
          
        }
       
        res.send({ xmrMiningPools});
       
      }
    
      scrapingXMR();
    
    });


  //----------------------- BEAM scraping -------------------------
  router.get('/miningPools/beam/crawler', (req, res) => {
    
    async function crypt0zoneBEAM() {
  
      try {
    
        const browser = await puppeteer.launch({headless:true, args: ["--no-sandbox"]});
        const page = await browser.newPage(); 
    
        await page.setDefaultNavigationTimeout(0);
        await page.goto('https://crypt0.zone/calculator/details/BEAM?hr=1&pwr=0&ec=0.0&fee=0&selected_exchange=42&cur=USD&average=24h&exchange=0');
        const html = await page.content();
        const $ = cheerio.load(html);
    
        const poolName = 'Crypt0zone';
        const profitability = $("#calculator-details-result > div > table > tbody > tr:nth-child(2) > td.text-nowrap.p-2.table-light").text().trim().replace("BEAM", "");
        let url = 'https://crypt0.zone/calculator/details/BEAM?hr=1&pwr=0&ec=0.0&fee=0&selected_exchange=42&cur=USD&average=24h&exchange=0';
    
      //console.log({poolName, profitability, url});
      return({poolName, profitability, url})
    
      } catch (error) {
          return error;;
      }
    
    }
    
      const scrapingBEAM = async () => {
        const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
        const page = await browser.newPage();
    
        //profitability calc
        let arrProf = [];
        const getSum = (total, numb) => {
          return total + numb;
        }
    
  
        let scrapingCrypt0Zone = await crypt0zoneBEAM(page);
        let profCrypt0Zone = scrapingCrypt0Zone.profitability;
        arrProf.push(profCrypt0Zone);
    
    
        let profAvg = arrProf.reduce(getSum);
        profAvg = parseFloat((profAvg / arrProf.length).toFixed(8));
    
        //--------------------------------
    
        const beamMiningPools = {
          crypt0Zone: scrapingCrypt0Zone,
          avgBeamMiningProf: profAvg
          
        }
       
        res.send({ beamMiningPools});
       
      }
    
      scrapingBEAM();
    
    });  
  
  module.exports = router;
  