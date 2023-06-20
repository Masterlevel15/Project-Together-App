/*
import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', () => {
    const location = async () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
     })
    }
})
*/

// location.js
import { defineStore } from 'pinia';


export const useLocationStore = defineStore('location', {
  state: () => ({
    position: null,
    latitude: null,
    longitude: null,
  }),
  actions: {
    async fetchPosition() {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              this.position = position;
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
              resolve(position);
            },
            (error) => {
              reject(error);
            }
          );
        });
        this.getPosition();
        // console.log('Position:', position);
        return position;
      } catch (error) {
        console.error('Error fetching position:', error);
        throw error;
      }
    },
    
    getPosition() {
      if (this.position) {
        return Promise.resolve(this.position);
      } else {
        return this.fetchPosition();
      }
    },
  },
});


