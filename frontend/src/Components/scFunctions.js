const Web3 = require('web3');

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


// Connect to smart contract
const contract = require('./smartContract.js');
var HomeAway = contract.smartContractSetUp(web3);

var exports = module.exports = {};


exports.scRent = (prop, company) => { 
	HomeAway.rentProperty(
		web3.fromAscii(prop.location), "0x79616e67", prop.price, prop.start, prop.end, web3.fromAscii(company),
		{from: web3.eth.accounts[0], gas: 3000000, value: 100}, function(err, res){});
}


exports.getRents = () => {
	var transactions = HomeAway.getRecentRentals(0)

	var myNum = transactions[3][2];
	console.log(myNum.toNumber())

	var props = transactions[1];
	console.log(props)
   
}