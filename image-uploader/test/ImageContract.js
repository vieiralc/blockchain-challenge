const ImageContract = artifacts.require("./ImageContract.sol");
const assert = require("assert");
const truffleAssert = require("truffle-assertions");

var contractInstance;
var hash = "QmU2RvWtScFD68Zp3PjMVJs4vRXQVj2txeBc1SM5TgyPLN";
var allowedViewNumber = 3;

contract("ImageContract", accounts => {

  beforeEach(async () => {
    contractInstance = await ImageContract.deployed()
  })

  it("sets a hash correctly and allowed view number", async () => {
    await contractInstance.setHash(hash, allowedViewNumber, { from: accounts[0]});
    let returnedHash = await contractInstance.getHash({ from: accounts[0] });
    let returnedAllowedViewNumber = await contractInstance.getAllowedViewNumber.call({ from: accounts[0] });
    assert(returnedHash, hash, "Sets the correct hash");
    assert(returnedAllowedViewNumber, allowedViewNumber, "Has the correct view number");
  });

  it("sets times viewd correctly", async () => {
    // viewd starts with 0;
    let result = await contractInstance.setViewd({ from: accounts[0] }) // increments viewd
    truffleAssert.eventEmitted(result, 'incrementViewd', event => {
      return event.viewd == 1;
    }, "incrementViewd should be emitted with correct parameters");
  })

  it("gets the correct viewd number", async () => {
    let viewd = await contractInstance.getViewd.call({ from: accounts[0] });
    assert(viewd, 0, "returns the correct viewd number");
  })

  it("gets the correct allowed view number", async() => {
    let viewNumber = await contractInstance.getAllowedViewNumber.call({ from: accounts[0] });
    assert(viewNumber, allowedViewNumber, "returns the correct allowed view number");
  })

  it("should revert the transaction", async () => {
    for(let i = 0; i < allowedViewNumber; i++)
      await contractInstance.setViewd({ from: accounts[0] });

    await truffleAssert.reverts(
      contractInstance.getHash({ from: accounts[0] }), 
      null,
      "the hash should be viewd only a limited time"  
    )
  })

});
