var React = require("react");
var ReactDOM =  require("react-dom");
var $ = require('jquery');
var THREE = require("three");
var OrbitControls = require('three-orbit-controls')(THREE);
var STLLoader = require('three-stl-loader')(THREE);
var TrackballControls = require('three-trackballcontrols');
var updateModelAction = require('../actions').updateModelAction;

var ModelViewer = React.createClass({
    
    propTypes: {
        url: React.PropTypes.string,
    },

    getInitialState: function() {
    	return {
    		modelName: this.props.modelStore.getState(),
    	}
    },

    fetchModelInfo: function() {
        $.ajax({
        	url: this.props.url,
        	dataType: 'json',
        	cache: 'false',
        	success: function(data) {
                this.props.modelStore.dispatch(updateModelAction(data[data.length-1].name));
        	    console.log("read exec");
        	}.bind(this)
        });
    },

    threeSTLModel: function() {
    	var camera, controls, scene, renderer;
        var modelname = this.state.modelName;

        init();
		animate();

		function init() {
			// scene
			scene = new THREE.Scene();

			// renderer
			renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( 600, 600 );

			var container = document.getElementById("ModelViewer");
			container.removeChild(container.lastChild);
            container.appendChild(renderer.domElement);
            
            // camera
            camera = new THREE.PerspectiveCamera( 60, 1, 1, 1000 );
			
            // controls
            controls = new OrbitControls( camera, renderer.domElement );
			controls.enableDamping = true;
			controls.dampingFactor = 0.25;
			controls.enableZoom = false;
            
            // model
            var loader = new STLLoader();

            loader.load('/models/' + modelname, function (geometry) {
                var material = new THREE.MeshNormalMaterial();
                var mesh = new THREE.Mesh(geometry, material);

                var center = THREE.GeometryUtils.center(geometry);
			    var boundbox=geometry.boundingBox;
			    var vector3 = boundbox.size(null);
			    var scale = vector3.length();
			    camera.position.set(scale, scale, scale);
			    camera.lookAt(scene.position);
			    scene.add(camera);

			    mesh.position.set(0,0,0);
                scene.add(mesh);
            });

            // light
            light = new THREE.DirectionalLight( 0xffffff );
			light.position.set( 1, 1, 1 );
			scene.add( light );
			light = new THREE.DirectionalLight( 0x002288 );
			light.position.set( -1, -1, -1 );
			scene.add( light );
			light = new THREE.AmbientLight( 0x222222 );
			scene.add( light );
		}

		function animate() {
			requestAnimationFrame( animate );
			controls.update();
			render();
		}

		function render() {
			renderer.render( scene, camera );
		}
    },

	componentDidMount: function() {
	    var listenUpdateModel = this.props.modelStore.subscribe(this.updateModel);	
   
        //var socket = io.connect('http://localhost:8000');
        //var socket = io();
		this.props.socket.emit('feedback', 'ModelViewer componentDidMount connected');
		this.props.socket.emit('loadModel');

        this.props.socket.on('showModel', function() {
        	this.props.socket.emit('feedback', 'showModel msg recived');
            return this.fetchModelInfo();
        }.bind(this));

		this.props.socket.on('sendModel', function(model) {
            this.props.modelStore.dispatch(updateModelAction(model));
            this.props.socket.emit('feedback', 'Recive sendModel' + model);
            //return this.updateModel(model);
		}.bind(this));
    },

    updateModel: function() {
        this.setState({
        	modelName: this.props.modelStore.getState(),
        });
    },

    componentDidUpdate: function() {
        this.threeSTLModel();
    },

    render: function() {
    	return (
    		<div className="ModelViewer" id="ModelViewer">
                <p>This is ModelViewer</p>
            </div>
    	);
    }
});

module.exports = ModelViewer;
