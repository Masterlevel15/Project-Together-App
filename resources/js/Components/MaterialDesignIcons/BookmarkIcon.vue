<template>
  <svg-icon type="mdi" :path="path"></svg-icon>
</template>

<script>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiBookmarkOutline } from '@mdi/js';

export default {
  name: "BookmarkIcon",
  components: {
    SvgIcon
  },
  data() {
    return {
       path: mdiBookmarkOutline,
    }
  }
}
</script>