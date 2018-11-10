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

        ipfs.files.add(this.state.buffer, (err, res) => {
         if (err) {
             console.error("ipfs error: ", err);
             return
         }

            const { contract, account } = this.props;
            let hash = res[0].hash
            contract.setHash(hash, this.state.allowedViewNumber, { from: account })
                .then(result => {
                    alert("Image added!")
                    console.log(hash)
                })
        })
    }
    
    render() {
        return (
            <div className="col s6" style={{marginTop: "100px"}}>
                <h2>Upload Image</h2>
              
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col s6" style={{marginLeft: "25px"}}>
                            <div className="file-field input-field">
                                <div className="btn">
                                    <span>Image</span>
                                    <input type="file" onChange={this.captureFile} required/>
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s6" style={{marginLeft: "25px"}}>
                            <input type="number" min="1" name="number" onChange={this.onChange} required/> <br/> <br/>
                            <div className="right-align">
                                <input className="btn waves-effect waves-light" type="submit"/>                
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default UploadImage