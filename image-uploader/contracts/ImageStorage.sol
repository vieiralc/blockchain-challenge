pragma solidity ^0.4.24;

contract ImageStorage {
    
    event newImage(uint id, address owner);
    
    struct Image {
        address owner;
        string ipfsHash;
        uint allowedViewTimes;
        uint viewdTimes;
    }
    
    Image[] private images;
    
    function addImage(string _ipfsHash, uint _allowedViewTimes) public {
        uint id = images.push(Image(msg.sender, _ipfsHash, _allowedViewTimes, 0)) - 1;
        emit newImage(id, msg.sender);
    }
    
    function getImage(uint _imageID) public returns (string, address){
        
        require(images[_imageID].viewdTimes < images[_imageID].allowedViewTimes, "You cannot see this image anymore");
        images[_imageID].viewdTimes++;
        return (
            images[_imageID].ipfsHash,
            images[_imageID].owner
        );
    }
    
}