<template>
<v-container class="bg-gradient-to-b from-blue-light to-blue-dark min-h-screen flex-col overflow-hidden">
    <a :href="route('home')">
        <h1 class="text-slate-50 text-4xl my-4 mb-16 text-center font-extrabold">Activités par {{title}}</h1>   
    </a>
        <Card :activities="activities" />
    
</v-container>
</template>

<script>
import Card from '@/Components/NewComponents/Card.vue';

export default {
    data: () => ({
      month: ["January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December"],
   }),
    props: {
        activities: Array,
        title: String,
    },
    components: {
      Card,  
  },
}
</script>

<style scoped>
.height {
    height: 100vh;
}
</style>