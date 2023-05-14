<template>
  <div>
    <input type="text" v-model="selectedDate" @click="showDatePicker" />
    <div v-if="showPicker">
      <datepicker v-model="selectedDate" @input="hideDatePicker" />
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      selectedDate: null,
      showPicker: false,
    };
  },
  methods: {
    showDatePicker() {
      this.showPicker = true;
    },
    hideDatePicker() {
      this.showPicker = false;
    },
  },
};
</script>
