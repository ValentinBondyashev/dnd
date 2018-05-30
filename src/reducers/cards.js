import update from 'immutability-helper';

const initialState = {
	lanes: [
		{id: "0",
            title: 'Your task',
            cards: []}
	  ],
}

let id = 0;
let cardId = 0;

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_LANE':
		id++;
        const newLane = {
            id: `${id}`,
            title: 'Your task',
            cards: []
        }; 
			return {
				...state,
				lanes: [...state.lanes,newLane],			
		};
		case 'ADD_CARD':
		let num = action.payload.laneId;
		cardId++
		return {
			...state,
			lanes: update(state.lanes,{
				[num]:{cards:{$push: [{id:`lane${cardId}`,
										title: action.payload.head,
										description: action.payload.task,
										lengthText:true}] }}
			})
		};
		case 'REMOVE_CARD':
		let indexRC = action.payload.lanes.map((item, index)=>{
			if(item.id === action.payload.id){
				return index;
			}})
		let indexLaneRC = indexRC.filter(o => Number(o) ===  o);
		let IndexLRC = indexLaneRC[0];
		let arr = state.lanes[IndexLRC].cards.filter( o => o.id !== action.payload.i);
				return {
					...state,
					lanes: update(state.lanes,{
						[indexLaneRC[0]]:{cards:{$set: arr}}
					})					
			};  
		case 'REMOVE_LANE':
				return {
					...state,
					lanes:state.lanes.filter( o => o.id !== action.payload),
				};  
		case 'CHANGE_LENGTH_CARD':
			let indexCLC = action.payload.lanes.map((item, index)=>{
				if(item.id === action.payload.laneId){
					return index;
				}
			})
			let indexLaneCLC = indexCLC.filter(o => Number(o) ===  o);
				return {
					...state,
					lanes: update(state.lanes,{
						[indexLaneCLC[0]]:{cards:{[action.payload.id]:{$set: {  id:action.payload.cardId,
																				title: action.payload.head,
																				description: action.payload.text,
																				lengthText: [!action.payload.lengthText]}}}}
												})
				};  
		case 'CHANGE_CARD':
			let indexCC = action.payload.lanes.map((item, index)=>{
				if(item.id === action.payload.laneId){
					return index;
				}
			})
			let indexLaneCC = indexCC.filter(o => Number(o) ===  o);
				return {
					...state,
					lanes: update(state.lanes,{
						[indexLaneCC[0]]:{cards:{[action.payload.id]:{$set: {id:action.payload.cardId,
															title: action.payload.head,
															description: action.payload.text}}}}
												})
				}; 
		case 'CHANGE_NAME_LANE':
				return{
					...state,
					lanes: update(state.lanes,{
						[action.payload.laneId]: { title: {$set: action.payload.head } }
					})
				}
		case 'CHANGE_TWO_LANE':
			let indexCTL = action.payload.lanes.map((item, index)=>{
					if(item.id === action.payload.laneId){
						return index;
					}
				})
			let indexLaneCTL = indexCTL.filter(o => Number(o) ===  o);
			let indexCTLS = action.payload.lanes.map((item, index)=>{
					if(item.id === action.payload.laneSecondId){
						return index;
					}
				})
			let indexLaneCTLS = indexCTLS.filter(o => Number(o) ===  o);
				return{
					...state,
					lanes: update(state.lanes,{
						[indexLaneCTL[0]]: {cards: {$set: action.payload.listCards} }
						,[indexLaneCTLS[0]]: {cards: {$set: action.payload.listSecondCards} }
					})
				}		
		case 'CHANGE_LANE':
				let indexCL = action.payload.lanes.map((item, index)=>{
					if(item.id === action.payload.laneId){
						return index;
					}
				})
				let indexLaneCL = indexCL.filter(o => Number(o) ===  o);
				let indexN = indexLaneCL[0];
				return{
					...state,
					lanes: update(state.lanes,{
						[indexN]: {cards: {$set: action.payload.listCards} }
					})
				}
		case 'MOVE_LANE':
				return{
					...state,
					lanes: update(state.lanes,{
						$set: action.payload.items
					}),	
				}
			default:
		}
		return state;
};