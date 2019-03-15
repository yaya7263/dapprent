//module.exports = (web3) => {
var smartContractSetUp = function(web3) {
    var HomeAwayContract = web3.eth.contract([
    {
        "constant": false,
        "inputs": [
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
        "constant": false,
        "inputs": [],
        "name": "deleteRentals",
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
    }
]);

    var HomeAway = HomeAwayContract.at('0xed2c8dbca6905cc60333ac08f0479f038f3c368b');       // Actual contract address
    console.log("Successfully connected to Smart Contract!")

    return HomeAway;


};


module.exports.smartContractSetUp = smartContractSetUp;