import React, { Component } from "react";
import ImageContract from "./contracts/ImageContract.json";
import getWeb3 from "./utils/getWeb3";
import truffleContract from "truffle-contract";
import Image from './components/Image';
import UploadImage from './components/UploadImage';

import "./App.css";

class App extends Component {

  constructor() {
    super()
    this.state = { 
      web3: null, 
      account: null, 
      contract: null,
    };
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
  }

  render() {

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Image
            contract={this.state.contract} 
            account={this.state.account}  
          />  
          <UploadImage
            contract={this.state.contract}
            account={this.state.account}
          />        
        </div>
      </div>
    );
  }
}

export default App;
