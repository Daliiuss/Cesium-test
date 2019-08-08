
// The viewModel tracks the state of our mini application.
var viewModel = {
    color : 'Red',
    colors : ['White', 'Red', 'Green', 'Blue', 'Yellow', 'Gray'],
    alpha : 1.0,
    colorBlendMode : 'Highlight',
    colorBlendModes : ['Highlight', 'Replace', 'Mix'],
    colorBlendAmount : 0.5,
    colorBlendAmountEnabled : false,
    silhouetteColor : 'Red',
    silhouetteColors : ['Red', 'Green', 'Blue', 'Yellow', 'Gray'],
    silhouetteAlpha : 1.0,
    silhouetteSize : 2.0
};

// Convert the viewModel members into knockout observables.
Cesium.knockout.track(viewModel);

// Bind the viewModel to the DOM elements of the UI that call for it.
var toolbar = document.getElementById('toolbar');
Cesium.knockout.applyBindings(viewModel, toolbar);

function createModel(mtype ,url, height, x, y, z) {
    if (x === undefined)
    {
        x=21.23;
        y=55.88;
        z=0;
    }
    var position = Cesium.Cartesian3.fromDegrees(x, y, z);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
            id: mtype,
            name : url,
            position : position,
            orientation : orientation,
            model : {
                uri : url,
                minimumPixelSize : 128,
                minscale : 0.2,
                maxscale : 0.2
            }
        });
        viewer.trackedEntity = entity;
    }

var modOpt = [{
    text : 'Model',
},
  { text : 'Car',
    onselect : function() {createModel('Car','../../SampleData/models/Car/Car.gltf', 0.0);}
  }
}
}];

Sandcastle.addToolbarMenu(options);

Sandcastle.addToggleButton('Shadows', viewer.shadows, function(checked) {
    viewer.shadows = checked;
});
