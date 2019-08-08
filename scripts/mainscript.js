var viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox : false,
    selectionIndicator : false,
    shadows : true,
    shouldAnimate : true
});

function includeJs(jsFilePath) {
    var js = document.createElement("testbutton.js");

    js.type = "text/javascript";
    js.src = "../Apps/Sandcastle/new_scripts/testbutton.js";

    document.body.appendChild(js);
}

includeJs("../Apps/Sandcastle/new_scripts/testbutton.js");

//TODO: Setup new project!!!
//TODO: assign model to path! / Requires CZML format

// Add model from SampleData
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

//Option bar
var modOpt = [
    {text : '-Model-'},
    { text : 'Car',
      onselect : function() {createModel('Car','../../SampleData/models/Car/Car.gltf', 0.0);}
    }
  ];
Sandcastle.addToolbarMenu(modOpt);

var pathscntr = 0;

var button = document.createElement('button');
            button.type = 'button';
            button.className = 'cesium-button';
            button.onclick = function() {
                viewer.entities.removeAll(); // clear viewer

                upaths[pathscntr++]=mpath;

                  var i;
                  for (i = 0; i < mpath.length; i++)
                  {
                      console.log(mpath[i].type);
                  }
                endFlag=0;
                pathstarted=0;
                clickpointcntr=0;
                mpath=[];
            };
            button.textContent = 'New path';
            document.getElementById('toolbar').appendChild(button);

var button2 = document.createElement('button');
            button2.type = 'button';
            button2.className = 'cesium-button';
            button2.onclick = function() {
                var j,k;
                  for (j = 0; j < upaths.length; j++)
                  {
                           for (k = 0; k < upaths[j].length; k++)
                              {
                                  var tempid="";
                                  switch(upaths[j][k].type) {
                                      case "Starting point":
                                           tempid=j.toString()+"s";
                                          console.log(tempid);
                                           addPoint(tempid, upaths[j][k].xcoord, upaths[j][k].ycoord, upaths[j][k].altitude, 8, Cesium.Color.GREEN, Cesium.Color.YELLOW, 3);
                                           console.log("start");
                                           break;
                                      case "Checkpoint":
                                           tempid= k.toString()+j.toString()+"c";
                                           console.log(k);
                                           addPoint(tempid, upaths[j][k].xcoord, upaths[j][k].ycoord, upaths[j][k].altitude, 8, Cesium.Color.TRANSPARENT, Cesium.Color.YELLOW, 3);
                                           addLine(upaths[j][k-1].xcoord, upaths[j][k-1].ycoord,
                        upaths[j][k].xcoord, upaths[j][k].ycoord);
                                           console.log("checkpoint");
                                        break;
                                      case "End point":
                                           tempid=j.toString()+"e";
                                           addPoint(tempid, upaths[j][k].xcoord, upaths[j][k].ycoord, upaths[j][k].altitude, 8, Cesium.Color.RED, Cesium.Color.YELLOW, 3);
                                           addLine(upaths[j][k-1].xcoord, upaths[j][k-1].ycoord,
                        upaths[j][k].xcoord, upaths[j][k].ycoord);
                                           console.log("end");
                                        break;
                                    }
                              }
                  }

            };
            button2.textContent = 'Recreate paths';
            document.getElementById('toolbar').appendChild(button2);

//Path_point obj constructor
function Path_point(typ, x, y, alt, pid) {
  this.type = typ;
  this.xcoord = x;
  this.ycoord = y;
  this.altitude = alt;
  this.id = pid;
}

//Holds all Path_points
//TODO: create array for viewer coordinates / Fix: viewer does not require Elipsoid
var mpath = []; //model path
var upaths = []; //user paths
var points_array = [];

//TODO too much variables!
var ptyp = "";
var altitude=100;
var pathstarted = 0;
var endFlag = 0; //indentifies end point
var pid= "StrtP"; // points ID's

//Adds point to viewer
  function addPoint(pid, x, y, altitude, psize, pcolor, pocolor, powith) {
       var point = viewer.entities.add({
           id: pid,
           position: new Cesium.Cartesian3.fromDegrees(x,y,altitude),
           point: {
               pixelSize : psize,
               color : pcolor,
               outlineColor : pocolor,
               outlineWidth : powith
           }

       });
       points_array.push(point);
   }

//TODO: Add ID / EDIT: polyline doesn't have ID, req new solution
function addLine(x1, y1, x2, y2) {
    var lineshape = viewer.entities.add({
        polyline:{
            //material: new Cesium.Material({color: (255,30,30)}),
              positions : Cesium.Cartesian3.fromDegreesArray([
                        x1, y1,
                        x2, y2
                        ]),
              color: Cesium.Color.RED,
              width : 5
      }
    });
    return lineshape;
    }



//Creating coordinates x/y
//TODO: Switch case scenario
//TODO: Call addPoint from here
var clickpointcntr = 0;

function add_coordinate(x, y, clickPosition, mpath, altitude) {
        clickpointcntr++;

        if (pathstarted === 1 && endFlag === 0) {

            ptyp = "Checkpoint";
            pid = "chkpnt"+mpath.length;

            addPoint(pid, x, y, altitude, 8, Cesium.Color.TRANSPARENT, Cesium.Color.YELLOW, 3);
            mpath.push(new Path_point(ptyp, x, y, altitude));
            addLine(mpath[clickpointcntr-2].xcoord, mpath[clickpointcntr-2].ycoord,
                        mpath[clickpointcntr-1].xcoord, mpath[clickpointcntr-1].ycoord);
            console.log("new checkpoint");

        }

        if (pathstarted === 0) {

            ptyp = "Starting point";
            pid = "StrtP";

            addPoint(pid, x , y, altitude, 8, Cesium.Color.GREEN, Cesium.Color.YELLOW, 3);
            mpath.push(new Path_point(ptyp, x, y, altitude));
            pathstarted++;
            console.log("start");

        }

        if (endFlag === 1){

            ptyp = "End point";
            pid= "EndP";

            addPoint(pid, x , y, altitude, 8, Cesium.Color.RED, Cesium.Color.YELLOW, 3);
            mpath.push(new Path_point(ptyp, x, y, altitude));
            addLine(mpath[clickpointcntr-2].xcoord, mpath[clickpointcntr-2].ycoord,
                        mpath[clickpointcntr-1].xcoord, mpath[clickpointcntr-1].ycoord);
            console.log("end");

        }
    }


//Elipsoid variable for getting coordinates
var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
var ellipsoid = viewer.scene.globe.ellipsoid;

//get left click position
screenSpaceEventHandler.setInputAction(function(click) {
    var lclickPosition = viewer.camera.pickEllipsoid(click.position);
    var cartographic = ellipsoid.cartesianToCartographic(lclickPosition);
    var x = Cesium.Math.toDegrees(cartographic.longitude);
    var y = Cesium.Math.toDegrees(cartographic.latitude);

    if (endFlag===0){
        add_coordinate(x, y, lclickPosition, mpath, 100);
        }
    else
    {console.log("End point has been already set");
    }


},Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK );

//get right click position
var mpathcntr =0;
//Todo: assign labels. Temp fix: ID's
screenSpaceEventHandler.setInputAction(function(click){

    if(pathstarted > 0){
        if(endFlag === 1)
            {console.log("End point already set");}

        else
            {var rclickPosition = viewer.camera.pickEllipsoid(click.position);
             var cartographic = ellipsoid.cartesianToCartographic(rclickPosition);
             var x = Cesium.Math.toDegrees(cartographic.longitude);
             var y = Cesium.Math.toDegrees(cartographic.latitude);
             endFlag=1;

             add_coordinate(x, y, rclickPosition, mpath, 100);

             upaths[mpathcntr++]=mpath;
             //console.log(upaths);
            }
    }
},Cesium.ScreenSpaceEventType.RIGHT_CLICK);
