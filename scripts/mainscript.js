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

function movethroughpath(path)
{



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
function Path_point(typ, x, y, alt) {
  this.type = typ;
  this.xcoord = x;
  this.ycoord = y;
  this.altitude = alt;
}

var path = [];

var ptyp = "";
var altitude=100;
var pathstarted = 0;
//fixing coordinates
    function add_coordinate(x,y,path,altitude) {
        if (pathstarted === 0) {
            ptyp = "Starting point";
            pathstarted+=1;
        }
        else {
            ptyp = "checkpoint "+pathstarted++;}

        path = path.concat(new Path_point(ptyp,x,y,altitude));
        console.log(path[0].type);


   }

// Function to add a point at the mouse position
   function addPoint(clickPosition) {
       var point = viewer.entities.add({
           position: clickPosition,
           point: {
               pixelSize : 8,
                color : Cesium.Color.TRANSPARENT,
                outlineColor : Cesium.Color.YELLOW,
                outlineWidth : 3
           }
       });

   }

var ellipsoid = viewer.scene.globe.ellipsoid;

//get click position
screenSpaceEventHandler.setInputAction(function(click) {
// get position  of click
    var clickPosition = viewer.camera.pickEllipsoid(click.position);
    var cartographic = ellipsoid.cartesianToCartographic(clickPosition);
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
    //print to console
    console.log(clickPosition);
    console.log(latitudeString);
    console.log(longitudeString);
    addPoint(clickPosition);
    add_coordinate(longitudeString,latitudeString,path);
    //console.log(points_array.length);


},
 Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK );

screenSpaceEventHandler.setInputAction(function(click){
    var clickPosition = viewer.camera.pickEllipsoid(click.position);
    var cartographic = ellipsoid.cartesianToCartographic(clickPosition);
    var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
    var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);

},Cesium.ScreenSpaceEventType.RIGHT_CLICK);



                                       
