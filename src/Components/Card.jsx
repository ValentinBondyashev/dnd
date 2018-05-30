import React, { Component } from 'react';

import Popup from "reactjs-popup";
import { Button, Form, TextArea } from 'semantic-ui-react';


export default class PopupLaneName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lengthText: true,
        }
    }

    changeLengthText = () => {
      this.setState({lengthText: !this.state.lengthText})
    }

    render(){

        const {removeCard,lane, changeCard, item, lanes} = this.props;

        return(
            <div>
                <Button circular icon='remove' onClick={removeCard.bind(this, lane.id,item.id, lanes)}/>
                <h2 className="cards_head" >{item.title}</h2>
                <p className="cards_text" onClick={this.changeLengthText} >{item.description.length > 40 ?  item.description.substring(0,40) + '...' :  item.description}</p>
                <Popup trigger={<Button circular icon='All info'></Button>} position="right center" modal closeOnDocumentClick>
                {
                    close => (
                        <Form onSubmit={close}  >
                            <Button circular icon='remove' onClick={removeCard.bind(this, lane.id,item.id, lanes)}/>
                            <h2 className="cards_head" >{item.title}</h2>
                            <p className="cards_text" >{item.description}</p>
                        </Form>
                    )
                }
                </Popup>
            </div>
        )
    }
}
