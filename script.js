// 1. Set your Cesium Ion Access Token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODQ2OTMyMi1hNTJlLTRlZGYtYmQ0Yy0yMjY3YzM2M2NkNGYiLCJpZCI6MzczOTE1LCJpYXQiOjE3NjcxNDI0Nzl9.2IhCmELrhjnjroboIctp_FKcVOcYh2lMVNlfyG9EPrQ';

// 2. Initialize the Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: Cesium.IonGeocodeProviderType.GOOGLE,
  globe: false, // Required for Photorealistic Tiles to look right
});

// Enable atmosphere effects
viewer.scene.skyAtmosphere.show = true;

// 3. Load the Google Photorealistic 3D Tileset
async function initTileset() {
  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset({
      onlyUsingWithGoogleGeocoder: true,
    });
    
    viewer.scene.primitives.add(tileset);

    // Remove the loading screen once tiles start appearing
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.style.display = 'none';
    }

  } catch (error) {
    console.error(`Error loading tileset: ${error}`);
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.innerHTML = "<h1>Error: Check API Key and Console</h1>";
    }
  }
}

// Start the loading process
initTileset();

// 4. Set Camera to the Googleplex (Your original coordinates)
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
