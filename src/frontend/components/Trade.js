import React from 'react'

import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

import ChainlinkPricingAbi from '../contractsData/ChainlinkPricing.json'

var utils = require('ethers').utils;
require('dotenv').config()

const Web3 = require('web3');
const BN = require('bn.js');

const Trade = ({ marketplace, nft }) => {

  let networkArray = ["Kovan", "Harmony_Testnet"];

  const [loading, setLoading] = useState(true)
  const [priceArray, setPriceArray] = useState([])

  async function getPrices(_network) {

    let chainlinkPricing;
    let chainlinkPricingResult;
    let symbolArray = new Array()
    let updatedPriceArray = new Array()

    switch(_network)
    {
      case "Kovan":
        symbolArray = ["BTC","SNX","ETH","MANA"]
        const CHAINLINK_PRICING_ADDRESS = '0xA89a929446f805DF6aaAA47a850D2A025e967A60';
        const provider = new ethers.providers.InfuraProvider("kovan", "559430f6da294e8caa01a4992d582713")
        chainlinkPricing = new ethers.Contract(CHAINLINK_PRICING_ADDRESS, ChainlinkPricingAbi.abi, provider);
        chainlinkPricingResult = await chainlinkPricing.getPrices(_network, symbolArray);
        break;
      case "Harmony_Testnet":
        symbolArray = ["ETH","WBTC","ONE","LINK"]
        const HARMONY_CHAINLINK_PRICING_ADDRESS = '0x557419017d32262F6696De453178F082c4fb6781';
        const Harmony_PRIVATE_KEY = '0xdde3346425d4153203b3c5967d121695c699179b08b40a1e3faecc645d8b6195';
        const Harmony_TESTNET_RPC_URL = 'https://api.s0.b.hmny.io';
        // const web3 = new Web3(Harmony_TESTNET_RPC_URL);
        // let hmyMasterAccount = web3.eth.accounts.privateKeyToAccount(Harmony_PRIVATE_KEY);
        // web3.eth.accounts.wallet.add(hmyMasterAccount);
        // web3.eth.defaultAccount = hmyMasterAccount.address

        //Get the JSON abi interface definition in whichever way you prefer into an object.
//let myInterface = require('../my_contracts/my_contract_interface.json')

//Pass in the abi property of the object
//let contract = new this.web3.eth.Contract(myInterface.abi)

        let web3 = new Web3(new Web3.providers.HttpProvider(Harmony_TESTNET_RPC_URL));
        let abi = require('../../frontend/contractsData/ChainlinkPricing.json');
        chainlinkPricing = new web3.eth.Contract(abi.abi, HARMONY_CHAINLINK_PRICING_ADDRESS);

        //chainlinkPricing = new web3.eth.Contract(ChainlinkPricingAbi.abi, HARMONY_CHAINLINK_PRICING_ADDRESS);
        chainlinkPricingResult = await chainlinkPricing.methods.getPrices(_network, symbolArray).call();
        //    const compAPY = Web3.utils.toBN(((((Math.pow((supplyRatePerBlock / ethMantissa * blocksPerDay) + 1, daysPerYear))) - 1) * 100) * ethMantissa)

        break;
      default:
        symbolArray = ["ETH"]
    }

    for (let i=0; i< symbolArray.length; i++){  
        let price = chainlinkPricingResult[i].Price;
        let decimals = chainlinkPricingResult[i].Decimals;

        try{
            price = chainlinkPricingResult[i].Price.toNumber();
            decimals = chainlinkPricingResult[i].Decimals.toNumber();
        }
        catch {}

        let tokenValue = price / (10**decimals);   
        updatedPriceArray[i] = {symbol: symbolArray[i], price: tokenValue};

        setPriceArray(updatedPriceArray);
    }

    setLoading(false);
  }

  useEffect(() => {
    getPrices(networkArray[1])
  }, [])

  if (loading) return (
    <main style={{ padding: "1rem 0" }}>
      <h2>Loading...</h2>
    </main>
  )
  return (
    <div className="flex justify-center">
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">   
              <Col className="overflow-hidden">
              {networkArray.map((name, idx) => (
                  <Card key={idx}>
                    <Card.Footer><button onClick={e => getPrices(name)}>{name}</button> 
                    </Card.Footer>
                  </Card>
              ))}
              {priceArray.map((item, idx) => (
                  <Card key={idx}>
                    <Card.Footer>{item.price} {item.symbol} </Card.Footer>
                  </Card>
              ))}
              </Col>
           </Row> 
        </div>
    </div>
  );
}
export default Trade