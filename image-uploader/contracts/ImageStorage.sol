pragma solidity ^0.4.24;

contract ImageStorage {
    
  mapping (address => string) ipfsHash;
  mapping (address => uint) viewd;
  mapping (address => uint) allowedViewNumber;
  
  mapping (address => bool) accessAllowed;

  constructor() public {
    accessAllowed[msg.sender] = true;  
  }

  modifier platform() {
    require(accessAllowed[msg.sender] == true, "You must be authorized");
    _;
  }

  function allowAccess(address _address) platform public {
    accessAllowed[_address] = true;
  }
    
  function denyAccess(address _address) platform public {
    accessAllowed[_address] = false;
  }

  // setters

  function setHash(address _address, string _ipfsHash,uint _allowedViewNumber) platform public {
    ipfsHash[_address] = _ipfsHash; 
    allowedViewNumber[_address] = _allowedViewNumber;
    viewd[_address] = 0;
  }

  function setViewd(address _address) platform public {
    viewd[_address] += 1;
  }

  // getters

  function getHash(address _address) public view platform returns (string) {
    return ipfsHash[_address];
  }
    
  function getViewd(address _address) public view platform returns (uint) {
    return viewd[_address];
  }
}