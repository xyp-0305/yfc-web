<template>
<div class="banner">
    <el-carousel :interval="3000" arrow="always" height="100%">
      <el-carousel-item v-for="(item, index) in carouseData" :key="index">
        <img :src="HOST+item.ImageUrl" :alt="item.Id">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
 export default {
  props:["carouseData"],
  data() {
    return {
        
    };
  },
 components: {

 }
 }
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';
.banner {
    width:$full;
  height: 350px;;

    .el-carousel {
      width: $full;
      height: $full;

      .el-carousel__container {
        .el-carousel__item {
          width: $full;
          height: $full;

          img {
            display: inline-block;
            width: $full;
            height: $full;
          }
        }
      }
    }
}
</style>
