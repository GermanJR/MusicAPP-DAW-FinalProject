<script>
import { defineComponent } from 'vue'
import { mapState } from "pinia";
import { userStore } from "@/stores/userStore";

export default defineComponent({
  name: "AppMenu",

  computed: {
    ...mapState(userStore, {
      user: "currentUser",
    })
  }
})
</script>

<template>
  <nav v-if="user.display_name" class="app-menu">
    <ul class="menu-list">
      <li><router-link to="/dashboard" class="menu-item">Dashboard</router-link></li>
      <li><router-link to="/recommendations" class="menu-item">Get recommendations</router-link></li>
      <li><router-link to="/categories" class="menu-item">Categories</router-link></li>
      <li><router-link to="/profile" class="menu-item">My account</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>
.app-menu {
  background-color: #181818;
  padding: 16px;
}

.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.menu-item {
  color: #b3b3b3;
  padding: 0 20px;
  border-radius: 4px;
  text-decoration: none;
  transition: color 0.3s ease;
}

li {
  margin-bottom: 15px;
  margin-top: 15px;
}

.menu-item:hover,
.menu-item.router-link-exact-active {
  color: #1DB954;
}

@media (min-width: 768px) {
  .menu-list {
    flex-direction: row;
  }

  .menu-item {
    margin-right: 16px;
  }

  .menu-item:last-child {
    margin-right: 0;
  }
}
</style>
