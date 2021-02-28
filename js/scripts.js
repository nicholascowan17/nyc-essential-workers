mapboxgl.accessToken = 'pk.eyJ1IjoibmljaG9sYXNjb3dhbjE3IiwiYSI6ImNrM28yNm1uaDAwcHkzbnFkam02dHJ0NjQifQ.E1RO9e96qZUpgn-1muXorg';

var map = new mapboxgl.Map({
  container: 'mapContainer', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-73.94, 40.705], // starting position [lng, lat]
  zoom: 10.1 // starting zoom
});

// disable map zoom when using scroll
map.scrollZoom.disable();

// add navigation control in top left
var nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-right');

map.on('load', function() {
  // add geojson source or essential Workers
  map.addSource('essworkers', {
    type: 'geojson',
    data: '/data/essential-workers.geojson'
  });

  // add total population layer
  map.addLayer({
    'id': 'TOTAL',
    'type': 'fill',
    'source': 'essworkers',
    'layout': {},
    'paint': {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'EssPop'],
        5000,
        '#CCE6FF',
        10000,
        '#8FAECC',
        15000,
        '#6289B3',
        20000,
        '#3C5D80',
        25000,
        '#24374D'
      ]
    },
    'fill-opacity': 0.85
  })

  // add grocery population layer
  map.addLayer({
    'id': 'GROCERY',
    'type': 'fill',
    'source': 'essworkers',
    'layout': {},
    'paint': {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'Grocery'],
        0,
        '#CCE6FF',
        1500,
        '#8FAECC',
        2000,
        '#6289B3',
        2500,
        '#3C5D80',
        3000,
        '#24374D'
      ]
    },
    'fill-opacity': 0.85
  })

  // add outlines
  map.addLayer({
    'id': 'outlines',
    'type': 'line',
    'source': 'essworkers',
    'layout': {},
    'paint': {
      'line-color': '#ebebeb',
      'line-width': 0.3
    }
  })
});

// enumerate ids of the layers
var toggleableLayerIds = ['TOTAL', 'GROCERY'];

// set up the corresponding toggle button for each layer
for (var i = 0; i < toggleableLayerIds.length; i++) {
  var id = toggleableLayerIds[i];

  var link = document.createElement('a');
  link.href = '#';
  link.className = 'active';
  link.textContent = id;

  link.onclick = function (e) {
    var clickedLayer = this.textContent;
    e.preventDefault();
    e.stopPropagation();

    var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

    // toggle layer visibility by changing the layout object's visibility property
    if (visibility === 'visible') {
      map.setLayoutProperty(clickedLayer, 'visibility', 'none');
      this.className = '';
    } else {
      this.className = 'active';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
    }
  };

  var layers = document.getElementById('menu');
  layers.appendChild(link);
}
