<script>
import {defineComponent} from 'vue'
import {getTokenWithAuthorizationCode} from "@/functions/tokenService";
import {REDIRECT_URI} from "@/utils/const_utils";
import {userStore} from "@/stores/userStore";

export default defineComponent({
  name: "SpotifyCallback",
  async mounted() {
    await this.handleRedirection(import.meta.env.VITE_CLIENT_ID, import.meta.env.VITE_CLIENT_SECRET, REDIRECT_URI);
  },



  methods: {
    async handleRedirection(clientId, clientSecret, redirectUri) {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        await getTokenWithAuthorizationCode(code, clientId, clientSecret, redirectUri)
            .then((accessToken) => {
              const myUserStore = userStore()
              myUserStore.populateUser(accessToken);
              this.$router.push('/dashboard')
            })
            .catch((error) => {
              this.$router.push("/");
              throw new Error("Error getting the authentication code: " + error);
            });
      } else {
        console.error("Code was not found on URI.");
        this.$router.push("/");
      }
    }
  }
})
</script>

<template>
  <h2>Loading ...</h2>
</template>

<style scoped>
h2 {
  color: #1ED760;
}
</style>