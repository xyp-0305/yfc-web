<template>
  <div>
    <el-button type="primary" @click="addIndustry">产业资源提报</el-button>
    <el-button type="primary" @click="getIndustryList">获取产业资源</el-button>
    <el-button type="primary" @click="getIndustryInfo">获取单条产业资源</el-button>
    <el-button type="primary" @click="getProvideList">获取服务商信息</el-button>
    <el-button type="primary" @click="getProvideInfo">获取单个服务商信息</el-button>
  </div>
</template>

<script>
import { addIndustryResources,getIndustryResourcesList,getIndustryResourcesInfo,getServiceProviderList, getServiceProviderInfo } from "../../api/api";
export default {
  data() {
    return {
        industryId:0,
        provideId: 0
    };
  },
  methods: {
    // 产业资源提报
    addIndustry() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const industryParams = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Company:'提报公司',
          LogUrl:'http://image',
          ResourcesType:1,
          CreateUser:1,
          CreateTime:'2019-4-22 15:11:00',
          UpdateTime:'2019-4-22 15:15:00',
          UpdateUser:1
        }
      };
      addIndustryResources(industryParams).then(data => {
        console.log(data);
      });
    },
    // 获取产业资源
    getIndustryList(){
        const industryParams={
            Body:{
                Page:1,
                Rows:5
            }
        }
        getIndustryResourcesList(industryParams).then(data=>{
            console.log(data)
            this.industryId = data.Result.Models[0].Id
        })
    },
    // 获取产业资源详情
    getIndustryInfo(){
        console.log(this.industryId)
        const industryParams = {
            Body:this.industryId
        }
        getIndustryResourcesInfo(industryParams).then(data=>{
            console.log(data)
        })
    },
    // 获取服务商信息
    getProvideList() {
      const params = {
        Body: {
          Page: 1,
          Rows: 5,
          ServiceProviderType: 2
        }
      };
      getServiceProviderList(params).then(data => {
        console.log(data);
        this.provideId = data.Result.Models[0].Id;
      });
    },
    // 获取单个服务商信息
    getProvideInfo() {
      console.log(this.provideId);
      const params = {
        Body: this.provideId
      };
      getServiceProviderInfo(params).then(data => {
        console.log(data);
      });
    }
  },
  components: {}
};
</script>

<style>
</style>
