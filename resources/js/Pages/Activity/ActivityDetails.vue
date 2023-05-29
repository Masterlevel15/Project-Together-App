<template>
	<!-- Bandelette avec les boutons -->
	<!-- Bandelette avec les boutons -->
	<nav>
    <button>
		<a :href="route('home')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        2<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
    </a>
    </button>
		<button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
        </button>
		<button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
        </button>
	</nav>

	<!-- Lien autour de l'image avec le titre de l'activité -->
		<header>
			<img src="https://picsum.photos/500/500" alt="Image de l'activité">
			<h1 class="titre">{{ firstLetterToUppercase }}</h1>
			<div class="vignette">
				<div class="vignette-content">
					<p>{{ activity[0].cityName }}</p>
					<p> {{ formattedDistance }} Km</p>
				</div>
			</div>
		</header>
    <!-- Bandelette avec la date et le nom de la catégorie -->
	    <div class="bandelette">
		    <p> {{ convertFormatDate(activity[0].date) }}</p>
		    <div class="vignette-cat">
			    <p>{{ activity[0].activityCategoryName }}</p>
		    </div>
	    </div>
        <section class="activity-section">
            <h1 class="activity-title">{{ firstLetterToUppercase }}</h1>
            <p class="activity-date">{{ convertFormatDate(activity[0].date) }}, à {{ convertDateTime(activity[0].date) }}</p>
            <p class="activity-description">{{ activity[0].description }}</p>
            <div class="address">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 my-auto">
                 <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <address>
                    {{ activity[0].address }}<br>
                    {{ activity[0].cityName }}<br>
                </address>
             </div>
        </section>
        <div class="px-4">Organisé par</div>
        <div style="width: 7vh; height: 7vh; 	border-radius: 9999px; background: red; position: relative; background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="text-after ml-6">
      </div>
      <div class="px-2">{{ activity[0].userName }}</div>
      <div class="flex items-center px-2">
        <svg v-for="rate in this.rates" :key="rate.id" aria-hidden="true" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star {{rate}}</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
        <svg v-for="notRate in this.notRates" :key="notRate.id" aria-hidden="true" class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    </div>
    <p>{{ userByActivity }} /{{ activity[0].participants_number}} participants</p>
    <div class="flex">
      <div style="width: 7vh; height: 7vh; 	border-radius: 9999px; background: red; position: relative; background-image: url('https://cdn.vuetifyjs.com/images/cards/docks.jpg'); background-size: cover;" class="text-after ml-6" v-for="user in activityUsers" :key="user.id">
      </div>
    </div>
</template>

<script>
export default {
    data: () => ({
      rates: [],
      notRates: [],
      ratingActive: true,
      StarNotRating: null,
      month: ["January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December"],
   }),
    props:{
      activity: Array,
      tests: Array,
      distance: Number,
      activityUsers: Array,
   },
   methods: {
    getStarRating() {
      
      if(this.activity[0].userRate > 0) {
        this.ratingActive = true;
        for(let i = 0; i < this.activity[0].userRate; i++){
            this.rates.push(i);
        }
      }
      else{
        this.rates = [];
        for(let i = 0; i < this.activity[0].userRate; i++){
            this.rates.push(i);
        }
      }
      this.getStarNotRating();
    },
    getStarNotRating() {
        if(this.activity[0].userRate > 0){
           this.StarNotRating = 5 - this.activity[0].userRate;
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
   created() {
       this.getStarRating();
       console.log(`Distance: ${this.distance}`);
       console.log(this.activityUsers);
   }
}
</script>

<style scoped>
/* Style pour la bandelette avec les boutons */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  background-color: rgba(128, 128, 128, 0.866);
  opacity: 0.9;
  z-index: 100;
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
  margin-left: 25vh;
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
  margin-left: 2.5vh;
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
	bottom: 14vh;
	left: 2vh;
    color: white;
    font-size: 1.5em;
}

/* Style pour la vignette */

.vignette {
	position: absolute;
	bottom: 2vh;
	left: 2vh;
	padding: 2px 10px;
	background-color: white;
	border-radius: 1vh;
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
  margin: 10px 0;
}
.vignette p:nth-of-type(1)::after{
    content:', ';
}

.bandelette {
	background-color: #008080;
	color: white;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
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
    margin-top: 7vh;
}
.activity-title{
    font-size: 1.5em;
    padding: 0 1.5vh;
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
    display: flex;
    gap: 1.25vh
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