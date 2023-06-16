<template>
{{searchResult}}
<ActivityFilter  v-if="filterActive" class="fixed inset-0 flex items-center justify-center z-50 bg-blue-lagon"/>
<v-container class="">
   <h1 class="text-slate-50 text-4xl my-4 font-extrabold">Together</h1>
   <button class="floating-element">
      <a :href="route('activity.create')">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-white w-8 h-8 mx-auto">
         <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
         </svg>
      </a>
   </button>
   <div v-for="test in tests" :key="test.activityID">{{test.activityCityID}} {{test.cityName}} {{test.activityCountryID}} {{test.activityCountryName}}</div>
   <!-- Barre de recherche -->
   <div class="mt-16 mb-12  mx-auto my-0">
      <div class="pr-4 flex items-center gap-3">
   <!-- Barre de rechercher Version ChatGPT-->
         <div class="search-container">
            <div class="search-input-container">
               <input type="text" v-model="locality" placeholder="Entrez une localité"  @input="fetchSuggestions"
               class="rounded-lg bg-blue-gray w-64"/>
               <button @click="searchActivities">
                  <i class="fa fa-search">
                  </i>
               </button>
            </div>
            <ul v-if="searchBarActive" class="absolute z-20 bg-white border border-gray-300 w-full mt-1 py-2 rounded-md shadow-md">
                  <li v-for="suggestion in suggestions" :key="suggestion" class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
            </ul>
         </div>
         <!--Bouton Filtre-->
         <button @click="initActivityFilter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
               <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" />
            </svg>
         </button>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
            <path fill-rule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clip-rule="evenodd" />
         </svg>
      </div>
   </div>
   <!-- Bulle categorie -->
   <v-row class="overflow-x-auto mb-16 mt-4 flex flex-nowrap pl-4" max-width="300" style="margin: 0 -2.5vh" align-content="center">
      <div v-for="category in categories" :key="category.id" style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
         <a :href="route('activity.activitiesByCategory', {id: category.id})">
            <div style="width: 10vh; height: 10vh; border-radius: 50%;   background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="mr-6 shadow-2xl"></div>
            <div  class="mt-2 text-white">{{ category.name }}</div>
         </a>
      </div>
   </v-row>
   <div>
      <h1 style="" class="text-xl mb-8 text-white font-black">Activités à proximité</h1>
      <ActivityCard :activities="(searchResult.length > 0 ? searchResult : sortedActivitiesByDistance)"/>
   </div>
   <div>
      <h1 style="" class="text-xl mb-8 text-white font-bold mt-8">Prochaines activités</h1>
      <ActivityCard :activities=" sortedActivitiesByDate"
      />
   </div>
   <div style="position: fixed; bottom: 0; left: 0; right: 0; background-color: #fff; display: flex; justify-content: space-between; padding: 17px;">
   <a :href="route('activity.map')">
   <v-icon class="ml-2">
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
   </v-icon>
   </a>
   <v-icon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
   </v-icon>
   <v-icon>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
   </v-icon>
   <v-icon class="mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
         <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
         <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
   </v-icon>
  </div>
</v-container>
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
  import ActivityFilter from './Activity/ActivityFilter.vue';
  import ActivityCard from '../Components/ActivityCard.vue';
  


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
      ActivityFilter,
      ActivityCard
   },
   data: () => ({
      locality: null,
      searchBarActive: false,
      searchResult: [],
      activitiesSorted: [],
      filterActive: false,
   }),
   methods: {
      searchActivities() {
      // Envoyer une requête AJAX pour récupérer les activités à proximité
      console.log(this.locality);
      axios.get(`/api/search-activities/${this.locality}`)
         .then(response => {
            this.searchResult = response.data;
         })
         .catch(error => {
            console.error(error);
         });
         console.log(this.searchResult);
      },
      async fetchSuggestions() {
         if (this.locality.length > 3) {
            await useActivitiesStore().fetchSuggestions(this.locality);
         } 
         this.searchBarActive = true;
         if(this.locality === '') {
            this.searchBarActive = false;
         }
      },
      selectSuggestion(suggestion) {
         console.log(suggestion);
         this.locality = suggestion;
         this.searchBarActive = false;
      },
      initActivityFilter() {
         this.filterActive = true;
      },
   }, 
   computed: {
      sortedActivitiesByDistance() {
         const activitiesStore = useActivitiesStore();
         activitiesStore.fetchLocation();
         return activitiesStore.sort;
      },
      sortedActivitiesByDate() {
         const activitiesStore = useActivitiesStore();
         return activitiesStore.sortByDate;
      },
      suggestions() {
         return useActivitiesStore().suggestions;
      },
   },
   created() {
   },
   mounted() {
   },
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
      width: 5.5vh;
      height: 5.5vh;
      background: white;
      border-radius: 50%;
   }
   .icon{
      width: 5rem;
      height: 5vh;
      font-size: 15em
   }
   .floating-element {
      width: 12vh;
      height: 12vh;
      position: fixed;
      bottom: 10vh;
      right: 5vh;
      background: #4CAF50;
      border: 1px solid rgb(255, 255, 255);
      box-shadow: 0.5vh 3vh 7vh;
      border-radius:  9999px;
      padding: 10px;
      z-index: 10;
   }
   .search-bar-section{
      display: flex;
   }
   .search-bar-section svg{
      vertical-align: baseline;
   }
/*Barre de recherche CHAT GPT */

   .search-container {
  position: relative;
}

.search-input-container {
  display: flex;
  align-items: center;
}

.search-input-container input {
  padding-right: 40px;
  background: #4C8798;
}

.search-input-container button {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 6px 10px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.fa-search{
   color: white;
}

.search-input-container input::placeholder{
   color: #A2C1CB;
}

span.category-name {
   font-weight: 900;
}
</style>
