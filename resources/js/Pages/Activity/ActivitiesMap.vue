<template>
  <div>
      <div id="map" class="map-container">
      </div> <!-- L'élément HTML où vous souhaitez afficher la carte -->
      
  </div>
</template>



<script>
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


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
        initMap() {
            const mapContainer = document.getElementById('map');

            if (mapContainer) {
                // Initialiser la carte Leaflet
                this.map = L.map('map').setView([50.499527, 4.475402500000001], 13);
                // Ajouter des tuiles (tiles) à la carte
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);

                // Autres configurations et couches de la carte
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
                });
                this.getUserLocation();
            } else {
                console.error('Map container not found.');
            }
        },
        getUserLocation() {
             this.watchId = navigator.geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Mettez à jour la position de l'utilisateur sur la carte
                    // ...
                    if (!this.userMarker) {
                        this.userMarker = L.marker([latitude, longitude], { icon: this.customMarkerIcon }).addTo(this.map);
                    } else {
                        this.userMarker.setLatLng([latitude, longitude]);
                    }
                }
            );
        }
    },
    mounted() {
        this.initMap();
    },
    beforeUnmount() {
        if (navigator.geolocation && this.watchId) {
            navigator.geolocation.clearWatch(this.watchId);
        }
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
</style>