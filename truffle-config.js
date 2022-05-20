const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
let mySettingDir = process.env.MyGethOracleSetting
const pkeys = fs.readFileSync(mySettingDir+"privateKey.json").toString().trim()
let pkeysObj = JSON.parse(pkeys)
let pk = pkeysObj.DeployerPrivateKey
let INFURA_PROJECT_ID = pkeysObj.INFURA_PROJECT_ID

let privateKeys = [pk];

module.exports = {
  
  networks: {
    
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)     
      provider: function() {          
        return new HDWalletProvider(privateKeys, "http://localhost:8545");
      },
      network_id: 1337,       // Any network (default: none)
     },
     rinkeby: {
      provider: function() {          
        return new HDWalletProvider(privateKeys, `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`);
      },
      network_id: 4      
    }    
    
  },


  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)      
    }
  },
};
