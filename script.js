// 1. Set your Cesium Ion Access Token
// Replace the text inside the quotes with your actual token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODQ2OTMyMi1hNTJlLTRlZGYtYmQ0Yy0yMjY3YzM2M2NkNGYiLCJpZCI6MzczOTE1LCJpYXQiOjE3NjcxNDI0Nzl9.2IhCmELrhjnjroboIctp_FKcVOcYh2lMVNlfyG9EPrQ';

// 2. Initialize the Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  // We use 'true' here to avoid the GeocodeProviderType crash
  geocoder: true, 
  globe: false, // Required so we only see the Google 3D Tiles
});

// Enable atmosphere/sky rendering
viewer.scene.skyAtmosphere.show = true;

// 3. Load the Google Photorealistic 3D Tileset
async function init() {
  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset({
      // This allows the tileset to load properly
      onlyUsingWithGoogleGeocoder: false, 
    });
    
    viewer.scene.primitives.add(tileset);

    // Remove the loading screen from the HTML once tiles load
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.style.display = 'none';
    }

  } catch (error) {
    console.error(`Error loading tileset: ${error}`);
    // If it fails, show the error on the screen
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
      overlay.innerHTML = "<h1>Error: Check Ion Token & Asset Depot</h1>";
    }
  }
}

// Run the initialization
init();

// 4. Point the camera at the Googleplex
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
