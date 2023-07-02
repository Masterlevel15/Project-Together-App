<template>
  <div>
    <label for="activityDate">Date de l'activité</label>
    <flat-pickr id="activityDate" v-model="activityDate" class="bg-blue-input-form border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></flat-pickr>
  </div>
</template>

<script>
import FlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: {
    FlatPickr
  },
  props: {
  },
  data() {
    return {
      activityDate: null,
    };
  },
  methods: {
    emitDate() {
      this.$emit('activityDate', this.activityDate);
    }
  },
  watch: {
    activityDate(newDate) {
      this.$emit('activityDate', newDate);
    }
  }
};
</script>
