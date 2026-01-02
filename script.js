// 1. YOUR ION TOKEN
Cesium.Ion.defaultAccessToken = 'YOUR_ACTUAL_TOKEN_HERE';

// 2. INITIALIZE VIEWER WITH HIGH GRAPHICS
const viewer = new Cesium.Viewer("cesiumContainer", {
  timeline: false,
  animation: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  geocoder: true,
  globe: false, 
  // High-end rendering settings
  msaaSamples: 4, // Smoother edges (Anti-aliasing)
});

// 3. IMPROVE LIGHTING & ATMOSPHERE
viewer.scene.skyAtmosphere.show = true; // Adds the blue horizon
viewer.scene.fog.enabled = true; // Adds depth to the distance
viewer.scene.fog.density = 0.0002;
viewer.scene.highDynamicRange = true; // Better colors/brightness

// 4. ADD THE CLOUD LAYER
const cloudLayer = viewer.scene.primitives.add(new Cesium.CloudCollection());
for (let i = 0; i < 50; i++) {
    cloudLayer.add({
        position: Cesium.Cartesian3.fromDegrees(-122.084, 37.422, 1000 + (i * 100)), // Near Googleplex
        maximumSize: new Cesium.Cartesian2(800.0, 500.0),
        slice: 0.5,
    });
}

// 5. LOAD TILES
async function startApp() {
  try {
    const tileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(tileset);

    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.style.display = 'none';

  } catch (error) {
    console.error(error);
  }
}

startApp();

// 6. BETTER STARTING CAMERA (Tilted view)
viewer.scene.camera.setView({
  destination: new Cesium.Cartesian3(-2693797, -4297135, 3854700),
  orientation: {
    heading: 4.65,
    pitch: -0.3, // Tilted down to see the horizon
    roll: 0
  }
});
