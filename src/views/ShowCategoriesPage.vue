<template>
  <h2 class="text-center mt-4">Spotify Categories</h2>
  <div class="container">
    <div class="row text-center justify-content-center">
      <category-card v-for="category in categories.items" :key="category.id" :category-received="category"></category-card>
    </div>
  </div>
  <div class="container">
    <div class="row text-center">
      <button v-if="this.categories.previous" type="button" class="col-12 col-sm-3 text-center mx-auto" @click="reloadNewCategories(this.categories.previous)">Previous</button>
      <button v-if="this.categories.next" type="button" class="col-12 col-sm-3 text-center mx-auto" @click="reloadNewCategories(this.categories.next)">Next</button>
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
    document.title = "MusicAPP"
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
button {
  height: 40px;
  width: 200px;
  background-color: #1ED760;
  border: solid 2px #000;
  border-radius: 20px;
  color: #000;
  font-weight: bold;
  padding-top: 2px;
  margin-top: 25px;
}
</style>