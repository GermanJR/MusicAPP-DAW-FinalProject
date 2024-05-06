<script>
import {defineComponent} from 'vue'
import {getTokenWithAuthorizationCode} from "@/functions/tokenService";
import {REDIRECT_URI} from "@/utils/const_utils";
import {userStore} from "@/stores/userStore";
import {categoriesStore} from "@/stores/categoriesStore.js";
import {messageStore} from "@/stores/messagesStore.js";

export default defineComponent({
  name: "SpotifyCallback",
  async mounted() {
    await this.handleRedirection(import.meta.env.VITE_CLIENT_ID, import.meta.env.VITE_CLIENT_SECRET, REDIRECT_URI);
  },



  methods: {
    async handleRedirection(clientId, clientSecret, redirectUri) {
      const messages = messageStore()
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        await getTokenWithAuthorizationCode(code, clientId, clientSecret, redirectUri)
            .then((accessToken) => {
              const myUserStore = userStore()
              myUserStore.populateUser(accessToken);

              const myCategoriesStore = categoriesStore()
              myCategoriesStore.populateCategories()

              messages.addMessage("success", "Login successful")

              this.$router.push('/dashboard')
            })
            .catch((error) => {
              messages.addMessage("danger", "An error occurred trying to login: code generation failed.")
              this.$router.push("/");
              throw new Error("Error getting the authentication code: " + error);
            });
      } else {
        messages.addMessage("danger", "An error occurred trying to login: code not found or authorization denied by user.")
        this.$router.push("/");
      }
    }
  }
})
</script>

<template>
  <div class="container">
    <div class="row text-center">
      <img src="/musicapp_logo.png" alt="MusicAPP logo" class="col-12">
      <h2 class="col-12 text-center">Loading ...</h2>
    </div>
  </div>
</template>

<style scoped>
h2 {
  color: #1DB954;
}

img {
  height: 300px;
  width: auto;
}
</style>