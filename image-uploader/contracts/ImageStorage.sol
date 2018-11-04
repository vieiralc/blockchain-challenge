pragma solidity ^0.4.24;

contract ImageStorage {
    
    address public owner;
    string private ipfsHash;
    uint public viewd;
    uint public allowedViewNumber;
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    function addImage(string _ipfsHash, uint _allowedViewNumber) public {
        ipfsHash = _ipfsHash;
        allowedViewNumber = _allowedViewNumber;
        viewd = 0;
    }
    
    function getImage() public returns (string){
        require(viewd < allowedViewNumber, "You are not allowed to see this image anymore");
        viewd++;
        return ipfsHash;
    }
    
    function changeAllowedViewNumber(uint _newNumber) public onlyOwner() {
        allowedViewNumber = _newNumber;
        viewd = 0;
    }
    
}