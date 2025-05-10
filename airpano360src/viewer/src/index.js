import { Viewer } from '@photo-sphere-viewer/core';
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';


let viewer;
let panoData = [];
let panoById = {};
let markersPlugin = null;
const MIN_DIST = 100;
const MAX_DIST = 500;
const MIN_ICON_SIZE = 30;
const MAX_ICON_SIZE = 60;
const MIN_OPACITY = (1 - 0.65);

async function init() {
  const response = await fetch('panoramas-with-neighbors.json');
  panoData = await response.json();
  panoById = Object.fromEntries(panoData.map(p => [p.id, p]));

  const firstPano = panoData[0];
  viewer = window.viewer = new Viewer({
	  plugins: [
            MarkersPlugin,
        ],
    container: document.getElementById('viewer'),
    panorama: firstPano.file,
    defaultLong: 0,
    defaultLat: 0,
  });
  markersPlugin = viewer.getPlugin(MarkersPlugin);

  viewer.addEventListener('ready', () => {
    showMarkers(firstPano);
  });

  markersPlugin.addEventListener('select-marker', (e, marker) => {
	  console.log('sfddsf', e, marker);
    const targetId = e.marker.config.data?.targetId;
    if (targetId && panoById[targetId]) {
      loadPanorama(panoById[targetId]);
    }
  });
  //*/
}

function loadPanorama(pano) {
  viewer.setPanorama(pano.file, { transition: true }).then(() => {
    showMarkers(pano);
  });
}

function showMarkers(pano) {
  markersPlugin.clearMarkers();
  pano.neighbors.forEach(neigh => {
    markersPlugin.addMarker({
      id: `marker-${neigh.id}`,
	  position: {
		  pitch: neigh.elevation * 0.01,
		  yaw: neigh.bearing
	  },
	  size: { 
		width: getMarkerSizeByDistance(neigh.distance, MIN_DIST, MAX_DIST), 
		height: getMarkerSizeByDistance(neigh.distance, MIN_DIST, MAX_DIST)
	  },
	  image: 'https://www.onlygfx.com/wp-content/uploads/2022/03/red-circle-round-3d-button-1.png',
	  style: {
		  opacity: getMarkerOpacityByDistance(neigh.distance, MIN_DIST, MAX_DIST),
		cursor: 'pointer'
	  },
	  data: { targetId: neigh.id },
      /*longitude: neigh.bearing,
	  // convert meters to small vertical angle
      latitude: neigh.elevation * 0.01, 
      html: '<div class="marker-arrow"></div>',
      anchor: 'center center',
      tooltip: `Go to ${neigh.id}`,
	  //image: 'https://cdn-icons-png.flaticon.com/512/709/709586.png',
      data: { targetId: neigh.id },
	  //*/
    });
  });
}

function getMarkerOpacityByDistance(distance, minDistance, maxDistance) {
  // Clamp distance
  const clamped = Math.max(minDistance, Math.min(distance, maxDistance));

  // Linear interpolation: closer → opacity 1, farther → opacity 0.75
  const t = (clamped - minDistance) / (maxDistance - minDistance);
  const opacity = 1 - t * MIN_OPACITY;

  return opacity;
}

function getMarkerSizeByDistance(distance, minDistance, maxDistance) {
  // Clamp the distance
  const clamped = Math.max(minDistance, Math.min(distance, maxDistance));

  // Linear interpolation factor (0 = near, 1 = far)
  const t = (clamped - minDistance) / (maxDistance - minDistance);

  // Interpolate width/height: from 64×64 down to 32×32
  const size = MAX_ICON_SIZE - t * (MAX_ICON_SIZE - MIN_ICON_SIZE); // = 128 - t * 52
  return size;
}

init();