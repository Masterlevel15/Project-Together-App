import { ref, computed, reactive } from "vue";
import { defineStore } from 'pinia'
import { useCoordsStore } from "./coords"

export const usePositionStore = defineStore("position", () => {
   let location;
    //const coords = await coordsStore.coords()
    const fetchPosition = async () => {
        const coordsStore = useCoordsStore();
        const coords = await coordsStore.coords();
        try {
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=50.61&lon=5.68&exclude=minutely&units=metric&appid=b68afb69c2607c15cb4f6bf022f17e25`)
            .then((response) => response.json())
            .then((data) => {
              location = data
            }); 
          } catch (error) {
            // console.log(error);
          }   
    }
    return {location, fetchPosition }
})

