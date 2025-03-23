class Mapa {

    #map;
    #currentLat;
    #currentLon;

    constructor() {
        const mapCenter = [this.#currentLat, this.#currentLon];//Definir centre del mapa per defecte
        this.#getPosicioActual();

        const zoomLevel = 13;//Zoom per defecte
        this.#map = L.map('map').setView(mapCenter, zoomLevel);
        const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }); tileLayer.addTo(this.#map);
        tileLayer.addTo(this.#map);
    }

    //Funció per mostrar el punt inicial de la posició actual
    mostrarPuntInicial(latitud, longitud) {
        L.marker([latitud, longitud]).addTo(this.#map).bindPopup("<span>Estàs aquí</span>").openPopup();
        this.this.#map = L.map('map').setView([latitud, longitud], zoomLevel);
    }

    actualitzarPosInitMapa(lat, lon) { }

    mostrarPunt(lat, lon, desc = "") { }

    borrarPunt() { }

    #getPosicioActual() {
        let lat = CURRENT_LAT;
        let lon = CURRENT_LON;
        //Verifica si la geolocalización está disponible en el navegador
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=> {
                lat = position.coords.latitude;
                lon = position.coords.longitude;
                //
                this.mostrarPuntInicial(lat, lon);
            }, function (error) {
                console.error("Error en la geolocalización:", error);
            });
        } else {
            console.error("La geolocalización no está disponible en este navegador.");
        }

        this.#currentLat = lat;
        this.#currentLon = lon;
        


    }
}