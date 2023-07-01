<template>
<v-container class="bg-gradient-to-b from-blue-light to-blue-dark min-h-screen flex-col overflow-hidden">
        <h1 class="text-slate-50 text-4xl my-4 mb-16 text-center font-extrabold">Activités de la recherche</h1>   
        <ActivityCard :loading="loading" :activities="activities"
            :activitiesSortedByFilter="activitiesSortedByFilterValues" 
            :settingActive="settingActive"
            />
</v-container>

</template>

<script>
import { useActivitiesStore } from '../../stores/activitiesStore';
import ActivityCard from '../../../js/Components/ActivityCard.vue';

export default {
    data() {
        return {
            activities: null,
            activitiesSortedByFilterValues: [],
            settingActive: true,
        }
    },
    props:{
    },
    components: {
      ActivityCard,  
    },
    methods: {
        fetchActivities() {
            const activitiesStore = useActivitiesStore();
            this.activities = activitiesStore.getActivities;
        }
    },
    created() {
        this.fetchActivities();
    },
    computed: {
        loading() {
         const activitiesStore = useActivitiesStore();
         return activitiesStore.loading;
        },
    }, 
}
</script>