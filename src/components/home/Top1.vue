<template>
  <div class="top">
    <div class="top-logo">
      <img src="@/assets/img/logo-lianmeng.png" alt="联盟">
      <span>联盟头条</span>
    </div>
    <div class="tops">
      <el-row :gutter="12">
        <el-col :span="8" v-for="(item,index) in tops" :key="index">
          <el-card shadow="hover">
            <a href="#">
              <img :src="item.image" :alt="item.title">
              <div class="top-info">
                <p class="title">{{item.title}}</p>
                <p class="desc">{{item.desc}}</p>
              </div>
            </a>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tops: [
        {
          id: 1,
          title: "事件标题1",
          image: require("@/assets/img/top-1.jpg"),
          desc: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述"
        },
        {
          id: 2,
          title: "事件标题2",
          image: require("@/assets/img/top-1.jpg"),
          desc: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述"
        },
        {
          id: 3,
          title: "事件标题3",
          image: require("@/assets/img/top-1.jpg"),
          desc: "事件描述事件描述事件描述事件描述事件描述事件描述事件描述"
        }
      ]
    };
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';
.top {
  display: flex;
  width: calc(100% - 120px);
  height: auto;
  padding: 10px 60px;

  .top-logo {
    flex: 0 0 200px;
    width: 200px;
    height: 130px;
    font-size: 0;

    img {
      height:130px;
    }

    span {
      display: inline-block;
      width: 60px;
      line-height: 30px;
      font-size: $font-24;
      font-weight: 700;
      vertical-align: top;
      margin-top: 35px;
    }
  }

  .tops {
    flex: 1;
    padding: 5px 0;

    .el-row {
      margin: 0 !important;

      .el-col {
        // flex:1;
        padding: 0 !important;

        .el-card {
            
          a {
              display: flex;
              width: $full;
              height: $full;
              color: $color-black;
              overflow:hidden;

              img {
                flex: 0 0 110px;
                width: 110px;
                height: 80px;
              }

              .top-info {
                flex: 1;
                height: 80px;
                margin-left: 10px;
                font-size: 0;

                p {
                  display: inline-block;
                  width: $full;
                  text-align: left;
                  overflow: hidden;
                }

                .title {
                  font-size: $font-18;
                  line-height: 40px;
                }

                .desc {
                  font-size: $font-12;
                  line-height: 20px;
                  color: $color-grey;
                }
              }
            }
        }
      }
    }
  }
}
</style>
