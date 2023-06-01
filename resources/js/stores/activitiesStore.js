import { defineStore } from 'pinia';
import { useLocationStore } from "./../stores/locationStore";
import axios from 'axios';

export const useActivitiesStore = defineStore({
  id: 'activities',
  state: () => ({
    activities: [], // Liste des activités
    activitiesSortByDistance: [], // Liste des activités triées par distance
    activitiesValues: [], // Valeurs des activités
    latitude: null, // Latitude actuelle
    longitude: null, // Longitude actuelle
    sort: Array, // Tableau de tri par distance
    sortByDate: Array, // Tableau de tri par date
    locationFetched: false, // Indicateur pour savoir si la localisation a été récupérée
    locationCache: null, // Cache de la localisation
  }),
  getters: {
    getActivitiesSortedByDistance() {
      // Getter pour obtenir les activités triées par distance
      this.activitiesValues = Object.values(this.activitiesSortByDistance);
      if (!Array.isArray(this.activitiesValues)) {
        return [];
      }
      this.sort = this.activitiesValues
        .slice()
        .sort((a, b) => a['distance'] - b['distance']);
        return this.sort;
      },
    getActivitiesSortedByDate() {
      // Getter pour obtenir les activités triées par date
      this.activitiesValues = Object.values(this.activitiesSortByDistance);
      if (!Array.isArray(this.activitiesValues)) {
        return [];
      }
      this.sortByDate = [...this.activitiesValues];
      this.sortByDate.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      return this.sortByDate;
      
    }
  },
  actions: {
      //const response = axios.get('api/activities'),
      async fetchLocation() {
        // Action pour récupérer la localisation de l'utilisateur.
        if (this.locationFetched && this.locationCache) {
          return this.locationCache;
        }
        const locationStore = useLocationStore();
        // on attend que la position de l'utilisateur que renvoi l'api soit chargé
        const position = await locationStore.fetchPosition();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.locationFetched = true;
        this.locationCache = { latitude: this.latitude, longitude: this.longitude };
        this.fetchActivities(this.locationCache.latitude, this.locationCache.longitude);
      },
      setFetchActivities(latitude, longitude){
        // this.fetchActivities(latitude, longitude);
      },
      async fetchActivities(latitude, longitude) {
        // Méthode pour configurer la récupération des activités avec une latitude et une longitude spécifiques
        const response = await axios.post('/api/sort-activities', { latitude, longitude });
        this.activitiesSortByDistance = response.data.activitiesSortByDistance;
        this.activities = response.data.activities;
        this.getActivitiesSortedByDistance;
        this.getActivitiesSortedByDate;
      },
      
  }
})