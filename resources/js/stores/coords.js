import { defineStore } from 'pinia'


export const useCoordsStore = defineStore('coords', () => {
    const coords = async () => {
        return new Promise((resolve, error) =>{
            navigator.geolocation.getCurrentPosition((currentPosition) => {
                resolve(currentPosition);
                error('Error');
            });
        })
    }
    console.log(coords);
    return { coords };
    
})