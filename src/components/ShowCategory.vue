<template>
  <h2>Categorías de Spotify</h2>
  <div class="wrapper">
    <div v-for="category in categories" :key="category.name">
      <img :src="category.icons[0].url" alt="Category Icon" />
      <div>{{ category.name }}</div>
    </div>
  </div>
</template>

<script>
import { getCategories, getToken } from "../functions/spotifyAPI";
export default {
  async setup() {
    const clientId = import.meta.env.VITE_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
    const token = await getToken(clientId, clientSecret);
    const categories = await getCategories(token);
    return {
      categories,
    };
  },
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
}
</style>