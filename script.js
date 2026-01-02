// REPLACE WITH YOUR ACTUAL ION TOKEN
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmYmFlZjdlZi02MzIzLTQ0OWMtODMzMC04MGI3NzJhYThiNTEiLCJpZCI6MzczOTE1LCJpYXQiOjE3NjczNjg1Mzh9.HKuHB8Jo23qBWTaoBopHWTE4qC-e9OGRbuHJi1tC4fU';

const viewer = new Cesium.Viewer("cesiumContainer", {
  globe: false, // Required for Google 3D Tiles
  baseLayerPicker: false,
  geocoder: false,
  homeButton: false,
  navigationHelpButton: false,
  orderIndependentTranslucency: true,
  contextOptions: { requestWebgl2: true }
});

// --- HOLLYWOOD LIGHTING & HDR ---
viewer.scene.highDynamicRange = true;
viewer.scene.postProcessStages.tonemapper = Cesium.Tonemapper.ACES;
viewer.scene.postProcessStages.exposure = 1.2;
viewer.scene.postProcessStages.bloom.enabled = true;

async function init() {
  try {
    // 1. Google Photorealistic Tiles
    const googleTileset = await Cesium.createGooglePhotorealistic3DTileset();
    viewer.scene.primitives.add(googleTileset);

    // 2. High-Res 3D Moon
    const moonTileset = await Cesium.Cesium3DTileset.fromIonAssetId(2684829);
    viewer.scene.primitives.add(moonTileset);

    // 3. Volumetric Clouds
    const clouds = new Cesium.CloudCollection();
    clouds.add({
      position: Cesium.Cartesian3.fromDegrees(-74.006, 40.7128, 600),
      scale: new Cesium.Cartesian2(4000, 1200),
      maximumSize: new Cesium.Cartesian3(60, 20, 15),
      slice: 0.4
    });
    viewer.scene.primitives.add(clouds);

    // Initial Fly-to NYC
    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(-74.0445, 40.6892, 150),
      orientation: { heading: 0, pitch: -0.2, roll: 0 }
    });

    document.getElementById('loadingOverlay').style.display = 'none';
  } catch (e) { console.error(e); }
}

// --- ATMOSPHERIC FOG SHADER ---
const fog = new Cesium.PostProcessStage({
  fragmentShader: `
    uniform sampler2D colorTexture;
    uniform sampler2D depthTexture;
    in vec2 v_textureCoordinates;
    void main(void) {
        float depth = czm_unpackDepth(texture(depthTexture, v_textureCoordinates));
        vec4 sceneColor = texture(colorTexture, v_textureCoordinates);
        if (depth >= 1.0) { out_FragColor = sceneColor; return; }
        vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth);
        float dist = -eyeCoordinate.z / eyeCoordinate.w;
        float fogFactor = clamp((dist - 100.0) / 9000.0, 0.0, 0.45);
        vec3 fogColor = vec3(0.8, 0.82, 0.88); 
        out_FragColor = mix(sceneColor, vec4(fogColor, 1.0), fogFactor);
    }`
});
viewer.scene.postProcessStages.add(fog);

// --- CINEMATIC WASD CONTROLS ---
const flags = { looking: false, moveForward: false, moveBackward: false, moveUp: false, moveDown: false, moveLeft: false, moveRight: false };
const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
let startMousePos, mousePos;

handler.setInputAction((m) => {
  flags.looking = true;
  startMousePos = mousePos = Cesium.Cartesian2.clone(m.position);
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
handler.setInputAction((m) => { mousePos = m.endPosition; }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
handler.setInputAction(() => { flags.looking = false; }, Cesium.ScreenSpaceEventType.LEFT_UP);

document.addEventListener('keydown', (e) => {
  const keys = {'KeyW':'moveForward','KeyS':'moveBackward','KeyQ':'moveUp','KeyE':'moveDown','KeyA':'moveLeft','KeyD':'moveRight'};
  if (keys[e.code]) flags[keys[e.code]] = true;
});
document.addEventListener('keyup', (e) => {
  const keys = {'KeyW':'moveForward','KeyS':'moveBackward','KeyQ':'moveUp','KeyE':'moveDown','KeyA':'moveLeft','KeyD':'moveRight'};
  if (keys[e.code]) flags[keys[e.code]] = false;
});

viewer.clock.onTick.addEventListener(() => {
  if (flags.looking) {
    viewer.camera.lookRight((mousePos.x - startMousePos.x) / viewer.canvas.clientWidth * 0.04);
    viewer.camera.lookUp(-(mousePos.y - startMousePos.y) / viewer.canvas.clientHeight * 0.04);
  }
  const moveRate = viewer.camera.positionCartographic.height / 25.0;
  if (flags.moveForward) viewer.camera.moveForward(moveRate);
  if (flags.moveBackward) viewer.camera.moveBackward(moveRate);
  if (flags.moveUp) viewer.camera.moveUp(moveRate);
  if (flags.moveDown) viewer.camera.moveDown(moveRate);
  if (flags.moveLeft) viewer.camera.moveLeft(moveRate);
  if (flags.moveRight) viewer.camera.moveRight(moveRate);
});

// --- TIME OF DAY SLIDER ---
document.getElementById('timeSlider').addEventListener('input', (e) => {
  const hour = parseFloat(e.target.value);
  const date = new Date();
  date.setHours(hour, (hour % 1) * 60, 0);
  viewer.clock.currentTime = Cesium.JulianDate.fromDate(date);
});

init();
