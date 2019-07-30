"use strict";
import Vue from "vue";
import router from "../router/router";
import axios from "axios";
import Cookies from "js-cookie";
let qs = require("querystring");
let baseURL = process.env.VUE_APP_API_BASE_URL;
console.log("baseUrl:", baseURL);
console.log("process.env:", process.env.NODE_ENV);

let token = '333333333333';

let Axios = axios.create({
  timeout: 30000,
  baseURL: baseURL,
  withCredentials: false,
  headers: {'Authorization': token}
});

Axios.defaults.baseURL = baseURL;


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
    console.log("axios.js error:", err);
  }
);

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    //拦截器返回提示错误信息
    if (response.data.err_code != 0) {
      //iView.Message.error(response.data)
      console.log("err_code !=0 api提示：", response.data.err_message);
    }
    return response;
  },
  error => {
    
    if (error.response) {
      if (error.response.status == 401 && router.currentRoute.path != "/login") {
        Cookies.remove("username");
        localStorage.removeItem("token");
        //如果当前不是登录页或其主页
        if (router.currentRoute.path !== "/login") {
          router.push({ path: "/logins", query: { ref: "admin" } });
        }
      }
    }
    console.log(JSON.stringify(error.response));
    return Promise.reject(error.response.data); // 返回接口返回的错误信息
  }
);

console.log("当前环境是：", process.env.NODE_ENV);
Vue.prototype.$http = Axios;
