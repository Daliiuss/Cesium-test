var viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider : Cesium.createTileMapServiceImageryProvider({
    url : Cesium.buildModuleUrl('D:\Testdata\Export_city_fixed.obj') //uploading local map
  }),
  baseLayerPicker : false,
  geocoder : false
});

function createModel(url, height) {
    viewer.entities.removeAll();

    var position = Cesium.Cartesian3.fromDegrees(-123.0744619, 44.0503706, height);
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
            maximumScale : 20000
        }
    });
    viewer.trackedEntity = entity;
}
