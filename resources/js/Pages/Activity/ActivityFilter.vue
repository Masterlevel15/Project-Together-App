<template>
        <!-- Header -->
        <div class=" fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-900 bg-slate-200 flex justify-center items-center" >
                <div class="fixed top-0 h-16 w-full bg-blue-light2">
                        <div class="flex justify-between items-center h-16 px-4">
                                <Icon icon="carbon:arrow-left" 
                                class="text-3xl text-slate-50"/>
                                <Icon icon="fa6-solid:circle-xmark" class="text-3xl text-slate-50" />
                        </div>
                </div>
                <!-- -->
                <div class="flex-col content-start h-full w-80 mt-44">
                        <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input v-model="locality" @input="fetchSuggestions"
                                @keydown.delete="handleDelete" type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-blue-light3 focus:ring-blue-500 
                                placeholder-gray-900
                                focus:border-blue-500 dark:bg-blue-light3 dark:border-gray-600 dark:placeholder-gray-700 dark:text-gray-800 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required>
                                <button type="submit" class=" text-white absolute right-2.5 bottom-2.5 bg-blue-700 
                                hover:bg-blue-light2 focus:ring-4 focus:outline-none focus:ring-blue-300
                                font-medium rounded-lg text-sm px-4 py-2 bg-blue-light2
                                focus:bg-blue-light2 focus:text-blue-light2 focus:bg-blue-light 
                                focus:ring-blue-light2">Search</button>
                                <!--Suggestions-->
                                <div v-if='suggestions' class="">
                                        <ul v-if="searchBarActive" class="absolute z-20 bg-white border border-gray-300 w-full mt-1 py-2 rounded-md shadow-md overflow-y-auto h-32">
                                                <li v-for="suggestion in suggestions" :key="suggestion" class="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                                @click="selectSuggestion(suggestion)">{{ suggestion }}</li>
                                                <div v-if="suggestions.length ===  0 || locality.length < 3" class="flex justify-center items-center mx-auto h-12">
                                                        <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                                                </div>
                                        </ul>
                                </div>
                        </div>
                        <!-- -->
                        <RangeSlider @getDistance="getDistance" class="mt-16"/>
                        <!-- -->
                        <hr class="h-px my-8 bg-gray-100 border-0 dark:bg-gray-300">
                        <!-- -->   
                        <div class="flex space-x-4">
                                <div class="" v-for="sortingSetting in sortingSettings" :key="sortingSetting">
                                <div class="flex space-x-2 mb-2"  >
                                        <Icon icon="system-uicons:sort" class="self-center text-xl stroke-[0.20vh]"/>
                                        <p class="font-[500]">Tri par {{sortingSetting}}</p>
                                </div>
                                        <button
                                        :class="['px-4 py-2 bg-blue-light3 text-white rounded-lg transition-colors', { 'focus:outline-none focus:ring-2 focus:ring-blue-light2 focus:bg-blue-light bg-green': isActive(sortingSetting, 'sortingSettings') }]"
                                        @click="toggleButton(sortingSetting, 'sortingSettings')"
                                        > {{strToUpperCase(sortingSetting)}} croissante</button>
                                </div>    
                        </div>
                        <!-- -->
                        <hr class="h-px my-8 bg-gray-100 border-0 dark:bg-gray-300">
                        <!-- -->
                        <div class="flex-col">
                                <div class="flex space-x-2">
                                        <Icon icon="mdi:tag-outline" class="self-center text-xl stroke-[0.20vh]"/>
                                        <p>Categories</p>
                                </div>
                                <div class="flex grow flex-wrap  w-full overflow-auto h-20 mt-4 mb-4">
                                     <button
                                        v-for="category in categoriesName" :key="category"
                                        :class="['truncate mr-2 mb-4 w-20 px-2 py-2 bg-blue-light3 text-white rounded-lg transition-colors', { 'bg-green': isActive(category, 'categories') }]"
                                        @click="toggleButton(category, 'categories')"
                                        > {{ category }}</button>   
                                </div>
                        </div>
                        <button  @click='handleFilterSettings' 
                                class="w-full text-white  
                                hover:bg-blue-light focus:ring-4 focus:outline-none focus:ring-blue-300
                                font-medium rounded-lg text-sm px-4 py-2 bg-blue-light
                                focus:text-blue-light focus:bg-blue-light2 
                                focus:ring-blue-light">Search</button>
                </div>
        </div>
</template>

<script>
import { Icon } from '@iconify/vue';
import RangeSlider from '../../Components/RangeSlider.vue'
import { useActivitiesStore } from './../../stores/activitiesStore';

export default {
        data() {
                return {
                        activeCategories: [],
                        categoriesTest: ['alpha', 'beta', 'gamma', 'zeta', 'epsilon'],
                        activeSortingSettings: [],
                        sortingSettings: ['distance', 'date'],
                        locality: null,
                        searchBarActive: false,
                        searchResult: [],
                        distance: null,
                        categoriesName: [],
                };
        },
        props:{
                categories: Array,
        },
        components: {
		Icon,
                RangeSlider,
	},
        methods: {
                isActive(item, type) {
                        if(type === 'categories') {
                                return this.activeCategories.includes(item);
                        }else if(type === 'sortingSettings') {
                                return this.activeSortingSettings.includes(item);
                        }
                },
                toggleButton(item, type) {
                        //si la catégorie est déjà dans le tableau activeCategories on le retire avec un splice et si il n'existe pas on le rajoute dans le tableau
                        if(type === 'categories') {
                                const index = this.activeCategories.indexOf(item);
                                if (index === -1) {
                                        this.activeCategories.push(item);
                                } else {
                                        this.activeCategories.splice(index, 1);
                                }
                                /*
                                this.activeCategoriesSorted = Object.values(this.activeCategories);
                                if (!Array.isArray(this.activeCategoriesSorted)) {
                                        return [];
                                }
                                */
                        }
                        else if(type === 'sortingSettings') {
                                const index = this.activeSortingSettings.indexOf(item);
                                if (index === -1) {
                                        this.activeSortingSettings.push(item);
                                } else {
                                        this.activeSortingSettings.splice(index, 1);
                                }

                        }
                },
                strToUpperCase(item) {
                        return item.charAt(0).toUpperCase() + item.slice(1);
                },
                async fetchSuggestions() {
                        if ((this.locality === null || this.locality === '') && this.locality.length > 3) {
                        // Si la valeur de l'input est vide, réinitialiser les suggestions à une valeur vide
                        this.suggestions = [];
                        } else {
                                await useActivitiesStore().fetchSuggestions(this.locality);
                        }
                        this.searchBarActive = true;
                        if(this.locality === '') {
                        this.searchBarActive = false;
                        }
                },
                selectSuggestion(suggestion) {
                        this.locality = suggestion;
                        this.searchBarActive = false;
                },
                async handleFilterSettings(){
                        if (this.locality === null) {
                                // Convertir en une chaîne vide
                                this.locality = "";
                        }
                        let filterData =  new FormData();
                        filterData.append('locality', this.locality);
                        filterData.append('distance', this.distance);
                        filterData.append('sortingSettings', this.activeSortingSettings);
                        filterData.append('categories', this.activeCategories);

                        // je fais appel au store pour récupérer la latitude et la longitude pour ensuite pouvoir envoyer ces données dans le back et gérer des fonctions qui nécessitent ces paramètres.
                        const activitiesStore = useActivitiesStore();
                        filterData.append('latitude', activitiesStore.latitude);
                        filterData.append('longitude', activitiesStore.longitude);

                        axios.post('/api/activity-filter', filterData)
                        .then(response => {
                        // handle success
                        console.log(response.data);
                        // this.$emit('activitiesSortedByFilter', {activities: response.data, filterActive: false})
                        //window.location.href = 'http://localhost:8080/';
                        })
                        .catch(error => {
                        // handle error
                        });
                },
                getDistance(distance) {
                        this.distance = distance;
                },
                getCategoriesName() {
                        this.categories.forEach((category) => {
                                this.categoriesName.push(category['name']);
                        })
                        console.log(this.categoriesName);
                }
        },
        created() {
                this.getCategoriesName();
        },
        computed: {
                suggestions() {
                        return useActivitiesStore().suggestions;
                },
        },
        mounted() {
                document.body.classList.add('overflow-hidden');
        },
        beforeDestroy() {
                document.body.classList.remove('overflow-hidden');
        }
}
</script>

<style>
</style>
