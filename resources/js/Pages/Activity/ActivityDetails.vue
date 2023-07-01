<template>
	<!-- Bandelette avec les boutons -->
  <!-- Bandelette avec les boutons -->
  <nav class="fixed top-0 left-0 w-full h-[8vh]  z-10">
    <button>
    <a :href="route('home')">
            <i class="fa-solid fa-arrow-left text-2xl"></i>
    </a>
    </button>
    <button @click="bookmarkActivity">
            <div v-if="bookmarkActive">
              <svg xmlns="http://www.w3.org/2000/svg" fill="#4C8798" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[3vh] h-[3vh] text-bandelette-details mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
            <div v-else > 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[3vh] h-[3vh] text-bandelette-details mx-auto">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
    </button>
    <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-[3vh] h-[3vh] text-bandelette-details mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>
  </nav>
  {{bookmarks}}
  <!-- Lien autour de l'image avec le titre de l'activité -->
    <header>
      <img :src="getImage(activity[0].image)" alt="Image de l'activité" class="">
      <h1 class="titre font-black">{{ firstLetterToUppercase }}</h1>
      <div class="vignette">
        <div class="vignette-content">
          <Icon icon="ri:map-pin-fill" class="w-5 h-5 text-green self-center"/>
          <p>{{ activity[0].cityName }}</p>
          <p> {{ formattedDistance }} Km</p>
        </div>
      </div>
    </header>
    <!-- Bandelette avec la date et le nom de la catégorie -->
      <div class="bg-bandelette-details text-white p-[10px] py-3 flex justify-between items-center">
        <p> {{ convertFormatDate(activity[0].date) }}</p>
        <div class="vignette-cat">
          <p>{{ activity[0].activityCategoryName }}</p>
        </div>
      </div>
      <section  class="bg-gradient-to-b from-blue-light to-blue-dark py-[7vh]
      px-[3.5vh]">
        <h1 class="text-white font-black text-[1.5em]">{{ firstLetterToUppercase }}</h1>
        <p class="py-4 text-white font-semibold">{{ convertFormatDate(activity[0].date) }}, à {{ convertDateTime(activity[0].date) }}</p>
        <p class="text-white font-extrabold leading-normal mb-16">{{ activity[0].description }}</p>
        <div class="flex gap-[2.75vh]">
          <Icon icon="ph:map-pin-fill" class="w-8 h-8 text-green self-center stroke-white stroke-[3vh]"/>
          <!--display: flex;
    gap: 1.25vh-->
          <address class="text-white font-semibold">
            {{ activity[0].address }},<br>
            {{ activity[0].cityName }}<br>
          </address>
        </div>
        <!--Map-->
        <div class="relative w-full h-auto pt-8 pb-16">
          <div id="map" class="h-[50vh] w-full z-[9] rounded-lg border-2 border-white"></div>
        </div>
        <!--fin Map-->
        <div class="flex-col">
          <div class="text-white font-semibold pb-4">Organisé par</div>
          <div style="width: 8vh; height: 8vh;  border-radius: 9999px; background: red; position: relative; background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="text-after ml-6">
          </div>
          <a @click="promoterRatingActive= !promoterRatingActive" class="text-white font-extrabold pt-4 pb-1 underline focus::no-underline">{{ activity[0].userName }}</a>
          <div class="flex items-center pb-12">
            <svg v-for="rate in getStarRating(activity[0].userRate)" :key="rate.id" aria-hidden="true" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star {{rate}}</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <svg v-for="notRate in getStarNotRating(activity[0].userRate)" :key="notRate.id" aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
          </div>
        </div>
        <p class="text-white">{{ userByActivity }} /{{ activity[0].participants_number}} participants</p>
        <div class="flex" v-if="activityUsersExist">
          <div style="width: 7vh; height: 7vh;  border-radius: 9999px; background: red; position: relative; background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="text-after ml-6" v-for="user in activityUsers" :key="user.id">
          </div>
        </div>
        <button class="text-white bg-green mx-auto w-auto h-auto px-6 py-2 rounded-xl mt-16">Participer</button>
      </section>
        <div  v-if="promoterRatingActive" class="bg-bandelette-details flex flex-col text-center py-8">
          <h2 class="text-white font-semibold">Evaluer l'organisateur</h2>
          <star-rating :initial-rating="organizerRating" :max-rating="5"
          ref="starRating" class="py-3" ></star-rating>
          <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
          <textarea id="message" rows="4" class="block p-2.5 w-64 mx-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-8" placeholder="Write your thoughts here..." v-model="ratingComment"></textarea>

          <button @click="submitRating" class="text-white bg-green mx-auto w-auto h-auto px-6 py-2 rounded-xl">Soumettre</button>
        </div>
</template>

<script>
import axios from 'axios';
import StarRating from '../../Components/StarRating.vue';
import { Icon } from '@iconify/vue';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useActivitiesStore } from '../../stores/activitiesStore';

export default {
    data: () => ({
      rates: [],
      notRates: [],
      ratingActive: true,
      StarNotRating: null,
      month: ["Janvier", "Février", "Mars", "Avril", "May", "Juin", 
           "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"],
      activityUsersExist: false,
      organizerRating: 3,
      map: null,
      promoterRatingActive: false,
      ratingComment: null,
      bookmarkActive: false,
      response: null,
      user: null,
      bookmarks: null,
   }),
    props:{
      activity: Array,
      tests: Array,
      distance: String,
      activityUsers: Array,
   },
   components: {
     StarRating,
     Icon,
   },
   methods: {
     submitRating() {
       console.log($page.props.auth.user);
        const ratingData = {
          activity_id:this.activity[0].activityID,
          rating: this.$refs.starRating.selectedRating,
          promoter_id: this.activity[0].userID,
        };
      /*
        axios.post('/api/ratings', ratingData)
          .then(response => {
            // Succès de la requête, gérer la réponse si nécessaire
            console.log(response.data);
          })
          .catch(error => {
          // Erreur de la requête, gérer l'erreur si nécessaire
          console.error(error);
        });
      */

      },
     getStarRating(userRate) {
         // Récupère les étoiles de notation en fonction de la note de l'utilisateur
         this.rates = [];
         if(userRate > 0) {
            this.ratingActive = true;
            for(let i = 0; i < userRate; i++){
                  this.rates.push(i);
            }
         }
         else{
            this.rates = [];
            for(let i = 0; i < userRate; i++){
                  this.rates.push(i);
            }
         }
         return this.rates;
         // this.getStarNotRating(userRate);
         
      },
      getStarNotRating(userRate) {
         // Récupère les étoiles non notées en fonction de la note de l'utilisateur
         this.notRates = [];
         if(userRate > 0){
            this.StarNotRating = 5 - userRate;
            for(let i = 0; i < this.StarNotRating; i++){
                  this.notRates.push(i);
            }
         }
         else{
               this.StarNotRating = 5;
            for(let i = 0; i < this.StarNotRating; i++){
                  this.notRates.push(i);
            }
         }
         return this.notRates;
      },
      getImage(image) {
         // Récupère l'URL de l'image en fonction du paramètre 'image'. Si la valeur image n'est pas null dans la db alors on charge cette image.
         if(image !== null) {
            return '/assets/images/'+ image;
            // console.log(activity.image);
         }
         else{
            return 'https://cdn.vuetifyjs.com/images/cards/docks.jpg';
            // console.log(activity.image);
         }
      },
    convertFormatDate(date) {
      let numericDate = date.split(' ', 1);
      let numericDateSplit = numericDate.map(el => el.split('-', 3));
         return numericDateSplit[0][2] +' '+this.month[numericDateSplit[0][1].slice(1)] +' '+ numericDateSplit[0][0];
    },
    convertDateTime(datetime) {
      let numericDatetime = datetime.split(' ', 2);
      let numericDatetimeSplit = numericDatetime.map(el => el.split(':', 3))[1];
      return numericDatetimeSplit[0] +'h'+ numericDatetimeSplit[1];
    },
    async initMap() {
      const mapContainer = document.getElementById('map');
      return new Promise((resolve, reject) => {
        // Code pour initialiser this.map
        // ...
        if (mapContainer) {
          // Initialiser la carte Leaflet
          this.map = L.map('map').setView([this.activity[0].latitude, this.activity[0].longitude], 13);
          // Ajouter des tuiles (tiles) à la carte
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
          this.addMarker();
        }
          // Une fois que this.map est initialisé, résolvez la promesse
        resolve(this.map);
      });
    },
    addMarker(){
      L.marker([this.activity[0].latitude, this.activity[0].longitude]).addTo(this.map);
    },
    bookmarkActivity(){
      console.log(this.bookmarks);
      this.bookmarkActive = !this.bookmarkActive;
      const bookmarkData = {
          activity_id:this.activity[0].activityID,
          bookmark: this.bookmarkActive,
          user_id: this.user.id,
        };
      axios.post('/api/bookmark', bookmarkData )
                .then(response => {
                    // Traitement de la réponse de la requête
                    this.response = response.data;
                    this.bookmarkActive = this.response.bookMarkState;
                    // Faites quelque chose avec les activités récupérées
                })
                .catch(error => {
                    // Gestion des erreurs de la requête
                    console.error('Erreur lors de la récupération des activités:', error);
                });
    },
    fetchUser() {
            const activitiesStore = useActivitiesStore();
            this.user = activitiesStore.getUser;
    },
    async fetchBookmark() {
      const user = this.user.id; // Remplacez par l'ID de l'utilisateur connecté
    const activity = this.activity[0].activityID; // Remplacez par l'ID de l'activité souhaité
      axios.post(`/api/users/${user}/activities/${activity}/bookmark`)
                .then(response => {
                    // Traitement de la réponse de la requête
                    this.bookmarkActive =response.data[0].active;
                    // Faites quelque chose avec les activités récupérées
                })
                .catch(error => {
                    // Gestion des erreurs de la requête
                    console.error('Erreur lors de la récupération des activités:', error);
                });
      console.log(this.bookmarks);
    },
  },
   computed:{
     formattedDistance() {
      const numericDistance = parseFloat(this.distance);
      if (!isNaN(numericDistance)) {
        return numericDistance.toFixed(2);
      } else {
        return "Invalid distance";
      }
    },
    firstLetterToUppercase() {
       return this.activity[0].title.charAt(0).toUpperCase() + this.activity[0].title.slice(1);
    },
    userByActivity(){
      return this.activityUsers.length;
    },
   },
    async created() {
      this.fetchUser();
      console.log(this.user);
      if(this.activityUsers !== []){
          this.activityUsersExist = true;
      }
      this.getStarRating();
      await this.fetchBookmark();
   },
   async mounted() {
     await this.initMap();
    },
}
</script>

<style scoped>
/* Style pour la bandelette avec les boutons */
nav {
  /*
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  z-index: 100;
  */
  background-color: rgba(75, 85, 99, 0.5);
  
}

nav button:nth-of-type(1) {
  display: inline-block;
  width: 5vh;
  height: 5vh;
  color: #fff;
  font-size: 1em;
  border-radius: 50%;
  margin-left: 1vh;
  margin-bottom: 10px;
}
nav button:nth-of-type(2) {
  display: inline-block;
  width: 5vh;
  height: 5vh;
  background-color: white;
  color: #fff;
  font-size: 1em;
  border-radius: 50%;
  margin-left: 32vh;
  margin-top: 1.5vh;
}

nav button:nth-of-type(3) {
  display: inline-block;
  width: 5vh;
  height: 5vh;
  background-color: white;
  color: #fff;
  font-size: 1em;
  border-radius: 50%;
  margin-left: 3vh;
  margin-top: 1.5vh;
}

nav button:first-of-type {
  margin-left: 20px;
}

/* Style pour l'image */
header {
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 200px;
}

/* Style pour le titre de l'activité */
.titre {
  position: absolute;
	bottom: 12vh;
	left: 2vh;
    color: white;
    font-size: 1.5em;
}

/* Style pour la vignette */

.vignette {
	position: absolute;
	bottom: 2vh;
	left: 2vh;
	padding: 1px 15px;
	background-color: white;
	border-radius: 2vh;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.vignette-content {
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 1vh;
  text-align: center;
  flex-wrap: nowrap;
}

.vignette p {
  font-size: 15px;
  color: #48c7b1;
  margin: 6.5px 0;
}
.vignette p:nth-of-type(1)::after{
    content:', ';
}

.bandelette {
	
}

.bandelette p {
	margin: 0;
}

.vignette-cat {
	background-color: white;
	color: #008080;
	padding: 5px 10px;
	border-radius: 1vh;
}
.activity-section{
    
}
.activity-title{
    
}
.activity-section p, .activity-section div{
    padding: 0 1.5vh;
    margin-top: 2vh;
}
.activity-date{
    

}
.activity-description{

}
.address{
    
}
.star-rating {
  position: relative;
  display: inline-block;
  font-size: 1.5em;
}

.star-rating__fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: gold;
}

.star-rating__outline {
  height: 100%;
  background-color: lightgray;
}
</style>