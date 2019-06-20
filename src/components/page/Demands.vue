<template>
  <div>
    <el-button type="primary" @click="addDemand">添加行业需求</el-button>
    <el-button type="primary" @click="getDemandList">获取行业需求</el-button>
    <el-button type="primary" @click="getDemandInfo">获取单个行业需求</el-button>
    <el-button type="primary" @click="addComment">新增行业需求评论</el-button>
    <el-button type="primary" @click="getComment">获取行业需求评论</el-button>
  </div>
</template>

<script>
import {
  addIndustryDemand,
  getIndustryDemandList,
  getIndustryDemandInfo,
  addDemandComment,
  getDemandCommentList,
  getNewsList,
  getNewsInfo
} from "../../api/api";
export default {
  data() {
    return {
      demandId: 0
    };
  },
  methods: {
    // 添加行业需求
    addDemand() {
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
          DemandTitle: "行业需求1",
          DemandContent: "需求内容1",
          Place: "北京",
          Industry: "文旅",
          Contact: "张三",
          ContactNumber: "13151526262",
          Budget: "两万",
          CreateUser: 1,
          UpdateUser: 1,
          CreateTime: "2019-4-23 10:10:00",
          UpdateTime: "2019-4-23 10:15:00"
        }
      };
      addIndustryDemand(params).then(data => {
        console.log(data);
      });
    },
    // 获取行业需求
    getDemandList() {
      const params = {
        Body: {
          Page: 1,
          Rows: 5
        }
      };
      getIndustryDemandList(params).then(data => {
        console.log(data);
        this.demandId = data.Result.Models[0].Id;
      });
    },
    // 获取单个行业需求
    getDemandInfo() {
      console.log(this.demandId);
      const params = {
        Body: this.demandId
      };
      getIndustryDemandInfo(params).then(data => {
        console.log(data);
      });
    },
    // 新增行业需求评论
    addComment() {
      console.log(this.demandId);
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
          DemandId: this.demandId,
          PId: 1,
          CommentUserId: 1,
          CommentContent: "评论内容",
          CommentTime: "2019-04-23 11:02:00",
          UpdateTime: "2019-04-23 11:12:00"
        }
      };
      addDemandComment(params).then(data => {
        console.log(data);
      });
    },
    // 获取行业需求评论
    getComment() {
      console.log(this.demandId);
      const params = {
        Body: {
          Page: 1,
          Rows: 5,
          DemandId: this.demandId,
          PId: 1
        }
      };
      getDemandCommentList(params).then(data => {
        console.log(data);
      });
    }
  },
  components: {}
};
</script>

<style>
</style>
