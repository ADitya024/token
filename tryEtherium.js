var Web3 = require('web3');
// var web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7876");
// var web3 = new Web3(Web3.givenProvider || "http://10.10.10.66:8546");
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://10.10.10.66:8546'));
var express = require('express'); 
var router = express.Router();
const fs = require('fs');
const solc = require('solc');
var Eth = require('web3-eth');
var path    = require("path");
// console.log(web3.eth.accounts);

var baseAccount="0x194fd2198ca9822a0933352a2f1007b4ef1eb31d";
// web3.eth.getAccounts().then(
//   e =>  let baseAccount=e[0]
// );

router.get('/accounts',(req,res)=>{
  res.send({
    "accounts": web3.eth.getCoinbase()
  });
})

router.get("/createContract",(req,res)=>{
  res.sendFile(__dirname+'/View/createContract.html');
});

router.get("/callMethod",function(res,req){
  web3.eth.personal.unlockAccount(baseAccount,"simplyfi",10).then(e=> {
    // Compile the source code
    const input = fs.readFileSync('./goku_contract_abi.json');
    console.log("Contract : "+input.toString());

    const output = solc.compile(input.toString(), 1);
    console.log("contract compiled");
    var bytecode ="";
    for (var contractName in output.contracts){
      bytecode=output.contracts[contractName].bytecode
      console.log(contractName + ' => ' + bytecode)
    }
    var contractAddress = "0x15d8ec97cc04f987081a5a19b2b0554938b0658a";
    const abi = input.toString();
    // Contract object
    const contract = new web3.eth.Contract(JSON.parse(abi), contractAddress);
    
    // , {
    //   data: bytecode,
    //   from: baseAccount,
    //   gas: 100000
    //   }

    // , (err, res) => {
    //   if (err) {
    //       console.log(err);
    //       return;
    //   }
    //     // Log the tx, you can explore status with eth.getTransaction()
    //     console.log(res.transactionHash);
  
    //     // If we have an address property, the contract was deployed
    //     if (res.address) {
    //         console.log('Contract address: ' + res.address);
    //         // Let's test the deployed contract
    //         // testContract(res.address);
    //     }
    //   }

    try{
      contract.transfer("0x68b5ac1b15e1993c617c85baa2a74aa9dfe7afcc",1000);
    }catch(e){
      console.log("Error : "+e);
    }

    contract.transfer("0x68b5ac1b15e1993c617c85baa2a74aa9dfe7afcc",1000).then(e=> {
      console.log("Transfer : "+e);
    });
}
);
})


  router.get("/web3",function(req,res){    
      res.send({
          "web3":CircularJSON.stringify(web3)
      });
  });

router.get('/newAccount/:password',function(req,res){
  var pass = req.params.password;
  web3.eth.personal.newAccount(pass, function(err,data){
    if(!err){
      console.log("data :"+data);
      res.status(200).send({
        "isAccountCreated":true,
        "address":data
      });      
    } else{
      res.status(500).send({
        "isAccountCreated":false
      });
        }   
  })

})

var errHandler = function(err) {
  console.log(err);
}




module.exports=router;