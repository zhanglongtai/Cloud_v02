var React = require('react');
var $ = require('jquery');
var updateModelAction = require('../actions').updateModelAction;

var UploadFile = React.createClass({

    changeName: function() {
        document.getElementById('#filename').value = document.getElementById('#modelfile').value;
    },

    ajaxUpload: function() {
        var formData = new FormData($("#uploadform")[0]);
        $.ajax({
            url: '/MeshGen/api/upload',
            type: 'POST',
            data: formData,
            dataType: 'json',
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                var newModel = data.model;
                this.props.modelStore.dispatch(updateModelAction(newModel));
                this.props.socket.emit('getDir');
            }.bind(this)
        });
    },

    clickSubmit: function() {
        this.ajaxUpload();
    },

    render: function() {
        return (
            <div className="UploadFile" id="UploadFile">
                <p>This is UploadFile</p>
                <form id="uploadform" name="uploadform" encType="multipart/form-data">
                    <input type="text" name="filename" id="filename"/>
                    <input type="file" name="modelfile" id="modelfile" onChange={this.changeName} />
                    <input type='submit' value="Submit" onClick={this.clickSubmit} />
                </form>
            </div>
        );
    }
});

module.exports = UploadFile;
