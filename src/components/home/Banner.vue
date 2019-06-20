<template>
  <div class="banner">
    <div class="banner-box">
      <el-carousel :interval="3000" arrow="always" height="100%">
        <el-carousel-item v-for="(item, index) in carouselData" :key="index">
          <img :src="HOST+item.ImageUrl" :alt="item.Id" @click="handleRoute(item.LinkUrl)">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="banner-right">
      <div class="title">精准服务</div>
      <ul>
        <li v-for="(item,index) in services" :key="index">
          <a href="#">
            <img :src="item.src" :alt="item.name">
            <div class="info">
              <p class="name">{{item.name}}</p>
              <p class="desc">{{item.desc}}</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import {} from "../../api/api";
export default {
  props:["carouselData"],
  data() {
    return {
      banners: [
        {
          id: "1",
          name: "特色小镇",
          src: require("@/assets/img/banner-1.jpg")
        },
        {
          id: "2",
          name: "特色小镇与田园综合体",
          src: require("@/assets/img/banner-2.jpg")
        },
        {
          id: "3",
          name: "游学项目",
          src: require("@/assets/img/banner-3.jpg")
        }
      ],
      services: [
        {
          id: 1,
          name: "行业问答",
          src: require("@/assets/img/home/qa.png"),
          desc: "行业快速问答"
        },
        {
          id: 2,
          name: "一键服务",
          src: require("@/assets/img/home/service.png"),
          desc: "一键提供服务"
        },
        {
          id: 3,
          name: "一键方案",
          src: require("@/assets/img/home/plan.png"),
          desc: "一键出方案"
        },
        {
          id: 4,
          name: "快速咨询",
          src: require("@/assets/img/home/ask.png"),
          desc: "快速咨询问题"
        }
      ],
      lun: []
    };
  },
  created() {
    // console.log(this.HOST);
    // 获取轮播图
    // getCarouselImageList().then(data => {
    //   console.log(data);
    // });
  },
  methods:{
    // 点击轮播图跳转
    handleRoute(url){
      console.log(url)
      // this.$router.push(url)
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.banner {
  display: flex;
  width: $full;
  height: 440px;
  padding: 0;
  color: $color-white;

  .banner-box {
    flex: 1;
    height: $full;
    margin-left: 200px;

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

  .banner-right {
    flex: 0 0 220px;
    width: 220px;

    .title {
      width: $full;
      height: 49px;
      line-height: 49px;
      font-size: 18px;
      font-weight:700;
      background-color: $link-hover;
    }

    ul {
      li {
        width: $full;
        height: 97px;
        background-color: $background-blue;
        text-align: left;
        margin-top: 1px;

        a {
          display: inline-block;
          width: $full;
          height: $full;
          color: $color-white;
          text-decoration: none;

          img {
            display: inline-block;
            width: 30px;
            height: 30px;
            margin: 33px 30px;
          }

          .info {
            display: inline-block;
            vertical-align:top;
            margin-top:20px;

            p {
              line-height: 30px;
              font-weight: 700;
            }

            .name {
              font-size: $font-16;
            }

            .desc {
              font-size: $font-14;
            }
          }
        }
      }

      li:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
