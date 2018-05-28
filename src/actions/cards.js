export const addCard = (laneId, cardId, head, task) => ({
	type: 'ADD_CARD',
	payload: {laneId, cardId, head, task}
});

export const removeCard = (id, i, lanes) => ({
	type: 'REMOVE_CARD',
	payload: {id, i, lanes}
});

export const changeCard = (laneId,id, head, text, cardId, lanes) => ({
	type: 'CHANGE_CARD',
	payload: {laneId,id, head, text,cardId, lanes}
});