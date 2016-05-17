var React = require('react');
var updateDirAction = require('../actions').updateDirAction;

var SingleModel = React.createClass({
    propTypes: {
        item: React.PropTypes.string,
        clickModel: React.PropTypes.func,
    },

    render: function() {
        return (
            <li onClick={this.props.clickModel.bind(this, this.props.item)}>{this.props.item}</li>
        );
    }
});

var ModelTree = React.createClass({
	propTypes: {
        modelName: React.PropTypes.string,
    },

    getInitialState: function() {
        return {dir: this.props.dirStore.getState()};
    },
    
    componentDidMount() {
        var listenDir = this.props.dirStore.subscribe(this.updateDir);
        //var socket = io.connect('http://localhost:8000');
        //var socket = io();

        this.props.socket.emit('getDir');

        this.props.socket.on('sendDir', function(dirContent) {
            this.props.dirStore.dispatch(updateDirAction(dirContent));
            this.props.socket.emit('feedback', 'ModelTree componentDidMount recived');
            return this.updateDir();
        }.bind(this));
    },

    updateDir: function() {
        this.setState({dir: this.props.dirStore.getState()});
    },

    clickModel: function(model) {
        //var socket = io.connect('http://localhost:8000');
        //var socket = io();
        this.props.socket.emit('updateModel', model);
    },

    render: function() {
        return (
            <div className="ModelTree">
                <p>This is ModelTree</p>
                <ul>
                    {this.state.dir.map(function(item) {
                        return <SingleModel item={item} clickModel={this.clickModel} />
                    }.bind(this))}
                </ul>
            </div>
        );
    }
});

module.exports = ModelTree;
