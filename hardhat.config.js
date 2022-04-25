require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  networks: {
    kovan: {
      url: 'https://kovan.infura.io/v3/559430f6da294e8caa01a4992d582713',
      accounts: ['b41c93dd512a8d6d4288650f1152bba3291e3a131c266b35944d4322f28978bd']
    },
    harmony_testnet: {
      url: 'https://api.s0.b.hmny.io',
      accounts: ['0xdde3346425d4153203b3c5967d121695c699179b08b40a1e3faecc645d8b6195']
    }
  }
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});