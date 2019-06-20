<template>
  <div class="page">
    <div class="title">
      <span>我的需求</span>
    </div>
    <div class="demandList">
      <ul>
        <li v-for="(item,index) in demandData" :key="index">
          <p>
            <span class="name">{{item.DemandTitle}}</span>
            <span class="date">
              <img src="@/assets/img/home/icon-time.png" alt="创建时间">
              {{item.CreateTime}}
            </span>
          </p>
          <p class="info">
            <span>需求类型：{{item.DemandTypeName}}</span>
            <span>所在地区：{{item.Place}}</span>
            <span>预算：{{item.Budget}}</span>
            <el-button @click.native.prevent="demandDetail(item.Id)">查看进度</el-button>
          </p>
          <p class="time">
            <span>截止时间：{{item.Deadline}}</span>
            <span>期望完成期限：{{item.CompletionDeadline}}个月</span>
          </p>
        </li>
      </ul>
      <div class="page" v-show="demandTotal>pageSize">
        <el-pagination
          background
          :current-page="pageIndex"
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="demandTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyIndustryDemandList } from "../../api/api";
export default {
  data() {
    return {
      demandData: [], // 我的需求数据
      demandTotal: 0, // 我的需求总条数
      pageIndex: 1, // 当前页码
      pageSize: 5 // 每页显示条数
    };
  },
  created() {
    this.getDemand(this.pageIndex, this.pageSize);
  },
  methods: {
    // 获取我的需求
    // pageIndex 当前页码
    // pageSize 每页显示条数
    getDemand(pageIndex, pageSize) {
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
          IsAsc: false, // true/false是否升序（默认true(升序)）
          Page: pageIndex,
          Rows: pageSize
        }
      };
      getMyIndustryDemandList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.demandData = Result.Models;
          this.demandTotal = Result.Total;
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
      this.getDemand(this.pageIndex, this.pageSize);
    },
    // 跳转到需求详情
    demandDetail(id){
        // console.log(id)
        let router = this.$router.resolve({path:'/demandDetail',query:{
            demandId:id
        }})
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

  .title {
    margin: 0;
    font-size: 16px;
    font-weight: 700;
    text-align: left;
    border-bottom: solid 1px $border-color-grey;
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

  .demandList {
    ul {
      li {
        border-bottom: solid 1px $border-color-grey;
        padding: 10px 0;

        p {
          color: $color-grey;
          font-size: $font-14;
          line-height: 30px;
          text-align: left;
          padding: 0 20px;
          overflow: hidden;

          span {
            display: inline-block;

            img {
              vertical-align: top;
              margin-top: 5px;
              margin-right: 5px;
            }
          }

          .name {
            width: 80%;
            color: $color-black;
            font-size: $font-16;
            margin-bottom: 5px;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .date {
            float: right;
          }

          .el-button {
            float: right;
            color: $color-white;
            background-color: $background-blue;
            border-radius: 5px;
          }

          .el-button:hover {
            background-color: $link-hover;
          }
        }
        .info,.time{
            span{
                width:200px;
                margin-right:50px;
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
