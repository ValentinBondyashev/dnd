
export const addLane = (lane) => ({
	type: 'ADD_LANE',
	payload: lane
});

export const addCard = (laneId, cardId, head, task) => ({
	type: 'ADD_CARD',
	payload: {laneId, cardId, head, task}
});

export const removeCard = (id, i) => ({
	type: 'REMOVE_CARD',
	payload: {id, i}
});


export const removeLane = (lane) => ({
	type: 'REMOVE_LANE',
	payload: lane
});

export const changeCard = (laneId,id, head, text) => ({
	type: 'CHANGE_CARD',
	payload: {laneId,id, head, text}
});

export const changeNameLane = (laneId ,head) => ({
	type: 'CHANGE_NAME_LANE',
	payload: {laneId, head}
});

export const changeLane = (laneId, listCards) => ({
    type: 'CHANGE_LANE',
    payload: {laneId, listCards}
})

export const changeTwoLane = (laneId, listCards, laneSecondId, lastSecondCards) => ({
    type: 'CHANGE_TWO_LANE',
    payload: {laneId, listCards, laneSecondId, lastSecondCards}
})