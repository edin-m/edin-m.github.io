const fs = require('fs-extra');
const glob = require('glob');
const exifr = require('exifr');

const IMAGE_FOLDER = '../panos'; // your image folder
const OUTPUT_FILE = './panoramas-with-neighbors.json';

const CLOSE_RADIUS = 10;  // meters — used to count "clutter"
const DISTANCE_LEVELS = [
  { count: 6, maxDist: 100 },
  { count: 3, maxDist: 200 },
  { count: 1, maxDist: 500 },
];

function toRad(deg) {
  return deg * Math.PI / 180;
}

function computeDistance(p1, p2) {
  const R = 6371000;
  const dLat = toRad(p2.lat - p1.lat);
  const dLon = toRad(p2.lon - p1.lon);
  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(p1.lat)) * Math.cos(toRad(p2.lat)) *
            Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const flatDistance = R * c;
  const deltaAlt = (p2.alt || 0) - (p1.alt || 0);
  return Math.sqrt(flatDistance**2 + deltaAlt**2);
}

function computeBearing(p1, p2) {
  const lat1 = toRad(p1.lat);
  const lat2 = toRad(p2.lat);
  const dLon = toRad(p2.lon - p1.lon);
  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
  return (Math.atan2(y, x) + 2 * Math.PI) % (2 * Math.PI);
}

async function extractMetadata(imagePath) {
  const gps = await exifr.parse(imagePath);
  if (!gps || !gps.latitude || !gps.longitude) {
    throw new Error(`Missing GPS info in ${imagePath}`);
  }
  return {
    id: imagePath.split('/').pop().replace('\\', '/'),
    file: imagePath.replace('\\', '/'),
    lat: gps.latitude,
    lon: gps.longitude,
    alt: gps.GPSAltitude || 0,
  };
}

function determineMaxDistance(pano, all) {
  const closeCount = all.filter(p =>
    p.id !== pano.id && computeDistance(pano, p) <= CLOSE_RADIUS
  ).length;

  for (const level of DISTANCE_LEVELS) {
    if (closeCount >= level.count) {
      return level.maxDist;
    }
  }
  return DISTANCE_LEVELS[DISTANCE_LEVELS.length - 1].maxDist;
}

function computeNeighbors(pano, all) {
  const maxDist = determineMaxDistance(pano, all);

  return all
    .filter(p => p.id !== pano.id)
    .map(p => {
      const distance = computeDistance(pano, p);
      if (distance <= maxDist) {
        return {
          id: p.id,
          bearing: computeBearing(pano, p),
          distance: parseFloat(distance.toFixed(2)),
          elevation: parseFloat(((p.alt - pano.alt) || 0).toFixed(2))
        };
      }
      return null;
    })
    .filter(Boolean);
}

(async () => {
  try {
    const files = glob.sync(`${IMAGE_FOLDER}/**/*.jpg`);
    console.log(`Found ${files.length} images.`);

    const panoramas = [];
    for (const file of files) {
      try {
        const data = await extractMetadata(file);
        panoramas.push(data);
      } catch (err) {
        console.warn(err.message);
      }
    }

    for (const pano of panoramas) {
      pano.neighbors = computeNeighbors(pano, panoramas);
    }

    await fs.writeJSON(OUTPUT_FILE, panoramas, { spaces: 2 });
    console.log(`Done. Saved to ${OUTPUT_FILE}`);
  } catch (err) {
    console.error('Error:', err);
  }
})();