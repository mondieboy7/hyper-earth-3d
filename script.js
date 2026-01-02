// 1. Paste your NEW token from Cesium Ion here
Cesium.Ion.defaultAccessToken = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYmFlZjdlZi02MzIzLTQ0OWMtODMzMC04MGI3NzJhYThiNTEiLCJpZCI6MzczOTE1LCJpYXQiOjE3NjczNjg1Mzh9.HKuHB8Jo23qBWTaoBopHWTE4qC-e9OGRbuHJi1tC4fU';

// 2. Setup the Earth Viewer
const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: true, 
  globe: false, // This must be false for Google 3D tiles to work
});

// 3. Load the 3D Buildings
async function startApp() {
  try {
    // This connects to the Google Photorealistic 3D Tiles
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);

    // Hide the "Preparing" message once loaded
    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.style.display = 'none';

  } catch (error) {
    console.error("Error:", error);
    document.getElementById('loadingOverlay').innerHTML = "<h1>Error: Make sure you added Google Tiles to My Assets in Cesium Ion</h1>";
  }
}

startApp();

// 4. Zoom the camera to the Googleplex
viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(-2693797, -4297135, 3854700),
  orientation: {
    heading: 4.65,
    pitch: -0.28,
    roll: 0
  }
});
