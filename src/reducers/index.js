function updateModelReducer(state='', action) {
	switch(action.type) {
		case 'updateModel':
		    return action.modelName;
		default:
		    return state;
	};
};

function updateDirReducer(state=[], action) {
	switch(action.type) {
		case 'updateDir':
		    return action.dirContent;
		default:
		    return state;
	};
};

module.exports = {
	updateModelReducer: updateModelReducer,
	updateDirReducer: updateDirReducer,
};
