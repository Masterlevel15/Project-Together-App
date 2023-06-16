<template>
    <v-row class="overflow-x-auto flex flex-nowrap"  style="margin: 0 -2.3vh" align-content="center"
         >
         <v-col  style="min-width: 50vh;" class="mb-16" v-for="activity in activities" :key="activity.id">
               <v-card
               class="mx-auto rounded-xl"
               max-width="320" 
               color='#4D8798'
            >
               <v-img
                  class="align-end text-white"
                  height="200"
                  cover
                  :src="getImage(activity.image)"
               >
               <div>
                  <v-chip class="category-name absolute bottom-[22.25vh] left-[1.5vh]" variant="elevated" style="position: absolute;  background: #f1f5f9; color: #155e75;">
                    {{activity.category.name}}
                  </v-chip>
                  <v-chip class="circle absolute bottom-[22.25vh] left-[37.5vh] bg-slate-50 text-blue-card-background" variant="elevated" style=" color: #17292C;">
                    <i class="fa-regular fa-bookmark ml-[-0.2vh] mt-[0.2vh] text-xl" ></i>
                  </v-chip>
                  <div class="text-slate-200 shadow-2xl font-extrabold bg-blue-gray rounded-lg px-2 py-px absolute bottom-[2.25vh] right-[2vh]">
                      Date {{this.convertFormatDate(activity.date)}}
                  </div>
               </div>
               </v-img>
               <v-card-title class="text-slate-50">{{activity.title}}</v-card-title>
               <!--Lieu de l'activité-->
               <v-card-text class="pt-4 text-slate-50 flex flex-col gap-y-4">
                  <div class="flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" stroke-width="2" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-green stroke-slate-50">
                     <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                     </svg>
                     <div class="text-green2 pl-2 text-base">City {{ activity.city.name }}, {{ activity.distance.toFixed(2) }} Km</div>
                  </div>
                  <div class="flex items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                     <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                     </svg>
                     <div class="pl-2">
                        {{activity.promoter.name}}
                     </div>
                     <div class="flex items-center px-2">
                        <svg v-for="rate in getStarRating(activity.promoter.rate)" :key="rate.id" aria-hidden="true" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star {{rate}}</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <svg v-for="notRate in getStarNotRating(activity.promoter.rate)" :key="notRate.id" aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                     </div>
                  </div>
                  <div>
                     <i class="fa-solid fa-user text-xl  absolute z-10"></i>
                     <i class="fa-solid fa-user text-xl absolute left-7 text-slate-400 z-0 "></i>
                     <div class="ml-8">{{activity.users.length}}/{{activity.participants_number}} Participants</div>
                  </div>
               </v-card-text>
               <v-card-actions>
                  <v-btn color="white bg-green rounded-pill px-4 mx-auto" style="width: 18vh; height: 5.5vh">
                         <a :href="route('activity.show', {id: activity.id, distance: activity.distance})">Infos {{ activity.id }}</a>
                  </v-btn>
               </v-card-actions>
            </v-card>
         </v-col>
      </v-row>
</template>

<script>
  import { onMounted } from 'vue'
  import { useDisplay } from 'vuetify'
  import { useMyStore } from './../stores/store'
  import { computed, watch } from "@vue/runtime-core";
  import { Head, Link } from '@inertiajs/vue3';
  import { useActivitiesStore } from './../stores/activitiesStore';
  import { useLocationStore } from './../stores/locationStore';
  import axios from 'axios';

  


  export default {
   setup () {
    
      const { mobile } = useDisplay();

      onMounted(() => {
        // console.log(mobile.value) // false
      })
   },
   props:{
      activities: Array,
      tests: Array,
      categories: Array,
   },
   components: {
   },
   data: () => ({
      month: ["January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December"],
      rates: [],
      notRates: [],
      ratingActive: true,
      StarNotRating: null,
   }),
   methods: {
      convertFormatDate(date) {
         // Convertit un format de date en un autre format avec des chaînes de caractères. En parcourant un tableau avec le nom de chaque mois. 
         let numericDate = date.split(' ', 1);
         let numericDateSplit = numericDate.map(el => el.split('-', 3));
         return numericDateSplit[0][2] +' '+this.month[numericDateSplit[0][1].slice(1)] +' '+ numericDateSplit[0][0];

      },
      getImage(image) {
         // Récupère l'URL de l'image en fonction du paramètre 'image'. Si la valeur image n'est pas null dans la db alors on charge cette image.
         if(image !== null) {
            return 'assets/images/'+ image;
            // console.log(activity.image);
         }
         else{
            return 'https://cdn.vuetifyjs.com/images/cards/docks.jpg';
            // console.log(activity.image);
         }
      },
      getStarRating(userRate) {
      // Récupère les étoiles de notation en fonction de la note de l'utilisateur
         if (userRate > 0) {
            this.ratingActive = true;
            return Array(userRate).fill().map((_, index) => index);
         } else {
            return [];
         }
      },
      getStarNotRating(userRate) {
      // Récupère les étoiles non notées en fonction de la note de l'utilisateur
         if (userRate > 0) {
            const starNotRating = 5 - userRate;
            return Array(starNotRating).fill().map((_, index) => index);
         } else {
         return Array(5).fill().map((_, index) => index);
         }
      },
   }, 
   computed: {
   },
   created() {
   },
   mounted() {
   },
}
</script>

<style scoped>
   .circle{
      width: 5.5vh;
      height: 5.5vh;
      background: white;
      border-radius: 50%;
   }
    span.category-name {
        font-weight: 900;
    }
</style>