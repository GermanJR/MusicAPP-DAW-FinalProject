<script>
import { RouterView } from 'vue-router'
import FooterApp from "@/components/FooterApp.vue";
import AppMenu from "@/components/AppMenu.vue";
//import ShowCategory from "./components/ShowCategory.vue";
//import HomePage from "@/views/HomePage.vue";

export default {
  name: "App",
  components: {
    RouterView,
    FooterApp,
    AppMenu,
  },
};
</script>

<template>
  <app-menu></app-menu>
  <router-view></router-view>
  <footer-app></footer-app>
</template>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>