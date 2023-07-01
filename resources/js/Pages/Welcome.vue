<script setup>
import { Head, Link } from '@inertiajs/vue3';
import { defineComponent } from 'vue';
import { defineProps } from 'vue';
import { reactive, ref } from 'vue';
import App from './App.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import { useActivitiesStore } from './../stores/activitiesStore';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
    categories: Array,
    activities: Array,
});

const data = reactive({
  isActive: false,
});

const settingFilterState = (setting) => {
    data.isActive = setting;
};

const logout = () => {
    router.post(route('logout'));
};

</script>

<template>
    <div class="bg-gradient-to-b from-blue-light to-blue-dark" 
    :class="{ 'min-h-[170vh]': data.isActive, 'min-h-[270vh]': !data.isActive }">
        <div v-if="canLogin" class="sm:fixed sm:top-0 sm:right-0 p-6 text-right text-color">
            <Link v-if="$page.props.auth.user" href="/" class="font-semibold">
            <!-- Section gestion et déconnexions-->
                    <DropdownLink v-if="$page.props.jetstream.hasApiFeatures" :href="route('api-tokens.index')">
                        API Tokens
                    </DropdownLink>

                    <div class="border-t border-white" />

                        <!-- Authentication -->
                        <Link href="/user/profile" method="get" as="button" style="margin-right: 4vh">{{ $page.props.auth.user.name }}</Link>

                        <Link href="/logout" method="post" as="button">Logout</Link>
            </Link>

            <template v-else>
                <Link :href="route('login')" class="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Log in</Link>

                <Link v-if="canRegister" :href="route('register')" class="ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500">Register</Link>
                
            </template>
        </div>
        <!-- Ajout de la vue app dans la vue Welcome -->
        <App @settingFilterActive="settingFilterState" :categories="this.categories" :activities="this.activities" :user="$page.props.auth.user"/>
    </div>
</template>

<style>
.text-color a{
    color: #f8fafc;
}
.bg-dots-darker {
    background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(0,0,0,0.07)'/%3E%3C/svg%3E");
}
@media (prefers-color-scheme: dark) {
    .dark\:bg-dots-lighter {
        background-image: url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.22676 0C1.91374 0 2.45351 0.539773 2.45351 1.22676C2.45351 1.91374 1.91374 2.45351 1.22676 2.45351C0.539773 2.45351 0 1.91374 0 1.22676C0 0.539773 0.539773 0 1.22676 0Z' fill='rgba(255,255,255,0.07)'/%3E%3C/svg%3E");
    }
}
</style>
