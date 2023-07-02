<template>
    <div class="">
        <div class="flex justify-between">
            <div class="flex space-x-3">
                <Icon icon="prime:map-marker" class="self-center text-2xl"/>
                <div class="text-2xl">Distance</div>
            </div>
            <div class="text-xl font-thin">{{ distance }} Km</div>
        </div>
        <div class="w-80 relative">
        <input type="range" min="0" max="500" value="0" class="slider" id="myRange" @input="setDistance">
        <div class="h-4 bg-green absolute left-0 top-[0.30vh] rounded-full" :style="{ width: `${distance}%`/5}"></div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue';

  export default {
    data: () => ({
      distance: 0,
      isPlaying: false,
    }),
    components: {
		Icon,
	  },
    props: {
      reset: Boolean,
    },
    computed: {
    },

    methods: {
      toggle () {
        this.isPlaying = !this.isPlaying
      },
      setDistance(event) {
          this.distance = event.target.value;
          this.$emit('getDistance', this.distance);
      },
    },
    created() {
      if(this.reset){
        this.distance = 0;
      }
    }
  }
</script>
<style>
.slidecontainer {
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
 

}

.slider::-webkit-slider-thumb {
  position: relative;
  z-index: 11;
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #04AA6D;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #04AA6D;
  cursor: pointer;
}
</style>