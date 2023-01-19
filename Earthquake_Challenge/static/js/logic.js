// Geometry Features
// // Point with a single set of coordinates
// "geometry":{
//   "type":"Point",
//   "coordinates": [-118.4, 33.9]
//   }

// // MultiPoint
// "geometry":{
//   "type":"MultiPoint",
//   "coordinates": [-118.4, 33.9], [-118.5, 34.0]
//   }


// // LineString
// "geometry":{
//   "type":"LineString",
//   "coordinates": [[-118.4, 33.9],[-122.4, 37.6]]
//   }

// // MultiLineString
// "geometry":{
//   "type":"MultiLineString",
//   "coordinates":
//       [[-118.4, 33.9],[-106.4, 31.8]],
//       [[-118.4, 33.9],[-123.2, 44.1]]
//   } 

// // Polygon
// "geometry": {
//   "type": "Polygon",
//     "coordinates":
//   [
//     [ [ -122.446, 37.861 ], [ -122.438, 37.868 ], [ -122.430, 37.872 ] ]
//   ]

// // MultiPolygon
// "geometry": {
//   "type": "MultiPolygon",
//   "coordinates": [
//    [ [ -122.446, 37.861 ], [ -122.438, 37.868 ], [ -122.430, 37.872 ] ],
//    [ [ -122.378, 37.826 ], [ -122.377, 37.830 ], [ -122.369, 37.832 ] ]
// ]


// // GeometryCollection
// {
//   "type": "GeometryCollection",
//   "geometries": [
//       {
//         "type":"Point",
//       "coordinates": [-118.4, 33.9]
//      }
//       },
//       {
//          "type":"LineString",
//          "coordinates": [
//             [-118.4, 33.9],[-122.4, 37.6]
//           ]
//       }
//   ]
// }

// // Feature Object
// {
//   type: "Feature",
//   properties: {
//   mag: 1.88,
//   place: "6km SE of Pahala, Hawaii",
//   time: 1573766377230,
//   type: "earthquake",
//   title: "M 1.9 - 6km SE of Pahala, Hawaii"
//   },
//   geometry: {
//   type: "Point",
//   coordinates: [
//   -155.4329987,
//   19.1634998
//   ]},
// }

// // FeatureCollection Object
// {
//   "type":"FeatureCollection",
//   "features":
// [
//   {
//     "type":"Feature","properties":{
// "airline":"AA","airline_id":"24","src":"LAX","dst":"ABQ","dst_id":"4019","stops":"0","equipment":"CRJ CR7"},"geometry":{
// "type":"LineString",
// "coordinates":[[-118.4079971,33.94250107],[-106.609001,35.040199]]}
// },
// {
// "type":"Feature","properties":{
// "airline":"AA","airline_id":"24","src":"LAX","src_id":"3484","dst":"ANC","dst_id":"3774","codeshare":"Y","stops":"0","equipment":"737"},"geometry":{
// "type":"LineString",
// "coordinates":[[-118.4079971,33.94250107],[-149.99600219726562,61.174400329589844]]}
//   },
// {
//   "type":"Feature","properties":{
// "airline":"AA","airline_id":"24","src":"LAX","src_id":"3484","dst":"AUS","dst_id":"3673","codeshare":"","stops":"0","equipment":"M83 738"},"geometry":{
// "type":"LineString",
// "coordinates":[[-118.4079971,33.94250107],[-97.6698989868164,30.194499969482422]]}
//   }
// ]

// }


// // Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([34.0522, -118.2437], 4);

// Create the map object with the center of the map to somewhere between LAX and SFO
// let map = L.map('mapid').setView([30, 30],2);

// // Use the Leaflet Documentation
// // We create the tile layer that will be the background of our map.
// // To change the map's style, change the map id using the list of Mapbox ids below:
// // mapbox/streets-v11
// // mapbox/outdoors-v11
// // mapbox/light-v10
// // mapbox/dark-v10
// // mapbox/satellite-v9
// // mapbox/satellite-streets-v11
// // let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
// //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// //     maxZoom: 18,
// //     id: 'mapbox/streets-v11',
// //     tileSize: 512,
// //     zoomOffset: -1,
// //     accessToken: API_KEY
// // });
// // // Then we add our 'graymap' tile layer to the map.
// // streets.addTo(map);


// Use the Mapbox Styles API
// We create the tile layer that will be the background of our map.
// Change Mapbox styles - check Module 14.2.4
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
})

// Then we add a control to the map that will allow the user to change
// which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);


// Accessing the airport GeoJSON URL
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";


// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {
  console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
                console.log(data);
                return L.circleMarker(latlng);
            },
    style: styleInfo,

    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
        }).addTo(earthquakes);

    // We add the earthquake layer to our map
    earthquakes.addTo(map);

    // Create a legend control object.
    let legend = L.control({
        position: "bottomright"
    });

    // Then add all the details for the legend.
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        const magnitudes = [0, 1, 2, 3, 4, 5];
        const colors = [
        "#98ee00",
        "#d4ee00",
        "#eecc00",
        "#ee9c00",
        "#ea822c",
        "#ea2c2c"
        ];

        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
        }
        
        return div;
        };

    legend.addTo(map);
});

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"14",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Grabbing our GeoJSON data.
// pointToLayer callback function
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, latlng) {
//     console.log(feature);
//     return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.city + "</h2>");
//   }

// }).addTo(map);

// // onEachFeature callback function
// L.geoJSON(sanFranAirport, {
//   onEachFeature: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup();
//    }
// }).addTo(map);


// // // Create the map object with a center and zoom level.
// // let map = L.map("mapid", {
// //     center: [
// //       40.7, -94.5
// //     ],
// //     zoom: 4
// //   });


// // Coordinates for each point to be used in the line.
// let line = [
//     [33.9416, -118.4085],
//     [37.6214, -122.3790],
//     [40.7899, -111.9791],
//     [47.4502, -122.3088]
//   ];

// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "yellow"
//   }).addTo(map);



// // Get data from cities.js
// let cityData = cities;


// // // Loop through the cities array and create one marker for each city.
// // cityData.forEach(function(city) {
// //     console.log(city)
// //     L.marker(city.location)
// //     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
// //     .addTo(map);
// // });

// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population/200000,
//         color: "yellow",
//         fillColor: '#ffffa1'
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });

// //  Add a marker to the map for Los Angeles, California.
// // let marker = L.marker([34.0522, -118.2437]).addTo(map);

// // L.circle([34.0522, -118.2437], {
// //     radius: 300,
// //     color: "black",
// //     fillColor: '#ffffa1'
// //  }).addTo(map);

// // // Alternatively, using circleMarker() function with default radius set at 10 pixels
// // L.circleMarker([34.0522, -118.2437], {
// //     radius: 300,
// //     color: "black",
// //     fillColor: '#ffffa1'
// //  }).addTo(map);
