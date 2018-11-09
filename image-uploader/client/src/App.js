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
      
      // <div className="App">
      //   <nav className="navbar pure-menu pure-menu-horizontal">
      //     <a href="/" className="pure-menu-heading pure-menu-link">IPFS Image Upload DApp</a>
      //   </nav>
        
      //   <main className="container">
      //     <div className="pure-g">
      //       <div className="pure-u-1-1">
      //         <button onClick={this.getImage}>Your Image</button >
      //         <p>This image is stored on IPFS & Private POA Blochchain</p>
      //         <div style={{
      //           width: '800px', 
      //           height: '400px', 
      //           border: '1px solid black',
      //           alignSelf: 'center'}}
      //         >
      //           {
      //             this.state.ipfsHash ? <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/> : ''
      //           }
      //         </div>

      //         <hr/>
              
      //         <h2>Upload Image</h2>
              
      //         <form onSubmit={this.onSubmit}>
      //           <input type="file" onChange={this.captureFile} required/> <br/>
      //           <input type="number" min="1" name="number" onChange={this.onChange} required/> <br/>
      //           <input type="submit"/>
      //         </form>
              
      //       </div>
      //     </div>
      //   </main>
      // </div>
    );
  }
}

export default App;
