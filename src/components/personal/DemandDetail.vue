<template>
  <div class="page">
    <div class="demandInfo">
      <p class="title">{{title}}</p>
      <p>
        <span>需求类型：{{type}}</span>
        <span>所在地区：{{place}}</span>
        <span class="price">预算：{{price}}</span>
      </p>
      <p>
        <span>截止时间：{{endTime}}</span>
        <span>期望完成期限：{{duration}}个月</span>
        <span>发布时间：{{publishTime}}</span>
      </p>
    </div>
    <div class="demandBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="需求详情" name="first">
          <div class="demandDesc">
            <div class="title">
              <span>项目描述</span>
            </div>
            <div class="desc" v-html="desc"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工作台" name="second">工作台</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getIndustryDemandInfo } from "../../api/api";

export default {
  data() {
    return {
      title: "", // 标题
      type: "", // 类型
      place: "", // 地区
      price: "", // 预算
      endTime: "", // 截止时间
      duration: "", // 期限
      publishTime: "", // 发布时间
      activeName: "first", // 当前标签页码
      desc: "" // 项目描述
    };
  },
  created() {
    let id = this.$route.query.demandId;
    // console.log(id);
    this.getDemandInfo(id);
  },
  methods: {
    // 获取需求详情
    // id 需求id
    getDemandInfo(id) {
      const params = {
        Body: id
      };
      getIndustryDemandInfo(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        console.log(Result);
        if (ReturnCode == 200) {
          this.title = Result.DemandTitle;
          this.type = Result.DemandTypeName;
          this.place = Result.Place;
          this.price = Result.Budget;
          this.endTime = Result.Deadline;
          this.duration = Result.CompletionDeadline;
          this.publishTime = Result.CreateTime;
          this.desc = Result.DemandContent;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 标签切换
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  .demandInfo {
    background-color: $color-white;
    padding: 10px 20px;

    p {
      color: $color-grey;
      font-size: $font-14;
      line-height: 30px;
      text-align: left;

      span {
        display: inline-block;
        width: 200px;
        margin-right: 50px;
      }

      .price {
        color: $color-black;
      }
    }

    .title {
      color: $color-black;
      font-size: $font-16;
      margin-bottom: 10px;
    }
  }

  .demandBox {
    background-color: $color-white;
    margin-top: 20px;

    .demandDesc {
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
      .desc{
        min-height:100px;
        padding:10px 20px;
        color:$color-grey;
        text-align:left;
        line-height:30px;
      }
    }
  }
}
</style>
