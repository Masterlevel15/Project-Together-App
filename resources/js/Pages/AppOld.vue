<template>
<v-container class="">
   <h1>Together</h1>
   <p>Latitude : {{ latitude }}</p>
   <p>Longitude : {{ longitude }}</p>
   <div v-for="test in tests" :key="test.activityID">{{test.activityCityID}} {{test.cityName}} {{test.activityCountryID}} {{test.activityCountryName}}</div>
   <v-text-field
        density="compact"
        variant="solo"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        class="my-8"
        style="width: 40vh;"
      ></v-text-field>
   <div style="display: flex;" class="mb-16">
      <div style="width: 10vh; height: 10vh; 	border-radius: 9999px; background: red; position: relative; background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="text-after mr-6">
      </div>
      <div style="width: 10vh; height: 10vh; 	border-radius: 9999px; background: red; position: relative; background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="text-after mr-6">
      </div>
      <div style="width: 10vh; height: 10vh; 	border-radius: 9999px; background: red; position: relative; background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="text-after">
      </div>
   </div>
   <div>
      <h1 style="" class="text-xl mb-4">Activités à proximité</h1>
         <v-row class="overflow-x-auto" max-width="300" style="display: flex; flex-direction: row; flex-wrap: nowrap;" align-content="center"
         >
         <v-col  style="min-width: 45vh;" v-for="activity in activities" :key="activity.id">
               <v-card
               class="mx-auto rounded-lg"
               max-width="270"
            >
               <v-img
                  class="align-end text-white"
                  height="200"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  cover
               >
               
               <div>
                  <v-chip variant="elevated" style=" position: absolute; top: 2.25vh;
                  left: 2vh; background: #f1f5f9; color: #155e75;">
                     {{activity.activityCategoryName}}
                  </v-chip>
                  <div class="circle" style="position: absolute; top: 2.25vh; right: 2vh; background: #f1f5f9; color: #155e75;">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7" style="margin-left: 0.85vh; margin-top: 0.75vh">
                     <path stroke-linecap="round" class="icon" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                     </svg>
                  </div>
                  <v-chip variant="elevated" style="position: absolute; bottom: 2.25vh; right: 2vh; background: #f1f5f9; color: #155e75;">
                     Date {{this.convertFormatDate(activity.date)}}
                  </v-chip>
               </div>
               </v-img>
               <v-card-title>{{activity.title}}</v-card-title>
               <v-card-subtitle class="pt-4">
                  City {{ activity.cityName }}
               </v-card-subtitle>
               <v-card-text prepend-icon="mdi-home">
                  <div>User {{activity.promoter_id}}{{activity.userName}}</div>
                  <div>
                     ratings
                  </div>   
                  <div>{{activity.participants_number}} Participant(s)</div>
               </v-card-text>

               <v-card-actions>
                  <v-btn color="white bg-green rounded-pill px-4 mx-auto" style="width: 18vh; height: 5.5vh">
                     <span>
                        Infos
                     </span>
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-col>
      </v-row>

   </div>
</v-container>
</template>
<script>
  import { onMounted } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useCoordsStore } from "./../stores/coords"
  import { usePositionStore } from "./../stores/position"
  import { useMyStore } from './../stores/store'
  import { computed } from "@vue/runtime-core";
  import { Head, Link } from '@inertiajs/vue3';
  import { useActivitiesStore } from './../stores/activitiesStore';
  import { useLocationStore } from './../stores/locationStore';

const activitiesStore = useActivitiesStore();

  export default {
   setup () {
      const { mobile } = useDisplay();

      onMounted(() => {
        // console.log(mobile.value) // false
      })
   },
   props:{
      activities: Array,
      tests: Array
   },
   components: {
   },
   data: () => ({
      location: null,
      position: null,
      coords: null,
      latitude: null,
      longitude: null,
      jsonData: null,
      activityDate: null,
      month: ["January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December"],
   }),
   methods: {
      async getPosition() {
         return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
         })
      },
      async getCity(latitude, longitude) {
         const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=b68afb69c2607c15cb4f6bf022f17e25`;
         return fetch(url)
         .then(response => response.json())
         .then(data => data.results[0].components.city)
         .catch(error => {
         console.log(error);
      });
      },
      convertFormatDate(date) {
         let numericDate = date.split(' ', 1);
         let numericDateSplit = numericDate.map(el => el.split('-', 3));
         // console.log(this.month[numericDateSplit[0][1].slice(1)]);

         return numericDateSplit[0][2] +' '+this.month[numericDateSplit[0][1].slice(1)] +' '+ numericDateSplit[0][0];

      },
   },
   computed() {
   },
   created() {
      /*
      const activitiesStore = useActivitiesStore();
      activitiesStore.fetchActivities();
      const locationStore = useLocationStore();
      this.latitude = locationStore.latitude;
      this.longitude = locationStore.longitude;
      */
   },
   mounted() {
      /*
      Promise.all([this.getPosition(), this.getPosition().then(position => this.getCity(position.coords.latitude, position.coords.longitude))])
      .then(([position, city]) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      // console.log(`Latitude: ${this.latitude}, Longitude: ${this.longitude}`);
      // console.log(`City: ${city}`);
      })
      .catch(error => {
      console.log(error.message);
      });
      */
   },
   beforeCreate() {
      
   }
}
</script>

<style scoped>
   .mobile{
      display: flex;
      flex-direction: row;
   }
   .text-after::after{
      content: 'Test';
      position: absolute;
      top: 10vh;
      left: 2.75vh;

   }
   .circle{
      width: 6vh;
      height: 6vh;
      background: white;
      border-radius: 50%;
   }
   .icon{
      width: 5rem;
      height: 5vh;
      font-size: 15em
   }
</style>
