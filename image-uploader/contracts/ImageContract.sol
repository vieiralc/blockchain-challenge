pragma solidity ^0.4.24;

import "./ImageStorage.sol";

contract ImageContract {
    
    ImageStorage imageStorage;
    
    event incrementEvent(string shouldIncrement);
    
    constructor(address _imageStorageAddress) public {
        imageStorage = ImageStorage(_imageStorageAddress);
    }
    
    function setHash(string _ipfsHash, uint _allowedViewNumber) public {
        imageStorage.setHash(msg.sender, _ipfsHash, _allowedViewNumber);
    }
    
    function getHash() public returns (string) {
        imageStorage.setViewd(msg.sender);
        return imageStorage.getHash(msg.sender);
    }
    // chamar funcao que incrementa contador
    // emitir evento falando que contador foi incrementado
    // ao chegar o evento no front end chamar funcao 
    // que apenas retorna o hash
}