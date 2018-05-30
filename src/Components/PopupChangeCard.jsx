import React, { Component } from 'react';

import Popup from "reactjs-popup";
import { Button, Form, TextArea } from 'semantic-ui-react';


export default class PopupLaneName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputName: '',
            inputTask: '',
        }
    }

    changeInputName = (e) => {
        this.setState({inputName : e.target.value})
    }

    changeInputTask = (e) => {
        this.setState({inputTask : e.target.value})
    }

    render(){

        const {lane,index, changeCard, item, lanes} = this.props;

        return(
            <Popup trigger={<Button id={index} circular  icon='edit' />} position="right center">
                {
                    close => (
                        <Form onSubmit={close}>
                            <Form.Group>
                                <Form.Input  placeholder={lane.cards[index].title} 
                                            onChange={this.changeInputName} 
                                            value={this.state.inputName}/>
                                <Form.TextArea placeholder={lane.cards[index].description} 
                                            onChange={this.changeInputTask}
                                            value={this.state.inputTask}
                                            />
                                <Form.Button content='Edit' onClick={changeCard.bind(this,lane.id, index,this.state.inputName,this.state.inputTask,item.id, lanes  )}/>
                            </Form.Group>
                        </Form>
                    )
                }
            </Popup>
        )
    }
}
