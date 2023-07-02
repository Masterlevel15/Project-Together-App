<template>
<ActivityFilter @activitiesSortedByFilter="getActivitiesSortedByFilter" v-if="filterActive" class=""
:categories="categories"/>
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
               <input type="text" v-model="activity" placeholder="Entrez une localité"  @input="getActivitiesSuggestions(userInput)"
               @keydown.delete="handleDelete"
               class="rounded-lg bg-blue-gray w-64"/>
               <button @click="searchActivities">
                  <i class="fa fa-search">
                  </i>
               </button>
            </div>
            <div v-if='suggestions'>
               <ul v-if="searchBarActive" class="absolute z-20 bg-white border border-gray-300 w-full mt-1 py-2 rounded-md shadow-md">
                     <li v-for="(suggestion, index) in suggestions" :key="index" class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                     @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
                     <div v-if="suggestions.length ===  0 || activity.length < 3" class="flex justify-center items-center mx-auto h-12">
                           <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                     </div>
               </ul>
            </div>
         </div>
         <!--Bouton Filtre-->
         <button @click="initActivityFilter">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
               <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" />
            </svg>
         </button>
         <a  :href="route('activity.map')">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-white">
               <path fill-rule="evenodd" d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z" clip-rule="evenodd" />
            </svg>
         </a>
      </div>
   </div>
   <!-- Bulle categorie -->
   <v-row class="overflow-x-auto mb-16 mt-4 flex flex-nowrap pl-4" max-width="300" style="margin: 0 -2.5vh" align-content="center">
      <div v-for="category in categories" :key="category.id" style="display: flex; flex-direction: column; align-items: center; margin-right: 20px;">
         <a :href="route('activity.activitiesByCategory', {id: category.id, coords: location})">
            <div style="width: 10vh; height: 10vh; border-radius: 50%;   background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="mr-6 shadow-2xl"></div>
            <div  class="mt-2 text-white">{{ category.name }}</div>
         </a>
      </div>
   </v-row>
   <div>
      <div v-if="distanceFilterActive">
         <h1 style="" class="text-xl mb-8 text-white font-black">Activités à proximité</h1>
         <ActivityCard :loading="loading" :activities="(searchResult.length > 0 ? searchResult : sortedActivitiesByDistance)"
         :activitiesSortedByFilter="activitiesSortedByFilterValues"
         :settingActive="settingActive"
          />
      </div>
      <div v-if="dateFilterActive">
         <h1 style="" class="text-xl mb-8 text-white font-bold mt-8">Prochaines activités</h1>
         <ActivityCard :loading="loading" :activities=" sortedActivitiesByDate"
         :activitiesSortedByFilter="activitiesSortedByDate"
         :settingActive="settingActive"
         />
      </div>
   </div>
   <MenuNavigation />
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
  import MenuNavigation from '../Components/MenuNavigation.vue';
  


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
      user: String,
   },
   components: {
      ActivityFilter,
      ActivityCard,
      MenuNavigation,
   },
   data: () => ({
      locality: null,
      searchBarActive: false,
      searchResult: [],
      activitiesSortedByFilter: [],
      activitiesSortedByFilterValues: [],
      filterActive: false,
      activitiesSortedByDate: [],
      dateFilterActive: true,
      distanceFilterActive: true,
      settingFilterActive: true,
      activitiesSuggestions: [],
      activitiesByTitle: [],
      activitiesById: [],
      activity: null,
      suggestions: [],
      selectSuggestionActive: false,
      activitiesFromStore: null,
      result: null,
      settingActive: false,
   }),
   methods: {
      searchActivities(suggestion) {
         const activitiesStore = useActivitiesStore();
         this.activitiesFromStore = activitiesStore.activities;
         if(this.selectSuggestionActive){
            
            const indexActivityByTitle = this.activitiesByTitle.indexOf(suggestion);
            const id = this.activitiesById[indexActivityByTitle];
         
         

            this.activitiesFromStore.forEach((activity) => {
               if(activity.title === suggestion && activity.id === id){
                  console.log(activity);
                  const distance = activity.distance;
                  const id = activity.id;
                  const route = `/activity/${id}?distance=${distance}`; // Remplacez par le chemin de votre route
                  this.$inertia.visit(route);
               }
            });
         }else{
            const query = this.activity.toLowerCase().trim();
            if (!query) {
               this.result = this.activitiesFromStore;
                // Aucune recherche
            } else {
               // Filtrer les activités dont le titre contient la recherche
               this.result = this.activitiesFromStore.filter(activity =>
                   activity.title.toLowerCase().startsWith(query)
               );
               
            }
            console.log(this.result);
            activitiesStore.updateActivities(this.result);
            const title = 'recherche';
            const search = this.activity;
            const route = `/activity/search/${search}`; // Remplacez par le chemin de votre route
            this.$inertia.visit(route);
         }
      },
      selectSuggestion(suggestion) {
         console.log(suggestion);
         this.activity = suggestion;
         this.searchBarActive = false;
         this.selectSuggestionActive = true;
         this.searchActivities(suggestion);
      },
      handleDelete(event) {
         // Mettre à jour les suggestions lorsque l'utilisateur supprime des caractères de la recherche
            this.suggestions = [];
            this.getActivitiesSuggestions();
      },
      initActivityFilter() {
         this.filterActive = true;
      },
      async getActivitiesSortedByFilter(data) {
         this.activitiesSortedByFilter = data.activities;
         // On récupère les valeurs de l'objet pour 
         this.activitiesSortedByFilterValues = Object.values(this.activitiesSortedByFilter);
         if (!Array.isArray(this.activitiesSortedByFilterValues)) {
         return [];
         }
         this.filterActive = data.filterActive;
         this.sortActivitiesByDate(data.activities);
         this.sortingSettings(data.settings);
         // this.updateActivitiesToPiniaStore(data.activities);
      },
      sortingSettings(settings) {
         if(settings.includes('date') && settings.includes('distance')){
            console.log('date et distance');
            this.dateFilterActive = true;
            this.distanceFilterActive = true;
            this.settingFilterActive = false;
         }
         else if(settings.includes('date')) {
            console.log('date');
            this.dateFilterActive = true;
            this.distanceFilterActive = false;
            this.settingFilterActive = true;
         }
         else if (settings.includes('distance')){
            console.log('distance');
            this.distanceFilterActive = true;
            this.dateFilterActive = false;
            this.settingFilterActive = true;
         }
        this.$emit('settingFilterActive', this.settingFilterActive);
      },
      sortActivitiesByDate(activities) {
         this.activitiesSortedByDate = activities.slice().sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateB - dateA; // Trie dans l'ordre croissant (de la plus ancienne à la plus récente)
         });
      },
      async updateActivitiesToPiniaStore(items) {
        
         if(this.activitiesSortedByFilterValues.length > 0){
            console.log(items);
            const activitiesStore = useActivitiesStore();
            const activities = items;
            activitiesStore.updateActivities(activities);
         }
         else{
            console.log('activities');
            const activitiesStore = useActivitiesStore();
            activitiesStore.fetchLocation();
         }
      },
      getActivitiesSuggestions() {
         if(this.activitiesByTitle.length <= 0){
            this.activitiesByTitle = Object.keys(this.activities);
            this.activitiesById = Object.values(this.activities);
         }
         this.suggestions = this.activitiesByTitle.filter(titre => {
            const inputChars = [...this.activity.toLowerCase()];
            
            const titreChars = [...titre.toLowerCase()];
            let previousIndex = -1;
            for (const char of inputChars) {
            const currentIndex = titreChars.indexOf(char, previousIndex + 1);
            if (currentIndex === -1) {
               return false;
            }
            previousIndex = currentIndex;
            }

            return true;
         });
         console.log(this.suggestions);
         this.searchBarActive = true;
         if(this.activity.length < 2 || this.activity === '' ){
            this.searchBarActive = false;
         }
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
      loading() {
         const activitiesStore = useActivitiesStore();
         return activitiesStore.loading;
      },
      suggestionsOld() {
         return useActivitiesStore().suggestions;
      },
      location() {
         const activitiesStore = useActivitiesStore();
         return {latitude: activitiesStore.latitude, longitude: activitiesStore.longitude}
      }
   },
   created() {
      const activitiesStore = useActivitiesStore();
      activitiesStore.setUser(this.user);
   },
   mounted() {
      //this.updateActivitiesToPiniaStore()
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
      bottom: 12vh;
      right: 5vh;
      background: #4CAF50;
      /*border: 1px solid rgb(255, 255, 255);*/
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
