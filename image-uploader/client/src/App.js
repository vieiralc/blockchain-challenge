import React, { Component } from "react";
import SimpleStorageContract from "./contracts/ImageStorage.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import ipfs from './ipfs'

import "./App.css";

class App extends Component {

  constructor() {
    super()
    this.state = { 
      storageValue: 0, 
      web3: null, 
      accounts: null, 
      contract: null,
      buffer: null,
      ipfsHash: ""
    };

    this.captureFile = this.captureFile.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const Contract = truffleContract(SimpleStorageContract);
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
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

  onSubmit(e) {
    e.preventDefault()
    ipfs.files.add(this.state.buffer, (err, res) => {
      if (err) {
        console.error(err);
        return
      }
      this.setState({ ipfsHash: res[0].hash })
      console.log('this.state.ipfsHash: ', this.state.ipfsHash);
    })
  }

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.saveImage("5", { from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.getImage();
    //console.log(response)
    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <nav className="navbar pure-menu pure-menu-horizontal">
          <a href="#" className="pure-menu-heading pure-menu-link">IPFS Image Upload DApp</a>
        </nav>
        
        <main className="container">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>Your Image</h1>
              <p>This image is stored on IPFS & the Ethereum Blockchain</p>
              <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
              <h2>Upload Image</h2>
              
              <form onSubmit={this.onSubmit}>
                <input type="file" onChange={this.captureFile}/> <br/>
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
