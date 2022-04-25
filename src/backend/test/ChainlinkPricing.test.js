const { expect } = require("chai"); 

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("ChainlinkPricing", function () {

  let ChainlinkPricing;
  let chainlinkPricing;
  // let Marketplace;
  // let marketplace
  let deployer;
  let addr1;
  let addr2;
  let addrs;
  // let feePercent = 1;
  // let URI = "sample URI"

  beforeEach(async function () {
    // Get the ContractFactories and Signers here.
    ChainlinkPricing = await ethers.getContractFactory("ChainlinkPricing");
    //Marketplace = await ethers.getContractFactory("Marketplace");
    [deployer, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contracts
    chainlinkPricing = await ChainlinkPricing.deploy()
    // nft = await NFT.deploy();
    // marketplace = await Marketplace.deploy(feePercent);
  });

  describe("GetPrices", function () {

    it("Should get the price of single token", async function () {
      this.skip()

      // This test expects the owner variable stored in the contract to be equal
      // to our Signer's owner.
      const symbols = ["BTC"]
      const network = "Kovan"
      let result = await chainlinkPricing.getPrices(network, symbols)
      expect(result.Price).greaterThan(0);
    });
  });

})
