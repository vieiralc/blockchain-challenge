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
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const Contract = truffleContract(ImageContract);
      
      Contract.setProvider(web3.currentProvider);
      const instance = await Contract.deployed();
      
      this.setState({ web3, account: accounts[0], contract: instance });
    } catch (error) {
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
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

    //ipfs.files.add(this.state.buffer, (err, res) => {
      //if (err) {
        //console.error("ipfs error: ", err);
        //return
      //}

      const { contract } = this.state;
      let hash = "hash"
      contract.setHash(hash, this.state.allowedViewNumber, { from: this.state.account })
        .then(result => {
          alert("Image added!")
          //console.log(res[0].hash)
          console.log('hash: ', hash);
        })
    //})
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
          .then(ipfsHash => {
            console.log('Hash: ', ipfsHash);
            this.setState({ipfsHash});
          })
          .catch(err => {
            console.log('Erro', err);
          })
      })
  }

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
              <p>This image is stored on IPFS & Private POA Blochchain</p>
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
