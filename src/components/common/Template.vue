<template>
  <div class="wrapper" ref="wrapper">
    <v-head :show-submenu="showSubmenu"></v-head>
    <div class="content">
      <div class="container">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view></router-view>
          </keep-alive>
        </transition>
      </div>
    </div>
    <v-foot></v-foot>
    <div class="tool">
      <el-popover
        ref="popover"
        popper-class="talk"
        placement="left-start"
        width="300"
        v-model="visible"
      >
        <div class="talkBox">
          <div class="talkHead">
            <img :src="talkingInfo.photo" alt="客服头像">
            <span>{{talkingInfo.name}}</span>
            <i class="el-icon-close" @click="visible = false"></i>
          </div>
          <div class="talkBody">
            <ul>
              <li v-for="(item,index) in msgList" :key="index" :class="item.name==2 ? left : right">
                <span class="message">{{item.message}}</span>
                {{item.time}}
              </li>
            </ul>
          </div>
          <div class="talkFoot">
            <el-input type="textarea" v-model="message"></el-input>
            <el-button type="primary" @click="handleSend">发送</el-button>
          </div>
        </div>
      </el-popover>
      <el-button v-popover:popover>
        <i class="el-icon-service" @click="handleChat"></i>
      </el-button>
      <el-popover placement="left" title="热线电话" width="200" trigger="hover" content="010-88888888">
        <el-button slot="reference">
          <i class="el-icon-phone"></i>
        </el-button>
      </el-popover>
      <el-popover placement="left-end" title="标题" width="200" trigger="hover" content="微信公众号">
        <el-button slot="reference">
          <i class="el-icon-menu"></i>
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
import vHead from "./Header";
import vFoot from "./Footer";
import bus from "./bus";
import jquery from "jquery";
import signalr, { startConnection } from "./../../util/signalr.js";
import { getIps } from "./../../util/getIp.js";
export default {
  data() {
    return {
      tagsList: [],
      talkingInfo: {
        photo: require("@/assets/img/avatar-expert.jpg"),
        name: "客服"
      },
      visible: false,
      message: "",
      proxy: {},
      msgList: [],
      left: "left",
      right: "right"
    };
  },
  computed: {
    // 是否显示左侧的下拉菜单
    showSubmenu() {
      let isShowSubmenu = false;
      // console.log(this.$route)
      if (this.$route.meta.showSubmenu) {
        isShowSubmenu = this.$route.meta.showSubmenu;
      }
      return isShowSubmenu;
    }
  },
  created() {
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0; i < msg.length; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
  methods: {
    //在线客服聊天
    handleChat() {
      if (this.proxy.hubName !== "chatroomhub") {
        // 如果没有开启客服连接，则开启连接
        this.startConn();
      } else {
        console.log("Now connected");
      }
    },
    // 建立通信连接
    startConn() {
      this.proxy = startConnection();
      this.msgList = signalr.signalrList; //客服端的消息渲染
    },
    // 发送聊天内容
    handleSend() {
      if (this.message !== "") {
        // if (sessionStorage.getItem("roomname")) {
        if (sessionStorage.getItem("userId")) {
          // console.log(this.message);
          const userId = sessionStorage.getItem("userId");
          // getIps(function(ip){console.log(ip);})
          // const sendType = 1;
          console.log(userId);
          console.log(this.message);
          this.proxy.invoke("SendMessage", userId, this.message); // 客户端向服务端发送消息
          // console.log(signalr.signalrList)
          this.message = ""; // 输入框清空
          this.msgList = signalr.signalrList; // 页面消息渲染
        }
      }
    }
    // handleShow(){
    //   this.isShow = true
    // },
  },
  mounted(){
    // 使页面滚到顶部
    let wrapper = this.$refs.wrapper
    // console.log(wrapper)
    wrapper.scrollIntoView();
  },
  watch: {
    "$route.path": function(newVal, oldVal) {
      if (newVal === "/login") {
        console.log("欢迎进入登录页面");
      }
      if (newVal === "/register") {
        console.log("欢迎进入注册页面");
      }
    }
  },
  components: {
    vHead,
    vFoot
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.wrapper {
  width: $full;
  height: $full;

  .content {
    width: $full;
    min-height: calc(100% - 430px);
    background-color:#eee;
    .container{
      width:1200px;
      height:auto;
      margin:0 auto;
    }
  }

  .tool {
    position: fixed;
    bottom: 200px;
    right: 0;
    width: 55px;
    height: auto;

    span {
      display: inline-block;
      width: $full;
      height: 55px;
    }

    button {
      height: 55px;
      color: $color-white;
      background-color: $background-black;
      padding: 10px;

      i {
        font-size: 30px;
      }
    }
  }
}

.talk {
  .talkBox {
    width: calc(100% + 24px);
    margin: -12px;
    box-shadow: 0 0 24px 0 rgba(15, 66, 76, 0.25);

    .talkHead {
      width: $full;
      height: 50px;
      background-color: $background-blue;
      margin-bottom: 10px;
      border-radius: 3px 3px 0 0;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 5px;
      }

      span {
        font-size: 16px;
        line-height: 50px;
        color: $color-white;
        vertical-align: top;
      }

      i {
        float: right;
        margin-right: 10px;
        line-height: 50px;
        color: $color-white;
        cursor: pointer;
      }
    }

    .talkBody {
      width: $full;
      height: 300px;
      overflow-y: auto;

      ul {
        li {
          display: block;
          width: $full;
          margin-bottom: 10px;

          .message {
            color: $color-blue;
            margin-right: 20px;
          }
        }

        .left {
          text-align: left;
        }

        .right {
          text-align: right;

          .message {
            color: green;
          }
        }
      }
    }

    .talkFoot {
      width: $full;
      height: auto;
      border-top: solid 1px rgba(204, 204, 204, 1);

      .el-textarea {
        width: 238px;
        margin: 10px;
      }

      button {
        float: right;
        margin-right: 10px;
        margin-top: 30px;
      }
    }
  }
}
</style>
