const Web3 = require('web3');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

// Connect to smart contract
const contract = require('./components/smartContract.js');
var HomeAway = contract.smartContractSetUp(web3);

//HomeAway.rentProperty(253, {from: web3.eth.accounts[0], gas: 9999000, value: 100}, function(err, res){ });


//HomeAway.rentProperty("0x79616e67","0x79616e67", 999,123, 321, "0x79616e67", {from: web3.eth.accounts[0], gas: 999900000, value: 999999}, function(err, res){});
HomeAway.rentProperty("0x79616e67","0x79616e67", 999,123, 321, "0x79616e67", {from: web3.eth.accounts[0], gas: 3000000, value: 100}, function(err, res){});
console.log(HomeAway.transactions())

