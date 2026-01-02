import * as Cesium from "cesium";

// 1. PUT YOUR TOKEN HERE
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODQ2OTMyMi1hNTJlLTRlZGYtYmQ0Yy0yMjY3YzM2M2NkNGYiLCJpZCI6MzczOTE1LCJpYXQiOjE3NjcxNDI0Nzl9.2IhCmELrhjnjroboIctp_FKcVOcYh2lMVNlfyG9EPrQ';

const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: Cesium.IonGeocodeProviderType.GOOGLE,
  globe: false, // Hide globe for Google 3D Tiles
});

// Enable rendering the sky
viewer.scene.skyAtmosphere.show = true;

// 2. Add Photorealistic 3D Tiles
try {
  const tileset = await Cesium.createGooglePhotorealistic3DTileset({
    onlyUsingWithGoogleGeocoder: true,
  });
  
  viewer.scene.primitives.add(tileset);

  // Improvement: Remove the loading overlay when tiles load
  const overlay = document.getElementById('loadingOverlay');
  if (overlay) {
    overlay.style.opacity = '0';
    setTimeout(() => overlay.remove(), 500);
  }

} catch (error) {
  console.log(`Error loading Photorealistic 3D Tiles tileset. ${error}`);
  document.getElementById('loadingOverlay').innerHTML = "<h1>Error Loading Tiles</h1>";
}

// 3. Point the camera at the Googleplex
viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(
    -2693797.551060477,
    -4297135.517094725,
    3854700.7470414364,
  ),
  orientation: new Cesium.HeadingPitchRoll(
    4.6550106925119925,
    -0.2863894863138836,
    1.3561760425773173e-7,
  ),
});
