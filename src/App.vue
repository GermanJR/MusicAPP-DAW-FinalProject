<script>
import { RouterView } from 'vue-router'
import FooterApp from "@/components/FooterApp.vue";
import AppMenu from "@/components/AppMenu.vue";
import MessageComponent from "@/components/MessageComponent.vue";
import {messageStore} from "@/stores/messagesStore.js";
import {computed} from "vue";
import {userStore} from "@/stores/userStore.js";

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
    const myUserStore = userStore();
    return {
      messages: computed(() => myMessageStore.messages),
      user: computed(() => myUserStore.currentUser)
    }
  },
};
</script>

<template>
  <app-menu></app-menu>
  <div v-if="this.user">
    <message-component v-for="message in messages" :key="message.id" :message="message" />
  </div>
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