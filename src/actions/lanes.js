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

export const removeLane = (lane) => ({
	type: 'REMOVE_LANE',
	payload: lane
});

export const addLane = (lane) => ({
	type: 'ADD_LANE',
	payload: lane
});
