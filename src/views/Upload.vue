<template>
  <div class="home">
    <uploadImages msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import uploadImages from '@/components/uploadImages.vue'

export default {
  name: 'Home',
  components: {
    uploadImages
  }
}
</script>
