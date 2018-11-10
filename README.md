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

# Instructions

1st clone repo

### Creating the POA Chain

rodar no 0
`run parity --config node0.toml`

criar auth node 0
`curl --data '{"jsonrpc":"2.0","method":"parity_newAccountFromPhrase","params":["node0", "node0"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8540`

criar user accounts
`curl --data '{"jsonrpc":"2.0","method":"parity_newAccountFromPhrase","params":["user", "user"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8540`

`curl --data '{"jsonrpc":"2.0","method":"parity_newAccountFromPhrase","params":["user1", "user1"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8540`

rodar no 1
`run parity --config node1.toml`

criar auth node 1
`curl --data '{"jsonrpc":"2.0","method":"parity_newAccountFromPhrase","params":["node1", "node1"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8541`

rodar no 2
`run parity --config node2.toml`

criar auth node 2
`curl --data '{"jsonrpc":"2.0","method":"parity_newAccountFromPhrase","params":["node2", "node2"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8542`

Paste auth nodes on desafiochain.json validators:
`"validators" : {
                    "list": [
                        "0x00bd138abd70e2f00903268f3db08f2d25677c9e",
                        "0x00aa39d30f0d20ff03a22ccfc30b7efbfca597c2",
                        "0x002e28950558fbede1a9675cb113f0bd20912019"
                    ]
                }`

Paste user accounts on desafiochain.json accounts:
`"accounts": {
        "0x0000000000000000000000000000000000000001": { "balance": "1", "builtin": { "name": "ecrecover", "pricing": { "linear": { "base": 3000, "word": 0 } } } },
        "0x0000000000000000000000000000000000000002": { "balance": "1", "builtin": { "name": "sha256", "pricing": { "linear": { "base": 60, "word": 12 } } } },
        "0x0000000000000000000000000000000000000003": { "balance": "1", "builtin": { "name": "ripemd160", "pricing": { "linear": { "base": 600, "word": 120 } } } },
        "0x0000000000000000000000000000000000000004": { "balance": "1", "builtin": { "name": "identity", "pricing": { "linear": { "base": 15, "word": 3 } } } },
        "0x004ec07d2329997267ec62b4166639513386f32e": { "balance": "100000000000000000000000" },
        "0x00d695cd9b0ff4edc8ce55b493aec495b597e235": { "balance": "100000000000000000000000"}
    }`

remove comments on node0.toml, node1.toml and node2.toml

start node0 with:
`parity --config node0.toml --ws-port=8180`

if your not using parity-ui don't need --ws-port

copy its enode
 ![alt text](https://github.com/vieiralc/blockchain-challenge/blob/master/img/enode0.PNG)

Without stoping node0 start node1 with:
`parity --config node1.toml --ws-port=8181`

Also, start node2:
`parity --config node2.toml --ws-port=8182`

### Connecting nodes to each other
node0 to node1:
replace `enode://RESULT` with enode0
localhost:8541 indicates node1 rpc port
`curl --data '{"jsonrpc":"2.0","method":"parity_addReservedPeer","params":["enode://RESULT"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8541`

node0 to node2
replace `enode://RESULT` with enode0
localhost:8542 indicates node2 rpc port
`curl --data '{"jsonrpc":"2.0","method":"parity_addReservedPeer","params":["enode://RESULT"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8542`

Same thing for node1 to node2
replace `enode://RESULT` with enode1
`curl --data '{"jsonrpc":"2.0","method":"parity_addReservedPeer","params":["enode://RESULT"],"id":0}' -H "Content-Type: application/json" -X POST localhost:8542`


### Deploying the smart contract

migrate sm to poa chain:

`cd image-uploader`
`truffle migrate`

To test the smart contract
inside /image-uploader
`yarn install`
`truffle test`

### Start the Dapp

Install metamask, connect it to localhost:8540 (node0 rpc port)
import user account with private key
Path do private keys:
`%HOMEPATH%\tmp\desafio0\keys\desafiochain`

Start the Dapp

`cd client`
`yarn install`
`yarn start`

Finally interact with the smart contract throug the UI
