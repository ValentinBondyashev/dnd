import React, { Component } from 'react';

import Popup from "reactjs-popup";
import { Button, Form } from 'semantic-ui-react';


export default class PopupLaneName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputLaneHead:'',
        }
    }

    changeInputLaneHead = (e) => {
        this.setState({inputLaneHead : e.target.value})
    }

    render(){

        const {lane,index, inputLaneHead, changeNameLane} = this.props;

        return(
            <Popup trigger={<h2 className="header_lane" >{lane.title}</h2>} position="right center">
                {
                    close => (
                    <Form onSubmit={close} >
                        <Form.Group>
                            <Form.Input type="text" 
                                        required
                                        placeholder={lane.title}
                                        onChange={this.changeInputLaneHead} 
                                        value={this.state.inputLaneHead}/>
                            <Form.Button  content='Change Name' 
                                          onClick={changeNameLane.bind(this, index,this.state.inputLaneHead  )}/>
                        </Form.Group>
                    </Form>
                    )
                }
            </Popup>
        )
    }
}
