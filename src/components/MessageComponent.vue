<script>
import {messageStore} from "@/stores/messagesStore.js";

export default {
  props: {
    message: Object
  },
  mounted() {
    if(this.message.type !== 'danger') {
      setTimeout(() => {
        this.delMessage()
      }, 4000);
    }
  },
  computed: {
    classList() {
      return 'col-sm-12 alert alert-dismissible alert-' + this.message.type
    }
  },
  methods: {
    delMessage() {
      const myMessageStore = messageStore()
      myMessageStore.deleteMessage(this.message.id)
    }
  }
}
</script>

<template>
  <div :class="classList">
    <span>{{ message.title }}</span>
    <button type="button" class="btn-close" @click="delMessage"></button>
  </div>
</template>

<style scoped>

</style>