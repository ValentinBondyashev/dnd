export const changeNameLane = (laneId ,head) => ({
	type: 'CHANGE_NAME_LANE',
	payload: {laneId, head}
});

export const changeLane = (laneId, listCards, lanes) => ({
    type: 'CHANGE_LANE',
    payload: {laneId, listCards, lanes}
})

export const changeTwoLane = (laneId, listCards, laneSecondId, listSecondCards,lanes) => ({
    type: 'CHANGE_TWO_LANE',
    payload: {laneId, listCards, laneSecondId, listSecondCards,lanes}
})

export const removeLane = (lane) => ({
	type: 'REMOVE_LANE',
	payload: lane
});

export const addLane = (lane) => ({
	type: 'ADD_LANE',
	payload: lane
});

export const moveLane = (indexDrop,drop,indexDrog, drog,items) => ({
	type: 'MOVE_LANE',
	payload: {indexDrop,drop,indexDrog, drog, items},
})
