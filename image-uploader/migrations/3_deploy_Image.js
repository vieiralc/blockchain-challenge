var ImageContract = artifacts.require("./ImageContract.sol");
var ImageStorage = artifacts.require("./ImageStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(ImageContract, ImageStorage.address)
    .then(() => {
        ImageStorage.deployed().then(instance => {
            return instance.allowAccess(ImageContract.address);
        })
    });
};

/**
 * Achieve 4 things:
 * 1: deploy imageStorage only if it wasn't already deployed
 *      if deploy it again -> lose all data
 * 2: deploy the actually ImageContract
 * 3: link them together
 * 4: update the addres of the new ImageContrac on the dapp
 */