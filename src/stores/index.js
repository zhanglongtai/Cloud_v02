var Redux = require('redux');
var updateModelReducer = require('../reducers').updateModelReducer;
var updateDirReducer = require('../reducers').updateDirReducer;

var updateModelStore = Redux.createStore(updateModelReducer);
var updateDirStore = Redux.createStore(updateDirReducer);

module.exports = {
	updateModelStore: updateModelStore,
	updateDirStore: updateDirStore,
};
