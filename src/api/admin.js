// import request from '../utils/request'
import axios from '../plugins/axios'

/**
 * 
 * @param {Object} data 用户名或密码 
 */
export function login(data) {
  return axios({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function  getInfo(token) {
  return axios({
    url: '/admin/info', 
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return axios({
    url: '/admin/list',
    method: 'get'
  })
}
