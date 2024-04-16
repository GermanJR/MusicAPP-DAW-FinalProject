<template>
  <h2>Categories</h2>
  <div class="container">
    <div class="row">
      <category-card v-for="category in categories.items" :key="category.id" :category-recieved="category"></category-card>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <button v-if="this.categories.next" type="button" class="col-12 col-sm-3 text-end" @click="reloadNewCategories(this.categories.next)">Next</button>
      <button v-if="this.categories.previous" type="button" class="col-12 col-sm-3 text-start" @click="reloadNewCategories(this.categories.previous)">Previous</button>
    </div>
  </div>
  <div style="margin-bottom: 100px"></div>
</template>

<script>
import CategoryCard from "@/components/CategoryCard.vue";
import {categoriesStore} from "@/stores/categoriesStore.js";

export default {
  components: {
    CategoryCard,
  },

  data() {
    return {
      categories: [],
    }
  },

  mounted() {
    const myCategoriesStore = categoriesStore()
    this.categories = myCategoriesStore.allCategories;
  },

  methods: {
    async reloadNewCategories(url) {
      const myCategoriesStore = categoriesStore()
      this.categories = myCategoriesStore.getNewCategories(url)
    },
  }
};
</script>

<style scoped>

</style>