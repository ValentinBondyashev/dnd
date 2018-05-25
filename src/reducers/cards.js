import update from 'immutability-helper';

const initialState = {
	lanes: [
		{
		  id: "0",
		  title: 'PlannedTasks',
		  cards:
		   [
			   	{id: 'lane01', title: 'Write Blog', description: 'Can AI make memes'},
				{id: 'lane02', title: 'Pay Rent', description: 'Transfer via NEFT'},
				{id: 'lane03', title: 'Pay Rent', description: 'Transfer via NEFT'},],
			
		},
		{
		  id: "1",
		  title: 'Completed',
		  cards: 
		  	[
				{id: 'lane10', title: 'Write Blog', description: 'Can AI make memes'},
				{id: 'lane11', title: 'Pay Rent', description: 'Transfer via NEFT'},],
			
		},
		{
			id:"2",
			title: 'Completed',
			cards: 
				[
				  {id: 'lane20', title: 'Write Blog', description: 'Can AI make memes'},
				  {id: 'lane21', title: 'Pay Rent', description: 'Transfer via NEFT'},
				  {id: 'lane22', title: 'Pay Rent', description: 'Transfer via NEFT'},],
			
		},
		
		
	  ],

}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_LANE':
			return {
				...state,
				lanes: [...state.lanes,action.payload],
				
		};
		case 'ADD_CARD':
		let num = action.payload.laneId;
		return {
			...state,
			lanes: update(state.lanes,{
				[num]:{cards:{$push: [{id:`lane${action.payload.laneId}${action.payload.cardId}`,
										title: action.payload.head,
										description: action.payload.task}] }}
			})
		};
		case 'REMOVE_CARD':
		
		let arr = state.lanes[action.payload.id].cards.filter( o => o.id !== action.payload.i);
		let index = action.payload.id;
				return {
					...state,
					lanes: update(state.lanes,{
						[index]:{cards:{$set: arr}}
					})
					
			};  
		case 'REMOVE_LANE':
				return {
					...state,
					lanes:state.lanes.filter( o => o.id !== action.payload),
				};  
		case 'CHANGE_CARD':
			let indexLan = action.payload.laneId;
			let indexCard = action.payload.id;

				return {
					...state,
					lanes: update(state.lanes,{
						[indexLan]:{cards:{[indexCard]:{$set: {id:indexCard,
															title: action.payload.head,
															description: action.payload.text}}}}
					})
				};  
		case 'CHANGE_NAME_LANE':
				return{
					...state,
					lanes: update(state.lanes,{
						[action.payload.laneId]: { title: {$set: [action.payload.head] } }
					})
				}
		case 'CHANGE_TWO_LANE':
				return{
					...state,
					lanes: update(state.lanes,{
						[action.payload.laneId]: {cards: {$set: action.payload.listCards} }
						,[action.payload.laneSecondId]: {cards: {$set: action.payload.lastSecondCards} }
					}
					)
				}		
		case 'CHANGE_LANE':
				let indexN = action.payload.laneId;
				return{
					...state,
					lanes: update(state.lanes,{
						[indexN]: {cards: {$set: action.payload.listCards} }
					})
				}
			default:
		}
		return state;
};