<template>
  <div class="about">
    <div class="el-main">
      <h1>关于我们</h1>
      <p>{{company.about}}是一家{{company.description}}</p>
      <p>{{company.info}}</p>
      <p>{{company.friends}}</p>
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
        copyright: "Copyright 2014-2018 bjyfczhkj.com"
      }
    };
  },
  components: {}
};
</script>

<style>
</style>
