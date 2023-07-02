<template>
<v-container>
    <nav>
      <button>
        <a :href="route('home')">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            2<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </a>
      </button>
    </nav>
    
    <v-form
    @submit="handleSubmit" action="/store" enctype="multipart/form-data"
    class="mt-16"
    >
        <div >
          <img :src="imagePreview" alt="Aperçu de l'image"  class="w-full h-full mx-auto">
          <br>

          <label class="block mb-2 text-sm font-medium text-gray-900 " for="file_input">Upload file</label>
          <input class="block w-full h-full px-1 py-[0.9vh] text-sm text-slate-900 border border-gray-300 rounded-lg cursor-pointer bg-blue-input-form focus:outline-none" id="file_input" type="file"
          @change="handleFileUpload" name="image">
        </div>
        
        <div class="my-8">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 ">Titre</label>
            <input type="text" id="title" class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Randonnée charmante au bord d'un lac" required
            v-model="form.title">
        </div>

        <div class="flex-col">
          <div class="flex space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.41 11.58l-9-9A2 2 0 0 0 11 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 .59 1.42l9 9A2 2 0 0 0 13 22a2 2 0 0 0 1.41-.59l7-7A2 2 0 0 0 22 13a2 2 0 0 0-.59-1.42M13 20l-9-9V4h7l9 9M6.5 5A1.5 1.5 0 1 1 5 6.5A1.5 1.5 0 0 1 6.5 5Z"
                  class="self-center"/></svg>
                <p>Categories</p>
          </div>
          <div class="flex grow flex-wrap  w-full h-auto mt-4 mb-4">
            <div
            v-for="category in categoriesName" 
            :key="category"
            :class="['truncate mr-2 mb-4 w-20 px-2 py-2 bg-blue-light3 text-white rounded-lg transition-colors', { 'bg-green': isActive(category, 'categories') }]"
            @click="toggleButton(category, 'categories')"> 
              {{ category }}
            </div>   
          </div>
        </div>
         <!--Date-->
        <DatePicker ref="datePicker" @activityDate="getActivityDate"/>
        {{form.date}}
        <!--Heure-->
        <div class="my-8">
            <label for="hour" class="block mb-2 text-sm font-medium text-gray-900 ">Heure de l'activité</label>
            <input type="time" id="hour" name="appt"
          min="00:00" max="24:00" required
          v-model="form.hour"
          class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        </div>

        <!--Durée-->
        <div class="my-8">
            <label for="term" class="block mb-2 text-sm font-medium text-gray-900 ">Durée de l'activité</label>
            <input type="time" id="term" name="appt"
          min="00:00" max="24:00" required
          v-model="form.term"
          class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
        </div>
        <!--Participants-->
        <div class="my-8">
            <label for="participants_number" class="block mb-2 text-sm font-medium text-gray-900 ">Nombre de participants</label>
            <input type="Number" id="participants_number" name="appt"
          min="00:00" max="24:00" required
          v-model="form.participants_number"
          class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
          
          <input id="default-range" type="range"  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-100" v-model="form.participants_number">
        </div>
        <!--Adresse-->
        <div class="my-8">
            <label for="adress" class="block mb-2 text-sm font-medium text-gray-900">Adresse</label>
            <input type="text" id="adress" class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Rue Charles Deliège" required
            v-model="form.address">
        </div>
        <!--Ville-->
        <div class="my-8">
            <label for="city" class="block mb-2 text-sm font-medium text-gray-900">Ville</label>
            <input type="text" id="city" class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Fléron" required
            v-model="form.city">
        </div>
        <!--Pays-->
        <div class="my-8">
            <label for="country" class="block mb-2 text-sm font-medium text-gray-900">Pays</label>
            <input type="text" id="country" class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Belgique" required
            v-model="form.country">
        </div>
        <!--Description-->
        <div class="my-8">
            <label for="description" class="block mb-2 text-sm font-medium text-slate-900">Description de l'activité</label>
            <textarea id="description" rows="7" class="bg-blue-input-form border border-gray-300 text-slate-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Décrivez votre activité..." v-model="form.description"></textarea>
        </div>
        <button type="submit" class="bg-blue-light w-full px-3 py-2 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-light2 focus:ring-4 focus:outline-none focus:ring-blue-light3">Ajouter</button>
    </v-form>
</v-container>
</template>

<script>
import { Icon } from '@iconify/vue';
import DatePicker from '../../Components/DatePicker.vue';

import RangeSliderVue from '../../Components/RangeSlider.vue';

export default {
  data() {
    return {
      categoriesName: [],
      form: {
        categorySelected: null,
        image: null,
        title: null,
        categoryID: null,
        date: null,
        hour: null,
        term: null,
        participants_number: 10,
        address: null,
        city: null,
        country: null,
        description: null,
        categoryIndex: null,
      },
      selectedDate: null,
      datetime: null,
      formData: [],
      imagePreview: '',
      activeCategories: [],
    };
  },
  components: {
    Icon,
    DatePicker,
    RangeSliderVue,
	},
  methods: {
    handleForm() {
      return {
        title: this.form.title,
        date: this.datetime,
        term: this.form.term,
        participants_number: this.form.participants_number,
        address: this.form.address,
        description: this.form.description,
        image: this.form.image,
        country: this.form.country,
        city: this.form.city,
        category: this.form.categoryIndex,
      }
    },
    handleFileUpload(file) {
      this.form.image = file.target.files[0];
      console.log(file.target.files[0]);

      if (this.form.image) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.form.image);
      }
    },
    findCategoryId(item) {
      console.log(item);
      for (let index = 0; index < this.categories.length; index++) {

      // const categoryIndex = Object.values(this.categories[index]).findIndex(x => x === 'aut sit');

      if (Object.values(this.categories[index]).includes(item)) {
        console.log(`La valeur ${this.form.categorySelected} a été trouvée dans le tableau numéro ${index}.`);
        this.form.categoryIndex = index + 1;
      }
      }
    },
    concatDateHour() {
      this.datetime = this.form.date + ' ' + this.form.hour;
    },
    handleSubmit(event) {
      event.preventDefault();
      // this.findCategoryId();
      this.concatDateHour();
      let formData = new FormData();
      formData.append('file', event.target.elements.image.files[0]);
      formData.append('title', this.form.title);
      formData.append('categoryID', this.form.categoryIndex);
      formData.append('date', this.datetime);
      formData.append('hour', this.form.hour);
      formData.append('term', this.form.term);
      formData.append('participants_number', this.form.participants_number);
      formData.append('address', this.form.address);
      formData.append('city', this.form.city);
      formData.append('country', this.form.country);
      formData.append('description', this.form.description);
      
      axios.post('/api/activity/store', formData)
        .then(response => {
          // handle success
          window.location.href = response.data.redirect;
        })
        .catch(error => {
          // handle error
        });
    },
    sendFormDataRouteWeb() {
      // Route WEB
      this.findCategoryId();
      this.concatDateHour();
      this.formData = new FormData();
      this.formData.append('file', this.form.image);
      this.formData.append('title', this.form.title);
      this.formData.append('categoryID', this.form.categoryIndex);
      this.formData.append('date', this.datetime);
      this.formData.append('hour', this.form.hour);
      this.formData.append('term', this.form.term);
      this.formData.append('participants_number', this.form.participants_number);
      this.formData.append('address', this.form.address);
      this.formData.append('city', this.form.city);
      this.formData.append('country', this.form.country);
      this.formData.append('description', this.form.description);


      //return this.formData;
    },
    sendForm() {
      // Route Api
      this.findCategoryId();
      this.concatDateHour();
      let formData = new FormData();
      formData.append('file', this.form.image);
      formData.append('title', this.form.title);
      formData.append('categoryID', this.form.categoryIndex);
      formData.append('date', this.datetime);
      formData.append('hour', this.form.hour);
      formData.append('term', this.form.term);
      formData.append('participants_number', this.form.participants_number);
      formData.append('address', this.form.address);
      formData.append('city', this.form.city);
      formData.append('country', this.form.country);
      formData.append('description', this.form.description);

      axios.post('/api/activity/store', formData)
        .then(response => {
          // handle success
        })
        .catch(error => {
          // handle error
        });
    },
    isActive(item, type) {
        return this.activeCategories.includes(item);

    },
    toggleButton(item, type) {  
      const index = this.activeCategories.indexOf(item);
      if (index === -1) {
              this.activeCategories = [];
              this.activeCategories.push(item);
              this.findCategoryId(item);
      } else {
              this.activeCategories.splice(index, 1);
      }
    },
    getActivityDate(activityDate) {
      console.log(activityDate);
      this.form.date = activityDate;
    },
  },
  props:{
    categories: Array,
  },
  computed: {
  },
  created() {
    this.categories.forEach((category) => {
        this.categoriesName.push(category.name);
      });
  },
  mounted() {
  },
}
</script>

<style>
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 8vh;
  background-color: rgb(180, 217, 217);
  z-index: 100;
}

nav button:nth-of-type(1) {
   position: absolute;
  top: 50%;
  left: 2vh;
  transform: translate(-50%, -50%);
  color: white;
}
nav button:nth-of-type(2) {
  display: inline-block;
  width: 5vh;
  height: 5vh;
  background-color: white;
  color: #fff;
  font-size: 1em;
  border-radius: 50%;
  margin-left: 38vh;
  margin-top: 1.5vh;
}

nav button:first-of-type {
  margin-left: 20px;
}

.v-file-input {
  text-align: center;
}
.datetime {
display: none;
gap: 1vh;
}
</style>