const solc = require('solc');
const express = require('express')
const path= require('path');
const fs = require('fs')
const Web3 = require('web3')
let app = express();

var web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.apothem.network/"))

var solc_version = "0.8.17+commit.8df45f5f";

var contracts_directory = "./contracts";
var contract_name = "IfElse";
var contract_filename = "Condition.sol";
var is_optimized = 1;

var contract_address = "0x44d698bF7784ffC8b1b87AF23F61c5EFF1FAF9f6";

solc.loadRemoteVersion(solc_version, function (err, solc_specific) {
  if(!err) {
      var output = solc.compile("contract t { function g() {} }", 1)
      console.log(output)
  }
  else{
    console.log(err)
  }
})





// Load the specified version of solc from the remote location
// solc.loadRemoteVersion(solc_version, async function (err, solc_specific) {
//   if (err) {
//     console.error(err);
//     return;
//   }
  
//   const contractPath = path.join(contracts_directory, contract_filename);
//   const contractCode = fs.readFileSync(contractPath).toString();
//   console.log(contractCode)

//   const input = {
  //   language: 'Solidity',
  //   sources: {
  //     [contract_filename]: {
  //       content: contractCode,
  //     },
  //   },
  //   settings: {
  //     outputSelection: {
  //       '*': {
  //         '*': ['*']
  //       }
  //     }
  //   }
  // };
  // console.log("hello");

  // const output = JSON.parse(solc_specific.compile(JSON.stringify(input)));
  // var compiled_bytecode =(output.contracts[contract_filename][contract_name].evm.bytecode.object);
  // var blockchain_bytecode = await web3.eth.getCode(contract_address);
  // console.log("solc code===",compiled_bytecode);
  // console.log("web3 code===",blockchain_bytecode);

  // processed_compiled_bytecode = processBytecode(compiled_bytecode);
  // processed_blockchain_bytecode = processBytecode(blockchain_bytecode);

  // if (processed_blockchain_bytecode == processed_compiled_bytecode) {
  //     console.log(" Verified!")
  // } else {
  //     console.log("not Verified")
  // }

//  });

function processBytecode(bytecode) {
  // Semantic versioning
  let solc_minor = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[0].slice(1))
  let solc_patch = parseInt(solc_version.match(/v\d+?\.\d+?\.\d+?[+-]/gi)[0].match(/\.\d+/g)[1].slice(1))

  if (solc_minor >= 4 && solc_patch >= 22) {
    console.log("if 1");
      var starting_point = bytecode.lastIndexOf('6080604052');
      var ending_point = bytecode.search('a165627a7a72305820');
      return bytecode.slice(starting_point, ending_point);
  } else if (solc_minor >= 4 && solc_patch >= 7) {
    console.log("if 2");
      var starting_point = bytecode.lastIndexOf('6060604052');
      var ending_point = bytecode.search('a165627a7a72305820');
      return bytecode.slice(starting_point, ending_point);
  } else {
    console.log("if 3");
      return bytecode;
  }
}


app.listen(3000, function () {
    console.log('contract code is running on port 3000');
})