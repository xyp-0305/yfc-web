<template>
  <div class="page-expert">
    <el-button type="primary" @click="getExpertList">获取专家信息</el-button>
    <el-button type="primary" @click="getExpertInfo">获取单个专家信息</el-button>
  </div>
</template>

<script>
import { getServiceProviderList, getServiceProviderInfo } from "../../api/api";
export default {
  data() {
    return {
      expertId: 0
    };
  },
  methods: {
    // 获取专家信息
    getExpertList() {
      const params = {
        Body: {
          Page: 1,
          Rows: 5,
          ServiceProviderType: 1
        }
      };
      getServiceProviderList(params).then(data => {
        console.log(data);
        this.expertId = data.Result.Models[0].Id
      });
    },
    // 获取单个专家信息
    getExpertInfo() {
        console.log(this.expertId)
      const params = {
        Body: this.expertId
      };
      getServiceProviderInfo(params).then(data => {
        console.log(data);
      });
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped></style>
