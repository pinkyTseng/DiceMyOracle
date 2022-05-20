
var Oracle = artifacts.require("Oracle");

var OracleResolver = artifacts.require("OracleResolver");

var Dice = artifacts.require("Dice");

var fs = require('fs')

module.exports = async function(deployer) {
    await deployer.deploy(Oracle);
    const oracle = await Oracle.deployed();

    const accounts = await web3.eth.getAccounts();
    await oracle.setCbAddress(accounts[0]);

    await deployer.deploy(OracleResolver);
    const oracleResolver = await OracleResolver.deployed();
    await oracleResolver.setOracleAddress(Oracle.address);

    await deployer.deploy(Dice, OracleResolver.address);
    const dice = await Dice.deployed();
    
    console.log("callbackAddrStr: "+accounts[0])
    console.log("oracleAddrStr: "+Oracle.address)
    console.log("diceAddrStr: "+Dice.address)
    
    var contractObj = {}
    contractObj.oracleAddr = Oracle.address
    contractObj.diceAddr = Dice.address
    contractObj.oracleResolverAddr = OracleResolver.address

    let mySettingDir = process.env.MyGethOracleSetting
    fs.writeFileSync(mySettingDir+'ContractAddresses.json', JSON.stringify(contractObj))
    console.log("2_dice finished")    
    
}