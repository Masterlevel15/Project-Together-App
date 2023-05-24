<template>
<v-container class="dark:bg-slate-500">
    <a :href="route('home')">
        <h1 class="text-white text-4xl my-4">Together</h1>
    </a>
    <div>{{ activities }}</div>
    <div class="mr-8">
        <Card :activities="activities" />
    </div>
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
    },
    components: {
      Card,  
  },
}
</script>