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
import {messageStore} from "@/stores/messagesStore.js";

export default {
  components: {
    CategoryCard,
  },

  data() {
    return {
      categories: {},
    }
  },

  mounted() {
    this.reloadCategories();
  },

  methods: {
    async reloadCategories() {
      const myCategoriesStore = categoriesStore();
      try {
        await myCategoriesStore.populateCategories();
        this.categories = {...myCategoriesStore.allCategories};
      } catch (error) {
        const messages = messageStore()
        messages.addMessage("danger", "Error loading categories: " + error)
        console.error(error);
      }
    },

    async reloadNewCategories(url) {
      const myCategoriesStore = categoriesStore();
      try {
        await myCategoriesStore.getNewCategories(url);
        this.categories = {...myCategoriesStore.allCategories};
      } catch (error) {
        const messages = messageStore()
        messages.addMessage("danger", "Error reloading categories: " + error)
        console.error(error);
      }
    },
  }
};
</script>


<style scoped>

</style>