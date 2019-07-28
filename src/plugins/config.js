import Vue from 'vue'
const configs = 
  {
    baseUrl:'',//接口除域名之外的公共部分
    wsurl:'ws://xxxxxxxxxxxxx',
    apiDomain:'',
    imgDomain:'',
    uploadDomain:'',
    ossUploadDomain:'',
  }

  Vue.prototype.$config = configs
