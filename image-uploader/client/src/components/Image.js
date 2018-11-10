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
            
            .catch(err => {
                console.log('Erro', err);
            })
        })
    }

    render() {
        return (
            <div className="col-md-6" style={{marginTop: "100px"}}>
                <h2> Your image </h2>
                <p>This image is stored on IPFS & Private POA Blockchain</p>
                <img src={`https://ipfs.io/ipfs/${this.state.ipfsHash}`} alt=""/>
                <button onClick={this.getImage}>Your Image</button >
            </div>
        )
    }
}

export default Image;