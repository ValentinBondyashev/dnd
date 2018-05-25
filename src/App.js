import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import * as cardActions from './actions/cards';
import { bindActionCreators } from 'redux';
import Popup from "reactjs-popup";
import { Button, Input, Card } from 'semantic-ui-react';


import './App.css';


  
  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
  
      return result;
  };
  
  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
      const sourceClone = Array.from(source);
      const destClone = Array.from(destination);
      const [removed] = sourceClone.splice(droppableSource.index, 1);
  
      destClone.splice(droppableDestination.index, 0, removed);
  
      const result = {};
      result[droppableSource.droppableId] = sourceClone;
      result[droppableDestination.droppableId] = destClone;
  
      return result;
  };
  
  const grid = 8;
  
  const getItemStyle = (isDragging, draggableStyle) => ({
      // some basic styles to make the items look a bit nicer
      userSelect: 'none',
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,
  
      // change background colour if dragging
      background: isDragging ? 'lightgreen' : 'grey',
  
      // styles we need to apply on draggables
      ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? 'lightblue' : 'lightgrey',
      padding: grid,
      width: 250
  });
  
  class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            inputName: '',
            inputTask: '',
            inputHead: '',
            inputLaneHead:''
        }
    }
    changeInputName = (e) => {
        this.setState({inputName : e.target.value})
    }

    changeInputHead = (e) => {
        this.setState({inputHead: e.target.value})
    }

    changeInputLaneHead = (e) => {
        this.setState({inputLaneHead : e.target.value})
    }

    changeInputTask = (e) => {
        this.setState({inputTask : e.target.value})
    }
    
    clearInput = () => {
        this.setState({inputLaneHead: ''})
      }

    clearInputName = () => {
        this.setState({inputName : ''})
    }
    
    clearInputTask = () => {
        this.setState({inputTask: ''})
    }

        
    getList = id => {
        return this.props.lanes[id].cards
    };

    
      onDragEnd = result => {
          const { source, destination } = result;
  
          // dropped outside the list
          if (!destination) {
              return;
          }
  
          if (source.droppableId === destination.droppableId) {
              console.log(source.droppableId)
              const items = reorder(
                  this.getList(source.droppableId),
                  source.index,
                  destination.index
              );
              
              this.props.changeLane(source.droppableId, items);
          } else {
              const result = move(
                  this.getList(source.droppableId),
                  this.getList(destination.droppableId),
                  source,
                  destination
              );
            this.props.changeTwoLane(source.droppableId,result[source.droppableId],destination.droppableId, result[destination.droppableId])
          }
      };
  
      // Normally you would want to split things out into separate components.
      // But in this example everything is just done in one place for simplicity
      render() {
        let id = this.props.lanes.length;

        const newLane = {
            id: `${id}`,
            title: 'Your task',
            cards: []
            }; 
        console.log(Math.floor(Math.random()))
          return (
              <DragDropContext onDragEnd={this.onDragEnd}>
              <Button basic icon='right arrow' onClick={this.props.addLane.bind(this, newLane)}/>
              {  
                this.props.lanes.map((lane,index) =>{
                   return(
                        <Droppable key={index} droppableId={lane.id} >
                        {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              style={getListStyle(snapshot.isDraggingOver)}>
                              <div className="lane_header">
                              <Popup trigger={<h2>{lane.title}</h2>} position="right center">
                                <div>
                                    <Input type="text" onClick={this.clearInput} onChange={this.changeInputLaneHead} value={this.state.inputLaneHead}  />
                                    <Input type="submit" value="Change name" onClick={this.props.changeNameLane.bind(this, index,this.state.inputLaneHead  )} />
                                </div>
                                </Popup>
                                <Button circular icon='remove' onClick={this.props.removeLane.bind(this, lane.id)}/>
                                </div>
                              {lane.cards.map((item, index) => (
                                  <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}>
                                      {(provided, snapshot) => (
                                          <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={getItemStyle(
                                                  snapshot.isDragging,
                                                  provided.draggableProps.style
                                              )}>
                                              {<div>
                                                <button onClick={this.props.removeCard.bind(this, lane.id,item.id)}>x</button>
                                                <h1>{item.title}</h1>
                                                <p>{item.description}</p>
                                                <Popup  trigger={<Button circular  icon='edit' />} position="right center">
                                                <Card.Content>
                                                    <Card.Header><Input placeholder='Name card...' onClick={this.clearInputName} onChange={this.changeInputName} value={this.state.inputName} /></Card.Header>
                                                    <Card.Header><Input placeholder='Task...' onClick={this.clearInputTask}  onChange={this.changeInputTask} value={this.state.inputTask} /></Card.Header>
                                                    <Card.Meta><Input type="submit"  onClick={this.props.changeCard.bind(this,lane.id, index,this.state.inputName, this.state.inputTask )} value="Edit" /></Card.Meta>  
                                                </Card.Content>
                                                </Popup>
                                              </div>}
                                          </div>
                                      )}
                                  </Draggable>
                              ))}
                              {provided.placeholder}
                              <Popup trigger={<Button circular icon='add'></Button>} position="right center">
                                <div>
                                    <label>
                                    Head:
                                    <Input type="text" onChange={this.changeInputHead} value={this.state.inputHead}  />
                                    Text:
                                    <Input type="text" onChange={this.changeInputTask} value={this.state.inputTask} />
                                    </label>
                                    <Input type="submit" value="Add card" onClick={this.props.addCard.bind(this, lane.id, lane.cards.length,this.state.inputHead, this.state.inputTask  )} />
                                </div>
                              </Popup>
                          </div>
                      )}
                      
                  </Droppable>)
      })}
                 
              </DragDropContext>
          );
      }
  }


const mapStateToProps = ({cards}) => ({
    lanes: cards.lanes,
  });
    
const mapDispatchToPtops = dispatch => ({
    ...bindActionCreators(cardActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToPtops)(App);