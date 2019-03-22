import Web3 from 'web3';

var web3 = new Web3(window.web3.currentProvider);

const address = '0x52741cc51640d52d5b801e6e1fd5094c996f7ea5';

const abi =[
    {
        "constant": false,
        "inputs": [
            {
                "name": "newAddress",
                "type": "address"
            }
        ],
        "name": "addMarket",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "location_",
                "type": "string"
            },
            {
                "name": "rentor",
                "type": "string"
            },
            {
                "name": "rentStart_",
                "type": "uint256"
            },
            {
                "name": "rentEnd_",
                "type": "uint256"
            },
            {
                "name": "price_",
                "type": "uint256"
            },
            {
                "name": "currentTime_",
                "type": "uint256"
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
        "inputs": [
            {
                "name": "location_",
                "type": "string"
            }
        ],
        "name": "getProperty",
        "outputs": [
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "string"
            },
            {
                "name": "",
                "type": "bool"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
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
        "inputs": [
            {
                "name": "location_",
                "type": "string"
            }
        ],
        "name": "openForRent",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getProperties",
        "outputs": [
            {
                "name": "",
                "type": "uint256[4]"
            },
            {
                "name": "",
                "type": "bool[4]"
            },
            {
                "name": "",
                "type": "uint256[4]"
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
                "name": "location_",
                "type": "string"
            },
            {
                "name": "price_",
                "type": "uint256"
            }
        ],
        "name": "addProperty",
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
        "name": "properties",
        "outputs": [
            {
                "name": "owner",
                "type": "address"
            },
            {
                "name": "rentor",
                "type": "string"
            },
            {
                "name": "location",
                "type": "string"
            },
            {
                "name": "marketplace",
                "type": "string"
            },
            {
                "name": "forRent",
                "type": "bool"
            },
            {
                "name": "hash",
                "type": "uint256"
            },
            {
                "name": "price",
                "type": "uint256"
            },
            {
                "name": "rentStart",
                "type": "uint256"
            },
            {
                "name": "rentEnd",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }
]

var myContract = web3.eth.contract(abi, address)
export default myContract; 