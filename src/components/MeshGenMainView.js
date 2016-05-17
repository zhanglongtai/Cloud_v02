var React = require('react');
var ReactDOM = require('react-dom');
var UploadFile = require('./UploadFile');
var ModelTree = require('./ModelTree');
var MeshMenu = require('./MeshMenu');
var ModelViewer = require('./ModelViewer');
var io = require('socket.io-client');
var modelStore = require('../stores').updateModelStore;
var dirStore = require('../stores').updateDirStore;

var MeshGenMainView = React.createClass({
    getInitialState: function() {
        return {
            socket: io.connect('http://localhost:8000'),
        }
    },

    componentDidMount: function() {
        //var socket = io.connect('http://localhost:8000');
        this.state.socket.emit('feedback', 'MeshGenMainView componentDidMount connected');
    },

    render: function() {
		return (
            <div className="MeshGenMainView">
                <UploadFile socket={this.state.socket} dirStore={dirStore} modelStore={modelStore}/>
                <ModelTree socket={this.state.socket} dirStore={dirStore} />
                <MeshMenu />
                <ModelViewer url="/MeshGen/api/model" socket={this.state.socket} modelStore={modelStore} />
            </div>
        );
    }
});

ReactDOM.render(
	<MeshGenMainView />,
	document.getElementById('content')
);
