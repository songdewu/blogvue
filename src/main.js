import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store";
import "./plugins/axios";
import "./plugins/bus";
import "./plugins/config";
import "./plugins/funs";
import "./plugins/element.js";
import "./assets/styles/reset.css";
import "./assets/styles/index.scss";
import '@/icons' // icon
// import '@/permission'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
