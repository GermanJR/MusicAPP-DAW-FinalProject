<script>
import {defineComponent} from 'vue'
import {mapState} from "pinia";
import {userStore} from "@/stores/userStore";

export default defineComponent({
  name: "AppMenu",

  computed: {
    ...mapState(userStore, {
      user: "currentUser",
    })
  }
})
</script>

<template>
  <nav v-if="user.display_name">
    <ul>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/categories">Categories</router-link>
      <router-link to="/profile">My account</router-link>
    </ul>
  </nav>
</template>

<style scoped>

</style>