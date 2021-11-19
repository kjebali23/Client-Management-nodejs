mapboxgl.accessToken = 'pk.eyJ1Ijoia2oyMyIsImEiOiJja3Z2MjliMGkzdDNxMnZ0a2NvaHZodTY5In0.9o9aq_6NsR3lSPvwJhjqWg';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [10.20387, 36.71954]
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/users');
  const data = await res.json();
  console.log(data)

  const users = data.map(user => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          user.location.coordinates[0],
          user.location.coordinates[1]
        ]
      },
      properties: {
        userName: user.name,
        icon: 'shop'
      }
    };
  });

  loadMap(users);
}

// Load map with stores
function loadMap(users) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: users
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{userName}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStores();