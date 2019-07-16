var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// Function to add a point at the mouse position
function addPoint(position) {
  point = viewer.entities.add({
    position: position,
    point: {
        pixelSize: 5,
        color: Cesium.Color.RED}
      });
};

// Event handler for left click
screenSpaceEventHandler.setInputAction(function(click) {

        // get position  of click
var clickPosition = viewer.camera.pickEllipsoid(click.position);

        // add point at initial click position
addPoint(clickPosition);

        // Event handler for mouse movement
screenSpaceEventHandler.setInputAction(function(movement) {

                // get position of mouse
    var mousePosition = viewer.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid, mousePosition);

                // use callback property to add a point at the position of the mouse cursor
    var point = viewer.entities.add({
        position: new Cesium.CallbackProperty(function(time, result) {
            return mousePosition
        }, false),
        point: {
            pixelSize: 5,
            color: Cesium.Color.RED
        }
    });

                // create an empty array where the coordinates of the line will be stored
    var lineArray = []

                // convert mouse and click position to lon/lat coordinates and add them to the array
    var cartographicMouse = Cesium.Ellipsoid.WGS84.cartesianToCartographic(mousePosition);
    var cartographicClick = Cesium.Ellipsoid.WGS84.cartesianToCartographic(clickPosition);

                startPoint.longitude = cartographicClick.longitude;
                startPoint.latitude = cartographicClick.latitude;
                endPoint.longitude = cartographicMouse.longitude;
                endPoint.latitude = cartographicMouse.latitude;

    var x = Cesium.Math.toDegrees(cartographicMouse.longitude);
    var y = Cesium.Math.toDegrees(cartographicMouse.latitude);
    lineArray.push(x);
    lineArray.push(y);

    var x = Cesium.Math.toDegrees(cartographicClick.longitude);
    var y = Cesium.Math.toDegrees(cartographicClick.latitude);
    lineArray.push(x);
    lineArray.push(y);

                // use callback property to get cartesian coordinates for the line; if there is an existing line remove it, store in varible
    var linePosition = new Cesium.CallbackProperty(function(time, result) {
        if (typeof tempLine !== 'undefined') {
            viewer.entities.remove(tempLine);
        };
        return new Cesium.Cartesian3.fromDegreesArray(lineArray)
    }, false)

                // draw tempLine
    var tempLine = viewer.entities.add({
        polyline: {
            positions: linePosition,
            width: 5,
            material: Cesium.Color.RED
        }
    });
                // Event handler for second click; draw line with position from variable linePosition
    screenSpaceEventHandler.setInputAction(function(click) {
                        // get position  of click
                        var clickPosition = viewer.camera.pickEllipsoid(click.position);
                        // add point at  click position
                        addPoint(clickPosition);

        var Line = viewer.entities.add({
            polyline: {
                positions: linePosition,
                width: 5,
                material: Cesium.Color.RED
            }
        });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE, );
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
