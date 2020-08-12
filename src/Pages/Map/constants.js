const mapCongig = (container) => {
  return {
    container,
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.0066, 40.7135],
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    antialias: true,
  };
};

const layers3d = {
  'id': '3d-buildings',
  'source': 'composite',
  'source-layer': 'building',
  'filter': ['==', 'extrude', 'true'],
  'type': 'fill-extrusion',
  'minzoom': 15,
  'paint': {
    'fill-extrusion-color': '#aaa',
    'fill-extrusion-height': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'height'],
    ],
    'fill-extrusion-base': [
      'interpolate',
      ['linear'],
      ['zoom'],
      15,
      0,
      15.05,
      ['get', 'min_height'],
    ],
    'fill-extrusion-opacity': 0.6,
  },
};

const customMapSourse = {
  type: 'geojson',
  data: {
    type: 'FeatureCollection',
    features: [],
  },
};

const customMapLayer = {
  id: 'random-points-layer',
  source: 'random-points-data',
  type: 'symbol',
  layout: {
    'icon-image': 'bakery-15',
    'icon-padding': 0,
    'icon-allow-overlap': true,
    'icon-size': 1.5,
  },
};

export {
  layers3d,
  mapCongig,
  customMapSourse,
  customMapLayer,
};