function updateModelAction(modelName) {
	return {
		type: 'updateModel',
        modelName: modelName,
	};
};

function updateDirAction(dirContent) {
    return {
    	type: 'updateDir',
        dirContent: dirContent,
    };
};

module.exports = {
	updateModelAction: updateModelAction,
	updateDirAction: updateDirAction,
};
