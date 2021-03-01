mapboxgl.accessToken = 'pk.eyJ1IjoibmljaG9sYXNjb3dhbjE3IiwiYSI6ImNrM28yNm1uaDAwcHkzbnFkam02dHJ0NjQifQ.E1RO9e96qZUpgn-1muXorg';

// function to translate NYC PUMA codes into name
var PUMALookup = (code) => {
  switch (code) {
    case 3710:
      return {neighborhood: 'Hunts Point, Longwood & Melrose',};
    case 3705:
      return {neighborhood: 'Belmont, Crotona Park East & East Tremont',};
    case 3708:
      return {neighborhood: 'Concourse, Highbridge & Mount Eden',};
    case 3707:
      return {neighborhood: 'Morris Heights, Fordham South & Mount Hope',};
    case 3706:
      return {neighborhood: 'Bedford Park, Fordham North & Norwood',};
    case 3701:
      return {neighborhood: 'Riverdale, Fieldston & Kingsbridge',};
    case 3709:
      return {neighborhood: 'Castle Hill, Clason Point & Parkchester',};
    case 3703:
      return {neighborhood: 'Co-op City, Pelham Bay & Schuylerville',};
    case 3704:
      return {neighborhood: 'Pelham Parkway, Morris Park & Laconia',};
    case 3702:
      return {neighborhood: 'Wakefield, Williamsbridge & Woodlawn',};
    case 4001:
      return {neighborhood: 'Greenpoint & Williamsburg',};
    case 4004:
      return {neighborhood: 'Brooklyn Heights & Fort Greene',};
    case 4003:
      return {neighborhood: 'Bedford-Stuyvesant',};
    case 4002:
      return {neighborhood: 'Bushwick',};
    case 4008:
      return {neighborhood: 'East New York & Starrett City',};
    case 4005:
      return {neighborhood: 'Park Slope, Carroll Gardens & Red Hook',};
    case 4012:
      return {neighborhood: 'Sunset Park & Windsor Terrace',};
    case 4006:
      return {neighborhood: 'Crown Heights North & Prospect Heights',};
    case 4011:
      return {neighborhood: 'Crown Heights So., Prospect Lefferts & Wingate',};
    case 4013:
      return {neighborhood: 'Bay Ridge & Dyker Heights',};
    case 4017:
      return {neighborhood: 'Bensonhurst & Bath Beach',};
    case 4014:
      return {neighborhood: 'Borough Park, Kensington & Ocean Parkway',};
    case 4018:
      return {neighborhood: 'Brighton Beach & Coney Island',};
    case 4015:
      return {neighborhood: 'Flatbush & Midwood',};
    case 4016:
      return {neighborhood: 'Sheepshead Bay, Gerritsen Beach & Homecrest',};
    case 4007:
      return {neighborhood: 'Brownsville & Ocean Hill',};
    case 4010:
      return {neighborhood: 'East Flatbush, Farragut & Rugby',};
    case 4009:
      return {neighborhood: 'Canarsie & Flatlands',};
    case 3810:
      return {neighborhood: 'Battery Park City, Greenwich Village & Soho',};
    case 3809:
      return {neighborhood: 'Chinatown & Lower East Side',};
    case 3807:
      return {neighborhood: 'Chelsea, Clinton & Midtown Business District',};
    case 3808:
      return {neighborhood: 'Murray Hill, Gramercy & Stuyvesant Town',};
    case 3806:
      return {neighborhood: 'Upper West Side & West Side',};
    case 3805:
      return {neighborhood: 'Upper East Side',};
    case 3802:
      return {neighborhood: 'Hamilton Hts, Manhattanville & West Harlem',};
    case 3803:
      return {neighborhood: 'Central Harlem',};
    case 3804:
      return {neighborhood: 'East Harlem',};
    case 3801:
      return {neighborhood: 'Washington Heights, Inwood & Marble Hill',};
    case 4101:
      return {neighborhood: 'Astoria & Long Island City',};
    case 4109:
      return {neighborhood: 'Sunnyside & Woodside',};
    case 4102:
      return {neighborhood: 'Jackson Heights & North Corona',};
    case 4107:
      return {neighborhood: 'Elmhurst & South Corona',};
    case 4110:
      return {neighborhood: 'Ridgewood, Glendale & Middle Village',};
    case 4108:
      return {neighborhood: 'Forest Hills & Rego Park',};
    case 4103:
      return {neighborhood: 'Flushing, Murray Hill & Whitestone',};
    case 4106:
      return {neighborhood: 'Briarwood, Fresh Meadows & Hillcrest',};
    case 4111:
      return {neighborhood: 'Richmond Hill & Woodhaven',};
    case 4113:
      return {neighborhood: 'Howard Beach & Ozone Park',};
    case 4104:
      return {neighborhood: 'Bayside, Douglaston & Little Neck',};
    case 4112:
      return {neighborhood: 'Jamaica, Hollis & St. Albans',};
    case 4105:
      return {neighborhood: 'Queens Village, Cambria Heights & Rosedale',};
    case 4114:
      return {neighborhood: 'Far Rockaway, Breezy Point & Broad Channel',};
    case 3903:
      return {neighborhood: 'Port Richmond, Stapleton & Mariners Harbor',};
    case 3902:
      return {neighborhood: 'New Springville & South Beach',};
    case 3901:
      return {neighborhood: 'Tottenville, Great Kills & Annadale',};
  }
};

// function to convert number to string with commas
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

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
  // add geojson source for essential Workers
  map.addSource('essworkers', {
    type: 'geojson',
    data: '/data/essential-workers.geojson'
  });

  // add total population layer
  map.addLayer({
    'id': 'TOTAL ESSENTIAL WORKERS',
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

  // add outlines
  map.addLayer({
    'id': 'ess-outlines',
    'type': 'line',
    'source': 'essworkers',
    'layout': {},
    'paint': {
      'line-color': '#ebebeb',
      'line-width': 0.3
    }
  });

  // add geojson source for essential Workers
  map.addSource('vaccinations', {
    type: 'geojson',
    data: '/data/VaccinationByZip.geojson'
  });

  // add total population layer
  map.addLayer({
    'id': 'PERCENT POPULATION VACCINATED',
    'type': 'fill',
    'source': 'vaccinations',
    'layout': {},
    'paint': {
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'Perc_ALOD'],
        0,
        '#CCE6FF',
        7.5,
        '#8FAECC',
        10,
        '#6289B3',
        13,
        '#3C5D80',
        16,
        '#24374D'
      ]
    },
    'fill-opacity': 0.85
  })

  // add outlines
  map.addLayer({
    'id': 'vacc-outlines',
    'type': 'line',
    'source': 'vaccinations',
    'layout': {},
    'paint': {
      'line-color': '#ebebeb',
      'line-width': 0.3
    }
  });

  // add an empty data source, which we will use to highlight the lot the user is hovering over
  map.addSource('highlight-feature', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })

  // add a layer for the highlighted lot
  map.addLayer({
    id: 'highlight-line',
    type: 'line',
    source: 'highlight-feature',
    paint: {
      'line-width': 2,
      'line-color': 'white',
    }
  });
})

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('mousemove', function (e) {
  // query for the features under the mouse
  var features = map.queryRenderedFeatures(e.point, {
      layers: ['TOTAL ESSENTIAL WORKERS'],
  });

  if (features.length > 0) {
    // show the popup
    // Populate the popup and set its coordinates based on the feature found.
    var hoveredFeature = features[0]
    var name = PUMALookup(parseInt(hoveredFeature.properties.puma)).neighborhood
    var esspopulation = numberWithCommas(hoveredFeature.properties.EssPop)

    var popupContent = `
      <div>
        <b>${name}</b><br/>
        Essential Worker Count:${esspopulation}
      </div>
    `

    popup.setLngLat(e.lngLat).setHTML(popupContent).addTo(map);

    // set this lot's polygon feature as the data for the highlight source
    map.getSource('highlight-feature').setData(hoveredFeature.geometry);

    // show the cursor as a pointer
    map.getCanvas().style.cursor = 'pointer';
  } else {
    // remove the Popup
    popup.remove();

    map.getCanvas().style.cursor = '';
  }
})

// enumerate ids of the layers
var toggleableLayerIds = ['TOTAL ESSENTIAL WORKERS', 'PERCENT POPULATION VACCINATED'];

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
      if (clickedLayer === 'TOTAL ESSENTIAL WORKERS') {
        map.setLayoutProperty('ess-outlines', 'visibility', 'none');
      } else {map.setLayoutProperty('vacc-outlines', 'visibility', 'none')}
    } else {
      this.className = 'active';
      map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
      if (clickedLayer === 'TOTAL ESSENTIAL WORKERS') {
        map.setLayoutProperty('ess-outlines', 'visibility', 'visible');
      } else {map.setLayoutProperty('vacc-outlines', 'visibility', 'visible')}
    }
  };

  var layers = document.getElementById('menu');
  layers.appendChild(link);
}
