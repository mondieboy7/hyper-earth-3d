// REMOVED the import line - Cesium is now globally available

// 1. ADD YOUR TOKEN HERE
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODQ2OTMyMi1hNTJlLTRlZGYtYmQ0Yy0yMjY3YzM2M2NkNGYiLCJpZCI6MzczOTE1LCJpYXQiOjE3NjcxNDI0Nzl9.2IhCmELrhjnjroboIctp_FKcVOcYh2lMVNlfyG9EPrQ';

const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: Cesium.IonGeocodeProviderType.GOOGLE,
  globe: false,
});

viewer.scene.skyAtmosphere.show = true;

async function init() {
  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset({
      onlyUsingWithGoogleGeocoder: true,
    });
    viewer.scene.primitives.add(tileset);

    // Hide loading screen
    const loader = document.getElementById('loadingOverlay');
    if(loader) loader.style.display = 'none';

  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

init();

viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(
    -2693797.551060477,
    -4297135.517094725,
    3854700.7470414364
  ),
  orientation: new Cesium.HeadingPitchRoll(
    4.6550106925119925,
    -0.2863894863138836,
    1.3561760425773173e-7
  ),
});
