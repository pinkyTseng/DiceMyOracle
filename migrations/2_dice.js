
var Oracle = artifacts.require("Oracle");

var OracleResolver = artifacts.require("OracleResolver");

var Dice = artifacts.require("Dice");

module.exports = async function(deployer) {
    // deploy a contract
    await deployer.deploy(Oracle);
    const oracle = await Oracle.deployed();

    const accounts = await web3.eth.getAccounts();
    //deployer.deploy(B, A.address);
    await oracle.setCbAddress(accounts[0]);

    await deployer.deploy(OracleResolver);
    const oracleResolver = await OracleResolver.deployed();
    await oracleResolver.setOracleAddress(Oracle.address);


    await deployer.deploy(Dice, OracleResolver.address);
    const dice = await Dice.deployed();
    
    console.log("below is impotant addr~~~~~")
    
    console.log("callbackAddrStr: "+accounts[0])
    console.log("oracleAddrStr: "+Oracle.address)
    console.log("diceAddrStr: "+Dice.address)



    //await dice.setOracleAddress(OracleResolver.address);
    //deployer.deploy(A, arg1, arg2, ...);
}