import {createApp} from 'vue'
import {createPinia} from 'pinia'
import router from './router'
import App from './App.vue'

import './css/style.css'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import VueApexCharts from "vue3-apexcharts";

const pinia = createPinia()
const app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(VueApexCharts);
app.use(pinia)
app.use(router)
app.mount('#app')
