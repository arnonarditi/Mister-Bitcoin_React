import axios from "axios";
// import {storageService} from './storage.service'

export const bitcoinService = {
  getBitcoin,
  getAvgBlockSize,
  getAvgBtcToUsd,


};

async function getBitcoin(coins) {
  try {
    const response = await (
      await axios.get(
        `https://blockchain.info/tobtc?currency=USD&value=${coins}`
      )
    ).data;
    return response;
  } catch (error) {
    console.log(error);
  }
}


async function getAvgBlockSize() {
  try {
    const response = await (
      await axios.get(
        `https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true`
      )
    ).data;
    let res = [];
    if (response.values.length > 100) {
      res = response.values.reduce((acc,val, idx) => {
        if (idx % 10 === 0) {
            val = {MB:val.y , name:new Date(val.x).toLocaleTimeString()}
            acc.push(val)
        };
        return acc
      }, []);
    }
    return res;
  } catch (error) {
    console.log(error);
  }
}

getAvgBtcToUsd()

async function getAvgBtcToUsd() {
    try {
      const response = await (
        await axios.get(
          `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
        )
      ).data;
      let res = [];
      if (response.values.length > 100) {
         res = response.values.reduce((acc,val, idx) => {
          if (idx % 10 === 0) {
              val = {USD:val.y  , name:new Date(val.x).toLocaleTimeString()}
              delete val.x
              acc.push(val)
          };
          return acc
        }, []);
      }
      return res;
    } catch (error) {
      console.log(error);
    }
  }