<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NotFoundPage"
})
</script>

<template>
  <div class="d-flex align-items-center flex-column m-5">
    <router-link to="/" class="justify-content-center"><img src="/musicapp_logo.png?url" class="logo" alt="Logo Musicapp"></router-link>
    <div class="m-1">
      <h1 class="text-center">Error 404: Not found</h1>
      <p>The requested page does not exist.</p>
    </div>
  </div>
</template>

<style scoped>
.logo {
  cursor: pointer;
}

h1 {
  color: #bb0000;
}

img {
  height: 300px;
  width: 300px;
}
</style>