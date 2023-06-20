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
    fetchingLocation: null,
    suggestions: [],
    loading: false,
  }),
  getters: {
    getActivitiesSortedByDistance() {
      // Getter pour obtenir les activités triées par distance
      this.activitiesValues = Object.values(this.activitiesSortByDistance);
      if (!Array.isArray(this.activitiesValues)) {
        return [];
      }
      this.sort = this.activitiesValues.sort((a, b) => a['distance'] - b['distance']);
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
        if (this.locationFetched && this.locationCache) {
          return this.locationCache;
        }
      
        const locationStore = useLocationStore();
      
        if (!this.fetchingLocation && !this.locationFetched) {
          this.fetchingLocation = true;
      
          try {
            const position = await locationStore.fetchPosition();
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.locationCache = { latitude: this.latitude, longitude: this.longitude };
            this.locationFetched = true;
            this.fetchActivities(this.locationCache.latitude, this.locationCache.longitude);
          } catch (error) {
            // Gérer les erreurs de récupération de la position de l'utilisateur
          } finally {
            this.fetchingLocation = false;
          }
        }
      
        return this.locationCache;
      },
      
      setFetchActivities(latitude, longitude){
        // this.fetchActivities(latitude, longitude);
      },
      async fetchActivities(latitude, longitude) {
        // Méthode pour configurer la récupération des activités avec une latitude et une longitude spécifiques
        this.loading = true;
        const response = await axios.post('/api/sort-activities', { latitude, longitude });
        this.activitiesSortByDistance = response.data.activitiesSortByDistance;
        this.activities = response.data.activities;
        this.getActivitiesSortedByDistance;
        this.getActivitiesSortedByDate;
      },
      async fetchSuggestions(input) {
        // Remise à zéro des suggestions pour réinitialiser le tableau. Et retirer (reset) les valeurs précédentes
        this.suggestions = [];
        try {
          const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
            params: {
              q: input,
              key: 'baba4da692034933bcd4294f80f7654c',
            },
          });
          const suggestions = response.data.results.map(result => result.formatted);
          this.suggestions = suggestions;
          console.log(this.suggestions);
        } catch (error) {
          console.error(error);
          // Gérez les erreurs de manière appropriée dans votre application.
        }
        
      },
  },
  /*
  mutations: {
    setLoading(value) {
      this.loading = value;
    },
  }
  */

})