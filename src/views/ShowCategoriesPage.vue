<template>
  <h2>Categories</h2>
  <div class="wrapper">
    <div v-for="category in categories" :key="category.name">
      <img :src="category.icons[0].url" alt="Category Icon" />
      <div>{{ category.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
}
</style>