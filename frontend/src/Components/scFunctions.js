import Web3 from 'web3';

//var web3 = new Web3(window.web3.currentProvider);
//var web3 = new Web3();
//const web3 = new Web3(window.web3.currentProvider);
//web3.setProvider(new web3.providers.HttpProvider("ropsten.infura.io/v3/d5986ef6af2c4fc789de177d15ba654c"))
//web3.providers.HttpProvider("ropsten.infura.io/v3/d5986ef6af2c4fc789de177d15ba654c")
//const web3 = new Web3(Web3.givenProvider)
//const web3 = new Web3(new Web3.providers.HttpProvider(""));
//const web3 = new Web3(new Web3.providers.HttpProvider("ropsten.infura.io/TOKEN"))
const web3 = new Web3(window.web3.currentProvider);
const address = '0x9bf492b3063db9f18c91c0edc855b5ac917976ff';

const abi =[
	{
	    "constant": false,
	    "inputs": [
			{
			    "name": "_location",
			    "type": "bytes32"
			}
	    ],
	    "name": "deleteRental",
	    "outputs": [],
	    "payable": true,
	    "stateMutability": "payable",
	    "type": "function"
	},
	{
	    "constant": false,
	    "inputs": [],
	    "name": "deleteRentals",
	    "outputs": [],
	    "payable": true,
	    "stateMutability": "payable",
	    "type": "function"
	},
	{
	    "constant": false,
	    "inputs": [
			{
			    "name": "_status",
			    "type": "uint256"
			},
			{
			    "name": "_location",
			    "type": "bytes32"
			},
			{
			    "name": "_rentee",
			    "type": "bytes32"
			},
			{
			    "name": "_price",
			    "type": "uint256"
			},
			{
			    "name": "_start",
			    "type": "uint256"
			},
			{
			    "name": "_end",
			    "type": "uint256"
			},
			{
			    "name": "_company",
			    "type": "bytes32"
			}
	    ],
	    "name": "rentProperty",
	    "outputs": [],
	    "payable": true,
	    "stateMutability": "payable",
	    "type": "function"
	},
	{
	    "inputs": [],
	    "payable": false,
	    "stateMutability": "nonpayable",
	    "type": "constructor"
	},
	{
	    "anonymous": false,
	    "inputs": [
			{
			    "indexed": false,
			    "name": "transaction",
			    "type": "bool"
			}
	    ],
	    "name": "transactionResult",
	    "type": "event"
	},
	{
	    "constant": true,
	    "inputs": [
			{
			    "name": "_index",
			    "type": "uint256"
			}
	    ],
	    "name": "getRecentRentals",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256[]"
			},
			{
			    "name": "",
			    "type": "bytes32[]"
			},
			{
			    "name": "",
			    "type": "bytes32[]"
			},
			{
			    "name": "",
			    "type": "uint256[]"
			},
			{
			    "name": "",
			    "type": "uint256[]"
			},
			{
			    "name": "",
			    "type": "uint256[]"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [
			{
			    "name": "",
			    "type": "bytes32"
			}
	    ],
	    "name": "indexes",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "name": "rentals",
	    "outputs": [
			{
			    "name": "status",
			    "type": "uint256"
			},
			{
			    "name": "location",
			    "type": "bytes32"
			},
			{
			    "name": "rentee",
			    "type": "bytes32"
			},
			{
			    "name": "price",
			    "type": "uint256"
			},
			{
			    "name": "start",
			    "type": "uint256"
			},
			{
			    "name": "end",
			    "type": "uint256"
			},
			{
			    "name": "company",
			    "type": "bytes32"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	},
	{
	    "constant": true,
	    "inputs": [],
	    "name": "transactions",
	    "outputs": [
			{
			    "name": "",
			    "type": "uint256"
			}
	    ],
	    "payable": false,
	    "stateMutability": "view",
	    "type": "function"
	}
]

const myContract = window.web3.eth.contract(abi)
var contractInstance = myContract.at(address)
//let contractInstance = new web3.eth.Contract(abi, address);
//let account = web3.eth.accounts.privateKeyToAccount('0x7297FCF507361463D92691E2E68B3C6F88CEE23244147F6FD62937C0B170A66C'); 
//web3.personal.unlockAccount(account.address, account.privateKey, 200)

//web3.eth.defaultAccount = '0xDde2198546C886707971D580eDB1FfA8bC949e57';
//web3.personal.unlockAccount("0xDde2198546C886707971D580eDB1FfA8bC949e57", "0x7297FCF507361463D92691E2E68B3C6F88CEE23244147F6FD62937C0B170A66C", 600)
//.then(console.log('Account unlocked!'));
// Connect to smart contract

//web3.eth.defaultAccount = '0xDde2198546C886707971D580eDB1FfA8bC949e57';

const scRent = (prop, company, status) => { 
	var myStatus = 1;
	if (status == null) {
		myStatus = prop.status
		console.log("null status passed in")
	} else {
		myStatus = status; 
	}
	contractInstance.rentProperty(
		myStatus, web3.fromAscii(prop.location), "0x79616e67", prop.price, prop.start, prop.end, web3.fromAscii(company),
		{from: web3.eth.defaultAccount, gas: 3000000, value: 100}, function(err, res){});
}


const getRents = () => {
	return new Promise((resolve, reject) => {
		contractInstance.getRecentRentals(0, (err, transactions) => {
			//  let ones = new Array(transactions).fill(0);
			  let status = transactions[0];
		      let location = transactions[1];
			  let company = transactions[2];
		      let price = transactions[3]; 
			  let start = transactions[4];
			  let end = transactions[5];
              console.log(status[1])
			  resolve([status, location, company, price, start, end]); 
		})
	})
};

	/*
	let status = transactions[0];
	let location = transactions[1];
	let company = transactions[2];
	let price = transactions[3]; 
	let start = transactions[4];
	let end = transactions[5]; 

	return [status, location, company, price, start, end]
	*/
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


export { scRent, getRents }