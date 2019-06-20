<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content">
          <div class="caseHead">
            <p class="title">
              <span class="name">{{caseTitle}}</span>
              <span class="share">
                <img src="@/assets/img/news/icon-share.png" alt="分享">分享
              </span>
            </p>
            <div class="info">
              <div class="infoLeft">
                <p>项目类型：{{caseType}}</p>
                <p>项目面积：{{caseArea}}亩</p>
                <p>项目投资额：{{casePrice}}万</p>
                <p>项目地点：{{caseAddress}}</p>
                <p>项目时间：{{caseStartTime}} -- {{caseEndTime}}</p>
              </div>
              <div class="infoRight">
                <div class="shareList">
                  <i
                    :class="selectWB?'iconfont icon-weibo1':'iconfont icon-weibo'"
                    @mousemove="selectWB=true"
                    @mouseout="selectWB=false"
                  ></i>
                  <i
                    :class="selectQQ?'iconfont icon-qq1':'iconfont icon-qq'"
                    @mousemove="selectQQ=true"
                    @mouseout="selectQQ=false"
                  ></i>
                  <i
                    :class="selectWX?'iconfont icon-weixin1':'iconfont icon-weixin'"
                    @mousemove="selectWX=true"
                    @mouseout="selectWX=false"
                  ></i>
                </div>
                <div class="view">
                  <img src="@/assets/img/news/view-white.png" alt="浏览">
                  浏览（{{viewCount}}）
                </div>
              </div>
            </div>
          </div>
          <div class="caseBody">
            <div class="title">
              <span>项目简介</span>
            </div>
            <div class="caseContent" v-html="caseContent"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="listBox">
            <div class="classicCaseList">
              <div class="title">
                <span>精选案例</span>
              </div>
              <div class="caseList">
                <ul>
                  <li
                    v-for="(item,index) in classicCaseData"
                    :key="index"
                    @click="caseDetail(item.Id)"
                  >
                    <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                    <div class="info">
                      <p class="name">{{item.CaseTitle}}</p>
                      <p class="address">项目地点：{{item.ProjectPlaceName}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="hotNewList">
              <div class="title">
                <span>热门专题</span>
                <router-link class="more" :to="{name:'cases'}">查看更多</router-link>
              </div>
              <div class="newList">
                <ul>
                  <li
                    v-for="(item,index) in hotNewData"
                    :key="index"
                    @click="articleDetail(item.Id,2)"
                  >
                    <div class="img">
                      <img :src="HOST+item.LogoUrl" :alt="item.ThematicName">
                      <!-- <p class="name">名称</p> -->
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getClassicCaseInfo } from "../../api/api";

export default {
  data() {
    return {
      caseTitle: "", // 项目名称
      caseType: "", // 项目类型
      caseArea: "", // 项目面积
      casePrice: "", // 项目投资额
      caseAddress: "", // 项目地点
      caseStartTime: "", // 项目启动时间
      caseEndTime: "", // 项目结束时间
      viewCount: 0, // 浏览次数
      selectWB: false, // 微博选择状态
      selectQQ: false, // QQ选择状态
      selectWX: false, // 微信选择状态
      caseContent: "", // 案例内容
      classicCaseData: [], // 精选案例
      hotNewData: [] // 热门专题
    };
  },
  created() {
    // 获取案例详情
    //  console.log(this.$route.params)
    let caseId = this.$route.query.caseId;
    this.getCaseInfo(caseId);
  },
  methods: {
    // 获取单条案例
    getCaseInfo(caseId) {
      //   console.log(caseId);
      const params = {
        Body: caseId
      };
      getClassicCaseInfo(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          // 案例名称
          this.caseTitle = Result.CaseTitle;
          // 项目类型
          this.caseType = Result.ProjectTypeName;
          // 项目面积
          this.caseArea = Result.ProjectArea;
          // 项目投资额
          this.casePrice = Result.InvestmentAmount;
          // 项目地点
          this.caseAddress = Result.ProjectPlaceName;
          // 项目开始时间
          this.caseStartTime = Result.StartTime;
          // 项目竣工时间
          this.caseEndTime = Result.CompletionTime;
          // 浏览量
          this.viewCount = Result.ViewingCount;
          // 项目内容简介
          this.caseContent = Result.CaseContent;

          // 精选案例
          this.classicCaseData = Result.ChoicenessCaseList;
          // 热门专题
          this.hotNewData = Result.ThematicInfoList;
        }
      });
    },
    // 跳转到行业文章详情
    articleDetail(id, typeId) {
      // console.log(id)
      let router = this.$router.resolve({
        path: "/articleDetail",
        query: { articleId: id, typeId: typeId }
      });
      window.open(router.href, "_blank");
    },
    // 获取并渲染案例内容
    caseDetail(id) {
      // console.log(id)
      this.getCaseInfo(id);
      // 使页面滚到顶部
      window.scrollTo(0, 0);
    }
  },
  mounted() {
    // 使页面滚到顶部
    window.scrollTo(0, 0);
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.content {
  width: $full;
  padding: 20px 0;

  .caseHead {
    height: auto;
    font-size: $font-14;
    padding: 10px 20px;
    background-color: $color-white;

    p {
      line-height: 30px;
    }

    .title {
      color: $color-black;
      font-size: $font-16;
      text-align: left;
      padding-right: 10px;

      .name {
        display: inline-block;
        width: 700px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .share {
        float: right;
        color: $color-grey;
        cursor: pointer;

        img {
          margin-right: 10px;
        }
      }
    }

    .info {
      display: flex;
      margin-top: 20px;

      .infoLeft {
        flex: 1;
        height: auto;
        text-align: left;
      }

      .infoRight {
        flex: 0 0 150px;
        width: 150px;
        height: auto;
        color: $color-grey;
        text-align: right;
        margin-top: 20px;

        .shareList {
          padding-right: 10px;

          i {
            color: #C2C2C2;
            font-size: 30px;
            margin-left: 10px;
            cursor: pointer;
          }

          .icon-weibo1 {
            color: #E15959;
          }

          .icon-qq1 {
            color: #33A9DB;
          }

          .icon-weixin1 {
            color: #46B16B;
          }
        }

        .view {
          font-size: $font-12;
          margin-top: 70px;

          img {
            margin-top: 2px;
            vertical-align: top;
            margin-right: 5px;
          }
        }
      }
    }
  }

  .caseBody {
    min-height: 1137px;
    background-color: $color-white;
    margin-top: 20px;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      border: none;
      padding: 10px 20px;

      span {
        border-left: solid 3px $color-blue;
        padding-left: 10px;
      }

      a {
        float: right;
        color: $color-blue;
      }

      a:hover {
        color: $link-hover;
      }
    }

    .caseContent {
      padding: 10px 20px;
      border-top: solid 1px $border-color-grey;
      color: $color-grey;
      line-height: 25px;
      text-align: left;
    }
  }

  .listBox {
    width: $full;

    .classicCaseList {
      height: auto;
      background-color: $color-white;

      .title {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        border: none;
        padding: 10px 20px;

        span {
          border-left: solid 3px $color-blue;
          padding-left: 10px;
        }

        a {
          float: right;
          color: $color-blue;
        }

        a:hover {
          color: $link-hover;
        }
      }

      .caseList {
        width: $full;

        ul {
          li {
            display: flex;
            border-top: solid 1px $border-color-grey;
            padding: 20px;
            cursor: pointer;

            img {
              flex: 0 0 100px;
              width: 100px;
              height: 80px;
            }

            .info {
              flex: 1;
              margin-left: 10px;

              p {
                line-height: 25px;
                text-align: left;
              }

              .name {
                height: 50px;
                overflow: hidden;
                font-size: $font-14;
                margin-bottom: 13px;
              }

              .address {
                color: $color-grey;
                font-size: $font-12;
                line-height: 20px;
              }
            }
          }

          li:hover {
            .name {
              color: $link-hover;
            }
          }
        }
      }
    }

    .hotNewList {
      height: auto;
      background-color: $color-white;
      margin-top: 20px;

      .title {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        border: none;
        padding: 10px 20px;

        span {
          border-left: solid 3px $color-blue;
          padding-left: 10px;
        }

        a {
          float: right;
          color: $color-blue;
        }

        a:hover {
          color: $link-hover;
        }
      }

      .newList {
        width: $full;
        padding-bottom: 4px;

        ul {
          li {
            border-top: solid 1px $border-color-grey;
            padding: 20px;
            cursor: pointer;

            .img {
              position: relative;
              width: $full;
              height: 155px;
              overflow: hidden;

              img {
                width: $full;
                height: $full;
                transition: all 0.5s ease-out;
                transform: scale(1, 1);
              }

              .name {
                position: absolute;
                left: 0;
                bottom: 0;
                height: 30px;
                width: calc(100% - 20px);
                padding: 0 10px;
                color: $color-white;
                background-color: rgba(0, 0, 0, 0.5);
                line-height: 30px;
                overflow: hidden;
                // font-size: $font-18;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }

          li:hover {
            img {
              transform: scale(1.2, 1.2);
            }
          }
        }
      }
    }
  }
}
</style>
