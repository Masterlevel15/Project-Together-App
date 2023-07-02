<template>
<v-container class="bg-gradient-to-b from-blue-light to-blue-dark min-h-screen flex-col overflow-hidden">
        <h1 class="text-slate-50 text-4xl my-4 mb-16 text-center font-extrabold">Activités par {{title}}</h1>  
        
        <ActivityCard :loading="loading" :activities="(activitiesBySetting ? activitiesBySetting : activities)"
            :activitiesSortedByFilter="activitiesSortedByFilterValues" 
            :settingActive="settingActive"
            />
        <MenuNavigationVue/>
</v-container>

</template>

<script>
import { useActivitiesStore } from '../../stores/activitiesStore';
import ActivityCard from '../../../js/Components/ActivityCard.vue';
import MenuNavigationVue from '../../Components/MenuNavigation.vue';

export default {
    data() {
        return {
            activities: null,
            activitiesSortedByFilterValues: [],
            settingActive: true,
        }
    },
    props:{
        title: String,
        activitiesBySetting: Array,

    },
    components: {
      ActivityCard, 
      MenuNavigationVue,
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