import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.config.errorHandler = (error, instance, info) => {
  console.error("Global error:", error);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);
};

app.use(createPinia())
app.use(router)

app.mount('#app')