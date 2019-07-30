import Vue from 'vue'
import Vuex from 'vuex'
import router,{resetRouter,asyncRouter} from '../../router/router.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:false,
    userInfo:null,
    token:null,
    roles:['person']
  },
  mutations: {
    setIsLogin:(state,bool)=>{
      console.log('setIsLogin',bool)
      state.isLogin = bool;
    },
    setUserInfo:(state,data)=>{
      state.userInfo = data;
    },
    setRoles:(state,arr)=>{
      state.roles = arr;
    },
  },
  actions: {
    userLogin:({commit,state,dispatch})=>{
      console.log('store.action userLogin')
      commit('setIsLogin',true);
      commit('setUserInfo',{name:'songdewu',age:31});
      commit('setRoles',['person'])
      console.log('当前角色：',state.roles);
      dispatch('generatorRouter');
      console.log(state)
    },

    generatorRouter:({state})=>{
      resetRouter();
      if(state.roles && state.roles.length>0){
        let newRouter = asyncRouter[0].children.filter(item=>{
          if(item.meta && item.meta.roles && item.meta.roles.length>0){
            //有交集 说明有权限
            let rolesArr = item.meta.roles.filter(item2=>{
              return state.roles.indexOf(item2)!==-1 // 利用filter方法来遍历是否有相同的元素
            })
            console.log('权限交集：',rolesArr)
            if(rolesArr.length>0){
              return true;
            }else{
              return false;
            }
          }
        })
        asyncRouter.children = newRouter;
        console.log('生成的有权限路由是：',asyncRouter);
         router.addRoutes(asyncRouter);
         console.log('最终的路由是：',router)
      }
     
    }

  }
})
