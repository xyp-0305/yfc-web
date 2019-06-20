<template>
 <div>
 <el-button type="primary" @click="getPersonal">获取个人资料</el-button>
    <el-button type="primary" @click="updatePwd">修改密码</el-button>
 </div>
</template>

<script>
import {
  getPersonalInfo,
  updatePassword
} from "../../api/api";
 export default {
 data () {
 return {

 }
 },
 methods: {
    // 获取个人资料
    getPersonal() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: token
      };
      getPersonalInfo(params).then(data => {
        console.log(data);
      });
    },
    // 修改密码
    updatePwd() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Password:'123456'
        }
      };
      updatePassword(params).then(data => {
        console.log(data);
      });
    }
  },
 components: {

 }
 }
</script>

<style>

 
</style>
