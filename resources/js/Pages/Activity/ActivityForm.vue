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
      <button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-black mx-auto">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
          </svg>
      </button>
    </nav>
    <div>Form Activity {{ findCategoryId() }}</div>
    
    <v-form
    @submit="handleSubmit" action="/store" enctype="multipart/form-data"
    >
    @csrf
        <v-file-input label="Image" @change="handleFileUpload" name="image" class="mt-16">

        </v-file-input>
        <v-text-field label="Titre" v-model="form.title" ></v-text-field>
        <input type="select"  >
          <v-select
            :return-object="true"
            v-model="form.categorySelected"
            label="Select"
            :items="categoriesName"
            @change="findIdCategorySelected"
          >
          </v-select>
        <v-row justify="space-around">
        <v-col cols="auto">
        <v-sheet
        v-if="form.categorySelected != null"
        elevation="10"
        class="py-4 px-1"
        >
        <v-chip-group
          mandatory
          selected-class="text-primary"
        >
          <v-chip
            v-model="form.categorySelected"
          >
          {{form.categorySelected}}
          </v-chip>
        </v-chip-group>
        {{form.categoryID}}
        </v-sheet>
        </v-col>
        </v-row>
        <div class="datetime">
          <input type="date"
          min="2018-01-01" max="2030-12-31" 
          v-model="form.date">
          <input type="time" id="appt" name="appt"
          min="00:00" max="24:00" required
          v-model="form.hour">
        </div>
        <v-text-field label="Date de l'activité" v-model="form.date"></v-text-field>
        <v-text-field label="Heure de l'activité" v-model="form.hour"></v-text-field>
        <input type="time" id="appt" name="appt"
          min="00:00" max="24:00" required
          v-model="form.term">
        <v-text-field label="Durée de l'activité" v-model="form.term"></v-text-field>
        <v-text-field label="Nombre de participants" v-model="form.participants_number"></v-text-field>
        <v-text-field label="Adresse" v-model="form.address"></v-text-field>
        <v-text-field label="Ville" v-model="form.city"></v-text-field>
        <v-text-field label="Pays" v-model="form.country"></v-text-field>
        <v-textarea label="Description de l'activité" v-model="form.description"></v-textarea>
        <v-btn type="submit" block class="mt-2 primary">Submit</v-btn>
    </v-form>
</v-container>
</template>

<script>

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
        participants_number: null,
        address: null,
        city: null,
        country: null,
        description: null,
        categoryIndex: null,
      },
      selectedDate: null,
      datetime: null,
      formData: [],
    };
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
    },
    findCategoryId() {
      for (let index = 0; index < this.categories.length; index++) {

      // const categoryIndex = Object.values(this.categories[index]).findIndex(x => x === 'aut sit');

      if (Object.values(this.categories[index]).includes(this.form.categorySelected)) {
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
      this.findCategoryId();
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
      console.log(event.target.elements.image.files[0]);

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
    }
  },
  
  components: {
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
  display: inline-block;
  width: 5vh;
  height: 5vh;
  color: #fff;
  font-size: 1em;
  border-radius: 50%;
  margin-left: 1vh;
  margin-bottom: 10px;
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
display: flex;
gap: 1vh;
}
</style>