"use strict";
import Vue from "vue";
import router from "../router";
import axios from "axios";
import Cookies from "js-cookie";
let qs = require("querystring");
// let hostUrl = "https://www.banbooyun.com/hostroute.php";
let baseURL = "https://www.banbooyun.com";

let Axios = axios.create({
  timeout: 30000,
  baseURL: baseURL,
  withCredentials: false
});
Axios.defaults.baseURL = baseURL;
console.log("baseUrl:", baseURL);

//请求request拦截
Axios.interceptors.request.use(
  config => {
    //封装post
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  err => {
    console.log("axios.js axios.request error:", err);
  }
);

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    // let noAlert = ["system/login/login"];
    //拦截器返回提示错误信息
    if (response.data.err_code != 0) {
      //iView.Message.error(response.data)
      console.log("err_code !=0 api提示：", response.data.err_message);
    }
    return response;
  },
  error => {

    if (error.response) {
      if (error.response.status == "600" && router.currentRoute.path != '/login') {
        console.log("请求状态码,正在退出", "600");
        Cookies.remove("user");
        localStorage.removeItem("token");
        console.log("router.currentRoute.path:", router.currentRoute.path);
        //如果当前不是登录页或其主页
        if (router.currentRoute.path !== "/index" && router.currentRoute.path !== "/login") {
          router.push({path:'/login',query:{ref:'admin'}});
        }
      }
    }
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

// export default Axios;
console.log('当前环境是：',process.env.NODE_ENV);
Vue.prototype.$http = Axios;
