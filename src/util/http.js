import axios from "axios";
import {getCookie} from "./util"
// import * as Promise from 'bluebird' // 解决ie环境下axios的兼容性问题
import {Promise} from 'bluebird'; // 解决ie环境下axios的兼容性问题

axios.defaults.timeout = 5000 // 设置超时
// axios.defaults.baseURL = 'http://192.168.1.7:8080' // 本地-张
axios.defaults.baseURL = 'http://192.168.1.64:8030' // 本地-何
// axios.defaults.baseURL = 'http://192.168.1.64:8011' //本地调试-何
// axios.defaults.baseURL = 'http://47.92.121.151:8088' // 服务器
// axios.defaults.baseURL = 'http://localhost:61544' // 本地

// http request 拦截器，通过这个，我们就可以把Cookie传到后台
axios.interceptors.request.use(
    config => {
      const token = getCookie('session'); // 获取Cookie
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
      };
      if(token){
        config.params = {'token':token} //后台接收的参数
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );
  
  // http response 拦截器
  axios.interceptors.response.use(
    response => {
      //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
      if(response.data.errCode == 2){
        router.push({
          path:'/login',
          query:{redirect: router.currentRoute.fullPath} // 从哪个页面跳转
        })
      }
      return response;
    },
    error => {
      return Promise.reject(error)
    }
  );  

/**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise} 
 */
export function get(url,params={}){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params:params}).then(response=>{
            resolve(response.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

/**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.post(url,data).then(response=>{
            resolve(response.data)
        },err=>{
            reject(err)
        })
    })
}

/**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.patch(url,data).then(response=>{
            resolve(response.data)
        },err=>{
            reject(err)
        })
    })
}

/**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url,data={}){
    return new Promise((resolve,reject)=>{
        axios.put(url,data).then(response=>{
            resolve(response.data)
        },err=>{
            reject(err)
        })
    })
}