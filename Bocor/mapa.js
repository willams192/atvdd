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
        profile: 'mapbox/driving-traffic', // Perfil de viagem para direções (por exemplo, a pé, de carro, de bicicleta)
        controls: {
            instructions: true
        }
    });

    map.addControl(directions, 'top-left');
    var origin = document.getElementById('origin').value;
    var destination = document.getElementById('destination').value;


    directions.setOrigin(origin);
    directions.setDestination(destination);
    directions.query();
}