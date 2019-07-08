Cesium.Ion.defaultAccessToken = 'your_access_token';
var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

var tileset = viewer.scene.primitives.add(
    new Cesium.Cesium3DTileset({
        url: Cesium.IonResource.fromAssetId(your_asset_id)
    })
);
viewer.zoomTo(tileset);
