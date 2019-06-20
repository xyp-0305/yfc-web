<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的提问" name="1">
        <div class="questionList">
          <ul>
            <li v-for="(item,index) in questionData" :key="index" @click="qaDetail(item.Id)">
              <div class="title">
                <p class="name">{{item.QATitle}}</p>
                <p>
                  <span class="date">
                    <img src="@/assets/img/home/icon-time.png" alt="发表时间">
                    {{item.CreateTime}}
                  </span>
                  <span class="discuss">
                    <img src="@/assets/img/questions/discuss.png" alt="评论数量">
                    {{item.CommentNum}}条回答
                  </span>
                </p>
              </div>
              <div class="opt">
                <el-button @click.native.stop="handleDelete(item.Id,index,false)">删除</el-button>
              </div>
            </li>
          </ul>
          <div class="page" v-show="questionTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="questionTotal"
              @current-change="questionPageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的回答" name="2">
        <div class="answerList">
          <ul>
            <li v-for="(item,index) in answerData" :key="index" @click="qaDetail(item.QAId)">
              <div class="title">
                <p class="name">{{item.CommentContent}}</p>
                <p>
                  <span class="date">
                    <img src="@/assets/img/home/icon-time.png" alt="发表时间">
                    {{item.CommentTime}}
                  </span>
                  <span class="discuss">
                    <img src="@/assets/img/questions/discuss.png" alt="评论数量">
                    {{item.CommentNum}}条回答
                  </span>
                </p>
              </div>
              <div class="opt">
                <el-button @click.native.stop="handleDelete(item.Id,index,true)">删除</el-button>
              </div>
            </li>
          </ul>
          <div class="page" v-show="answerTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="answerTotal"
              @current-change="answerPageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getMyIndustryQAList,
  getMyCommentIndustryQAList,
  delectMyIndustryQA,
  delectMyQACommentInfo
} from "../../api/api";
export default {
  data() {
    return {
      activeName: "1", // 当前标签页码
      type: 1, // 当前类型（1.提问 2.回答）
      questionData: [], // 问题数据
      questionTotal: 0, // 问题总数
      answerData: [], // 回答数据
      answerTotal: 0, // 回答总数
      pageIndex: 1, // 当前页码
      pageSize: 8 // 每页条数
    };
  },
  created() {
    this.getQuestion(this.pageIndex, this.pageSize);
  },
  methods: {
    // 标签切换
    handleClick(tab, event) {
      // console.log(tab, event);
      //   console.log(this.activeName);
      this.type = parseInt(this.activeName);
      //   console.log(this.type);
      this.pageIndex = 1;
      if (this.type == 2 && this.answerData.length == 0) {
        this.getAnswer(1, this.pageSize);
      } else {
        this.getQuestion(1, this.pageSize);
      }
    },
    // 获取提问数据
    // pageIndex 当前页码
    // pageSize 每页条数
    getQuestion(pageIndex, pageSize) {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"))
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Page: pageIndex,
          Rows: pageSize
        }
      };
      getMyIndustryQAList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.questionData = Result.Models;
          this.questionTotal = Result.Total;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 获取回答数据
    // pageIndex 当前页码
    // pageSize 每页条数
    getAnswer(pageIndex, pageSize) {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"))
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Page: pageIndex,
          Rows: pageSize
        }
      };
      getMyCommentIndustryQAList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.answerData = Result.Models;
          this.answerTotal = Result.Total;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 提问翻页
    questionPageChange(currentPage) {
      // console.log(currentPage);
      this.pageIndex = currentPage;
      // 查询数据
      this.getQuestion(this.pageIndex, this.pageSize);
    },
    // 回答翻页
    answerPageChange(currentPage) {
      // console.log(currentPage);
      this.pageIndex = currentPage;
      // 查询数据
      this.getAnswer(this.pageIndex, this.pageSize);
    },
    // 跳转到问答详情
    qaDetail(id) {
      // console.log(id)
      let router = this.$router.resolve({
        path: "/qaDetail",
        query: { qaId: id }
      });
      window.open(router.href, "_blank");
    },
    // 处理删除
    handleDelete(id, index, flag) {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"))
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: id
        }
      };
      if (flag) {
        // 删除我的回答
        this.deleteAnswer(params, index);
      } else {
        // 删除我的提问
        this.deleteQuestion(params, index);
      }
    },
    // 删除我的提问
    deleteQuestion(params, index) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delectMyIndustryQA(params).then(data => {
            // console.log(data);
            let { Message, ReturnCode, Result } = data;
            // console.log(Result);
            if (ReturnCode == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 刷新数据渲染页面
              if (index == 0 && this.questionData.length == 1) {
                this.questionTotal--;
                let maxPage = Math.ceil(this.questionTotal / 8);
                this.pageIndex = maxPage;
                this.getQuestion(maxPage, this.pageSize);
              } else {
                this.questionData.splice(index, 1);
                this.questionTotal--;
                this.getQuestion(this.pageIndex, this.pageSize);
              }
            } else {
              this.$message.error(Message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除我的回答
    deleteAnswer(params, index) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delectMyQACommentInfo(params).then(data => {
            // console.log(data);
            let { Message, ReturnCode, Result } = data;
            // console.log(Result);
            if (ReturnCode == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              // 刷新数据渲染页面
              if (index == 0 && this.answerData.length == 1) {
                this.answerTotal--;
                let maxPage = Math.ceil(this.answerTotal / 8);
                this.pageIndex = maxPage;
                this.getAnswer(maxPage, this.pageSize);
              } else {
                this.answerData.splice(index, 1);
                this.answerTotal--;
                this.getAnswer(this.pageIndex, this.pageSize);
              }
            } else {
              this.$message.error(Message);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  background-color: $color-white;

  .questionList, .answerList {
    ul {
      li {
        display: flex;
        border-bottom: solid 1px $border-color-grey;
        padding: 10px 0;
        cursor: pointer;

        p {
          color: $color-grey;
          font-size: $font-12;
          line-height: 30px;
          text-align: left;
          padding: 0 20px;

          span {
            margin-right: 20px;

            img {
              vertical-align: top;
              margin-top: 5px;
              margin-right: 5px;
            }
          }
        }

        .title {
          flex: 1;

          .name {
            color: $color-black;
            font-size: $font-14;
            margin-bottom: 5px;
          }
        }

        .opt {
          flex: 0 0 100px;
          text-align: right;
          margin: 0 20px;

          .el-button {
            color: $color-white;
            background-color: $background-blue;
            border-radius: 5px;
            margin-top: 15px;
          }

          .el-button:hover {
            background-color: $link-hover;
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

  .page {
    padding: 10px;

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
</style>
