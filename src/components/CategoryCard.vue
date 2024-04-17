<script>
export default {
  name: "CategoryCard",
  props: {
    categoryReceived: {
      type: Object,
      required: true,
    }
  },

  methods: {
    openCategory() {
      //window.open(this.categoryReceived., "_blank")
    }
  }
}
</script>

<template>
  <div id="main" class="category-card col-12 col-md-5 col-lg-3" @click="openCategory">
    <img class="category-image" :src="categoryReceived.icons[0].url" :alt="categoryReceived.name" />
    <h2 class="category-name">{{ categoryReceived.name }}</h2>
  </div>
</template>

<style scoped>
.category-card {
  background-color: #181818;
  border-radius: 4px;
  padding: 16px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: scale(1.05);
}

.category-image {
  max-width: 100%;
  border-radius: 50%;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
}

.category-name {
  color: #FFFFFF;
  margin-top: 8px;
}

@media (hover: hover) {
  .category-card:hover {
    transform: scale(1.05);
  }
}

.category-image {
  width: 50%;
  border-radius: 50%;
  box-shadow: 0 8px 24px 0 rgba(0, 0, 0, 0.5);
}

.category-name {
  color: #FFFFFF;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .category-card {
    margin: 16px 8px;
  }
}

@media (max-width: 576px) {
  .category-card {
    padding: 12px;
  }

  .category-image {
    width: 60%;
  }
}
</style>
