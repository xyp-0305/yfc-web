import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import { get, post, patch, put } from './util/http'
import { delCookie, getCookie } from './util/util'
import { requestLogin } from './api/api' // 登录
import jquery from 'jquery'
import http from 'vue-resource'
import ElementUI from 'element-ui'
import md5 from 'js-md5'
import VideoPlayer from 'vue-video-player'
import signalR from 'signalr' // 即时通信
import 'babel-polyfill' // 将ES6转换为浏览器可识别的ES5语法
import infiniteScroll from 'vue-infinite-scroll'
// import VueQuillEditor from 'vue-quill-editor' // 富文本编辑器
import 'element-ui/lib/theme-chalk/index.css' // element-ui 样式库
require('video.js/dist/video-js.css') // 视频插件基础样式
require('vue-video-player/src/custom-theme.css') // 视频播放器主题样式
require('./assets/stylus/myVideo.styl') // 自定义视频样式
require('./assets/stylus/base.styl') // 自定义公共样式
require('./assets/iconfont/iconfont.css') // 图标样式
// 引入富文本编辑器样式
require('quill/dist/quill.core.css')
require('quill/dist/quill.snow.css')
require('quill/dist/quill.bubble.css')


Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(VideoPlayer)
// Vue.use(VueQuillEditor)
Vue.use(infiniteScroll)

// 图片地址前缀
// Vue.prototype.HOST = 'http://192.168.1.7:8088' // 本地-张
Vue.prototype.HOST = 'http://192.168.1.64:8030' //本地-何
// Vue.prototype.HOST = 'http://192.168.1.64:8011' //本地调试-何
// Vue.prototype.HOST = 'http://localhost:61544' //本地
// Vue.prototype.HOST = 'http://47.92.121.151:8088' // 服务器
Vue.prototype.$md5 = md5

Vue.prototype.$axios = axios
Vue.prototype.$jquery = jquery
Vue.prototype.$http = http


// 自定义指令v-anchor
// 作用：锚点
Vue.directive('anchor', {
  inserted: function (el, binding) {
    el.onclick = function () {
      document.documentElement.scrollTop = jquery('#anchor-' + binding.value).offset().top
    }
  }
})

router.beforeEach((to, from, next) => {
  // console.log(from)
  // console.log(to)
  
  // if (to.path == '/login') {
  //   sessionStorage.removeItem('token');
  //   sessionStorage.removeItem('roomname');
  // }

  // const Timestamp1 = Math.round(new Date() / 1000); // 获取当前时间戳
  // // console.log("时间戳1：--" + Timestamp1);
  // const key = "RWERFGSDDGTWETGD";
  // const sign1 = Vue.prototype.$md5(key + "Key" + key + "Timestamp" + Timestamp1 + key).toUpperCase();
  // // console.log("sign1：--" + sign1);
  // const data1 = {
  //   Key: key,
  //   Sign: sign1,
  //   Timestamp: Timestamp1,
  //   Body: "admin"
  // };

  // requestToken(data1).then(res => { // 获取token
  //   console.log(res)
  //   if (res.ReturnCode == 200) { // 若状态码是200，则将token添加到本地缓存
  //     sessionStorage.setItem('token', res.Result);
  //     next();
  //   } else { // 若状态码不是200，则移除token，并跳转到login
  //     if (sessionStorage.getItem('token')) {
  //       sessionStorage.removeItem('token')
  //     }
  //     next({ path: '/login' })
  //   }
  // })

  // let token = sessionStorage.getItem('token');
  // console.log(token)
  // if (!token && to.path != '/login' && to.path!='/register') { // 如果token不存在，并且跳转路由不是login,则强制跳转到login页面
  //   next({ path: '/login' });
  // } else {
  //   next();
  // }

  //请求路由的时候验证token是否存在，若不存在，则跳转到登录页
  if (to.meta.requireAuth) {

    const Timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
    // console.log(Timestamp);
    const key = "RWERFGSDDGTWETGD";
    const sign = Vue.prototype.$md5(key + "Key" + key + "Timestamp" + Timestamp + key).toUpperCase();
    // console.log(sign);
    let user = JSON.parse(sessionStorage.getItem("user"));
    let password = JSON.parse(sessionStorage.getItem("password"))
    let loginType = JSON.parse(sessionStorage.getItem("loginType"))

    let params = {
      Key: key,
      Sign: sign,
      Timestamp: Timestamp,
      Body: {
        UserPhone: user,
        LoginPassword: password,
        LoginType: loginType
      }
    }
    requestLogin(params).then(res => {
      console.log(params)
      console.log(res)
      if (res.ReturnCode == 200) {
        next();
        sessionStorage.setItem("token",res.Result)
      } else {
        console.log('fail')
        if (sessionStorage.getItem('token')) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('roomname');
        }
        next({ path: '/login' });
      }
    });
  }
  else {
    next();
  }
})

// 在即将离开当前页面(刷新或关闭)时执行
window.onbeforeunload = function (e) {
  const e1 = window.event || e
  e1.returnValue = ('确认要退出当前页面吗？当前系统的数据可能会丢失。')
}
// 离开当前页面(刷新或关闭)时执行
window.onunload = function (e) {
  sessionStorage.removeItem('roomname')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
