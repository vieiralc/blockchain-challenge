import React, { Component } from 'react'
import ipfs from '../utils/ipfs';

class UploadImage extends Component {

    constructor() {
        super();
        this.state = {
            buffer: null,
            allowedViewNumber: 1,
        };

        this.captureFile = this.captureFile.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

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
        //  if (err) {
        //      console.error("ipfs error: ", err);
        //      return
        //  }

            const { contract, account } = this.props;
            let hash = "hash" // res[0].hash
            contract.setHash(hash, this.state.allowedViewNumber, { from: account })
                .then(result => {
                    alert("Image added!")
                    //console.log(res[0].hash)
                    console.log('hash: ', hash);
                })
        //})
    }
    
    render() {
        return (
            <div className="col-md-6" style={{marginTop: "100px"}}>
                <h2>Upload Image</h2>
              
                <form onSubmit={this.onSubmit}>
                    
                    <div class="input-field col s6">
                        <input placeholder="Your Image here" type="file" onChange={this.captureFile} required class="validate"/>
                    </div>
                    
                    <input type="number" min="1" name="number" onChange={this.onChange} required/> <br/>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default UploadImage