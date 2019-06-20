<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="grid-content">
          <div class="detail">
            <p class="title">
              {{qaTitle}}
              <span class="view">
                <img src="@/assets/img/news/view-white.png" alt="浏览">
                浏览（{{viewNum}}）
              </span>
            </p>
            <div class="qaContent" v-html="qaContent"></div>
            <p class="opts">
              <el-button @click.native.prevent="addAnswer">回答</el-button>
              <span>
                <img src="@/assets/img/questions/discuss.png" alt="回答">
                {{discussNum}}条回答
              </span>
              <span>
                <img src="@/assets/img/home/icon-time.png" alt="发布时间">
                {{publishTime}}
              </span>
            </p>
          </div>
          <el-collapse-transition>
            <div class="answer" v-show="showAnswer">
              <div class="title">
                <span>添加回答</span>
                <span class="answerRule">回答规则</span>
              </div>
              <v-editor></v-editor>
              <p>
                <el-button @click.native.prevent="handleAnswer">提交回答</el-button>
              </p>
            </div>
          </el-collapse-transition>
          <div class="answerListBox" v-show="commentListData.length>0">
            <div class="title">
              <span>{{commentListTotal}}条回答</span>
            </div>
            <div class="answerList">
              <ul>
                <li v-for="(item,index) in commentListData" :key="index">
                  <div class="img">
                    <img :src="HOST+item.FacialPhotoUrl" :alt="item.CommentUserName">
                    <p :class="item.IsMy?'name my':'name'">{{item.CommentUserName}}</p>
                  </div>
                  <div class="desc">
                    <div class="info">
                      <p class="answerContent" v-html="item.CommentContent"></p>
                      <p class="opts">
                        <span>
                          <img src="@/assets/img/home/icon-time.png" alt="发表时间">
                          {{item.CommentTime}}
                        </span>
                        <span
                          class="toggle"
                          v-show="!item.showComment"
                          @click="handleShowComment(item.Id,index,item.childCommentPageIndex)"
                        >
                          <img src="@/assets/img/questions/discuss.png" alt="评论">
                          {{item.CommentNum}}条评论
                        </span>
                        <span
                          class="toggle"
                          v-show="item.showComment"
                          @click="handleHideComment(item.Id,index)"
                        >
                          <img src="@/assets/img/questions/discuss.png" alt="评论">收起评论
                        </span>
                        <span
                          class="delete"
                          v-show="item.IsMy"
                          @click="handleDelete(item.Id,index,true)"
                        >
                          <img src="@/assets/img/questions/delete.png" alt="删除">删除
                        </span>
                      </p>
                    </div>
                    <el-collapse-transition>
                      <div class="commentBox" v-show="item.showComment&&item.CommentNum>0">
                        <div class="title">
                          <span>{{item.CommentNum}}条评论</span>
                        </div>
                        <div class="commentList">
                          <ul
                            v-show="item.showComment"
                            :v-infinite-scroll="load(item.Id,index,item.childCommentPageIndex)"
                            :infinite-scroll-disabled="item.scroll"
                            infinite-scroll-distance="10"
                          >
                            <li v-for="(item1,index1) in item.childComment" :key="index1">
                              <div v-if="!item1.IsReplier">
                                <p>{{item1.CommentUserName}}：</p>
                                <p v-html="item1.CommentContent"></p>
                              </div>
                              <div v-else>
                                <p>{{item1.CommentUserName}}回复{{item1.ReplierUserName}}：</p>

                                <p v-html="item1.CommentContent"></p>
                              </div>
                              <p>
                                <span>
                                  <img src="@/assets/img/home/icon-time.png" alt="发表时间">
                                  {{item1.CommentTime}}
                                </span>
                                <span
                                  class="answer"
                                  v-show="!item1.IsMy"
                                  @click="addReply(index,item1.Id,item1.CommentUserId)"
                                >
                                  <img src="@/assets/img/questions/answer.png" alt="回复">
                                  回复
                                </span>
                                <span class="report" v-show="!item1.IsMy">
                                  <img src="@/assets/img/questions/report.png" alt="举报">
                                  举报
                                </span>
                                <span
                                  class="delete"
                                  v-show="item1.IsMy"
                                  @click="handleDelete(item1.Id,index,false,index1)"
                                >
                                  <img src="@/assets/img/questions/delete.png" alt="删除">
                                  删除
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div class="opts">
                          <p class="comment">
                            <el-button @click.native.prevent="addComment(index)">我要评论</el-button>
                          </p>
                          <el-collapse-transition>
                            <div class="comment" v-show="item.showEditor">
                              <v-editor></v-editor>
                              <p>
                                <el-button
                                  v-show="toUserId==0"
                                  @click.native.prevent="handleComment(item.Id,index)"
                                >提交评论</el-button>
                                <el-button
                                  v-show="toUserId!==0"
                                  @click.native.prevent="handleReply(item.Id,index)"
                                >提交回复</el-button>
                              </p>
                            </div>
                          </el-collapse-transition>
                        </div>
                      </div>
                    </el-collapse-transition>
                    <el-collapse-transition>
                      <div class="commentBox" v-show="item.showComment&&item.CommentNum==0">
                        <div class="opts">
                          <p class="comment">
                            <el-button @click.native.prevent="addComment(index)">我要评论</el-button>
                          </p>
                          <el-collapse-transition>
                            <div class="comment" v-show="item.showEditor">
                              <v-editor></v-editor>
                              <p>
                                <el-button @click.native.prevent="handleComment(item.Id,index)">提交评论</el-button>
                              </p>
                            </div>
                          </el-collapse-transition>
                        </div>
                      </div>
                    </el-collapse-transition>
                  </div>
                </li>
              </ul>
              <div class="page" v-show="commentListTotal>10">
                <el-pagination
                  background
                  :current-page="pageIndex"
                  layout="prev, pager, next"
                  :page-size="10"
                  :total="commentListTotal"
                  @current-change="handlePageChange"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content">
          <div class="authorInfo">
            <img :src="HOST+authorPhoto" :alt="author">
            <p class="name">{{author}}</p>
            <p class="company">{{company}}</p>
            <p>
              <span>
                <img src="@/assets/img/questions/ordernal.png" alt="会员等级">
                {{memberLevel}}
              </span>
              <span>职位：{{position}}</span>
            </p>
          </div>
          <div class="relativeQA" v-show="relativeListData.length>0">
            <div class="title">
              <span>相关问题</span>
              <a class="more" href>更多</a>
            </div>
            <div class="relativeList">
              <ul>
                <li v-for="(item,index) in relativeListData" :key="index">{{item.QATitle}}</li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getIndustryQAInfo,
  addIndustryQAComment,
  getQACommentList,
  delectMyQACommentInfo
} from "../../api/api";
import vEditor from "./../common/Editor";
import bus from "./../common/bus";
export default {
  data() {
    return {
      qaId: 0, // 问答id
      qaTitle: "", // 问答标题
      qaContent: "", // 问答内容
      viewNum: 0, // 浏览次数
      discussNum: 0, // 讨论数量
      publishTime: "", // 发布时间
      showAnswer: false, // 显示回答编辑器
      answerContent: "", // 回答内容
      commentListTotal: 0, // 回答总数
      commentListData: [], // 评论列表
      pageIndex: 1, // 评论列表当前页码
      showComment: false, // 显示评论编辑器
      commentContent: "", // 评论内容
      toUserId: 0, // 当前指定回复人的id
      authorPhoto: "", // 作者头像
      author: "", // 作者
      company: "", // 公司
      memberLevel: "", // 会员等级名称
      position: "", // 职位
      relativeListData: [] // 相关问题
    };
  },
  created() {
    let id = this.$route.query.qaId;
    // console.log(id);
    this.getQAInfo(id);
  },
  methods: {
    // 获取问答详情
    getQAInfo(id) {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = sessionStorage.getItem("token");
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: id
        }
      };
      getIndustryQAInfo(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.qaId = Result.Id;
          this.qaTitle = Result.QATitle;
          this.qaContent = Result.QAContent;
          this.viewNum = Result.ViewingCount;
          this.discussNum = Result.CommentatorNum;
          this.publishTime = Result.CreateTime;
          this.commentListTotal = Result.QACommentList.Total;
          this.commentListData = Result.QACommentList.Models;
          // 给评论数据添加showComment字段
          // 根据showComment字段判断是否展示评论详情
          let that = this;
          this.commentListData.forEach((e, i) => {
            console.log(e);
            console.log(i);
            that.$set(e, "showComment", false);
            that.$set(e, "childComment", []);
            that.$set(e, "childCommentPageIndex", 1);
            that.$set(e, "childCommentTotal", 0);
            that.$set(e, "childCommentPageTotal", 0);
            that.$set(e, "scroll", false);
            that.$set(e, "showEditor", false);
          });
          this.authorPhoto = Result.CreateUserPhotoUrl;
          this.author = Result.CreateUserName;
          this.company = Result.Company;
          this.memberLevel = Result.UserLevelName;
          this.position = Result.Position;
          this.relativeListData = Result.IndustryQAList;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 新建回答
    addAnswer() {
      this.showAnswer = true;
      this.answerContent = "请输入内容";
    },
    // 提交回答
    handleAnswer() {
      // console.log(this.answerContent);
      if (this.answerContent !== "") {
        const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
        const key = "RWERFGSDDGTWETGD";
        const sign = this.$md5(
          key + "Key" + key + "Timestamp" + timestamp + key
        ).toUpperCase();
        const token = sessionStorage.getItem("token");
        const params = {
          Key: key,
          Sign: sign,
          Timestamp: timestamp,
          Body: {
            Token: token,
            QAId: this.qaId,
            PId: 0,
            CommentContent: this.answerContent,
            ReplierUserId: 0
          }
        };
        addIndustryQAComment(params).then(data => {
          // console.log(data)
          let { Message, ReturnCode, Result } = data;
          console.log(Result);
          if (ReturnCode == 200) {
            this.$message({ message: "提交成功！", type: "success" });
            // 增加评论条数
            this.discussNum++;
            this.commentListTotal++;
            // 刷新评论列表
            Result = Object.assign({}, Result, {
              showComment: false,
              childComment: [],
              childCommentPageIndex: 1,
              childCommentTotal: 0,
              childCommentPageTotal: 0,
              scroll: false,
              showEditor: false
            });
            this.commentListData.push(Result);
            // 关闭编辑框
            this.showAnswer = false;
          } else {
            this.$message.error(Message);
          }
        });
      }
    },
    // 翻页
    // currentPage 改变时会触发
    handlePageChange(currentPage) {
      // console.log(currentPage); // 获取当前页码
      this.pageIndex = currentPage;
      this.getComment(this.pageIndex);
    },
    // 获取评论内容
    getComment(pageIndex) {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = sessionStorage.getItem("token");
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          QAId: this.qaId,
          PId: 0,
          Page: pageIndex,
          Rows: 10
        }
      };
      getQACommentList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let that = this;
          Result.Models.forEach((e, i) => {
            // console.log(e);
            // console.log(i);
            that.$set(e, "showComment", false);
            that.$set(e, "childComment", []);
            that.$set(e, "childCommentPageIndex", 1);
            that.$set(e, "childCommentTotal", 0);
            that.$set(e, "childCommentPageTotal", 0);
            that.$set(e, "scroll", false);
            that.$set(e, "showEditor", false);
          });
          this.commentListData = Result.Models;
          // console.log(this.commentListData);
          this.CommentatorNum = Result.Total;
          this.commentListTotal = Result.Total;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 展开评论
    handleShowComment(id, index, pageIndex) {
      // console.log(id,index);
      if (
        this.commentListData[index].CommentNum !== 0 &&
        this.commentListData[index].childComment.length == 0
      ) {
        // 获取当前所有子评论内容
        this.getChildComment(id, index, pageIndex);
      }
      this.commentListData[index].showComment = true;
    },
    // 滚动加载更多评论
    load(id, index, pageIndex) {
      // console.log(id, index, pageIndex);
      if (this.commentListData[index].showComment) {
        this.commentListData[index].scroll = true;
        // console.log(id, index, pageIndex);
        // 多次加载数据
        setTimeout(() => {
          if (
            this.commentListData[index].childCommentPageIndex <
            this.commentListData[index].childCommentPageTotal
          ) {
            this.commentListData[index].childCommentPageIndex++; // 改变当前子评论的页码
            console.log(this.commentListData[index].childCommentPageIndex);
            this.getChildComment(
              id,
              index,
              this.commentListData[index].childCommentPageIndex
            );
          }
        }, 1000);
      }
    },
    // 获取对应子评论内容
    getChildComment(id, index, pageIndex) {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = sessionStorage.getItem("token");
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          QAId: this.qaId,
          PId: id,
          Page: pageIndex,
          Rows: 3
        }
      };
      getQACommentList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        console.log(Result);
        if (ReturnCode == 200) {
          this.commentListData[index].childComment = this.commentListData[
            index
          ].childComment.concat(Result.Models);
          this.commentListData[index].childCommentTotal = Result.Total;
          this.commentListData[index].childCommentPageTotal = Math.ceil(
            this.commentListData[index].childCommentTotal / 3
          );
          this.commentListData[index].scroll = false;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 收起评论
    handleHideComment(id, index) {
      // console.log(id);
      // console.log(index);
      this.commentListData[index].showComment = false;
    },
    // 添加评论
    addComment(index) {
      // 关闭所有子评论的编辑框
      this.commentListData.forEach((e, i) => {
        // console.log(e,i)
        e.showEditor = false;
      });
      // 显示当前子评论的编辑框
      this.commentListData[index].showEditor = true;
      this.answerContent = "请输入内容";
    },
    // 提交评论
    handleComment(id, index) {
      // console.log(id)
      if (this.answerContent !== "") {
        const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
        const key = "RWERFGSDDGTWETGD";
        const sign = this.$md5(
          key + "Key" + key + "Timestamp" + timestamp + key
        ).toUpperCase();
        const token = sessionStorage.getItem("token");
        const params = {
          Key: key,
          Sign: sign,
          Timestamp: timestamp,
          Body: {
            Token: token,
            QAId: this.qaId,
            PId: id,
            CommentContent: this.answerContent,
            ReplierUserId: 0
          }
        };
        addIndustryQAComment(params).then(data => {
          // console.log(data)
          let { Message, ReturnCode, Result } = data;
          // console.log(Result);
          if (ReturnCode == 200) {
            this.$message({ message: "提交成功！", type: "success" });
            // 增加子评论条数
            this.commentListData[index].CommentNum++;
            this.commentListData[index].childCommentTotal++;
            // 刷新子评论
            this.commentListData[index].childComment.push(Result);
            // 关闭编辑框
            this.commentListData[index].showEditor = false;
          } else {
            this.$message.error(Message);
          }
        });
      }
    },
    // 处理删除
    handleDelete(id, index, flag, childIndex) {
      // console.log(id,index,flag);
      if (flag) {
        this.deleteComment(id, index);
      } else {
        this.deleteChildComment(id, index, childIndex);
      }
    },
    // 删除我的评论
    // id 评论id
    deleteComment(id, index) {
      // console.log(id,index)
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = sessionStorage.getItem("token");
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: id
        }
      };
      delectMyQACommentInfo(params).then(data => {
        // console.log(data)
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.$message({ message: "删除成功！", type: "success" });
          // 减少评论条数
          this.discussNum--;
          this.commentListTotal--;
          // 刷新评论列表
          this.commentListData.splice(index, 1);
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 删除我的子评论
    // id 子评论id
    deleteChildComment(id, index, childIndex) {
      // console.log(id,index,childIndex)
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = sessionStorage.getItem("token");
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: id
        }
      };
      delectMyQACommentInfo(params).then(data => {
        // console.log(data)
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.$message({ message: "删除成功！", type: "success" });
          // 减少子评论条数
          this.commentListData[index].CommentNum--;
          this.commentListData[index].childCommentTotal--;
          // 刷新子评论
          this.commentListData[index].childComment.splice(childIndex, 1);
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 新增回复
    addReply(index, id, toUserId) {
      // console.log(index,id,toUserId)
      // 关闭所有子评论的编辑框
      this.commentListData.forEach((e, i) => {
        // console.log(e,i)
        e.showEditor = false;
      });
      // 显示对应的编辑框
      this.commentListData[index].showEditor = true;
      this.answerContent = "请输入内容";
      // 赋值当前指定回复人id
      this.toUserId = toUserId;
    },
    // 提交回复
    handleReply(id, index) {
      // console.log(id,index)
      if (this.answerContent !== "") {
        const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
        const key = "RWERFGSDDGTWETGD";
        const sign = this.$md5(
          key + "Key" + key + "Timestamp" + timestamp + key
        ).toUpperCase();
        const token = sessionStorage.getItem("token");
        const params = {
          Key: key,
          Sign: sign,
          Timestamp: timestamp,
          Body: {
            Token: token,
            QAId: this.qaId,
            PId: id,
            CommentContent: this.answerContent,
            ReplierUserId: this.toUserId
          }
        };
        addIndustryQAComment(params).then(data => {
          // console.log(data)
          let { Message, ReturnCode, Result } = data;
          // console.log(Result);
          if (ReturnCode == 200) {
            this.$message({ message: "提交成功！", type: "success" });
            // 增加子评论条数
            this.commentListData[index].CommentNum++;
            this.commentListData[index].childCommentTotal++;
            // 刷新子评论
            this.commentListData[index].childComment.push(Result);
            // 关闭编辑框
            this.commentListData[index].showEditor = false;
            this.toUserId = 0;
          } else {
            this.$message.error(Message);
          }
        });
      }
    }
  },
  mounted() {
    // 监听事件，获取问答内容
    bus.$on("editor", content => {
      //   console.log(content)
      this.answerContent = content;
    });
  },
  components: {
    vEditor
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.content {
  padding: 20px 0;

  .detail {
    padding: 20px;
    background-color: $color-white;

    p {
      line-height: 30px;
      text-align: left;
    }

    .title {
      font-size: $font-16;

      .view {
        float: right;
        color: $color-grey;
        font-size: $font-14;

        img {
          vertical-align: top;
          margin-top: 9px;
          margin-right: 5px;
        }
      }
    }

    .qaContent {
      margin: 10px 0;
      color: $color-grey;
      line-height: 25px;
      text-align:left;
    }

    .opts {
      .el-button {
        color: $color-white;
        background-color: $background-blue;
        border-radius: 3px;
      }

      .el-button:hover {
        background-color: $link-hover;
      }

      span {
        margin-left: 30px;

        img {
          vertical-align: top;
          margin-top: 7px;
          margin-right: 5px;
        }
      }
    }
  }

  .answer {
    background-color: $color-white;
    padding: 10px 0px 20px 0;
    margin-top: 20px;

    .title {
      margin: 0;
      font-size: 16px;
      // font-weight: 700;
      text-align: left;
      border: none;
      padding: 0 20px;

      span {
        border-left: solid 3px $color-blue;
        padding-left: 10px;
      }

      .answerRule {
        float: right;
        color: $color-blue;
        border: none;
        cursor: pointer;
      }

      .answerRule:hover {
        color: $link-hover;
      }
    }

    #editor {
      border-top: solid 1px $border-color-grey;
      margin-top: 10px;
      padding: 20px;
    }

    p {
      padding: 0 20px;
      text-align: right;

      .el-button {
        color: $color-white;
        background-color: $background-blue;
        border-radius: 3px;
      }

      .el-button:hover {
        background-color: $link-hover;
      }
    }
  }

  .answerListBox {
    background-color: $color-white;
    margin-top: 20px;

    .title {
      margin: 0;
      font-size: 16px;
      // font-weight: 700;
      text-align: left;
      border: none;
      padding: 10px 20px;

      span {
        border-left: solid 3px $color-blue;
        padding-left: 10px;
      }
    }

    .answerList {
      ul {
        li {
          display: flex;
          border-top: solid 1px $border-color-grey;
          padding: 10px 20px;

          .img {
            flex: 0 0 60px;
            width: 60px;

            img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
            }

            .name {
              height: 30px;
              line-height: 30px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .my {
              color: $color-blue;
            }
          }

          .desc {
            flex: 1;
            margin-left: 20px;
            overflow: hidden;

            .info {
              p {
                line-height: 30px;
              }

              .answerContent {
                line-height: 25px;
                min-height: 50px;
                text-align: left;
              }

              .opts {
                color: $color-grey;
                font-size: $font-12;
                text-align: right;
                margin-top: 10px;

                span {
                  margin-left: 20px;

                  img {
                    vertical-align: top;
                    margin-top: 5px;
                    margin-right: 5px;
                  }
                }

                .toggle, .delete {
                  cursor: pointer;
                }

                .toggle:hover, .delete:hover {
                  color: $link-hover;
                }
              }
            }

            .commentBox {
              display: block;
              background-color: #EFEDEE;
              margin-top: 10px;

              .title {
                border-bottom: solid 1px $border-color-grey;
              }

              .commentList {
                max-height: 335px;
                overflow-y: scroll;
              }

              ul {
                height: auto;

                li {
                  display: block;
                  padding: 10px 20px;
                  border: none;
                  border-bottom: solid 1px $border-color-grey;

                  p {
                    line-height: 30px;
                    text-align: left;

                    span {
                      margin-right: 20px;

                      img {
                        vertical-align: top;
                        margin-top: 5px;
                      }
                    }

                    .answer, .report, .delete {
                      padding: 0;
                      background-color: #efedee;
                      cursor: pointer;
                    }

                    .answer:hover, .report:hover, .delete:hover {
                      color: $link-hover;
                    }
                  }
                }
              }

              .opts {
                padding: 20px;

                .comment {
                  text-align: right;
                }

                .el-button {
                  color: $color-white;
                  background-color: $background-blue;
                  border-radius: 3px;
                }

                .el-button:hover {
                  background-color: $link-hover;
                }

                #editor {
                  margin: 20px 0;
                }
              }
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
  }

  .authorInfo {
    background-color: $color-white;
    padding: 20px;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    p {
      line-height: 30px;
      color: $color-grey;

      span {
        display: inline-block;
        width: 48%;

        img {
          width: 20px;
          height: 20px;
          vertical-align: top;
          margin-top: 5px;
        }
      }
    }

    .name {
      color: $color-black;
      font-size: $font-16;
    }

    .company {
      height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 20px;
    }
  }

  .relativeQA {
    background-color: $color-white;
    margin-top: 20px;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
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
        border-top: solid 1px $border-color-grey;
        padding: 10px 0;

        li {
          height: 30px;
          line-height: 30px;
          color: $color-grey;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 0 20px;
          list-style: disc inside;
          cursor: pointer;
        }

        li:hover {
          color: $link-hover;
        }
      }
    }
  }
}
</style>
