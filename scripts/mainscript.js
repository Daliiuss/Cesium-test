var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox : false,
    selectionIndicator : false,
    shadows : true,
    shouldAnimate : true
});

//TODO: Setup new project!!!
//TODO: assign model to path!


// Add model from SampleData
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
//TODO: Rename
var options = [
    {text : '---'},
    { text : 'Car',
      onselect : function() {createModel('../../SampleData/models/Car/Car.gltf', 0.0);}
    }
  ];
Sandcastle.addToolbarMenu(options);

var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

//Path_point obj constructor
function Path_point(typ, x, y, alt) {
  this.type = typ;
  this.xcoord = x;
  this.ycoord = y;
  this.altitude = alt;
}

//Holds all Path_points
//TODO: create array for viewer coordinates
var path = [];


//TODO too much variables!
var ptyp = "";
var altitude=100;
var pathstarted = 0;
var endFlag = 0;

//Creating coordinates x/y
//TODO: Switch case scenario
//TODO: Call addPoint from here
    function add_coordinate(clickPosition, path,altitude) {
        var cartographic = ellipsoid.cartesianToCartographic(clickPosition);
        var x = Cesium.Math.toDegrees(cartographic.longitude);
        var y = Cesium.Math.toDegrees(cartographic.latitude);
        if (endFlag === 1){
            ptyp = "End point";
        }
        else if (pathstarted === 0) {
            ptyp = "Starting point";
            pathstarted+=1;
        }
        else {
            ptyp = "Checkpoint "+pathstarted++;}

        path = path.concat(new Path_point(ptyp,x,y,altitude));
        console.log(path[0].type);
   }

//Adds point to viewer
  function addPoint(clickPosition, psize, pcolor, pocolor, powith) {
       var point = viewer.entities.add({
           position: clickPosition,
           point: {
               pixelSize : psize,
                color : pcolor,
                outlineColor : pocolor,
                outlineWidth : powith
           }
       });

   }


//Elipsoid variable for getting coordinates
var ellipsoid = viewer.scene.globe.ellipsoid;

//get left click position
screenSpaceEventHandler.setInputAction(function(click) {
// get position  of click
    var lclickPosition = viewer.camera.pickEllipsoid(click.position);
    if (endFlag===0){
    addPoint(lclickPosition, 8, Cesium.Color.TRANSPARENT, Cesium.Color.YELLOW, 3);
        add_coordinate(lclickPosition, path, 100);}
    else
    {console.log("End point has been already set");}


},
 Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK );

//get right click position
//Todo: assign labels
screenSpaceEventHandler.setInputAction(function(click){
    if(endFlag === 0)
    {var rclickPosition = viewer.camera.pickEllipsoid(click.position);
     endFlag=1;
     var cartographic = ellipsoid.cartesianToCartographic(rclickPosition);
     addPoint(rclickPosition, 8, Cesium.Color.RED, Cesium.Color.YELLOW, 3);
     add_coordinate(rclickPosition, path, 100);
    }
    else
        {console.log("End point already set");}
},Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        
