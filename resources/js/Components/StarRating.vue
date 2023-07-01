<template>
  <div class="star-rating">
    <span v-for="star in maxRating" :key="star" @click="selectRating(star)">
      <i :class="starClass(star)"></i>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    initialRating: {
      type: Number,
      default: 0
    },
    maxRating: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      selectedRating: this.initialRating,
    };
  },
  methods: {
    starClass(star) {
      if (star <= this.selectedRating) {
        return 'fa fa-star text-amber-500';
      } else {
        return 'fa fa-star text-slate-100';
      }
    },
    selectRating(star) {
      if (star === this.selectedRating) {
        this.selectedRating = star - 1; // Diminue d'une étoile si l'étoile sélectionnée est déjà sélectionnée
      } else {
        this.selectedRating = star;
      }
      // Soumettre la note sélectionnée à votre backend ici
      console.log('Note sélectionnée :', this.selectedRating);
    },
  },
};
</script>

<style scoped>
.star-rating {
  font-size: 24px;
}

.star-rating i {
  cursor: pointer;
}
</style>
