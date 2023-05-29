import { defineStore } from 'pinia';
import { useLocationStore } from "./../stores/locationStore";
import axios from 'axios';

export const useActivitiesStore = defineStore({
  id: 'activities',
  state: () => ({
    activities: [],
    activitiesSortByDistance: [],
    activitiesValues: [],
    latitude: null,
    longitude: null,
    sort: Array,
    sortByDate: Array,
    locationFetched: false,
    locationCache: null,
  }),
  getters: {
    getActivitiesSortedByDistance() {
      this.activitiesValues = Object.values(this.activitiesSortByDistance);
      if (!Array.isArray(this.activitiesValues)) {
        return [];
      }
      this.sort = this.activitiesValues
        .slice()
        .sort((a, b) => a['distance'] - b['distance']);
        console.log(this.sort);
        return this.sort;
      },
    getActivitiesSortedByDate() {
      this.activitiesValues = Object.values(this.activities);
      if (!Array.isArray(this.activitiesValues)) {
        return [];
      }
      this.sortByDate = [...this.activitiesValues];
      this.sortByDate.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
      console.log(this.sortByDate);
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
        const position = await locationStore.fetchPosition();
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.fetchActivities(this.latitude, this.longitude);
        this.locationFetched = true;
        this.locationCache = { latitude: this.latitude, longitude: this.longitude };
      },
      setFetchActivities(latitude, longitude){
        // this.fetchActivities(latitude, longitude);
      },
      async fetchActivities(latitude, longitude) {
        // const dataLatitude = latitude;
        // const dataLongitude = longitude;
        const response = await axios.post('/api/sort-activities', { latitude, longitude });
        this.activitiesSortByDistance = response.data.activitiesSortByDistance;
        this.activities = response.data.activities;
        this.getActivitiesSortedByDistance;
        this.getActivitiesSortedByDate;
      },
      
  }
})