"use strict";
import Vue from "vue";
import router from "../router/router";
import axios from "axios";
import store from '../store/index'
import { MessageBox, Message } from 'element-ui';
import Cookies from "js-cookie";
import { getToken } from '../utils/auth'
let qs = require("querystring");
let baseURL = process.env.VUE_APP_BASE_API;
console.log("process.env.node_env:", process.env.NODE_ENV);
let Axios = axios.create({
  timeout: 30000,
  baseURL: baseURL,
  withCredentials: false,
  // headers: {'Authorization': token}
});

Axios.defaults.baseURL = baseURL;

//请求request拦截
Axios.interceptors.request.use(
  config => {
    //封装post
    config.method === "post" && (config.data = qs.stringify(config.data))
    store.getters.token && (config.headers['Authorization'] = getToken())
    return config
  },
  err => {
    console.log("axios.js error:", err);
  }
);

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    const res = response.data
    debugger
    //拦截器返回提示错误信息
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res;
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
    return Promise.reject(error.response.data);
  }
);

console.log("当前环境是：", process.env.NODE_ENV);

Vue.prototype.$http = Axios;

export default Axios
