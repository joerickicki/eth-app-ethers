import React from 'react'

import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'

import ChainlinkPricingAbi from '../contractsData/ChainlinkPricing.json'

var utils = require('ethers').utils;
require('dotenv').config()

let btcValue = 0;
let ethValue = 0;
let snxValue = 0;

const Trade = ({ marketplace, nft }) => {
  const [loading, setLoading] = useState(true)

  async function getPrices() {

    //KOVAN Pricing
  
    //let url = 'https://kovan.infura.io/v3/559430f6da294e8caa01a4992d582713';
    //let provider = new ethers.providers.JsonRpcProvider(url);
    //const signer = provider.getSigner();
    const CHAINLINK_PRICING_ADDRESS = '0x05607C44d628DA624802b003B63EB266E0a8D602';
    // const contractABI = [
    //   "function getPrices(string memory _network, string[] memory _symbols) public view returns (Price[] memory)"
    // ];

    const provider = new ethers.providers.InfuraProvider("kovan", "559430f6da294e8caa01a4992d582713")
    //const signer = provider.getSigner()

    // Contract Instance
    const chainlinkPricing = new ethers.Contract(CHAINLINK_PRICING_ADDRESS, ChainlinkPricingAbi.abi, provider);

    // For view function
    let chainlinkPricingResult = await chainlinkPricing.getPrices("Kovan", ["BTC","SNX","ETH"]);

    console.log(chainlinkPricingResult);

    btcValue = chainlinkPricingResult[0].Price.toNumber() / (10**chainlinkPricingResult[0].Decimals.toNumber());
    snxValue =  chainlinkPricingResult[1].Price.toNumber() / (10**chainlinkPricingResult[1].Decimals.toNumber());
    ethValue =  chainlinkPricingResult[2].Price.toNumber() / (10**chainlinkPricingResult[2].Decimals.toNumber());

    setLoading(false);
  }

  useEffect(() => {
    getPrices()
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
                <Card>
                  <Card.Footer>{btcValue} BTC</Card.Footer>
                </Card>
                <Card>
                  <Card.Footer>{snxValue} SNX</Card.Footer>
                </Card>
                <Card>
                  <Card.Footer>{ethValue} ETH</Card.Footer>
                </Card>
              </Col>
           </Row> 
        </div>
    </div>
  );
}
export default Trade