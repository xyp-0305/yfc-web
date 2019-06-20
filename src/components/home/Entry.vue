<template>
  <div class="entry">
    <el-row :gutter="20" justify="space-between">
      <el-col :span="6" v-for="(item,index) in entryList" :key="index">
        <div class="grid-content">
          <div class="main">
            <div class="info">
              <p class="name">{{item.name}}</p>
              <p class="line"></p>
              <p>{{item.desc}}</p>
            </div>
            <img :src="item.image" alt="图片">
          </div>
          <div class="links">
            <a v-for="(item,index) in item.link" :key="index">{{item.name}}</a>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      entryList: [
        {
          id: 1,
          name: "项目方",
          desc: "发布任务 寻找设计师合作",
          image:require("./../../assets/img/home/entry-1.png"),
          link: [
            {
              id: 1,
              name: "推荐设计师",
              url: ""
            },
            {
              id: 2,
              name: "招标征集",
              url: ""
            },
            {
              id: 3,
              name: "定制方案",
              url: ""
            },
            {
              id: 4,
              name: "发布竞赛",
              url: ""
            }
          ]
        },
        {
          id: 2,
          name: "行业专家",
          desc: "在投标中成长 实践中学习 点评中成名",
          image:require("./../../assets/img/home/entry-2.png"),
          link: [
            {
              id: 1,
              name: "媒体宣传",
              url: ""
            },
            {
              id: 2,
              name: "作品推广",
              url: ""
            },
            {
              id: 3,
              name: "调研活动",
              url: ""
            },
            {
              id: 4,
              name: "建筑方案",
              url: ""
            }
          ]
        },
        {
          id: 3,
          name: "联盟专委会",
          desc: "让方案承载产品应用 让品牌借助方案宣传",
          image:require("./../../assets/img/home/entry-3.png"),
          link: [
            {
              id: 1,
              name: "绿色建材推广",
              url: ""
            },
            {
              id: 2,
              name: "线下展会合作",
              url: ""
            },
            {
              id: 3,
              name: "活动赞助宣传",
              url: ""
            }
          ]
        },
        {
          id: 4,
          name: "政府机构",
          desc: "政府招商引资",
          image:require("./../../assets/img/home/entry-4.png"),
          link: [
            {
              id: 1,
              name: "投资",
              url: ""
            },
            {
              id: 2,
              name: "看项目",
              url: ""
            },
            {
              id: 3,
              name: "政策",
              url: ""
            }
          ]
        }
      ]
    };
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.entry {
  width: $full;

  .el-row {
    margin-bottom: 20px;

    .el-col {
      .grid-content {
        height: auto;
        border: $border-blue;
        border-radius: 5px 5px 0px 0px;
        background-color:$background-white;
        box-sizing:border-box;

        .main {
          display: flex;
          height: 110px;
          padding: 10px;

          .info {
            flex: 1;
            text-align:left;

            p {
              display:block;
              font-size: 14px;
              line-height: 30px;
              text-align: left;
            }

            .name {
              color:$color-blue;
              font-size: $font-22;
              line-height: 40px;
            }
            .line{
              width:25px;
              border:solid 2px $color-blue;
              margin-bottom:10px;
            }
          }

          img {
            flex: 0 0 80px;
            width: 80px;
            height: 100px;
          }
        }

        .links {
          height:30px;
          padding:0 10px;
          line-height: 30px;
          border-top: solid 2px $color-blue;
          text-align:left;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          a{
              margin-right:5px;
              cursor:pointer;
          }
          a:hover{
              color:$link-hover
          }
        }
      }
      
      .grid-content:hover{
        box-shadow:0 0 10px $color-blue;
      }
      
    }
    .el-col:nth-child(odd){
      .grid-content{
        border-color:$color-orange;
        .main{
          .info{
            .name{
              color:$color-orange;
            }
            .line{
              border:solid 2px $color-orange;
            }
          }
        }

        .links{
          border-color:$color-orange;
        }
      }
    }
    .el-col:nth-child(odd):hover{
      .grid-content{
        box-shadow:0 0 10px $color-orange;
      }
    }
  }
}
</style>
