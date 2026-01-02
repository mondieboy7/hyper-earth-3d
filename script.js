// 1. YOUR ION TOKEN
// Replace the text below with your ACTUAL token from Cesium Ion
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODQ2OTMyMi1hNTJlLTRlZGYtYmQ0Yy0yMjY3YzM2M2NkNGYiLCJpZCI6MzczOTE1LCJpYXQiOjE3NjcxNDI0Nzl9.2IhCmELrhjnjroboIctp_FKcVOcYh2lMVNlfyG9EPrQ';

// 2. INITIALIZE VIEWER
const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: true, 
  globe: false, // Must be false for Google Tiles to display correctly
});

// 3. LOAD TILES
async function init() {
  try {
    // Calling this with empty brackets prevents the [object Object] error
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);

    // Hide the loading screen
    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.style.display = 'none';

  } catch (error) {
    console.error(`Error loading tileset: ${error}`);
    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.innerHTML = "<h1>Error 400: Check Ion Assets</h1>";
  }
}

init();

// 4. SET CAMERA VIEW (Googleplex)
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
