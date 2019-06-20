<template>
  <div class="contact">
    <div class="el-main">
      <h1>联系我们</h1>
      <p>{{company.name}}是一家{{company.description}}</p>
      <p>联系电话：{{company.tels}}</p>
      <p>联系地址：{{company.address}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: {
        name: "北京壹方城智汇科技有限公司",
        description: "中国文旅特色小镇全产业链一站式服务平台",
        info:
          "壹方城紧随时代发展的步伐，率先发起集文旅/特色小镇规划设计、产业资源导入、创新模式解构、社群运营、创新IP孵化等于一体的中国文旅/特色小镇全产业链一站式服务平台，创新引领文旅/特色小镇转型发展新方向；",
        friends:
          "中青旅、宋城集团、奥伦达部落、华侨城、横店集团、长隆、华强方特、蓝城集团",
        copyright: "Copyright 2014-2018 bjyfczhkj.com",
        tels: '010-88888888',
        address: '北京市朝阳区百子湾南二路大成国际A2座1503'
      }
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
.contact
  width:100%;
  min-height:300px;
  .el-main{
    margin-left:50px;
    margin-right:50px;
    h1{
      text-align:center;
    }
    p{
      text-align:left;
    }
  }
  
</style>
