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
	let status = transactions[0];
	let location = transactions[1];
	let company = transactions[2];
	let price = transactions[3]; 
	let start = transactions[4];
	let end = transactions[5]; 

	return [status, location, company, price, start, end]
 /*
	for(let i = 0; i < transactions[0].length; i++){
		console.log(status[i].toNumber());
		console.log(web3.toAscii(location[i]));
		console.log(web3.toAscii(company[i]));
		console.log(price[i].toNumber());
		console.log(start[i].toNumber());
		console.log(end[i].toNumber());
	}
   */
}