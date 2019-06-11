
$(document).ready(function(){
  $("#volveratras").hide();
  $("#map").hide();
  $("#botoncamara").click(function(){
    $("#botoncamara").hide();
    $("#volveratras").show();
    $("#webcam").show();
    const scanner = new Instascan.Scanner(
            {
                video: document.getElementById('webcam')
            }
        );
        scanner.addListener('scan', function(content) {
            alert('Escaneo el contenido: ' + content);
            $("#map").show();
            $("#webcam").hide();
            let stream = webcam.srcObject;
            let tracks = stream.getTracks();
            tracks.forEach(function(track) {
              track.stop();
            });
            webcam.srcObject = null;
        });
        Instascan.Camera.getCameras().then(cameras =>
        {
            if(cameras.length > 0){
                scanner.start(cameras[0]);
            } else {
                console.error("No existe camara");
            }
        });
  });
  $("#volveratras").click(function(){
    let stream = webcam.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach(function(track) {
      track.stop();
    });
    webcam.srcObject = null;
    $("#volveratras").hide();
    $("#webcam").hide();
    $("#botoncamara").show();
    $("#map").hide();
  });

});

function initmap(){
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude

      }
      mapboxgl.accessToken = 'pk.eyJ1IjoibWF1cm9vOTUiLCJhIjoiY2p1dXA4OTB4MGw1cTQ0cGZ5enZ3YndlMCJ9.H1Jawm07XbihcAarS653RQ';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        center: pos, // starting position
        zoom: 12
      });
      // set the bounds of the map
      // initialize the map canvas to interact with later
      var canvas = map.getCanvasContainer();

      // an arbitrary start will always be the same
      // only the end or destination will change
      var start = [pos.lng, pos.lat];
    // create a function to make a directions request
    function getRoute(end) {

      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      var start = [pos.lng, pos.lat];
      var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

      // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
      var req = new XMLHttpRequest();
      req.responseType = 'json';
      req.open('GET', url, true);
      req.onload = function() {
        var data = req.response.routes[0];
        var route = data.geometry.coordinates;
        var geojson = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: route
          }
        };
        // if the route already exists on the map, reset it using setData
        if (map.getSource('route')) {
          map.getSource('route').setData(geojson);
        } else { // otherwise, make a new request
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: geojson
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }
        // add turn instructions here at the end
      };
      req.send();
    }

    map.on('load', function() {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.addLayer({
        id: 'point',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Point',
                coordinates: start
              }
            }
            ]
          }
        },
        paint: {
          'circle-radius': 10,
          'circle-color': '#3887be'
        }
      });
      map.on('click', function(e) {
  var coordsObj = e.lngLat;
  canvas.style.cursor = '';
  var coords = Object.keys(coordsObj).map(function(key) {
    return coordsObj[key];
  });
  var end = {
    type: 'FeatureCollection',
    features: [{
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: coords
      }
    }
    ]
  };
  if (map.getLayer('end')) {
    map.getSource('end').setData(end);
  } else {
    map.addLayer({
      id: 'end',
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'Point',
              coordinates: coords
            }
          }]
        }
      },
      paint: {
        'circle-radius': 10,
        'circle-color': '#f30'
      }
    });
  }
  getRoute(coords);
});
    });
    });



}
