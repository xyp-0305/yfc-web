<template>
  <div class="base" ref="base">
    <v-banner :carouse-data="carouseData"></v-banner>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content">
            <div class="industryArticle">
              <div class="title">
                <span>行业文章</span>
                <a href="#/articles" target="_blank">查看更多</a>
                <!-- <router-link class="more" :to="{name:'articles'}">查看更多</router-link> -->
              </div>
              <div class="articleList">
                <ul>
                  <li
                    v-for="(item,index) in industryArticleData"
                    :key="index"
                    @click="articleDetail(item.Id,1)"
                  >
                    <p>
                      <span class="name">{{item.NewsTitle}}</span>
                      <span class="date">{{item.CreateTime}}</span>
                    </p>
                    <p class="content">{{item.NewsContent}}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div class="recommend">
              <el-tabs v-model="activeName1" @tab-click="handleClick1">
                <el-tab-pane label="推荐文章" name="first">
                  <ul>
                    <li
                      v-for="(item,index) in recommendArticleData"
                      :key="index"
                      @click="articleDetail(item.Id,1)"
                    >
                      <img src="@/assets/img/news/article.png" alt="图标">
                      <p>{{item.NewsTitle}}</p>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="推荐政策" name="second">
                  <ul>
                    <li
                      v-for="(item,index) in recommendPolicyData"
                      :key="index"
                      @click="articleDetail(item.Id,1)"
                    >
                      <img src="@/assets/img/news/article.png" alt="图标">
                      <p>{{item.NewsTitle}}</p>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="specialArticle">
      <div class="title">
        <span>专题文章</span>
        <!-- <a class="more" href>查看更多</a> -->
      </div>
      <div class="articleBox">
        <span class="prev">
          <i class="el-icon-arrow-left" @click="handleArticlePrev()"></i>
        </span>
        <div class="articleListBox">
          <ul>
            <li
              v-for="(item,index) in currentArticleData"
              :key="index"
              @click="articleDetail(item.Id,2)"
            >
              <div class="img">
                <img :src="HOST+item.LogoUrl" :alt="item.ThematicName">
              </div>
              <!-- <p class="name">{{item.ThematicName}}</p> -->
            </li>
          </ul>
        </div>
        <span class="next">
          <i class="el-icon-arrow-right" @click="handleArticleNext()"></i>
        </span>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content">
            <div class="industryQA">
              <div class="title">
                <span>行业问答</span>
                <a href="#/questions" target="_blank">查看更多</a>
                <!-- <router-link class="more" :to="{name:'questions'}">查看更多</router-link> -->
              </div>
              <div class="qaList">
                <ul>
                  <li v-for="(item,index) in qaData" :key="index" @click="qaDetail(item.Id)">
                    <img :src="HOST+item.CreateUserPhotoUrl" :alt="item.CreateUserName">
                    <div class="info">
                      <p class="name">{{item.QATitle}}</p>
                      <p class="content">{{item.QAContent}}</p>
                      <div class="number">
                        <p class="discuss" v-show="item.CommentatorNum>0">
                          <img
                            v-for="(item1,index1) in item.CommentatorPhotoUrl"
                            :src="HOST+item1"
                            alt="头像"
                            :key="index1"
                          >
                          <span>等{{item.CommentatorNum}}人参与讨论 | {{item.CommentatorTime}}</span>
                        </p>
                        <p class="time">
                          <span>
                            <img src="@/assets/img/news/question.png" alt="回答图标">
                            回答 {{item.CommentatorNum}}
                          </span>
                          <span>
                            <img src="@/assets/img/news/view.png" alt="浏览图标">
                            浏览 {{item.ViewingCount}}
                          </span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content">
            <div class="ranking">
              <el-tabs v-model="activeName2" @tab-click="handleClick2">
                <el-tab-pane label="周排名" name="first">
                  <ul>
                    <li v-for="(item,index) in rankingWeekData" :key="index" @click="qaDetail(item.Id)">
                      <i class="circle"></i>
                      <a href>{{item.QATitle}}</a>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="月排名" name="second">
                  <ul>
                    <li v-for="(item,index) in rankingMonthData" :key="index" @click="qaDetail(item.Id)">
                      <i class="circle"></i>
                      <a href>{{item.QATitle}}</a>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="cases">
      <div class="title">
        <span>精选案例</span>
        <a href="#/cases" target="_blank">查看更多</a>
        <!-- <router-link class="more" :to="{name:'cases'}">查看更多</router-link> -->
      </div>
      <div class="caseBox">
        <span class="prev">
          <i class="el-icon-arrow-left" @click="handleCasePrev()"></i>
        </span>
        <div class="caseListBox">
          <ul>
            <li v-for="(item,index) in currentCaseData" :key="index" @click="caseDetail(item.Id)">
              <div class="img">
                <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
              </div>
              <p class="name">{{item.CaseTitle}}</p>
            </li>
          </ul>
        </div>
        <span class="next">
          <i class="el-icon-arrow-right" @click="handleCaseNext()"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import vBanner from "./../common/Banner.vue";
import {
  getIndustryKnowUpList,
  getIndustryKnowledgeDownList
} from "../../api/api";
export default {
  data() {
    return {
      carouseData: [], // 轮播图
      industryArticleData: [], // 行业文章
      activeName1: "first", // 推荐板块默认展示
      recommendArticleData: [], // 推荐文章
      recommendPolicyData: [], // 推荐政策
      specialArticleData: [], // 专题文章
      currentArticleIndexs: [0, 1, 2, 3], // 专题文章当前展示的4个索引
      currentArticleData: [], // 当前展示的4个专题文章数据
      qaData: [], // 行业问答
      activeName2: "first", // 排行板块默认展示
      rankingWeekData: [], // 周排行
      rankingMonthData: [], // 月排行
      caseData: [], // 精选案例
      currentCaseIndexs: [0, 1, 2, 3], // 精选案例当前展示的4个索引
      currentCaseData: [] // 当前展示的4个精选案例数据
    };
  },
  created() {
    // 获取上半部分数据
    getIndustryKnowUpList().then(data => {
      // console.log(data)
      let { Message, ReturnCode, Result } = data;
      // console.log(Result);
      if (ReturnCode == 200) {
        let {
          CarouselImageList,
          IndustryArticle,
          RecommendArticle,
          RecommendPolicy,
          ThematicInfoList
        } = Result;
        // 轮播图
        // console.log(CarouselImageList)
        this.carouseData = CarouselImageList;
        // 行业文章
        // console.log(IndustryArticle)
        this.industryArticleData = IndustryArticle;
        // 推荐文章
        // console.log(RecommendArticle)
        this.recommendArticleData = RecommendArticle;
        // 推荐政策
        // console.log(RecommendPolicy)
        this.recommendPolicyData = RecommendPolicy;
        // 专题文章
        // console.log(ThematicInfoList)
        this.specialArticleData = ThematicInfoList;
        this.currentArticleData = ThematicInfoList;
      }
    });

    // 修改切换标签的宽度及底边样式
    this.$nextTick(() => {
      let obj = $(".el-tabs__nav");
      // console.log(obj)
      obj.map((index, item) => {
        // console.log(index)
        // console.log(item)
        item.style.width = "100%";
        let children = $(item).children(".el-tabs__item");
        // console.log(children)
        let length = children.length;
        // console.log(length)
        let border = $(item).children(".el-tabs__active-bar")[0];
        border.style.width = "calc(20px + " + (100 / length + "%");
        let positionX = border.style.transform;
        // console.log(positionX);
        let X = positionX.split("(")[1].split("p")[0];
        // console.log(index + ":" + X);
        let X1 = X - 20;
        // console.log(X1)
        border.style.transform = "translateX(" + X1 + "px)";

        // 设置标签宽度
        // 标签宽度 = 100%/标签个数
        for (let i = 0; i < length; i++) {
          // console.log(children[i])
          children[i].style.width = 100 / length + "%";
          children[i].style.padding = "0";
        }
      });
    });
  },
  methods: {
    // 推荐板块切换
    handleClick1(tab, event) {
      // console.log(tab, event);
    },
    // 专题文章前翻
    handleArticlePrev() {
      let arr = [],
        data = [];
      // this.currentArticleIndexs 包括4个专题文章 length=4
      this.currentArticleIndexs.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.specialArticleData.length - 1;
        }
        arr.push(e);
        data.push(this.specialArticleData[e]);
      });
      this.currentArticleIndexs = arr;
      this.currentArticleData = data;
    },
    // 专题文章后翻
    handleArticleNext() {
      let arr = [],
        data = [];
      // this.currentArticleIndexs 包括4个专题文章 length=4
      this.currentArticleIndexs.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.specialArticleData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.specialArticleData[e]);
      });
      this.currentArticleIndexs = arr;
      this.currentArticleData = data;
    },
    // 获取下半部分数据
    getLastData() {
      getIndustryKnowledgeDownList().then(data => {
        // console.log(data)
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let {
            IndustryQAResponesList,
            IndustryQAWeek,
            IndustryQAMonth,
            ClassicCaseList
          } = Result;
          // 行业问答
          // console.log(IndustryQAResponesList)
          this.qaData = IndustryQAResponesList;
          // 周排行
          // console.log(IndustryQAWeek)
          this.rankingWeekData = IndustryQAWeek;
          // 月排行
          // console.log(IndustryQAMonth)
          this.rankingMonthData = IndustryQAMonth;
          // 精选案例
          // console.log(ClassicCaseList)
          this.caseData = ClassicCaseList.Models;
          this.currentCaseData = ClassicCaseList.Models;
        }
      });
    },
    // 排名板块切换
    handleClick2(tab, event) {
      console.log(tab, event);
    },
    // 精选案例前翻
    handleCasePrev() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个精选案例 length=4
      this.currentCaseIndexs.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.caseData.length - 1;
        }
        arr.push(e);
        data.push(this.caseData[e]);
      });
      this.currentCaseIndexs = arr;
      this.currentCaseData = data;
    },
    // 精选案例后翻
    handleCaseNext() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个精选案例 length=4
      this.currentCaseIndexs.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.caseData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.caseData[e]);
      });
      this.currentCaseIndexs = arr;
      this.currentCaseData = data;
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
    // 跳转到问答详情
    qaDetail(id) {
      // console.log(id)
      let router = this.$router.resolve({path: "/qaDetail",query: { qaId: id }});
      window.open(router.href, "_blank");
    },
    // 跳转到案例详情
    caseDetail(id) {
      // console.log(id)
      let router = this.$router.resolve({
        path: "/caseDetail",
        query: { caseId: id }
      });
      window.open(router.href, "_blank");
    }
  },
  mounted() {
    // 使页面滚到顶部
    window.scrollTo(0, 0);

    // 监听滚动事件
    // 分段请求api接口
    const base = this.$refs.base;
    // console.log(home);
    let homeHeight = $(base).height(); // home页面的高度
    // console.log(homeHeight)
    let toTwo = false;
    let toTwoN = 0;
    window.addEventListener(
      "scroll",
      () => {
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop ||
          $(this).scrollTop;

        // console.log(scrollTop);
        if (Math.floor(scrollTop / 500) == 1) {
          toTwo = true;
          toTwoN += 1;
        }
        if (toTwo && toTwoN == 1) {
          // alert('获取下半部分数据')
          this.getLastData();
          toTwo = false;
          return;
        }
      },
      true
    );
  },
  components: {
    vBanner
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.el-tabs >>> .el-tabs__nav {
  width: $full;

  .el-tabs__item {
    font-size: $font-16;
  }
}

.base {
  color: $color-black;
  font-size: $font-14;
  padding-bottom: 20px;

  .content {
    margin-top: 20px;
  }

  .industryArticle {
    background-color: $color-white;
    padding: 20px 0;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      border: none;
      padding: 0 20px;

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

    .articleList {
      width: $full;
      margin-top: 8px;

      ul {
        width: $full;

        li {
          height: 115px;
          padding: 10px 20px;
          overflow: hidden;
          text-align: left;
          border-top: solid 1px $border-color-grey;
          cursor: pointer;

          p {
            color: $color-grey;
            line-height: 30px;
          }

          .content {
            height: 75px;
            font-size: $font-12;
            line-height: 25px;
            overflow: hidden;
            margin-top: 0;
          }

          p:first-child {
            display: flex;
            margin-bottom: 10px;

            .name {
              flex: 1;
              height: 30px;
              color: $color-black;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .date {
              flex: 0 0 100px;
              width: 100px;
              font-size: $font-12;
              text-align: right;
            }
          }
        }

        li:hover {
          p {
            .name {
              color: $link-hover;
            }
          }
        }
      }
    }
  }

  .recommend {
    background-color: $color-white;
    padding: 10px 0;

    ul {
      width: $full;

      li {
        padding: 0 15px;
        height: 30px;
        font-size: $font-12;
        line-height: 30px;
        text-align: left;
        cursor: pointer;

        img {
          width: 12px;
          height: 12px;
          vertical-align: top;
          margin-top: 9px;
          margin-right: 3px;
        }

        p {
          display: inline-block;
          width: 90%;
          height: 30px;
          color: $color-black;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        p:hover {
          color: $link-hover;
        }
      }
    }
  }

  .specialArticle {
    background-color: $color-white;
    margin-top: 20px;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      border: none;
      padding: 20px 20px 0 20px;

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

    .articleBox {
      padding: 10px;
      margin: 10px 0;
      border-top: solid 1px $border-color-grey;
      font-size: 0;

      .prev, .next {
        display: inline-block;
        vertical-align: top;
        margin-top: 70px;
        cursor: pointer;

        i {
          font-size: 40px;
          color: $color-grey;
        }
      }

      .prev:hover, .next:hover {
        i {
          color: $color-blue;
        }
      }

      .articleListBox {
        display: inline-block;
        width: 1100px;
        height: auto;
        overflow: hidden;
      }

      ul {
        width: auto;
        height: auto;
        font-size: 0;

        li {
          display: inline-block;
          width: 240px;
          height: 160px;
          // border: $border-grey;
          border-radius: 10px;
          overflow: hidden;
          margin: 5px 10px;
          cursor: pointer;

          .img {
            position: relative;
            width: $full;
            height: $full;

            // overflow: hidden;
            img {
              width: $full;
              height: $full;
              transition: all 0.5s ease-out;
              transform: scale(1, 1);
            }

            .info {
              display: none;
              position: absolute;
              left: 0;
              top: 0;
              width: calc(100% - 20px);
              padding: 5px 10px;
              background-color: rgba(0, 0, 0, 0.3);

              p {
                color: $color-white;
                font-size: $font-12;
                line-height: 25px;
                text-align: left;
              }
            }
          }

          .name {
            display: inline-block;
            width: calc(100% - 20px);
            height: 40px;
            padding: 0 10px;
            font-size: $font-16;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        li:hover {
          img {
            transform: scale(1.2, 1.2);
          }

          .name {
            color: $link-hover;
          }
        }
      }
    }
  }

  .industryQA {
    background-color: $color-white;
    padding: 20px 0;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      border: none;
      padding: 0 20px;

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

    .qaList {
      width: $full;
      margin-top: 8px;

      ul {
        width: $full;

        li {
          display: flex;
          height: 120px;
          padding: 10px 20px;
          overflow: hidden;
          text-align: left;
          border-top: solid 1px $border-color-grey;
          cursor: pointer;

          img {
            flex: 0 0 100px;
            width: 100px;
            height: 100px;
            border-radius: 50%;
            vertical-align: top;
            overflow: hidden;
            margin-top: 10px;
          }

          .info {
            flex: 1;
            height: $full;
            margin-left: 20px;

            p {
              color: $color-grey;
              line-height: 30px;
            }

            .name {
              color: $color-black;
              margin-bottom: 5px;
            }

            .content {
              font-size: $font-12;
              line-height: 25px;
              text-indent: 2em;
              height: 50px;
              overflow: hidden;
              margin-top: 0;
            }

            .number {
              font-size: $font-12;
              margin-top: 5px;

              .discuss {
                display: inline-block;
                width: 400px;
                text-align: right;

                img {
                  width: 30px;
                  height: 30px;
                  margin-top: 0;
                }

                span {
                  margin-left: 10px;
                }
              }

              .time {
                display: inline-block;
                float: right;

                span {
                  display: inline-block;
                  width: 90px;
                  margin-left: 10px;

                  img {
                    width: 20px;
                    height: 15px;
                    border-radius: 0;
                    vertical-align: top;
                    margin-top: 8px;
                  }
                }
              }
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

  .ranking {
    background-color: $color-white;
    padding: 10px 0 8px 0;

    ul {
      width: $full;

      li {
        padding: 0 15px;
        height: 30px;
        color: $color-grey;
        font-size: $font-12;
        line-height: 30px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        i {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: #CCCCCC;
          border-radius: 50%;
          vertical-align: middle;
          margin-bottom: 2px;
          margin-right: 3px;
        }

        a {
          color: $color-black;
        }

        a:hover {
          color: $link-hover;
        }
      }

      li:nth-child(1) {
        .circle {
          background-color: #FF6F00;
        }
      }

      li:nth-child(2) {
        .circle {
          background-color: #FFA40B;
        }
      }

      li:nth-child(3) {
        .circle {
          background-color: #F8E31A;
        }
      }
    }
  }

  .cases {
    background-color: $color-white;
    margin-top: 20px;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 20px 20px 0 20px;

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

    .caseBox {
      padding: 10px;
      margin: 10px 0;
      border-top: solid 1px $border-color-grey;
      font-size: 0;

      .prev, .next {
        display: inline-block;
        vertical-align: top;
        margin-top: 85px;
        cursor: pointer;

        i {
          font-size: 40px;
          color: $color-grey;
        }
      }

      .prev:hover, .next:hover {
        i {
          color: $color-blue;
        }
      }

      .caseListBox {
        display: inline-block;
        width: 1100px;
        height: 210px;
        overflow: hidden;
      }

      ul {
        width: auto;
        height: $full;
        font-size: 0;

        li {
          display: inline-block;
          width: 240px;
          height: auto;
          border: $border-grey;
          border-radius: 10px;
          overflow: hidden;
          margin: 5px 10px;
          cursor: pointer;

          .img {
            position: relative;
            width: $full;
            height: 160px;
            overflow: hidden;

            img {
              width: $full;
              height: $full;
              transition: all 0.5s ease-out;
              transform: scale(1, 1);
            }

            .info {
              display: none;
              position: absolute;
              left: 0;
              top: 0;
              width: calc(100% - 20px);
              padding: 5px 10px;
              background-color: rgba(0, 0, 0, 0.3);

              p {
                color: $color-white;
                font-size: $font-12;
                line-height: 25px;
                text-align: left;
              }
            }
          }

          .name {
            display: inline-block;
            width: calc(100% - 20px);
            height: 40px;
            padding: 0 10px;
            font-size: $font-16;
            line-height: 40px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        li:hover {
          img {
            transform: scale(1.2, 1.2);
          }

          .name {
            color: $link-hover;
          }
        }
      }
    }
  }
}
</style>
