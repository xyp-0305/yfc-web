<template>
  <div class="industry">
    <img :src="industriesData.companyLogo" :alt="industriesData.companyName">
    <p>{{industriesData.companyName}}</p>
  </div>
</template>

<script>
export default {
  props: ["industriesData"],
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
.industry {
    padding:10px;
  img {
    height:140px;
  }
  p{
      display:inline-block;
      width:100%;
      margin:0;
      line-height:30px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
  }
}
</style>
