pragma solidity ^0.4.24;

contract ImageStorage {
  
  string ipfsHash;

  function saveImage(string _ipfsHash) public {
    ipfsHash = _ipfsHash;
  }

  function getImage() public view returns (string) {
    return ipfsHash;
  }
}
