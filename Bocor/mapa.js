mapboxgl.accessToken = 'pk.eyJ1Ijoid2lsbC1hbG1laWRhMTI0LTEiLCJhIjoiY2xmOW54MHY4MG81MzNycGVvZzl2NjUzdSJ9.g9qUDKgxwJlvr8P1umBbEQ';


function MapsAlternative() {

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // Lembrar o modelo do mapa
        center: [8, 34], // Recife
        zoom: 17 // Zoom do mapa
    });


    var geolocator = navigator.geolocation;


    if (geolocator) {
        geolocator.getCurrentPosition(function (position) {
            var pos = {
                lng: position.coords.longitude,
                lat: position.coords.latitude
            };


            map.setCenter(pos);

            //marcador
            var marker = new mapboxgl.Marker()
                .setLngLat(pos)
                .addTo(map);
        });
    }
    var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        language: 'pt',
        profile: 'mapbox/walking',
        controls: {
            instructions: true
        },
        styles: [
            { "id": "directions-route-line", "type": "line", "paint": { "line-width": 3, "line-color": "#0074E4" } },
            { "id": "directions-route-line-alt", "type": "line", "paint": { "line-width": 3, "line-color": "#C4C4C4" } },
            { "id": "directions-hover-point-circle", "type": "circle", "paint": { "circle-radius": 12, "circle-color": "#0074E4" } },
            { "id": "directions-waypoint-circle", "type": "circle", "paint": { "circle-radius": 10, "circle-color": "#FFF" } }
        ]
    });

    map.addControl(directions, 'top-left');
    var destination = document.getElementById('destination').value;
    var origin = document.getElementById('origin').value;


    directions.setOrigin(origin);
    directions.setDestination(destination);
    directions.query();
}