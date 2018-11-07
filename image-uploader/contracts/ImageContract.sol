pragma solidity ^0.4.24;

import "./ImageStorage.sol";

contract ImageContract {
    
    event incrementViewd(uint viewd);    
    ImageStorage imageStorage;
    
    constructor(address _imageStorageAddress) public {
        imageStorage = ImageStorage(_imageStorageAddress);
    }
    
    // setters
    
    function setHash(string _ipfsHash, uint _allowedViewNumber) public {
        imageStorage.setHash(msg.sender, _ipfsHash, _allowedViewNumber);
    }
    
    function setViewd() public {
        imageStorage.setViewd(msg.sender);
        emit incrementViewd(getViewd());
    }
    
    
    // getters
    function getHash() public view returns (string) {
        require(getViewd() < getAllowedViewNumber());
        return imageStorage.getHash(msg.sender);
    }
    
    function getViewd() public view returns (uint) {
        return imageStorage.getViewd(msg.sender) + 1;
    }
    
    function getAllowedViewNumber() public view returns (uint) {
        return imageStorage.getAllowedViewNumber(msg.sender);
    }
    
}