<template>
  <div class="svip">
    <el-row>
      <el-col :span="4">{{name1}}</el-col>
      <el-col :span="20">内容</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name1: "侧边栏"
    };
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
</style>
