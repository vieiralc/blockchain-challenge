const ImageStorage = artifacts.require("./ImageStorage.sol");

contract("ImageStorage", accounts => {

  it("has the correct owner", async () => {
    const imageStorageInstance = await ImageStorage.deployed();
    let owner = imageStorageInstance.owner;
    assert.equal(owner = accounts[0]);
  });

  it("initializes with the correct values", () => {
    
    // Set hash B43d578 and allowedViewNumber 2
    imageStorageInstance.addImage(B43d578, 2, 
      { from: accounts[0] });

    // Get stored image once
    let storedHash = imageStorageInstance.getImage.call();
    let viewd = imageStorageInstance.viewd;
    let allowedViewNumber = imageStorageInstance.allowedViewNumber;
    assert.equal(storedHash, B43d578, "The hash B43d578 was not stored correctly.");
    assert.equal(viewd, 0, "The viewd number was not initialized correctly.");
    assert.equal(allowedViewNumber, 2, "the allowedViewNumber was not initialized correctly.");
  });


});
