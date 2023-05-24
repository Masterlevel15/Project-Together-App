<template>
    <v-col  style="" v-for="activity in activities" :key="activity.id">
               <v-card
               class="mx-auto rounded-xl"
               max-width="270">
               <v-img
                  class="align-end text-white"
                  height="200"
                  src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                  cover>
               
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
                     Date {{activity.date}}
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
                  <div>{{activity.participants_number}}Participant(s){{activity.distance}} </div>
               </v-card-text>

               <v-card-actions>
                  <v-btn color="white bg-green rounded-pill px-4 mx-auto" style="width: 18vh; height: 5.5vh">
                         <a :href="route('activity.show', {id: activity.id, distance: activity.distance})">Infos</a>
                  </v-btn>
               </v-card-actions>
            </v-card>
    </v-col>
</template>

<script>
export default {
    props: {
        activities: Array,
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
   
</style>