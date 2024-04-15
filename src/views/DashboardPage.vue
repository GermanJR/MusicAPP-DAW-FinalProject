<script>
import {defineComponent} from 'vue';
import {userStore} from "@/stores/userStore";
import {mapState} from "pinia";

export default defineComponent({
  name: "DashboardPage",
  computed: {
    ...mapState(userStore, {
      user: "currentUser",
    })
  },
});
</script>

<template>
  <div class="container">
    <div class="row">
      <h1 class="col-12">DashBoard</h1>
      <h3 class="col-12">Welcome again <b>{{ user?.display_name }}</b></h3>
    </div>
  </div>
</template>

<style scoped>
b {
  color: #35c500;
}
</style>
