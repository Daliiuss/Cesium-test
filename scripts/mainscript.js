var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox : false,
    selectionIndicator : false,
    shadows : true,
    shouldAnimate : true
});


// Add model
function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(55.88, 21.23, height);
    var heading = Cesium.Math.toRadians(135);
    var pitch = 0;
    var roll = 0;
    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = viewer.entities.add({
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

//Option bar
var options = [
    {text : '---'},
    { text : 'Car',
      onselect : function() {createModel('../../SampleData/models/Car/Car.gltf', 0.0);}
    }
  ];
Sandcastle.addToolbarMenu(options);

var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

//Get position
/*function getClickPosition(e) {
    var xPosition = e.clientX;
    var yPosition = e.clientY;
}
*/

var points_array = [];
    function fix_coordinate(clickPosition) {


   }

// Function to add a point at the mouse position
   function addPoint(clickPosition) {
       var point = viewer.entities.add({
           position: clickPosition,
           point: {
               pixelSize: 10,
               color: Cesium.Color.RED
           }
       });

   }

//get click position
screenSpaceEventHandler.setInputAction(function(click) {
// get position  of click
    var clickPosition = viewer.camera.pickEllipsoid(click.position);
    //print to console
    console.log(clickPosition);
    addPoint(clickPosition);
    points_array += clickPosition;
    console.log(points_array.length);


},
 Cesium.ScreenSpaceEventType.LEFT_CLICK);
