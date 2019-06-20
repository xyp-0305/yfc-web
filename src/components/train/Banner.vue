<template>
  <div class="banner">
    <el-carousel :interval="3000" type="card" arrow="always" height="100%">
      <el-carousel-item v-for="(item, index) in carouseData" :key="index">
        <img :src="HOST+item.ImageUrl" :alt="item.Id">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import { getCarouselImageList } from "../../api/api";
export default {
  props:["carouseData"],
  data() {
    return {
        
    };
  },
  // created() {
  //   const params = {Body:1}
  //   getCarouselImageList().then(data => {
  //     console.log(data);
  //     let { Message, ReturnCode, Result } = data;
  //     console.log(ReturnCode);
  //     if (ReturnCode !== 200) {
  //       this.$message({ message: Message, type: "error" });
  //     } else {
  //       console.log(Result);
  //     }
  //   });
  // },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';
.banner {
  // padding:10px;
  height: auto;
  background-color: #f3ece9;

  .el-carousel {
    height: 400px;
    padding: 30px 0;

    .el-carousel__container {
      .el-carousel__item {
        width: 800px;
        height: 400px;

        img {
          display: inline-block;
          width: $full;
          height: $full;
        }
      }
    }
  }

  @media screen and (min-width: 1740px) {
    .el-carousel {
      height: 400px;
      padding: 30px 0;

      .el-carousel__container {
        .el-carousel__item {
          width: 800px;
          height: 400px;

          img {
            display: inline-block;
            width: $full;
            height: $full;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1500px) and (max-width: 1739px) {
    .el-carousel {
      height: 350px;
      padding: 30px 0;

      .el-carousel__container {
        .el-carousel__item {
          width: 700px;
          height: 350px;

          img {
            display: inline-block;
            width: $full;
            height: $full;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1200px) and (max-width: 1499px) {
    .el-carousel {
      height: 300px;
      padding: 30px 0;

      .el-carousel__container {
        .el-carousel__item {
          width: 600px;
          height: 300px;

          img {
            display: inline-block;
            width: $full;
            height: $full;
          }
        }
      }
    }
  }
}
</style>
