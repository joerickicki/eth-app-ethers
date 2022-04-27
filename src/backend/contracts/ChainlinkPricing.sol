// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "hardhat/console.sol";

contract ChainlinkPricing {

    struct Price{
        string Network;
        string Symbol;
        int Price;
        uint Decimals;
    }

    mapping (string => mapping(string => AggregatorV3Interface)) internal PriceList;

    constructor() {
        PriceList["Kovan"]["ETH"] = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
        PriceList["Kovan"]["BTC"] = AggregatorV3Interface(0x6135b13325bfC4B00278B4abC5e20bbce2D6580e);
        PriceList["Kovan"]["SNX"] = AggregatorV3Interface(0x31f93DA9823d737b7E44bdee0DF389Fe62Fd1AcD);
        PriceList["Kovan"]["MANA"] = AggregatorV3Interface(0x31f93DA9823d737b7E44bdee0DF389Fe62Fd1AcD);
        PriceList["Harmony_Testnet"]["ETH"] = AggregatorV3Interface(0x4f11696cE92D78165E1F8A9a4192444087a45b64);
        PriceList["Harmony_Testnet"]["WBTC"] = AggregatorV3Interface(0xEF637736B220a58C661bfF4b71e03ca898DCC0Bd);
        PriceList["Harmony_Testnet"]["ONE"] = AggregatorV3Interface(0xcEe686F89bc0dABAd95AEAAC980aE1d97A075FAD);
        PriceList["Harmony_Testnet"]["LINK"] = AggregatorV3Interface(0xcd11Ac8C18f3423c7a9C9d5784B580079A75E69a);
    }

    function getPrices(string memory _network, string[] memory _symbols) public view returns (Price[] memory) {

        Price[] memory prices = new Price[](_symbols.length);

        for (uint i=0; i<_symbols.length; i++) {

            (, int256 feedPrice, , ,) = PriceList[_network][_symbols[i]].latestRoundData();
            require(feedPrice > 0, "Chainlink price <= 0"); 
            uint8 baseDecimals = PriceList[_network][_symbols[i]].decimals();

            Price memory priceObj = Price(_network, _symbols[i], feedPrice, baseDecimals);
            prices[i] = priceObj;
        }

        return prices;
    }
}
