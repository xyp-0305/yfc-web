<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="18">
        <div class="grid-content">
          <div class="article">
            <p class="title">{{articleTitle}}</p>
            <p>
              <span v-show="articleAuthor">{{articleAuthor}}</span>
              <span>{{articleTime}}</span>
              <span class="shareList">
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
              </span>
              <span class="share">
                <img src="@/assets/img/news/icon-share.png" alt="分享">分享
              </span>
            </p>
            <div class="articleContent" v-html="articleContent"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content">
          <div class="listBox">
            <div class="title">
              <span v-if="authorType==2">专家介绍</span>
              <span v-else>服务商介绍</span>
            </div>
            <div class="info">
              <img :src="HOST+authorPhoto" :alt="articleAuthor">
              <p class="name">{{articleAuthor}}</p>
              <p class="introduce">{{authorIntroduce}}</p>
            </div>
            <div class="title">
              <span>他的文章</span>
            </div>
            <div class="articleList">
              <ul>
                <li
                  v-for="(item,index) in articleListData"
                  :key="index"
                  @click="articleDetail(item.Id,1)"
                >
                  <p class="title">{{item.NewsTitle}}</p>
                  <p>
                    <img src="@/assets/img/news/view.png" alt="浏览">
                    <span>{{item.ViewingCount}}</span>
                    <span class="time">{{item.CreateTime}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="relativeBox" v-show="articleType==2">
            <div class="title">
              <span>相关专题</span>
            </div>
            <div class="relativeList">
              <ul>
                <li
                  v-for="(item,index) in relativeListData"
                  :key="index"
                  @click="articleDetail(item.Id,3)"
                >
                  <p class="title">{{item.NewsTitle}}</p>
                  <p>
                    <img src="@/assets/img/news/view.png" alt="浏览">
                    <span>{{item.ViewingCount}}</span>
                    <span class="time">{{item.CreateTime}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getNewsInfo } from "../../api/api";
export default {
  data() {
    return {
      articleTitle: "", // 名称
      articleAuthor: "", // 作者
      articleTime: "", // 发表时间
      selectWB: false, // 微博选择状态
      selectQQ: false, // QQ选择状态
      selectWX: false, // 微信选择状态
      articleContent: "", // 内容
      authorType: 0, // 作者类型（2、专家，3、服务商）
      authorPhoto: "", // 作者头像
      authorIntroduce: "", // 介绍
      articleListData: [], // 他的文章
      articleType: 1, // 文章类型（1、普通文章详情2、专题文章详情）
      relativeListData: [] // 相关专题
    };
  },
  created() {
    // 获取行业文章详情
    // console.log(this.$route);
    let articleId = this.$route.query.articleId;
    let typeId = this.$route.query.typeId;
    this.getArticleInfo(articleId, typeId);
  },
  methods: {
    // 获取行业文章详情
    getArticleInfo(articleId, typeId) {
      const params = {
        Body: {
          ConditionId: articleId,
          TypeId: typeId
        }
      };
      getNewsInfo(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.articleTitle = Result.NewsTitle;
          this.articleAuthor = Result.AuthorName;
          this.articleTime = Result.CreateTime;
          this.articleContent = Result.NewsContent;
          this.authorPhoto = Result.FacialPhotoUrl;
          this.authorIntroduce = Result.Introduction;
          this.authorType = Result.UserType;
          this.articleListData = Result.IndustryNewsModelList;
          this.articleType = Result.ArticleType;
          this.relativeListData = Result.IndustryNewsSpecialList;
        }
      });
    },
    // 获取并渲染相关详情
    articleDetail(id, typeId) {
      // console.log(id)
      this.getArticleInfo(id, typeId);
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

  .article {
    min-height: 1180px;
    color: $color-grey;
    background-color: $color-white;
    padding: 10px 20px;

    >p {
      line-height: 30px;
      text-align: left;

      span {
        margin-right: 20px;
      }

      .share {
        float: right;
        color: $color-grey;
        cursor: pointer;

        img {
          margin-right: 10px;
        }
      }

      .shareList {
        float: right;
        margin-right: 0;

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
    }

    .title {
      font-size: $font-16;
      color: $color-black;
    }

    .articleContent {
      margin-top: 20px;
      color: $color-grey;
      line-height: 25px;
      text-align: left;
    }
  }

  .listBox {
    min-height: 500px;
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

    .info {
      padding: 0 20px;
      border-top: solid 1px $border-color-grey;

      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-top: 10px;
      }

      .name {
        font-size: $font-16;
        line-height: 30px;
        margin: 10px 0;
      }

      .introduce {
        color: $color-grey;
        font-size: $font-14;
        line-height: 25px;
        text-align: left;
        margin-bottom: 10px;
      }
    }

    .articleList {
      ul {
        li {
          width: $full;
          color: $color-grey;
          font-size: $font-12;
          line-height: 30px;
          margin-bottom: 10px;
          cursor: pointer;

          p {
            padding: 0 20px;
            text-align: left;
          }

          .title {
            height: 30px;
            color: $color-black;
            font-size: $font-14;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            vertical-align: top;
            margin-top: 8px;
            margin-right: 5px;
          }

          .time {
            float: right;
          }
        }

        li:hover {
          .title {
            color: $link-hover;
          }
        }
      }
    }
  }

  .relativeBox {
    min-height: 200px;
    margin-top: 20px;
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

    .relativeList {
      ul {
        li {
          width: $full;
          color: $color-grey;
          font-size: $font-12;
          line-height: 30px;
          margin-bottom: 10px;
          cursor: pointer;

          p {
            padding: 0 20px;
            text-align: left;
          }

          .title {
            height: 30px;
            color: $color-black;
            font-size: $font-14;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          img {
            vertical-align: top;
            margin-top: 8px;
            margin-right: 5px;
          }

          .time {
            float: right;
          }
        }

        li:hover {
          .title {
            color: $link-hover;
          }
        }
      }
    }
  }
}
</style>
