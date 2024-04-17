<script>
import { RouterView } from 'vue-router'
import FooterApp from "@/components/FooterApp.vue";
import AppMenu from "@/components/AppMenu.vue";
import MessageComponent from "@/components/MessageComponent.vue";
import {messageStore} from "@/stores/messagesStore.js";
import {computed} from "vue";

export default {
  name: "App",

  components: {
    RouterView,
    FooterApp,
    AppMenu,
    MessageComponent,
  },

  setup() {
    const myMessageStore = messageStore();
    return {
      messages: computed(() => myMessageStore.messages)
    }
  },
};
</script>

<template>
  <app-menu></app-menu>
  <message-component v-for="message in messages" :key="message.id" :message="message" />
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