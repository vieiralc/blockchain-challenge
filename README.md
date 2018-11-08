# blockchain-challenge

### Create a blockchain application considering the following:

<ul>
    <li>The POA Chain must have 3 validator nodes and 2 non-validator nodes ✓ </li> 
    <li> The user must be able to upgrade the Smart Contract 
    without losing data ✓ </li>
    <li> The Smart Contracts should be testable ✓ </li>
    <li> The Smart Contract should allow an asset to be viewd only a limit number time ✓ </li> 
    <li> The user must be able to interact with the Smart Contract through 
    a web UI ✓ </li>
</ul>

<hr>

### Requirements to run the blockchain app on a private poa chain

> Parity    ^1.10.7 <br>
> Parity UI ^0.3.0 (optional) <br>
> Nodejs    ^11.0.0 <br>
> npm       ^6.4.1 <br>

### Instructions

> clone the repo <br>
> run the validator nodes: <br>
    > parity-ui --config node0.toml --ws-port=8180 --jsonrpc-cors all <br>
    > parity-ui --config node1.toml --ws-port=8181 <br>
    > parity-ui --config node2.toml --ws-port=8182 <br>

> connect the nodes <br>
    > To connect the nodes to each other copy the enode from parity-ui or from the console log when starting the node and replace `enode://RESULT` in the command: <br>
        > curl --data '{"jsonrpc":"2.0","method":"parity_addReservedPeer","params":["enode://RESULT"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8541 <br>

        > Do this for every node, don't forget to change the localhost port 

> with the blockchain running run `truffle migrate --reset` inside image-uploader folder to compile and migrate the smart contract to the poa <br>
> You can also run `truffle test` to run the tests <br>

> inside image-uploader/client run `yarn install to install the react modules` <br>
> run `npm start` to start the dapp on port 3000 <br>

> use metamask to connect to the poa chain <br>
> upload your image and select the number that you want to allow your image to be viewd <br>
> click on "your image" button to show the image <br>

> The image will be uploaded to ipfs and can only be view with the hash that is saved on the blockchain <br>