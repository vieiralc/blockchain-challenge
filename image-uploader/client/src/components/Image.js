import React, { Component } from 'react'

class Image extends Component {
    
    constructor() {
        super();
        this.state = {
            ipfsHash: ""
        };

        this.getImage = this.getImage.bind(this);
    }

    getImage(e) {
        e.preventDefault()
        const { contract } = this.props;
        console.log(contract.address)
        contract.setViewd({ from: this.props.account })
        .then(receipt => {
            console.log(receipt)
        })
        
        contract.incrementViewd({fromBlock: 'latest'})
            .on('data', data => {
                console.log('Viewd', data.args.viewd.toNumber());
                contract.getHash({from: this.props.account})
                    .then(ipfsHash => {
                        console.log('Hash: ', ipfsHash);
                        this.setState({ipfsHash});
                    })
                    .catch(error => {
                        document.querySelector('.msg').innerHTML = "You are not allowed to see this image anymore";
                    })
            
            .catch(err => {
                console.log('Erro', err);
            })
        })
    }

    render() {
        return (
            <div className="col s6" style={{marginTop: "100px"}}>
                <h2> Your image </h2>
                <p className="msg">This image is stored on IPFS & Private POA Blockchain</p>
                <img className="responsive-img" src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
                <button className="btn waves-effect waves-light" onClick={this.getImage}>Your Image</button >
            </div>
        )
    }
}

export default Image;