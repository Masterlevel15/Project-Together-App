<template>
<v-container>
    <div>Form Activity {{ findCategoryId() }}</div>
    
    <v-form
    validate-on="submit"
    @submit.prevent=""
    >
        <v-file-input label="Image" @change="handleFileUpload"></v-file-input>
        <v-text-field label="Titre" v-model="form.title"></v-text-field>
        <input type="select">
        <v-select
          :return-object="true"
          v-model="form.categorySelected"
          label="Select"
          :items="form.categoriesName"
          @change="findIdCategorySelected"
        ></v-select>
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
        <v-text-field label="Date de l'activité" v-model="form.date"></v-text-field>
        <v-text-field label="Heure de l'activité" v-model="form.hour"></v-text-field>
        <v-text-field label="Durée de l'activité" v-model="form.term"></v-text-field>
        <v-text-field label="Nombre de participants" v-model="form.participants_number"></v-text-field>
        <v-text-field label="Adresse" v-model="form.address"></v-text-field>
        <v-text-field label="Ville" v-model="form.city"></v-text-field>
        <v-text-field label="Pays" v-model="form.country"></v-text-field>
        <v-text-field label="Description de l'activité" v-model="form.description"></v-text-field>
        <v-btn type="submit" @click="sendForm" block class="mt-2 primary" >Submit</v-btn>
    </v-form>
</v-container>
</template>

<script>

export default {
  data() {
    return {
      form: {
        categoriesName: [],
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
    sendForm() {
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
  created() {
    this.categories.forEach((category) => {
        this.form.categoriesName.push(category.name);
      });
  },
}
</script>