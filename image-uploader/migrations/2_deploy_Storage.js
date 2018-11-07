var ImageStorage = artifacts.require("./ImageStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(ImageStorage);
};

/*
  deploy
  1: deploy ImageStorage Contract
  2: deploy ImageContract Contract with the address of
     the ImageStorage as argument for its constructor
  3: allow ImageContract on ImageStorage calling the function
     allowAccess

*/