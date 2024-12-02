import { createApp } from 'vue'
import App from './App.vue'
import store from '../src/Store/StoreCw';
import router from './Router/RoutesCw' 

const app = createApp(App)

app.use(router);
app.use(store);
app.mount('#app');


