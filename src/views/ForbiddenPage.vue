<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ForbiddenPage"
})
</script>

<template>
  <div class="d-flex align-items-center flex-column m-5">
    <router-link to="/" class="justify-content-center"><img src="/musicapp_logo.png?url" class="logo" alt="Logo MusicAPP"></router-link>
    <div class="m-1 text-center">
      <h1>Error 401: Forbidden</h1>
      <p>You have to login with your Spotify account and authorise the app in order to enter here.</p>
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