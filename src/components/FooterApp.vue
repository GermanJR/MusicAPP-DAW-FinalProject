<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "FooterApp"
})
</script>

<template>
  <footer class="fixed-bottom container">
    <div class="row">
      <div class="col-12 text-center">
        <h6>&copy; Germán Juan Ribera</h6>
        <p>Proyecto final Desarrollo de Aplicaciones Web</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.container {
  padding-top: 20px;
  background-color: #000;
  color: #fff;
  min-width: 100% !important;
}
</style>