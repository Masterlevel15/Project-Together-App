<template>
    <div class="relative w-full h-screen">
        <div id="map" class="w-full h-full z-10"></div>

        <div id="distance-slider-container" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg z-50" v-if="distanceRangeLoaded">
             <div v-show="showTooltip" class="fixed left-1/2 -translate-x-1/2 -top-full transform-gpu -translate-y-2 bg-white p-2 rounded shadow">
            {{distance}} Km
            </div>
            <input type="range" id="distance-slider" min="0" max="1000" class="w-48" @touchstart="showTooltip = true" @touchend="showTooltip = false" 
            @input="updateActivitiesByDistanceRange"
            v-model="distance">
        </div>
    </div>
</template>



<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useActivitiesStore } from '../../stores/activitiesStore';
import 'leaflet-measure';


export default {
    data() {
        return {
            mapLoaded: false,
            userMarker: null,
            map: null,
            customMarkerIcon: L.icon({
                iconUrl: 'https://api.iconify.design/fa6-solid:location-arrow.svg', // Utilisation de la classe de l'icône Font Awesome dans la balise <i>
                iconSize: [32, 32], // Taille de l'icône en pixels [largeur, hauteur]
                iconAnchor: [16, 32], // Point d'ancrage de l'icône [x, y]
                className: 'custom-marker',
            }),
            activitiesSorted: null,
            distance: Number,
            userPosition: null,
            showTooltip: false,
            distanceRangeLoaded: false,
            debounceTimer: null,
            activitiesByDistance: null,
            markers: [],
            activities: null,
            circle: null,
            // Autres données du composant...
        };
    },
    props:{
      activities: Array,
    },
    methods: {
        getImage(image) {
            // Récupère l'URL de l'image en fonction du paramètre 'image'. Si la valeur image n'est pas null dans la db alors on charge cette image.
            if(image !== null) {
                 return `${process.env.BASE_URL}assets/images/${image}`;
                // console.log(activity.image);
            }
            else{
                return 'https://cdn.vuetifyjs.com/images/cards/docks.jpg';
                // console.log(activity.image);
            }
        },
        async initMap() {
            const mapContainer = document.getElementById('map');
            return new Promise((resolve, reject) => {
            // Code pour initialiser this.map
            // ...
            if (mapContainer) {
                // Initialiser la carte Leaflet
                this.map = L.map('map').setView([50.499527, 4.475402500000001], 13);
                // Ajouter des tuiles (tiles) à la carte
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

                // Autres configurations et couches de la carte
                this.addMarker();
            }
            L.control.measure();
                // Une fois que this.map est initialisé, résolvez la promesse
            resolve(this.map);
            });
            /*
            if (mapContainer) {
                // Initialiser la carte Leaflet
                this.map = L.map('map').setView([50.499527, 4.475402500000001], 13);
                // Ajouter des tuiles (tiles) à la carte
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

                this.addDistanceRange();

                // Autres configurations et couches de la carte
                this.activitiesSorted.forEach((activity) => {
                    const marker = L.marker([activity.latitude, activity.longitude]).addTo(this.map);

                    // Créer un élément de div pour le contenu du popup
                    const popupContent = document.createElement('div');

                    // Ajouter le titre de l'activité au contenu du popup
                    const title = document.createElement('h1');
                    title.textContent = activity.title;
                    popupContent.appendChild(title);

                    // Ajouter l'image de l'activité au contenu du popup
                    const image = document.createElement('img');
                    image.src = (activity.image !== null ? `assets/images/${activity.image}` : this.getImage(activity.image));
                    popupContent.appendChild(image);

                    // Ajouter un lien vers la route show de l'activité
                    const link = document.createElement('a');
                    link.href = route('activity.show', { id: activity.id });
                    link.textContent = 'Voir les détails';
                    popupContent.appendChild(link);

                    // Associer le contenu du popup au marqueur
                    marker.bindPopup(popupContent);
                });
                // this.addDistanceRange();
            } else {
                console.error('Map container not found.');
            }
            */
        },
        /*
        async getUserLocation() {
             this.watchId =  navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Mettez à jour la position de l'utilisateur sur la carte
                    // ...
                    this.userPosition = position.coords;
                    // this.addDistanceRange(position.coords);

                    if (!this.userMarker) {
                        this.userMarker = L.marker([latitude, longitude], { icon: this.customMarkerIcon }).addTo(this.map);
                    } else {
                        this.userMarker.setLatLng([latitude, longitude]);
                    }
                    return position.coords;
                },
                (error) => {
                    console.error('Erreur lors de la récupération de la localisation de l\'utilisateur:', error);
                }
            );
        },
        */
       addMarker(){
           const activities = this.activitiesSorted;
           
           if(this.activitiesByDistance !== null){
                    console.log(this.activitiesByDistance);
                    this.clearMarkers();
                    this.activities = this.activitiesByDistance;
            }else{
                this.clearMarkers();
                this.activities = this.activitiesSorted;  
            }
                this.activities.forEach((activity) => {
                  const marker = L.marker([activity.latitude, activity.longitude]).addTo(this.map);

                    // Créer un élément de div pour le contenu du popup
                    const popupContent = document.createElement('div');

                    // Ajouter le titre de l'activité au contenu du popup
                    const title = document.createElement('h1');
                    title.textContent = activity.title;
                    popupContent.appendChild(title);

                    // Ajouter l'image de l'activité au contenu du popup
                    const image = document.createElement('img');
                    image.src = (activity.image !== null ? `assets/images/${activity.image}` : this.getImage(activity.image));
                    popupContent.appendChild(image);

                    // Ajouter un lien vers la route show de l'activité
                    const link = document.createElement('a');
                    link.href = route('activity.show', { id: activity.id });
                    link.textContent = 'Voir les détails';
                    popupContent.appendChild(link);

                    // Associer le contenu du popup au marqueur
                    marker.bindPopup(popupContent);
                    this.markers.push(marker);
                    
                });
       },
       clearMarkers() {
            // Parcourez le tableau des marqueurs et supprimez-les de la carte
            this.markers.forEach(marker => {
            this.map.removeLayer(marker);
            });

            // Réinitialisez le tableau des marqueurs
            this.markers = [];
        },
       async getUserLocation() {
            return new Promise((resolve, reject) => {
                this.watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        // Mettez à jour la position de l'utilisateur sur la carte
                        // ...
                        this.userPosition = position.coords;
                        resolve(position.coords); // Résoudre la promesse avec les coordonnées
                        if (!this.userMarker) {
                                this.userMarker = L.marker([latitude, longitude], { icon: this.customMarkerIcon }).addTo(this.map);
                            } else {
                                this.userMarker.setLatLng([latitude, longitude]);
                            }
                    },
                    (error) => {
                        console.error('Erreur lors de la récupération de la localisation de l\'utilisateur:', error);
                        reject(error); // Rejeter la promesse avec l'erreur
                    }
                );
            });
        },

        async addDistanceRange() {
            console.log('test');
            this.userPosition = await this.getUserLocation();

            // Obtenir les coordonnées du centre du cercle
            const latitudeCentre = this.userPosition.latitude;
            const longitudeCentre = this.userPosition.longitude;

            // Créez un cercle avec un rayon initial en mètres
            this.circle = L.circle([latitudeCentre, longitudeCentre], {
                radius: this.distance * 1000, // Rayon initial en mètres (200 km)
            });
            this.distanceRangeLoaded = true
            // Ajoutez le cercle à la carte
            this.circle.addTo(this.map);
        },
        calculateBearing(lat1, lon1, lat2, lon2) {
            const dLon = lon2 - lon1;
            const y = Math.sin(dLon) * Math.cos(lat2);
            const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
            const bearing = Math.atan2(y, x);
            const bearingInDegrees = (bearing * 180) / Math.PI;
            return (bearingInDegrees + 360) % 360;
        },
        calculateDistancePerPixel(latitude, zoomLevel) {
            const earthCircumference = 40075017; // Circumference of the Earth in meters
            const tileSize = 256; // Size of a tile in pixels

            const metersPerPixel = earthCircumference * Math.cos(latitude * Math.PI / 180) / (tileSize * Math.pow(2, zoomLevel));

            return metersPerPixel;
        },
        calculateDestinationPoint(startingPoint, bearing, distance){
            const earthRadius = 6371; // Radius of the Earth in kilometers

            const lat1 = this.toRadians(startingPoint.latitude);
            const lon1 = this.toRadians(startingPoint.longitude);
            const angularDistance = distance / earthRadius;

            const lat2 = Math.asin(Math.sin(lat1) * Math.cos(angularDistance) +
                Math.cos(lat1) * Math.sin(angularDistance) * Math.cos(this.toRadians(bearing)));

            const lon2 = lon1 + Math.atan2(Math.sin(this.toRadians(bearing)) * Math.sin(angularDistance) * Math.cos(lat1),
                Math.cos(angularDistance) - Math.sin(lat1) * Math.sin(lat2));

            return {
                latitude: this.toDegrees(lat2),
                longitude: this.toDegrees(lon2),
            };
        },
        toRadians(degrees) {
            return degrees * (Math.PI / 180);
        },
        toDegrees(radians) {
            return radians * (180 / Math.PI);
        },
        fetchActivities(){
            const activitiesStore = useActivitiesStore();
            this.activitiesSorted = activitiesStore.getActivities;
            this.distance = Number(activitiesStore.getDistance);
        },
        updateActivitiesByDistanceRange() {
            if (this.debounceTimer) {
                clearTimeout(this.debounceTimer);
            }
            this.debounceTimer = setTimeout(() => {
            // Appelez la méthode pour récupérer les activités en fonction de la distance
                this.fetchActivitiesByDistance();
            }, 100);
            
        },
        fetchActivitiesByDistance() {
            console.log(this.distance);
            let data =  new FormData();
            data.append('latitude', this.userPosition.latitude);
            data.append('longitude', this.userPosition.longitude);
            data.append('distance', Number(this.distance));
            
            axios.post('/api/sort-activities', data )
                .then(response => {
                    // Traitement de la réponse de la requête
                    this.activitiesByDistance = response.data;
                    this.addMarker();
                    // Faites quelque chose avec les activités récupérées
                })
                .catch(error => {
                    // Gestion des erreurs de la requête
                    console.error('Erreur lors de la récupération des activités:', error);
                });
        },
    },
    created() {
        this.fetchActivities();
    },
    updated() {
    },
    async mounted() {
        await this.initMap();
        await this.addDistanceRange();
    },
    beforeUnmount() {
        /*
        if (navigator.geolocation && this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
        */
    },
    watch: {
        distance(newDistance) {
            // Mettez à jour le rayon du cercle avec la nouvelle distance
            //this.circle.setRadius(Number(newDistance));
            if (this.circle) {
                this.circle.setRadius(newDistance * 1000);
            }
        },
    },
}
</script>

<style scoped>
    #map { 
        height: 180vh; 
    }
    .custom-marker{
    /* Styles supplémentaires pour la balise <i> */
        font-size: 24px;
        background: red;
        height: 100vh !important;
    }
    .tooltip {
  position: absolute;
  background-color: #f8f8f8;
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  pointer-events: none; /* Permet de ne pas bloquer les événements du contenu sous la bulle d'information */
}

    

</style>