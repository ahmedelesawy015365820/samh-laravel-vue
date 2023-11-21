import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import simplebar from "simplebar-vue";
import VueTour from 'vue-tour'
import vco from "v-click-outside"
import * as VueGoogleMaps from "vue2-google-maps";
import i18n from './i18n'

import router from './router'
import store from '@/state/store'

import VueApexCharts from 'vue-apexcharts'
import VueStringFilter from 'vue-string-filter'
import Lightbox from 'vue-easy-lightbox'

Vue.config.productionTip = false

Vue.use(vco)

// As a plugin
import VueMask from 'v-mask'
import VueQuillEditor from 'vue-quill-editor'
import VueDraggable from "vue-draggable";
Vue.use(VueDraggable);
Vue.use(VueQuillEditor)
Vue.use(VueMask);

import VueSlideBar from 'vue-slide-bar'
 
Vue.component('VueSlideBar', VueSlideBar);
Vue.component('Pagination', require('laravel-vue-pagination'));
Vue.component('apexchart', VueApexCharts)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(require('vue-chartist'))
Vue.component('simplebar', simplebar)
Vue.use(VueStringFilter)
Vue.use(VueTour)
Vue.use(Lightbox)

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
    libraries: "places"
  },
  installComponents: true
});

import "@/assets/scss/app.scss";


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
