<script>
export default {
  name: "CategoryCard",
  props: {
    categoryRecieved: {
      type: Object,
      required: true,
    }
  }
}
</script>

<template>
  <div class="col-12 col-sm-6 col-md-4 text-center">
    <img :src="categoryRecieved.icons[0].url" alt="Category image" />
    <div>{{ categoryRecieved.name }}</div>
  </div>
</template>

<style scoped>
div {
  background-color: #c5c5c5;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>