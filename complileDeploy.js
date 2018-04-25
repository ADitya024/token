// FILE: compileDeploy.js
console.log('Setting up...');
const fs = require ('fs');
const solc = require ('solc');
const Web3 = require ('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8989"));
console.log('Reading Contract...');
const input = fs.readFileSync('Token.sol');
console.log('Compiling Contract...');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':token'].bytecode;
const abi = output.contracts[':token'].interface;
//Contract Object
const helloWorldContract = web3.eth.contract(JSON.parse(abi));
console.log('unlocking Coinbase account');
const password = "yourPassword";
try {
  web3.personal.unlockAccount(web3.eth.coinbase, password);
} catch(e) {
  console.log(e);
  return;
}
console.log("Deploying the contract");
const helloWorldContractInstance = helloWorldContract.new({
    data: '0x' + bytecode,
    from: web3.eth.coinbase,
    gas: 1000000
}, (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(res.transactionHash);
    // If we have an address property, the contract was deployed
    if (res.address) {
        console.log('Contract address: ' + res.address);
    }
});