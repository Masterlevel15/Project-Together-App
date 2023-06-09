import { defineStore } from 'pinia';
import { useLocationStore } from "./../stores/locationStore";
import axios from 'axios';

export const useActivitiesStore = defineStore({
  id: 'activities',
  state: () => ({
    activities: Array, // Liste des activités
    activitiesSortByFilter: Array,
    activitiesSortByDistance: [], // Liste des activités triées par distance
    activitiesValues: [], // Valeurs des activités
    latitude: null, // Latitude actuelle
    longitude: null, // Longitude actuelle
    sort: Array, // Tableau de tri par distance
    sortByDate: Array, // Tableau de tri par date
    locationFetched: false, // Indicateur pour savoir si la localisation a été récupérée
    locationCache: Array, // Cache de la localisation
    fetchingLocation: null,
    suggestions: [],
    loading: false,
    distance: null,
    response: null,
    user: Array,
  }),
  getters: {
    getActivitiesSortedByDistance() {
      // Getter pour obtenir les activités triées par distance
      this.activitiesValues = Object.values(this.activitiesSortByDistance);
      if (!Array.isArray(this.activitiesValues)) {
        return [];
      }
      this.sort = this.activitiesValues.sort((a, b) => a['distance'] - b['distance']);
      this.updateActivities(this.sort);
      this.updateDistance(200);
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
    },
    getActivities() {
      const storedActivities = localStorage.getItem('activities');
      this.activitiesSortByFilter = JSON.parse(storedActivities);
      if(this.activitiesSortByFilter.length > 0){
        this.loading = true;
      }
     
      return this.activitiesSortByFilter;
    },
    getDistance() {
      const storedDistance = localStorage.getItem('distance');
      this.distance = JSON.parse(storedDistance);
      return Number(this.distance);
    },
    getUser() {
      const storedUser = localStorage.getItem('user');
      this.user = JSON.parse(storedUser);
      return this.user;
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
        this.response = await axios.post('/api/sort-activities', { latitude, longitude });
        
        this.activitiesSortByDistance = this.response.data.activitiesSortByDistance;
        this.activities = this.response.data.activities;
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
      updateActivities(activities) {
        console.log(activities);
        localStorage.setItem('activities', JSON.stringify(activities));
        this.activitiesSortByFilter = activities;
        return this.activitiesSortByFilter;
       
      },
      updateDistance(distance){
        console.log(distance);
        localStorage.setItem('distance', JSON.stringify(distance));
        this.distance = distance;
        return this.distance;
      },
      setUser(user){
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.user = user;
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