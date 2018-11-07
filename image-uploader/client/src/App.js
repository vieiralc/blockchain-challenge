import React, { Component } from "react";
import ImageContract from "./contracts/ImageContract.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import ipfs from './ipfs';

import "./App.css";

class App extends Component {

  constructor() {
    super()
    this.state = { 
      web3: null, 
      account: null, 
      contract: null,
      allowedViewNumber: 1,
      buffer: null,
      ipfsHash: ""
    };

    this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getImage = this.getImage.bind(this);
  }
  

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(ImageContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, account: accounts[0], contract: instance });
      console.log('Default Account: ', this.state.account);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  captureFile(e) {
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', this.state.buffer);
    }
  }

  onChange(e) {
    this.setState({allowedViewNumber: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()

    ipfs.files.add(this.state.buffer, (err, res) => {
      if (err) {
        console.error("ipfs error: ", err);
        return
      }

      const { contract } = this.state;

      contract.setHash(res[0].hash, this.state.allowedViewNumber, { from: this.state.account })
        .then(result => {
          // value from the contract to prove it worked
          //return contract.getImage.call()
          alert("Image added!")
          console.log(res[0].hash)
        })
        // .then(ipfsHash => {
        //   // Update the state with the result
        //   this.setState({ ipfsHash })
        //   console.log('this.state.ipfsHash: ', this.state.ipfsHash);
        // })
    })
  }

  getImage(e) {
    e.preventDefault()
    const { contract } = this.state;

    contract.setViewd({ from: this.state.account })
      .then(receipt => {
        console.log(receipt)
      })
      
    contract.incrementViewd({fromBlock: 'latest'})
      .on('data', data => {
        console.log('Viewd', data.args.viewd.toNumber());
        contract.getHash({from: this.state.account})
          .then(hash => {
            console.log('Hash: ', hash);
           
          })
          .catch(err => {
            console.log('Erro', err);
            this.setState({ipfsHash:
              "QmU2RvWtScFD68Zp3PjMVJs4vRXQVj2txeBc1SM5TgyPLN"
            })
          })
      })
  }

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.saveImage("5", { from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.getImage();
  //   //console.log(response)
  //   // Update state with the result.
  //   this.setState({ storageValue: response });
  // };

  render() {

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="/" className="pure-menu-heading pure-menu-link">IPFS Image Upload DApp</a>
        </nav>
        
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <button onClick={this.getImage}>Your Image</button >
              <p>This image is stored on IPFS & the Ethereum Blockchain</p>
              <div style={{
                width: '800px', 
                height: '400px', 
                border: '1px solid black',
                alignSelf: 'center'}}
              >
                {
                  this.state.ipfsHash ? <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/> : ''
                }
              </div>

              <hr/>
              
              <h2>Upload Image</h2>
              
              <form onSubmit={this.onSubmit}>
                <input type="file" onChange={this.captureFile} required/> <br/>
                <input type="number" min="1" name="number" onChange={this.onChange} required/> <br/>
                <input type="submit"/>
              </form>
              
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
