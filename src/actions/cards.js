export const addCard = (laneId, cardId, head, task) => ({
	type: 'ADD_CARD',
	payload: {laneId, cardId, head, task}
});

export const removeCard = (id, i) => ({
	type: 'REMOVE_CARD',
	payload: {id, i}
});

export const changeCard = (laneId,id, head, text) => ({
	type: 'CHANGE_CARD',
	payload: {laneId,id, head, text}
});