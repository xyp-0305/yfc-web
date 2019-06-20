<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="行业文章" name="1">
        <div class="articleList">
          <ul>
            <li v-for="(item,index) in collectData" :key="index" @click="articleDetail(item.CollectContentId)">
              <p class="title">
                <span class="name">{{item.Title}}</span>
                <span class="date">{{item.ContentCreateTime}}</span>
                <span class="author" v-show="item.ContentUserName">作者：{{item.ContentUserName}}</span>
              </p>
              <p class="desc">{{item.Content}}</p>
            </li>
          </ul>
          <div class="page" v-show="collectTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="collectTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="行业案例" name="2">
        <div class="caseList">
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in collectData" :key="index">
              <div class="grid-content">
                <div class="case" @click="caseDetail(item.CollectContentId)">
                  <div class="img">
                    <img :src="HOST+item.ImageURL" :alt="item.Title">
                  </div>
                  <P class="title">{{item.Title}}</P>
                  <p class="desc">{{item.Content}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="page" v-show="collectTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="collectTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="峰会游学" name="3">
        <div class="productList">
          <el-row :gutter="20">
            <el-col :span="8" v-for="(item,index) in collectData" :key="index">
              <div class="grid-content">
                <div class="product">
                  <div class="img">
                    <img :src="HOST+item.ImageURL" :alt="item.Title">
                  </div>
                  <p class="title">{{item.Title}}</p>
                  <p class="place">
                    <span>{{item.CityLocation}}</span>
                    <span
                          v-if="item.ProductState==2"
                          class="state full"
                        >{{item.ProductStateName}}</span>
                        <span
                          v-else-if="item.ProductState==3"
                          class="state doing"
                        >{{item.ProductStateName}}</span>
                        <span
                          v-else-if="item.ProductState==5"
                          class="state recruit"
                        >{{item.ProductStateName}}</span>
                        <span
                          v-else-if="item.ProductState==4"
                          class="state over"
                        >{{item.ProductStateName}}</span>
                        <span v-else class="state">{{item.ProductStateName}}</span>
                  </p>
                </div>
              </div>
            </el-col>
          </el-row>
          <div class="page" v-show="collectTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="collectTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getMyCollectList } from "../../api/api";
export default {
  data() {
    return {
      activeName: "1", // 当前标签页码
      collectType: 1, // 当前收藏类型
      collectData: [], // 行业文章数据
      pageIndex: 1, // 当前页码
      pageSize: 5, // 每页条数
      collectTotal: 0 // 行业文章总数
    };
  },
  created() {
    // 获取行业文章数据
    this.getCollect(this.collectType, this.pageIndex, this.pageSize);
  },
  methods: {
    // 标签切换
    handleClick(tab, event) {
      // console.log(tab, event);
      //   console.log(this.activeName);
      this.collectType = parseInt(this.activeName);
      //   console.log(this.collectType);
      this.pageIndex = 1;
      if (this.collectType == 1) {
        this.pageSize = 5;
      } else {
        this.pageSize = 9;
      }
      this.getCollect(this.collectType, 1, this.pageSize);
    },
    // 获取收藏数据
    // type 收藏类型
    // pageIndex 当前页码
    // pageSize 每页条数
    getCollect(type, pageIndex, pageSize) {
      // console.log(type)
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
          CollectType: type,
          Page: pageIndex,
          Rows: pageSize
        }
      };
      getMyCollectList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.collectData = Result.Models;
          this.collectTotal = Result.Total;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 翻页
    handlePageChange(currentPage) {
      // console.log(currentPage);
      this.pageIndex = currentPage;
      // 查询数据
      this.getCollect(this.collectType, this.pageIndex, this.pageSize);
    },
    // 跳转到文章详情
    articleDetail(id){
        // console.log(id)
        let router = this.$router.resolve({path:'/articleDetail',query:{articleId:id,typeId:1}})
        window.open(router.href,'_blank')
    },
    // 跳转到案例详情
    caseDetail(id){
        // console.log(id)
        let router = this.$router.resolve({path:'/caseDetail',query:{caseId:id}})
        window.open(router.href,'_blank')
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  background-color: $color-white;

  .articleList {
    ul {
      li {
        padding: 10px 0;
        border-bottom: solid 1px $border-color-grey;
        cursor:pointer;

        p {
          color: $color-grey;
          line-height: 30px;
          text-align: left;
          padding: 0 20px;
        }

        .title {
          color: $color-black;
          font-size: $font-16;

          .name {
            display: inline-block;
            width: 70%;
            height: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .author, .date {
            float: right;
          }

          .date {
            color: $color-grey;
            margin-left: 10px;
          }
        }

        .desc {
          max-height: 100px;
          line-height: 25px;
          overflow: hidden;
        }
      }
      li:hover{
          .title{
              .name{
                  color:$link-hover;
              }
          }
      }
    }
  }

  .caseList {
    padding: 0 20px 10px 20px;

    .case {
      width: $full;
      height: auto;
      border: $border-grey;
      border-radius: 10px;
      overflow: hidden;
      margin: 10px 0;

      .img {
        width: $full;
        height: 180px;
        overflow: hidden;

        img {
          width: $full;
          height: $full;
          transition: all 0.5s ease-out;
          transform: scale(1, 1);
        }
      }

      p {
        line-height: 30px;
        padding: 0 10px;
        text-align: left;
      }

      .title {
        height: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .desc {
        height: 40px;
        color: $color-grey;
        line-height: 20px;
        overflow: hidden;
        margin-bottom: 5px;
      }
    }

    .case:hover {
      .img {
        img {
          transform: scale(1.2, 1.2);
        }
      }
    }
  }

  .productList {
    padding: 0 20px 10px 20px;

    .product {
      width: $full;
      height: auto;
      border: $border-grey;
      border-radius: 10px;
      overflow: hidden;
      margin: 10px 0;

      .img {
        width: $full;
        height: 180px;
        overflow: hidden;

        img {
          width: $full;
          height: $full;
          transition: all 0.5s ease-out;
          transform: scale(1, 1);
        }
      }

      p {
        line-height: 30px;
        padding: 0 10px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .title.place {
        height: 30px;
      }

      .place {
        color: $color-grey;

        .state {
          float: right;
          color:$color-blue;
        }

          .full {
            color: #E04A49;
          }

          .doing {
            color: #88B60B;
          }

          .over {
            color: $color-grey;
          }
          .recruit{
            color: #FF8000;
          }
      }
    }

    .product:hover {
      .img {
        img {
          transform: scale(1.2, 1.2);
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
