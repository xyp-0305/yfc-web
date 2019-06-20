<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content">
          <div class="typeBox">
            <div class="title">
              <span>一站式服务类型</span>
            </div>
            <div class="typeList">
              <p class="all">
                <span :class="{active:qaTypeId == 0}" @click="handleSelect(0)">全部</span>
              </p>
              <ul v-for="(item,index) in typeListData" :key="index">
                <li>
                  <p class="title">{{item.Name}}</p>
                  <p>
                    <span
                      :class="{active:qaTypeId==item1.Id}"
                      v-for="(item1,index1) in item.ColumnList"
                      :key="index1"
                      @click="handleSelect(item1.Id)"
                    >{{item1.Name}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="grid-content">
          <div class="listBox">
            <div class="title">
              <span>{{qaTypeName}}</span>
            </div>
            <div class="qaList">
              <ul>
                <li
                  v-for="(item,index) in qaListData"
                  :key="index"
                  @click="qaDetail(item.Id)"
                >
                  <p class="title">{{item.QATitle}}</p>
                  <p class="tag">
                    <span>{{item.TypeName}}</span>
                  </p>
                  <p class="desc">{{item.QAContent}}</p>
                  <p>
                    <span>
                      <img :src="HOST+item.CreateUserPhotoUrl" :alt="item.CreateUserName">
                      {{item.CreateUserName}}
                    </span>
                    <span>
                      <img src="@/assets/img/news/view.png" alt="浏览">
                      浏览 {{item.ViewingCount}}
                    </span>
                    <span>
                      <img src="@/assets/img/news/question.png" alt="回答">
                      回答 {{item.CommentatorNum}}
                    </span>
                    <span>
                      <img src="@/assets/img/questions/time.png" alt="发布时间">
                      {{item.CreateTime}}
                    </span>
                  </p>
                </li>
              </ul>
            </div>
            <div class="page">
              <el-pagination
                background
                :current-page="pageIndex"
                layout="prev, pager, next"
                :page-size="5"
                :total="qaListTotal"
                @current-change="handlePageChange"
              ></el-pagination>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div class="rightBox">
            <el-button @click.native.prevent="handleAdd">发布问题</el-button>
            <el-button @click.native.prevent="handleReset2">我的回答</el-button>
            <el-button @click.native.prevent="handleReset2">我的问题</el-button>
            <div class="topBox">
              <div class="title">
                <span>回答排行榜</span>
              </div>
              <div class="topList">
                <p>
                  <span>排名</span>
                  <span>名称</span>
                  <span>回答数量</span>
                </p>
                <p v-for="(item,index) in rankListData" :key="index">
                  <span>{{index+1}}</span>
                  <span>{{item.Name}}</span>
                  <span>{{item.CommentNumber}}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 
    <el-button type="primary" @click="getQAList">获取行业问答</el-button>
    <el-button type="primary" @click="addQAComment">新增行业问答评论</el-button>
    <el-button type="primary" @click="getQAComment">获取问答评论</el-button>
    <el-button type="primary" @click="deleteMyComment">删除行业评论</el-button>
    <p>
      <el-button type="primary" @click="getMyQA">我的行业问答（问题）</el-button>
      <el-button type="primary" @click="editMyQA">编辑我的行业问答</el-button>
      <el-button type="primary" @click="deleteMyQA">逻辑删除行业问答</el-button>
      <el-button type="primary" @click="getMyCommentedQA">获取我已评论的行业问答</el-button>
    </p>-->
  </div>
</template> 

<script>
import {
  getIndustryQAList,
  getIndustryQATypeList
  // addIndustryQAComment,
  // getQACommentList,
  // delectMyQACommentInfo,
  // getMyIndustryQAList,
  // updateMyIndustryQAInfo,
  // delectMyIndustryQA,
  // getMyConmmentIndustryQAList
} from "../../api/api";
export default {
  data() {
    return {
      typeListData: [], // 类型
      qaTypeName: "", // 问答类型
      qaTypeId: 0, // 问答类型ID
      qaListData: [], // 问答
      qaListTotal: 0, // 问答总条数
      pageIndex: 1, // 当前页码
      rankListData: [], // 排行榜
      QAId: 0,
      MyQAId: 0,
      MyCommentedQAId: 0,
      MyQACommentList: []
    };
  },
  created() {
    // 获取页面数据并渲染
    this.getQAList();
  },
  methods: {
    // 获取行业问答
    getQAList() {
      const params = {
        Body: {
          Page: 1,
          Rows: 5
        }
      };
      getIndustryQAList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let {
            ColumnResponesList,
            IndustryQAList,
            QACommentRankingList
          } = Result;
          this.typeListData = ColumnResponesList;
          this.qaTypeName = IndustryQAList.TypeName;
          this.qaListData = IndustryQAList.IndustryQAList.Models;
          this.qaListTotal = IndustryQAList.IndustryQAList.Total;
          this.rankListData = QACommentRankingList;
        }
      });
    },
    // 按照类型查询行业问答
    handleSelect(id) {
      // console.log(id)
      this.qaTypeId = id;
      this.pageIndex = 1;
      // 获取行业问答数据
      this.getQAData(this.pageIndex, this.qaTypeId);
    },
    // 翻页
    // currentPage 改变时会触发
    handlePageChange(currentPage) {
      // console.log(currentPage); // 当前页码
      this.pageIndex = currentPage;
      // 获取行业问答数据
      this.getQAData(this.pageIndex, this.qaTypeId);
    },
    // 根据条件获取行业问答数据
    // pageIndex 当前页码
    // typrId 问答类型ID
    getQAData(pageIndex, typeId) {
      const params = {
        Body: {
          Page: pageIndex,
          Rows: 5,
          TypeId: typeId
        }
      };
      getIndustryQATypeList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.qaListData = Result.IndustryQAList.Models;
          this.qaTypeName = Result.TypeName;
          this.qaListTotal = Result.IndustryQAList.Total;
        }
      });
    },
    // 发布问题-跳转到发布问题页面
    handleAdd() {
      let token = sessionStorage.getItem("token");
      let user = JSON.parse(sessionStorage.getItem("user"));
      let password = JSON.parse(sessionStorage.getItem("password"));
      let loginType = JSON.parse(sessionStorage.getItem("loginType"));
      // 判断token是否存在
      // 若存在跳转到我的问题页面
      // 若不存在跳转到登录页面
      // let router = token?this.$router.resolve({ name: "addQuestion" }):this.$router.resolve({ name: "login" });
      let router = this.$router.resolve({
        name: "addQuestion",
        params: {
          token: token,
          user: user,
          password: password,
          loginType: loginType
        }
      });
      window.open(router.href, "_blank");
    },
    // 跳转到问答详情页面
    qaDetail(id) {
      // console.log(id)
      let router = this.$router.resolve({
        path: "/qaDetail",
        query: { qaId: id }
      });
      window.open(router.href, "_blank");
    },
    // 新增行业问答评论
    addQAComment() {
      // console.log(this.QAId);
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          QAId: this.QAId,
          PId: 1,
          CommentContent: "评论内容1"
        }
      };
      addIndustryQAComment(params).then(data => {
        console.log(data);
      });
    },
    // 获取问答评论
    getQAComment() {
      console.log(this.QAId);
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Body: {
          Token: token,
          Page: 1,
          Rows: 5,
          QAId: this.QAId,
          PId: 0
        }
      };
      getQACommentList(params).then(data => {
        console.log(data);
        // 筛选出我的所有问答评论
        this.MyQACommentList = data.Result.Models.filter(item => {
          return (item.IsMy = true);
        });
        console.log(this.MyQACommentList);
        this.MyCommentedQAId = this.MyQACommentList[0].Id;
      });
    },
    // 删除行业评论
    deleteMyComment() {
      console.log(this.MyCommentedQAId);
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: this.MyCommentedQAId
        }
      };
      delectMyQACommentInfo(params).then(data => {
        console.log(data);
      });
    },
    // 获取我的行业问答（问题）
    getMyQA() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Page: 1,
          Rows: 5
        }
      };
      getMyIndustryQAList(params).then(data => {
        console.log(data);
        this.MyQAId = data.Result.Models[0].Id;
      });
    },
    // 编辑我的行业问答
    editMyQA() {
      console.log(this.MyQAId);
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: this.MyQAId,
          QATitle: "我的问答1",
          QAContent: "我的问答内容1",
          Industry: "文旅",
          Company: "公司名称"
        }
      };
      updateMyIndustryQAInfo(params).then(data => {
        console.log(data);
      });
    },
    // 逻辑删除行业问答
    deleteMyQA() {
      console.log(this.MyQAId);
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: this.MyQAId
        }
      };
      delectMyIndustryQA(params).then(data => {
        console.log(data);
      });
    },
    // 获取我已评论的行业问答
    getMyCommentedQA() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Page: 1,
          Rows: 5
        }
      };
      getMyConmmentIndustryQAList(params).then(data => {
        console.log(data);
      });
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.content {
  width: $full;
  padding: 20px 0;

  .typeBox {
    height: auto;
    font-size: $font-14;
    background-color: $color-white;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 10px 20px 0 20px;

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

    .typeList {
      padding: 10px 0px;

      .all {
        padding: 10px 20px;
        border-top: solid 1px $border-color-grey;
        text-align: left;

        span {
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        span:hover, .active {
          color: $color-white;
          background-color: $background-blue;
        }

        .active:hover {
          background-color: $link-hover;
        }
      }

      ul {
        border-top: solid 1px $border-color-grey;
        margin-bottom: 10px;

        li {
          height: auto;
          padding: 10px 20px;

          p {
            font-size: $font-14;
            line-height: 30px;
            text-align: left;

            span {
              padding: 5px 10px;
              border-radius: 5px;
              margin-right: 20px;
              cursor: pointer;
            }

            span:hover, .active {
              color: $color-white;
              background-color: $background-blue;
            }

            .active:hover {
              background-color: $link-hover;
            }
          }

          .title {
            padding: 0;
            font-size: $font-16;
            border: none;
          }
        }
      }
    }
  }

  .listBox {
    height: auto;
    font-size: $font-14;
    background-color: $color-white;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 10px 20px 0 20px;

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
      padding: 10px 0;

      ul {
        li {
          height: auto;
          padding: 10px 20px;
          border-top: solid 1px $border-color-grey;
          cursor: pointer;

          >p {
            font-size: $font-12;
            line-height: 30px;
            text-align: left;

            span {
              display: inline-block;
              width: 100px;
              margin-right: 30px;

              img {
                width: 20px;
                margin-right: 10px;
                vertical-align: middle;
                margin-top: -2px;
              }
            }

            span:first-child {
              img {
                height: 20px;
                border-radius: 50%;
              }
            }
          }

          .title {
            height: 30px;
            padding: 0;
            color: $color-black;
            font-size: $font-14;
            font-weight: 400;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .tag {
            span {
              width: auto;
              line-height: 20px;
              padding: 0 10px;
              background-color: #D4E0F0;
              border-radius: 10px;
            }
          }

          .desc {
            height: 75px;
            line-height: 25px;
            overflow: hidden;
            margin: 5px 0;
          }
        }

        li:hover {
          .title {
            color: $link-hover;
          }
        }
      }
    }

    .page {
      padding: 10px;
      border-top: solid 1px $border-color-grey;

      >>> .number {
        line-height: 26px;
        background-color: $color-white;
        border: solid 1px $border-color-grey;
      }

      >>> .number:hover {
        color: $color-white;
        background-color: $background-blue;
        border: solid 1px $color-blue;
      }

      >>> .number.active {
        color: $color-white;
        background-color: $background-blue;
        border: solid 1px $color-blue;
      }
    }
  }

  .rightBox {
    height: auto;
    font-size: $font-14;

    >.el-button {
      margin: 0;
      width: $full;
      font-size: 20px;
      line-height: 30px;
      background-color: $color-white;
      margin-bottom: 10px;
    }

    >.el-button:first-child {
      color: $color-white;
      background-color: $background-blue;
    }

    >.el-button:first-child:hover {
      background-color: $link-hover;
    }

    .topBox {
      padding-bottom: 10px;
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

      .topList {
        border-top: solid 1px $border-color-grey;
        padding: 10px 0;

        p {
          padding: 0 20px;
          display: flex;
          line-height: 30px;

          span:first-child {
            flex: 0 0 30px;
            width: 30px;
          }

          span:nth-child(2) {
            flex: 1;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          span:last-child {
            flex: 0 0 60px;
            width: 60px;
          }
        }
      }
    }
  }
}
</style>
