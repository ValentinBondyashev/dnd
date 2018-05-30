import React, { Component } from 'react';

import Popup from "reactjs-popup";
import { Button, Form, TextArea} from 'semantic-ui-react';


export default class PopupLaneName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputTask: '',
            inputHead: '',
        }
    }

    changeInputHead = (e) => {
        this.setState({inputHead: e.target.value})
    }

    changeInputTask = (e) => {
        this.setState({inputTask : e.target.value})
    }


    render(){

        const {index,lane, addCard} = this.props;

        return(
            <Popup trigger={<Button circular icon='add'></Button>} position="right center" closeOnDocumentClick>
                {
                    close => (
                        <Form onSubmit={close}  >
                            <Form.Group>
                                <Form.Input type="text" 
                                            onChange={this.changeInputHead} 
                                            value={this.state.inputHead}/>
                                <Form.TextArea type="text"
                                            onChange={this.changeInputTask} 
                                            value={this.state.inputTask}  />
                                <Form.Button content='Add Card' onClick={addCard.bind(this, index, lane.cards.length,this.state.inputHead, this.state.inputTask )}  />
                            </Form.Group>
                        </Form>
                    )
                }
            </Popup>
        )
    }
}