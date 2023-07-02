<template>
    <div v-if="isLoading">
      <!-- Afficher le composant de chargement ici -->
      <Loader class="fixed inset-0 flex items-center justify-center z-50 bg-gradient-to-b from-blue-light to-blue-dark"/>
    </div>
    <!--fixed top-0 left-0 w-full h-full-->
    <div class="flex justify-center items-center h-[100vh] bg-gradient-to-b from-blue-light to-blue-dark" v-show="active">
        <video ref="videoPlayer" controls autoplay loop preload="auto" @loadedmetadata="handleVideoLoaded" @canplaythrough="handleVideoLoaded">
        <source :src="`assets/videos/animation_donut_20001-0300.mp4`" type="video/mp4">
        </video>
    </div>
    <MenuNavigation />
</template>


<script>
import Loader from '../../Components/Loader.vue';
import MenuNavigation from '../../Components/MenuNavigation.vue';

export default {
    data() {
        return {
        isLoading: true,
        active: false,
        };
    },
    components: {
		Loader,
        MenuNavigation,
    },
    methods: {
        handleVideoLoaded() {
        // La vidéo est chargée et prête à être lue
        this.isLoading = false;
        this.$refs.videoPlayer.play();
        this.active = true
        },
    },
    created(){
    },
};
</script>

