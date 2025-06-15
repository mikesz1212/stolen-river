// === Utility Functions ===

/**
 * Returns the top N entries with the highest values from an object.
 */
function getTopValues(data, n = 15) {
  return Object.entries(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

/**
 * Returns the minimum and maximum values from an object.
 */
export function getMinMaxValues(data) {
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
  return [sorted.at(-1)[1], sorted[0][1]];
}

// === Mapbox Setup ===

mapboxgl.accessToken = 'pk.eyJ1IjoibW9kZWxvbiIsImEiOiJjbTc0enQ0dWUwOWppMnFxdnN5eDI2ZHR3In0.wi3R1hrSQ_P-zQANKtROFw';

// Google Sheet source for deal data
const sheetId = '1O1MHhvCn1VFX0eJY8wEeFUNH0r6DKM6rvPp-9d4tKh8';
const sheetName = 'worldwide_deals_filtered';
const url = `https://opensheet.elk.sh/${sheetId}/${sheetName}`;

// Initialize map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/modelon/cmbt5q02l002k01qw5xtz5iaq',
  center: [22.807887, 31.364888],
  // Centered on toshka 22.768239, 31.256890
  zoom: 2
});

// === Global Layer Definitions ===

map.on('load', function () {
  map.addSource('basin-vector', {
    type: 'vector',
    url: 'mapbox://modelon.10j5chfx'  // replace with your actual tileset ID
  });

  map.addLayer({
    id: 'basin-fill',
    type: 'fill',
    source: 'basin-vector',
    'source-layer': 'basin_stress',  // replace if needed
    minzoom: 0,
    maxzoom: 4,
    paint: {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'sdg642'],
        0, 'rgba(255, 248, 0, 0)',     // 0% stress = fully transparent
        100, 'rgba(255, 248, 0, 1)'    // 100% stress = full yellow
      ],
      'fill-opacity': 0.3
    }
  });
});

// Detection layers configuration
const detectionLayers = [
  { year: 2015, tileset: 'modelon.0lf2rejb', layer: 'detection_15-6wng55' },
  { year: 2016, tileset: 'modelon.53oohs4k', layer: 'detection_16-6x5ef8' },
  { year: 2017, tileset: 'modelon.2ti3ytwq', layer: 'detection_17-34gbme' },
  { year: 2018, tileset: 'modelon.70g8qfb4', layer: 'detection_18-9w8991' },
  { year: 2019, tileset: 'modelon.aqg12613', layer: 'detection_19-4701ex' },
  { year: 2020, tileset: 'modelon.cp7x3b2x', layer: 'detection_20-c4e7jb' },
  { year: 2021, tileset: 'modelon.33yq8iq0', layer: 'detection_21-24oezt' },
  { year: 2022, tileset: 'modelon.5y9tnkis', layer: 'detection_22-4tifnz' },
  { year: 2023, tileset: 'modelon.4lwmqtko', layer: 'detection_23-a3t1u7' },
  { year: 2024, tileset: 'modelon.05fy2o8v', layer: 'detection_24-8vde1g' }
];

// NDVI layers configuration
const ndviLayers = [
  //resolution 100m
  {
    year: 2018,
    id: 'ndvi-2018',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/70c5c10154c6553e19af6036f98394fe-7e852732ac6437ec7d7e88e6410b1991/tiles/{z}/{x}/{y}'
  },
  {
    year: 2019,
    id: 'ndvi-2019',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/6528bcb012e3e53feb86eb13d3fac363-49cd536ed25069f4f666db79d0f5bce8/tiles/{z}/{x}/{y}'
  },
  {
    year: 2020,
    id: 'ndvi-2020',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/9da7bc144edb7ebea576c6f4cf3fc30e-c34fbc5afd8e5c86387c3ac00cfa91a3/tiles/{z}/{x}/{y}'
  },
  {
    year: 2021,
    id: 'ndvi-2021',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/1b70e02a7c70b9438960cccc1d2eab91-d6164a520aee394ce3b2468d872b0527/tiles/{z}/{x}/{y}'
  },
  {
  year: 2022,
  id: 'ndvi-2022',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/f1707a5611a7eee0fb823528dbf4fc03-2da64bdda9f10403a6300445491b321e/tiles/{z}/{x}/{y}'
  },
  {
  year: 2023,
  id: 'ndvi-2023',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/0da7a4df187e717dacbbfc52c4ab2f08-b0c4efb1dcb1788296eb08aa0f4cc65c/tiles/{z}/{x}/{y}'
  },
  {
  year: 2024,
  id: 'ndvi-2024',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/57f7e52dac54e0560a3a9fdcaab93894-eacfae54bcc57e9a44aea1aec5f0bf32/tiles/{z}/{x}/{y}'
  }
];

// NDWI layers configuration
const ndwiLayers = [
  //resolution 100m
  {
    year: 2018,
    id: 'ndwi-2018',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/0533e4600d138105e30233ff8fbd5d73-ae11d90cc66b102af892ae5cb9d6d8f4/tiles/{z}/{x}/{y}'
  },
  {
    year: 2019,
    id: 'ndwi-2019',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/0a15ebfb932b6912a5f95c8df1c71e84-892e5ec64a840024d944f2590b0ef811/tiles/{z}/{x}/{y}'
  },
  {
    year: 2020,
    id: 'ndwi-2020',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/eb7d0fdc6216b121466318e64b61e900-7abb974f744fc3aba0efbab416aae544/tiles/{z}/{x}/{y}'
  },
  {
    year: 2021,
    id: 'ndwi-2021',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/e8fa6e023c9ed8d1a19e1e6b13ed3edd-ebba6b625ae391a2710e6ad597daae26/tiles/{z}/{x}/{y}'
  },
  {
  year: 2022,
  id: 'ndwi-2022',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/cd09bba9ca11583d2672b4de1c24410c-869036d4b30be4a5995b8a1e48b7f9c0/tiles/{z}/{x}/{y}'
  },
  {
  year: 2023,
  id: 'ndwi-2023',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/3ff3e8e8a8fcdb195f24efd6f425b5d0-1b83df708e4c157bf29b61dffd179676/tiles/{z}/{x}/{y}'
  },
  {
  year: 2024,
  id: 'ndwi-2024',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/c76514e726c6bb9204b9b39b3a2ca5bf-445f1110e60fe2637e415d6210939a67/tiles/{z}/{x}/{y}'
  }
];

// NDSI layers configuration
const ndsiLayers = [
  //resolution 100m
  {
    year: 2018,
    id: 'ndsi-2018',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/8903533621514be2197699575394574d-2a98a976dcc2bc0b6ee468b9cf2d8500/tiles/{z}/{x}/{y}'
  },
  {
    year: 2019,
    id: 'ndsi-2019',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/605cd44e5d0c542c5826d972e710c214-225751e30e3ad3ff04b4139f9a99d67c/tiles/{z}/{x}/{y}'
  },
  {
    year: 2020,
    id: 'ndsi-2020',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/8d01294cee17d4a53bfc12c5cb027bfe-c40774d47bebfbc5c454f0ea2b0f5bb1/tiles/{z}/{x}/{y}'
  },
  {
    year: 2021,
    id: 'ndsi-2021',
    url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/0fd50f7bf4bf34c3dfa2b05a8085314e-1ec96774a896ad866a59d8bcca44e86c/tiles/{z}/{x}/{y}'
  },
  {
  year: 2022,
  id: 'ndsi-2022',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/84709d308880ce5b415999b6bc61870f-65a0954cd032f33a878ca9cd982ce863/tiles/{z}/{x}/{y}'
  },
  {
  year: 2023,
  id: 'ndsi-2023',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/1913f536ccc3b5cfd20edcfc32ae31bb-6981d08fdf2daa39fc13d65e5aa8dbc9/tiles/{z}/{x}/{y}'
  },
  {
  year: 2024,
  id: 'ndsi-2024',
  url: 'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/5b44e1d10511da7b425d2727e9326a83-be6170875d946527895454a3cc1f39fc/tiles/{z}/{x}/{y}'
  }
];





// === Layer Control Functions ===

/**
 * Show specific detection layer by year
 */
function showDetectionLayer(yearToShow) {
  detectionLayers.forEach(({ year }) => {
    const visibility = (year === yearToShow) ? 'visible' : 'none';
    const layerId = `detection-layer-${year}`;
    if (map.getLayer(layerId)) {
      map.setLayoutProperty(layerId, 'visibility', visibility);
    }
  });
}

 //Show specific NDVI layer by year
function showNDVILayer(yearToShow) {
  ndviLayers.forEach(layer => {
    if (map.getLayer(layer.id)) {
      const visibility = (layer.year === yearToShow) ? 'visible' : 'none';
      map.setLayoutProperty(layer.id, 'visibility', visibility);
    }
  });
}
 //Show specific NDWI layer by year
function showNDWILayer(yearToShow) {
  ndwiLayers.forEach(layer => {
    if (map.getLayer(layer.id)) {
      const visibility = (layer.year === yearToShow) ? 'visible' : 'none';
      map.setLayoutProperty(layer.id, 'visibility', visibility);
    }
  });
}
 //Show specific NDSI layer by year
function showNDSILayer(yearToShow) {
  ndsiLayers.forEach(layer => {
    if (map.getLayer(layer.id)) {
      const visibility = (layer.year === yearToShow) ? 'visible' : 'none';
      map.setLayoutProperty(layer.id, 'visibility', visibility);
    }
  });
}



// // Spinning Globe (commented out as in original)
// let spinning = true;
// const spinSpeed = 0.05; // degrees per animation frame
//
// function spinEarth() {
//   if (!spinning) return;
//
//   const currentCenter = map.getCenter();
//   const currentLng = currentCenter.lng;
//
//   // Wrap longitude to stay within -180 to 180
//   const nextLng = (currentLng + spinSpeed + 360) % 360 - 180;
//
//   map.setCenter([nextLng, currentCenter.lat]);
//   requestAnimationFrame(spinEarth);
// }
//
// map.on('load', () => {
//   map.setProjection('globe');
//
//   // Set initial view
//   map.jumpTo({
//     center: [0, 0], // Equator
//     zoom: 2,
//     pitch: 0,
//     bearing: 0
//   });
//
//   spinEarth(); // Start spinning
// });
//
// ['mousedown', 'touchstart', 'wheel', 'keydown'].forEach(event =>
//   map.on(event, () => { spinning = false; })
// );

// === Load & Process Deal Data ===

fetch(url)
  .then(res => res.json())
  .then(data => {
    // Aggregate deal sizes by buyer country
    const topBuyers = data.reduce((acc, d) => {
      const country = d["Buyer country"];
      const size = parseFloat(d["Deal size"]);
      acc[country] = (acc[country] || 0) + size;
      return acc;
    }, {});

    // Identify top 5 countries by land size bought
    const topBuyerCountries = getTopValues(topBuyers).map(d => d[0]);
    const [minLandSize, maxLandSize] = getMinMaxValues(topBuyers);

    topBuyerCountries.forEach(country => {
      const entry = data.find(d => d["Buyer country"] === country);
      if (!entry) return;

      const el = document.createElement('div');
      el.className = 'country-label';
      el.textContent = country;

      new mapboxgl.Marker(el)
        .setLngLat([
          parseFloat(entry['Buyer_country_long']),
          parseFloat(entry['Buyer_country_lat'])
        ])
        .addTo(map);
    });

    // === Sellers Layer ===
    map.addSource('sellers', {
      type: 'geojson',
      data: {
        type: "FeatureCollection",
        features: data.map(d => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(d['Target_country_long']),
              parseFloat(d["Target_country_lat"]),
              0
            ]
          }
        }))
      }
    });

    map.addLayer({
      id: 'sellers-point-fill',
      type: "circle",
      source: "sellers",
      paint: {
        "circle-color": "#ff0000", // red
        "circle-radius": 4
      }
    });

    // === Buyers Layer ===
    map.addSource('buyers', {
      type: 'geojson',
      data: {
        type: "FeatureCollection",
        features: data
          .filter(d => topBuyerCountries.includes(d["Buyer country"]))
          .map(d => ({
            type: "Feature",
            properties: {
              totalTransactionSize: topBuyers[d["Buyer country"]],
              label: d["Buyer country"]
            },
          geometry: {
            type: "Point",
            coordinates: [
              parseFloat(d['Buyer_country_long']),
              parseFloat(d["Buyer_country_lat"]),
              0
            ]
          }
        }))
      }
    });

    map.addLayer({
      id: 'buyers-point-fill',
      type: "circle",
      source: "buyers",
      paint: {
        "circle-color": "#0000ff", // blue
        "circle-radius": [
          'interpolate',
          ['linear'],
          ['get', 'totalTransactionSize'],
          0, 1,
          maxLandSize, 8 // size scales with transaction volume
        ]
      }
    });

    // map.addLayer({
    //   id: 'buyers-labels',
    //   type: 'symbol',
    //   source: 'buyers',
    //   layout: {
    //     'text-field': ['get', 'label'],
    //     'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    //     'text-size': 11,
    //     'text-anchor': 'top',
    //     'text-offset': [0, 1.2],
    //     'text-padding': 2, // Adds space around the text
    //     'text-justify': 'center'
    //   },
    //   paint: {
    //     'text-color': '#ffffff',
    //     'text-halo-color': '#c40000', // Red background
    //     'text-halo-width': 6,
    //     'text-halo-blur': 0
    //   }
    // });

    // === Lines from Buyer to Seller ===
    map.addSource('lines', {
      type: 'geojson',
      data: {
        type: "FeatureCollection",
        features: data
          .filter(d => topBuyerCountries.includes(d["Buyer country"]))
          .map(d => ({
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: [
                [parseFloat(d['Buyer_country_long']), parseFloat(d["Buyer_country_lat"])],
                [parseFloat(d['Target_country_long']), parseFloat(d["Target_country_lat"])]
              ]
            },
            properties: {
              date: null
            }
          }))
      }
    });

    map.addLayer({
      id: "transaction-line",
      type: 'line',
      source: 'lines',
      layout: {
        "line-cap": "round",
        visibility: 'none'
      },
      paint: {
        "line-color": "#FF0000",
        "line-width": 1,
        "line-opacity": 0.2
      }
    });
    const toshkaBbox = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[[29.9472399478,22.1764145166],[32.4407111053,22.1764145166],[32.4407111053,23.7455104833],[29.9472399478,23.7455104833],[29.9472399478,22.1764145166]]]
      }
    };
    map.addSource('toshka-bbox', {
      type: 'geojson',
      data: toshkaBbox
    });

    map.addLayer({
      id: 'toshka-bbox-line',
      type: 'line',
      source: 'toshka-bbox',
      paint: {
        'line-color': '#f7ff00',
        'line-width': 1
      }
    });

    const toshkaLabel = {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        properties: {
          title: "ROI: Toshka Project"
        },
        geometry: {
          type: "Point",
          coordinates: [31.15, 23.7]  // Adjust this to be centered above the box
        }
      }]
    };
    map.addSource('toshka-label', {
      type: 'geojson',
      data: toshkaLabel
    });

    map.addLayer({
      id: 'toshka-label-layer',
      type: 'symbol',
      source: 'toshka-label',
      layout: {
        'text-field': ['get', 'title'],
        'text-size': 14,
        'text-font': ['Arial Unicode MS Normal'],
        'text-anchor': 'bottom',
        'text-offset': [0, -0.5]
      },
      paint: {
        'text-color': '#f7ff00',
        'text-halo-width': 1
      }
    });



    // Move buyers layer to top
    map.on('idle', () => {
      if (map.getLayer('buyers-point-fill')) {
        map.moveLayer('buyers-point-fill'); // Moves it to the top
      }
    });

    // === Detection Layers ===
    detectionLayers.forEach(({ year, tileset, layer }) => {
      map.addSource(`detection-${year}`, {
        type: 'vector',
        url: `mapbox://${tileset}`
      });

      map.addLayer({
        id: `detection-layer-${year}`,
        type: 'line',
        source: `detection-${year}`,
        'source-layer': layer,
        layout: {
          visibility: year === 2015 ? 'visible' : 'none' // Show 2015 by default
        },
        paint: {
          'line-color': '#74ee15',
          'line-width': 1,
          'line-opacity': 1
        }
      });
    });

    // Initialize with 2015
    showDetectionLayer(2015);
  })
  .catch(error => {
    console.error('Error loading deal data:', error);
  });

// === Map Load Event - Add All Other Layers ===
map.on('load', () => {

  // === Satellite Layer ===
  map.addSource('standard-satellite', {
    type: 'raster',
    url: 'mapbox://mapbox.satellite',
    tileSize: 256
  });

  map.addLayer({
    id: 'satellite-layer',
    type: 'raster',
    source: 'standard-satellite',
    layout: {
      visibility: 'none'  // initially hidden
    }
  });

  // === GEE Layers ===
  if (!map.getSource('gee-layer')) {
    map.addSource('gee-layer', {
      type: 'raster',
      tiles: [
        'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/52bafa3c11ca13d0bbc10d4d1c26ee60-79201ce57368c60e2f319bd926da054b/tiles/{z}/{x}/{y}'
      ],
      tileSize: 256
    });
  }

  if (!map.getLayer('gee-layer')) {
    map.addLayer({
      id: 'gee-layer',
      type: 'raster',
      source: 'gee-layer',
      layout: { visibility: 'none' },
      paint: {
        'raster-opacity': 0.6
      }
    });
  }
map.setPaintProperty('gee-layer', 'raster-opacity', 0.3);

  // if (!map.getSource('gee-layer-2')) {
  //   map.addSource('gee-layer-2', {
  //     type: 'raster',
  //     tiles: [
  //       'https://earthengine.googleapis.com/v1/projects/ee-michalmodelski/maps/65417552e4c09e2801bf985e4ae29242-e778209da83fbda6becfde1246005a7e/tiles/{z}/{x}/{y}'
  //     ],
  //     tileSize: 256
  //   });
  // }
  //
  // if (!map.getLayer('gee-layer-2')) {
  //   map.addLayer({
  //     id: 'gee-layer-2',
  //     type: 'raster',
  //     source: 'gee-layer-2',
  //     layout: { visibility: 'none' }
  //   });
  // }

  // === NDVI Layers ===
  ndviLayers.forEach(layer => {
    if (!map.getSource(layer.id)) {
      map.addSource(layer.id, {
        type: 'raster',
        tiles: [layer.url],
        tileSize: 256
      });
    }

    if (!map.getLayer(layer.id)) {
      map.addLayer({
        id: layer.id,
        type: 'raster',
        source: layer.id,
        layout: {
          visibility: layer.year === 2015 ? 'visible' : 'none' // Show 2015 by default
        }
      });
    }
  });

  // === NDWI Layers ===
  ndwiLayers.forEach(layer => {
    if (!map.getSource(layer.id)) {
      map.addSource(layer.id, {
        type: 'raster',
        tiles: [layer.url],
        tileSize: 256
      });
    }

    if (!map.getLayer(layer.id)) {
      map.addLayer({
        id: layer.id,
        type: 'raster',
        source: layer.id,
        layout: {
          visibility: layer.year === 2015 ? 'visible' : 'none' // Show 2015 by default
        }
      });
    }
  });

    // === NDSI Layers ===
  ndsiLayers.forEach(layer => {
    if (!map.getSource(layer.id)) {
      map.addSource(layer.id, {
        type: 'raster',
        tiles: [layer.url],
        tileSize: 256
      });
    }

    if (!map.getLayer(layer.id)) {
      map.addLayer({
        id: layer.id,
        type: 'raster',
        source: layer.id,
        layout: {
          visibility: layer.year === 2015 ? 'visible' : 'none' // Show 2015 by default
        }
      });
    }
  });




  console.log('NDVI layers added:', ndviLayers.map(l => l.id));
  console.log('NDWI layers added:', ndwiLayers.map(l => l.id));
  console.log('NDWI layers added:', ndsiLayers.map(l => l.id));
});




// === Zoom-based Satellite Toggle ===
map.on('zoomend', () => {
  const zoom = map.getZoom();

  if (map.getLayer('satellite-layer')) {
    const visibility = map.getLayoutProperty('satellite-layer', 'visibility');

    if (zoom >= 15 && visibility === 'none') {
      map.setLayoutProperty('satellite-layer', 'visibility', 'visible');
    } else if (zoom < 15 && visibility === 'visible') {
      map.setLayoutProperty('satellite-layer', 'visibility', 'none');
    }
  }
});

// === Unified Slider Controls ===
// This should run after the map is loaded and elements exist
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('date-slider');
  const label = document.getElementById('date-label');

  if (slider && label) {
    slider.addEventListener('input', () => {
      const year = parseInt(slider.value);
      label.textContent = year;

      console.log('Slider changed to year:', year);

      // Update both detection and NDVI layers
      showDetectionLayer(year);
      showNDVILayer(year);
      showNDWILayer(year);
      showNDSILayer(year);

    });
  } else {
    console.warn('Slider elements not found. Make sure you have elements with IDs "date-slider" and "date-label"');
  }
});

// === Layer Toggle Controls ===
map.on('load', () => {
  /**
   * Helper to attach visibility toggle to checkbox
   */
  const toggle = (layerId, checkboxId) => {
    const checkbox = document.getElementById(checkboxId);
    if (checkbox) {
      checkbox.addEventListener('change', function () {
        if (map.getLayer(layerId)) {
          map.setLayoutProperty(layerId, 'visibility', this.checked ? 'visible' : 'none');
        }
      });
    } else {
      console.warn(`Checkbox with ID "${checkboxId}" not found`);
    }
  };

  // Toggle for transaction lines and GEE raster layers
  toggle('transaction-line', 'toggle-transaction-lines');
  toggle('gee-layer', 'toggle-gee');
  // toggle('gee-layer-2', 'toggle-gee-2');

  // Add NDVI layer toggles if you have checkboxes for them
  ndviLayers.forEach(layer => {
    toggle(layer.id, `toggle-${layer.id}`);
  });
});


// Making sure the slider reflects NDVI/NDWI/NDSI detections
const ndviYears = [2018, 2019, 2020, 2021, 2022, 2023, 2024];

const yearSlider = document.getElementById('date-slider');
const yearLabel = document.getElementById('year-label');

const ndviCheckbox = document.getElementById('toggle-ndvi');
const ndwiCheckbox = document.getElementById('toggle-ndwi');
const ndsiCheckbox = document.getElementById('toggle-ndsi');

function updateLayerVisibility(type, checkbox) {
  const selectedYear = parseInt(yearSlider.value);

  ndviYears.forEach(year => {
    const layerId = `${type}-${year}`;
    if (map.getLayer(layerId)) {
      const visibility = (checkbox.checked && year === selectedYear) ? 'visible' : 'none';
      map.setLayoutProperty(layerId, 'visibility', visibility);
    }
  });
}

function updateAllDetections() {
  updateLayerVisibility('ndvi', ndviCheckbox);
  updateLayerVisibility('ndwi', ndwiCheckbox);
  updateLayerVisibility('ndsi', ndsiCheckbox);
}

// On year slider change
yearSlider.addEventListener('input', () => {
  yearLabel.textContent = yearSlider.value;
  updateAllDetections();
});

// On checkbox changes
ndviCheckbox.addEventListener('change', updateAllDetections);
ndwiCheckbox.addEventListener('change', updateAllDetections);
ndsiCheckbox.addEventListener('change', updateAllDetections);





//Waterstress Layer control
document.getElementById('toggle-basins').addEventListener('change', function () {
  const visibility = this.checked ? 'visible' : 'none';
  map.setLayoutProperty('basin-fill', 'visibility', visibility);
});








// === Zoom to Location Button ===
document.addEventListener('DOMContentLoaded', () => {
  const zoomButton = document.getElementById('zoom-to-location');
  if (zoomButton) {
    zoomButton.addEventListener('click', () => {
      map.flyTo({
        center: [31.364888, 22.807887],  // Toshka coordinates
        zoom: 9,
        speed: 1.2,
        curve: 1,
        essential: true
      });

      // Update info panel content
      const infoContent = document.getElementById('info-content');
      if (infoContent) {
        infoContent.innerHTML = `
          <h2>🌍 Toshka Lakes: Uncovering Extractive Agriculture</h2>

          <p><strong>A Green Mirage?</strong><br>
          Once dry desert, now a patchwork of emerald circles — the Toshka Lakes region tells a new story of rapid agricultural expansion. Fueled by Nile water and “fossil water” from the Nubian Sandstone Aquifer, vast center-pivot irrigation systems have reshaped this landscape. But at what cost?</p>

          <h3>💧 Land & Water Grab</h3>
          <p>Behind the lush satellite imagery lies a controversial truth: much of this land was acquired through opaque contracts by foreign corporations, with little regulation on water use. The Nile — lifeline of millions — is being silently siphoned off for large-scale export farming.</p>

          <h3>🛰️ Satellite Evidence</h3>
          <p>Using machine learning and Sentinel-2 imagery, we detected over <strong>800 pivot irrigation systems</strong> emerging in Toshka from 2015 to 2024. These agricultural machines, each hundreds of meters in diameter, extract enormous volumes of water — often without oversight or sustainable planning.</p>

          <h3>⚠️ Environmental Consequences</h3>
          <ul>
            <li><strong>Water Depletion:</strong> Heavy reliance on Nile and aquifer water threatens long-term supply for Egypt’s population.</li>
            <li><strong>Soil Salinization:</strong> Repeated irrigation in arid climates leads to salt buildup and reduced crop yields.</li>
            <li><strong>Land Degradation:</strong> Over-irrigation damages the fragile desert soil, risking permanent loss of fertility.</li>
          </ul>

          <h3>🔥 Hotspot of Extraction</h3>
          <p>Toshka has become a <strong>case study of extractive farming practices</strong> — where ROI and expansion come before environmental resilience. Our decade-long analysis maps the spread of irrigation and correlates it with vegetation health decline, water stress, and displacement risks.</p>

          <h3>🔎 Explore the Map</h3>
          <ul>
            <li>Visualize the yearly growth of center-pivot systems.</li>
            <li>Overlay water stress zones and land grab contracts.</li>
            <li>Identify the environmental toll of unchecked agricultural expansion.</li>
          </ul>




          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Toshka_Lakes_satellite_image.jpg/800px-Toshka_Lakes_satellite_image.jpg"
               alt="Toshka Lakes Satellite Image"
               style="max-width: 100%; margin-top: 12px; border: 1px solid #ccc; border-radius: 4px;">
        `;
      }
    });
  }
});










