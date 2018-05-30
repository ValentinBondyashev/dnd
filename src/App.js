import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Popup from "reactjs-popup";
import { Button, Form } from 'semantic-ui-react';

import './App.css';
import * as cardActions from './actions/cards';
import * as laneActions from './actions/lanes';
import PopupLaneName from './Components/PopupLaneName';
import PopupChangeCard from './Components/PopupChangeCard';
import PopupAddCard from './Components/PopupAddCard';
import Card from './Components/Card';

/*      https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/  */
  
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
      borderRadius: "10px",
      // change background colour if dragging
      background: isDragging ? 'lightgreen' : 'grey',
  
      // styles we need to apply on draggables
      ...draggableStyle
  });

  const getLaneStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 5px ${grid}px 5px`,
    borderRadius: "15px",
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'lightgrey',

    // styles we need to apply on draggables
    ...draggableStyle
  });
  
  const getListStyle = isDraggingOver => ({
      background: isDraggingOver ? 'lightblue' : '#989898',
      padding: grid,
      borderRadius: "10px",
      width: 250
  });

  const getBorderStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
    width: '100%',
  });

    class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }  
    
    getList = id => {
        let index = this.props.lanes.map((item, index)=>{
			if(item.id === id){
				return index;
			}
		})
		let indexLane = index.filter(o => Number(o) ===  o);
		let IndexL = indexLane[0];
        return this.props.lanes[IndexL].cards
    }

    getListLane = id =>{
        return this.props.lanes
    }

    onDragEndLane(result) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.items,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items,
        });
      }

    onDragEnd = result => {
          const { source, destination } = result;
            
          // dropped outside the list
          if (!destination) {
              return;
          }

          if(result.type === 'PERSON'){
            const items = reorder(
                this.getListLane(source.droppableId),
                source.index,
                destination.index
            );
            this.props.moveLane(source.index,items[source.index],destination.index,items[destination.index],items);
          }else{
            if (source.droppableId === destination.droppableId) {
                const items = reorder(
                    this.getList(source.droppableId),
                    source.index,
                    destination.index
                );
                
                this.props.changeLane(source.droppableId, items, this.props.lanes);
            } else {
                const result = move(
                    this.getList(source.droppableId),
                    this.getList(destination.droppableId),
                    source,
                    destination
                );
                const items = reorder(
                    this.getListLane(source.droppableId),
                    source.index,
                    destination.index
                );
                
              this.props.changeTwoLane(source.droppableId,result[source.droppableId],destination.droppableId, result[destination.droppableId],this.props.lanes)
            }
          }
      }

      rL = (i,id,e ) =>{
          console.log(e,id,i)
        if(this.props.lanes[id].cards.length > 0){
            confirm('Do you really want to remove this lane?') ? this.props.removeLane(i) : null;
        }else{
            this.props.removeLane(i)
        }
      }

     

    render() {
        const { addLane, changeNameLane, removeCard, changeCard, addCard, lanes } = this.props;
        const { inputLaneHead, inputName, inputTask, inputHead } = this.state;

    return (
    <DragDropContext onDragEnd={this.onDragEnd}>
        <Button className="btn_add"   
                onClick={addLane.bind(this)}>Add Lane</Button>
        <Droppable droppableId="droppable" type="PERSON" direction="horizontal">
        {(provided, snapshot) => (
        <div
            ref={provided.innerRef}
            style={getBorderStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
        >
            {lanes.map((lane, index)=>(
                <Draggable  key={lane.id} type="PERSON" draggableId={lane.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getLaneStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    {<Droppable key={index} droppableId={lane.id} >
                        {(provided, snapshot) => (
                          <div
                              ref={provided.innerRef}
                              style={getListStyle(snapshot.isDraggingOver)}>
                              <div className="lane_header">
                              <PopupLaneName lane={lane} index={index} inputLaneHead={inputLaneHead} changeNameLane={changeNameLane}/>
                                    <div>
                                        <Button circular icon='remove' 
                                                onClick={this.rL.bind(this, lane.id, index)}/></div>
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
                                                <Card removeCard={removeCard} lane={lane} item={item} lanes={lanes}/>
                                               
                                                <PopupChangeCard index={index}  lane={lane} changeCard={changeCard} item={item} lanes={lanes}/>
                                              </div>}
                                          </div>
                                      )}
                                  </Draggable>
                              ))}
                              {provided.placeholder}
                              <PopupAddCard  index={index} lane={lane} addCard={addCard}/>
                              
                            </div>
                        )}  
                    </Droppable> }
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
        </div>
        )}
    </Droppable>   
    </DragDropContext>
          );
          
      }
    }

const mapStateToProps = ({cards}) => ({
    lanes: cards.lanes,
  });
    
const mapDispatchToPtops = dispatch => ({
    ...bindActionCreators(cardActions, dispatch),
    ...bindActionCreators(laneActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToPtops)(App);