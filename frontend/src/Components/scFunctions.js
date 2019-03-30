import Web3 from 'web3';

//var web3 = new Web3(window.web3.currentProvider);
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/<api key>"));

const address = '0xcad323ee64975c11c4719e2df30ec8596f449570';

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

// Connect to smart contract

const scRent = (prop, company) => { 
	contractInstance.rentProperty(
		prop.status, web3.fromAscii(prop.location), "0x79616e67", prop.price, prop.start, prop.end, web3.fromAscii(company),
		{from: window.web3.eth.accounts[0], gas: 3000000, value: 100}, function(err, res){});
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