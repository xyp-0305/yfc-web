<template>
  <div class="box">
    <div class="box-head">
      <span>{{data.title}}</span>
    </div>
    <div class="box-body">
      <el-row :gutter="data.space">
        <el-col :span="data.col" v-for="(item,index) in data.data" :key="index">
          <v-expert v-if="data.type =='expert'" :experts-data="item"></v-expert>
          <v-industry v-if="data.type == 'industry'" :industries-data="item"></v-industry>
          <v-demand v-if="data.type == 'demand'" :demands-data="item"></v-demand>
          <v-train v-if="data.type == 'train'" :trains-data="item"></v-train>
          <v-case v-if="data.type == 'case'" :cases-data="item"></v-case>
          <v-supplier v-if="data.type == 'supplier'" :suppliers-data="item"></v-supplier>
          <v-question v-if="data.type == 'question'" :questions-data="item"></v-question>
          <v-new v-if="data.type == 'new'" :news-data="item"></v-new>
          <div class="explains" v-if="item.isnew">
            <p>专家解读</p>
            <ul>
              <li v-for="(subitem,index) in item.news" :key="index">
                <a href="#">
                  <span class="title">{{subitem.title}}</span>
                  <span class="date">{{subitem.date}}</span>
                </a>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import vExpert from "./box/Expert";
import vIndustry from "./box/Industry";
import vDemand from "./box/Demand";
import vTrain from "./box/Train";
import vCase from "./box/Case";
import vSupplier from "./box/Supplier";
import vQuestion from "./box/Question";
import vNew from "./box/New";
export default {
  props: ["data"],
  data() {
    return {};
  },
  components: {
    vExpert,
    vIndustry,
    vDemand,
    vTrain,
    vCase,
    vSupplier,
    vQuestion,
    vNew
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';
.box {
  width: $full;
  height: auto;
  border: $border-blue;

  .box-head {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    text-align: left;
    border-bottom: solid 1px #37B0E9;
    box-sizing: border-box;

    span {
      font-size: $font-18;
      font-weight: 700;
      color: $color-black;
    }
  }

  .box-body {
    .el-row {
      max-height: 440px;
      overflow:hidden;

      .explains {
        width: calc(100% - 20px);
        margin-left: 20px;
        padding: 9px 0;
        text-align: left;

        p {
          font-size: $font-13;
          line-height: 30px;
        }

        ul {
          li {
            height: 25px;

            a {
              display: flex;
              width: $full;
              color: $color-black;
              font-size: $font-12;
              line-height: 25px;

              .title {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .date {
                flex: 0 0 70px;
                width: 70px;
                color: $color-grey;
              }
            }

            a:hover {
              color: rgb(4, 109, 168);
            }
          }
        }
      }
    }
  }
}
</style>
