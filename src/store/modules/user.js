import Vue from "vue";
import Vuex from "vuex";
import { login, logout, getInfo } from "../../api/admin";
import { getToken, setToken, removeToken } from "../../utils/auth";
import { resetRouter } from "../../router/router.js";
Vue.use(Vuex);

const state = {
  isLogin: false,
  userInfo: null,
  avatar: "",
  name: "",
  token: getToken()
  // roles:['person']
};
const mutations = {
  setIsLogin: (state, bool) => {
    console.log("setIsLogin", bool);
    state.isLogin = bool;
  },
  setUserInfo: (state, data) => {
    state.userInfo = data;
  },
  setRoles: (state, arr) => {
    state.roles = arr;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};
const actions = {
  // userLogin:({commit,state,dispatch})=>{
  //   console.log('store.action userLogin')
  //   commit('setIsLogin',true);
  //   commit('setUserInfo',{name:'songdewu',age:31});
  //   commit('setRoles',['person'])
  //   console.log('当前角色：',state.roles);
  //   dispatch('generatorRouter');
  //   console.log(state)
  // },

  // generatorRouter:({state})=>{
  //   resetRouter();
  //   if(state.roles && state.roles.length>0){
  //     let newRouter = asyncRoutes[0].children.filter(item=>{
  //       if(item.meta && item.meta.roles && item.meta.roles.length>0){
  //         //有交集 说明有权限
  //         let rolesArr = item.meta.roles.filter(item2=>{
  //           return state.roles.indexOf(item2)!==-1 // 利用filter方法来遍历是否有相同的元素
  //         })
  //         console.log('权限交集：',rolesArr)
  //         if(rolesArr.length>0){
  //           return true;
  //         }else{
  //           return false;
  //         }
  //       }
  //     })
  //     asyncRoutes.children = newRouter;
  //     console.log('生成的有权限路由是：',asyncRoutes);
  //      router.addRoutes(asyncRoutes);
  //      console.log('最终的路由是：',router)
  //   }

  // },
  login({ commit }, userInfo) {
    const { username, password } = userInfo;
    return new Promise((resolve, reject) => {
      debugger
      login({ username: username.trim(), password: password })
        
        .then(response => {
          console.log(response);
          const { data } = response;
          commit("SET_TOKEN", data.token);
          setToken(data.token);
          resolve();
          
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          const { data } = response;

          if (!data) {
            reject("Verification failed, please Login again.");
          }
          const { name, avatar } = data;
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          removeToken();
          resetRouter();
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit("SET_TOKEN", "");
      removeToken();
      resolve();
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
