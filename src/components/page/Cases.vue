<template>
  <div class="case">
    <div class="conditionList">
      <div class="condition">
        <span>案例类型:</span>
        <p>
          <span :class="caseTypeId==0 ?'all active':'all'" @click="selectCaseType(0)">全部</span>
          <span
            :class="{'active':caseTypeId==item.Id}"
            v-for="(item,index) in caseTypeData"
            :key="index"
            :id="item.Id"
            @click="selectCaseType(item.Id)"
          >{{item.ProjectTypeName}}</span>
        </p>
      </div>
      <div class="condition">
        <span>案例地点:</span>
        <span :class="cityId==0 ?'all active':'all'" @click="selectCity(0,'其他')">全部</span>
        <div class="default">
          当前选择城市：
          <!-- <span :class="{'active':cityId!=0}">{{cityName}}</span> -->
          <div class="cityBox">
            <el-popover placement="right-start" width="800" ref="popoverCity" popper-class="city" v-model="showCity">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  :label="item.name"
                  :name="item.name"
                  v-for="(item,index) in caseAddressData"
                  :key="index"
                >
                  <div class="cityList" v-for="(item1,index1) in item.list" :key="index1">
                    <span class="letter">{{item1.Letter}}</span>
                    <p>
                      <span
                        v-for="(item2,index2) in item1.City"
                        :id="item2.Id"
                        :key="index2"
                        @click="selectCity(item2.Id,item2.Name)"
                      >{{item2.Name}}</span>
                    </p>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <el-button slot="reference" v-popover:popoverCity>{{cityName}}</el-button>
            </el-popover>
          </div>
          <!-- <span v-for="(item,index) in caseAddressData" :key="index" :id="item.Id">{{item.Name}}</span> -->
        </div>
      </div>

      <!-- <div class="condition1" v-show="!showProvince">
        <span>案例地点:</span>
        <p>
          <span class="all active">全部</span>
          <span v-for="(item,index) in caseAddressData" :key="index" :id="item.Id">{{item.Name}}</span>
        </p>
        <el-button @click.native.prevent="showProvince = !showProvince">收起</el-button>
      </div>-->
      <div class="sort">
        <p class="sortList">
          <span :class="{'active':sortTime==0}" @click="sortAtPublish">
            发布时间
            <i :class="sortTime==0 ?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
          <span :class="{'active':sortView==0}" @click="sortAtView">
            浏览量
            <i :class="sortView==0 ?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
          </span>
        </p>
        <div class="search">
          <el-input placeholder="在当前条件下搜索" v-model="caseWord" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content">
            <div class="caseBox">
              <div class="caseList">
                <ul>
                  <li v-for="(item,index) in caseData" :key="index" @click="caseDetail(item.Id)">
                    <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                    <div class="info">
                      <p class="name">{{item.CaseTitle}}</p>
                      <div class="introduct">
                        <div class="left">
                          <p class="type">项目类型：{{item.ProjectTypeName}}</p>
                          <p class="address">项目地点：{{item.ProjectPlaceName}}</p>
                          <p class="time">项目时间：{{item.StartTime}} 至 {{item.CompletionTime}}</p>
                        </div>
                        <div class="right">
                          <p class="time">发布时间：{{item.CreateTime}}</p>
                          <p class="view">
                            <img src="@/assets/img/news/view-white.png" alt="浏览图标">
                            浏览（{{item.ViewingCount}}）
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="page">
                <el-pagination
                  background :current-page=pageIndex
                  layout="prev, pager, next"
                  :page-size="7"
                  :total="caseTotal"
                  @current-change="handlePageChange"
                ></el-pagination>
              </div>
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
                    <li v-for="(item,index) in classicCaseData" :key="index" @click="caseDetail(item.Id)">
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
                  <router-link class="more" :to="{name:'articles'}">查看更多</router-link>
                </div>
                <div class="newList">
                  <ul>
                    <li v-for="(item,index) in hotNewData" :key="index" @click="articleDetail(item.Id,2)">
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
  </div>
</template>

<script>
import {
  getIndustryCaseList,
  getClassicCaseList
} from "../../api/api";
export default {
  data() {
    return {
      caseTypeId: 0, // 当前选择案例类型ID
      cityName: "全部", // 当前选择城市名称
      showCity:false, // 是否显示城市列表（默认隐藏）
      cityId: 0, // 当前选择城市ID
      activeName: "ABCD", // 案例地点-默认展示
      caseWord: "", // 搜索关键字
      // showProvince: true,
      // activeIndex: "1",
      sortTime: 2, // 按发布时间排序
      sortView: 2, // 按浏览量排序
      caseTypeData: [], // 案例类型
      caseAddressData: [], // 案例地点
      caseData: [], // 案例
      caseTotal: 0, // 案例总数量
      pageIndex: 1, // 当前页码(默认为1)
      classicCaseData: [], // 精选案例
      hotNewData: [] // 热门专题
    };
  },
  created() {
    // 获取页面数据
    const params = {
      Body: {
        Page: 1,
        Rows: 7
      }
    };
    getIndustryCaseList(params).then(data => {
      // console.log(data);
      let { Message, ReturnCode, Result } = data;
      // console.log(Result);
      if (ReturnCode == 200) {
        let {
          ProjectTypeList,
          ProvincesList,
          ClassicCaseList,
          ChoicenessCaseList,
          ThematicInfoList
        } = Result;
        // 案例类型
        // console.log(ProjectTypeList)
        this.caseTypeData = ProjectTypeList;
        // 案例地点
        // console.log(ProvincesList);
        // this.caseAddressData = ProvincesList;
        let obj1 = {},
          obj2 = {},
          obj3 = {},
          obj4 = {},
          obj5 = {},
          obj6 = {};
        obj1.name = "ABCD";
        obj1.list = ProvincesList.slice(0, 4);
        this.caseAddressData.push(obj1);
        obj2.name = "EFGH";
        obj2.list = ProvincesList.slice(4, 8);
        this.caseAddressData.push(obj2);
        obj3.name = "JKLM";
        obj3.list = ProvincesList.slice(8, 12);
        this.caseAddressData.push(obj3);
        obj4.name = "NPQR";
        obj4.list = ProvincesList.slice(12, 16);
        this.caseAddressData.push(obj4);
        obj5.name = "STW";
        obj5.list = ProvincesList.slice(16, 19);
        this.caseAddressData.push(obj5);
        obj6.name = "XYZ";
        obj6.list = ProvincesList.slice(19, 22);
        this.caseAddressData.push(obj6);
        // console.log(this.caseAddressData);

        // 案例
        // console.log(ClassicCaseList)
        this.caseData = ClassicCaseList.Models;
        this.caseTotal = ClassicCaseList.Total; // 案例总条数
        // 精选案例
        // console.log(ChoicenessCaseList);
        this.classicCaseData = ChoicenessCaseList;
        // 热门专题
        // console.log(ThematicInfoList);
        this.hotNewData = ThematicInfoList;
      }
    });
  },
  methods: {
    // 案例地点切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 翻页
    // currentPage 改变时会触发
    handlePageChange(currentPage) {
      // console.log(currentPage); // 当前页码
      this.pageIndex = currentPage;
      this.getCaseList(
        this.pageIndex,
        this.caseTypeId,
        this.cityId,
        this.caseWord,
        this.sortTime,
        this.sortView
      ); // 查询案例
    },
    // 选择案例类型
    selectCaseType(id) {
      // console.log(id)
      this.pageIndex = 1;
      this.caseTypeId = id;
      // 查询案例
      this.getCaseList(
        this.pageIndex,
        this.caseTypeId,
        this.cityId,
        this.caseWord,
        this.sortTime,
        this.sortView
      ); // 查询案例
    },
    // 选择案例地点城市
    selectCity(id, name) {
      // console.log(id)
      this.cityId = id;
      this.cityName = name;
      this.showCity = false; // 隐藏城市列表
      this.pageIndex = 1;
      // 查询案例
      this.getCaseList(
        this.pageIndex,
        this.caseTypeId,
        this.cityId,
        this.caseWord,
        this.sortTime,
        this.sortView
      ); // 查询案例
    },
    // 按发布时间排序
    sortAtPublish() {
      // console.log(this.sortTime)
      this.sortTime == 0 ? this.sortTime = 2 : this.sortTime=0;
      // 获取页面数据
      // console.log(this.sortTime)
      this.getCaseList(
        this.pageIndex,
        this.caseTypeId,
        this.cityId,
        this.caseWord,
        this.sortTime,
        this.sortView
      );
    },
    // 按浏览量排序
    sortAtView() {
      // console.log(this.sortView)
      this.sortView == 0 ? this.sortView=2 : this.sortView=0;
      // 获取页面数据
      // console.log(this.sortView)
      this.getCaseList(
        this.pageIndex,
        this.caseTypeId,
        this.cityId,
        this.caseWord,
        this.sortTime,
        this.sortView
      );
    },
    // 搜索关键字
    handleSearch(){
      // console.log(this.caseWord)
      this.pageIndex = 1;
       this.getCaseList(
        this.pageIndex,
        this.caseTypeId,
        this.cityId,
        this.caseWord,
        this.sortTime,
        this.sortView
      );
    },
    // 获取案例
    // pageindex 页码
    // caseType 案例类型
    // caseCity 案例地点
    // caseTitle 案例标题关键字
    // sortAsc 排序（升降序）true(升序)/false(降序) 默认为true
    // sortType 排序类型  （”CreateTime”）以时间为条件/（”ViewingCount”）以浏览量为条件
    getCaseList(pageindex, caseType, caseCity, caseTitle, sortTime, sortView) {
      var params = {
        Body: {
          Page: pageindex == 1 ? 1 : pageindex,
          Rows: 7,
          ProjectPlace: caseCity == 0 ? 0 : caseCity,
          ProjectTypeId: caseType == 0 ? 0 : caseType,
          CaseTitle: caseTitle == "" ? "" : caseTitle,
          CreateTimeIsAsc: sortTime == 2 ? 2 : sortTime,
          ViewCountIsAsc: sortView == 2 ? 2 : sortView
        }
      };
      // console.log(params);
      getClassicCaseList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.caseData = Result.Models;
          this.caseTotal = Result.Total;
        }
      });
    },
    // 跳转到案例详情
    caseDetail(id){
      // console.log(id)
      let router = this.$router.resolve({path:'/caseDetail',query:{caseId:id}})
      window.open(router.href,'_blank')
    },
    // 跳转到行业文章详情
    articleDetail(id,typeId){
      // console.log(id)
      let router = this.$router.resolve({path:'/articleDetail',query:{articleId:id,typeId:typeId}})
      window.open(router.href,'_blank')
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.case {
  color: $color-black;
  font-size: $font-14;
  padding-bottom: 20px;

  .conditionList {
    display: inline-block;
    width: calc(100% - 40px);
    background-color: $color-white;
    padding: 10px 20px;
    margin-top: 20px;

    .condition, .condition1 {
      position: relative;
      line-height: 30px;
      margin-bottom: 10px;
      text-align: left;
      height: 31px;
      padding-right: 50px;
      overflow: hidden;

      .all {
        padding: 3px 10px;
        border-radius: 3px;
        margin-right: 10px;
        cursor: pointer;
      }

      .all:hover, .all.active {
        color: $color-white;
        background-color: $background-blue;
      }

      p {
        display: inline-block;
        width: calc(100% - 100px);
        height: auto;
        vertical-align: top;

        span {
          margin-right: 20px;
          padding: 3px 10px;
          border-radius: 3px;
          cursor: pointer;
        }

        span:hover, .active {
          color: $color-white;
          background-color: $background-blue;
        }

        span:first-child {
          font-weight: 400;
        }
      }

      .default {
        display: inline-block;
        width: auto;
        margin-left: 10px;
      }

      .el-button {
        position: absolute;
        top: 0;
        right: 0;
        color: $color-white;
        background-color: $background-blue;
        border-radius: 5px;
      }

      .el-button:hover {
        background-color: $link-hover;
      }

      .cityBox {
        display: inline-block;
        width: auto;

        .el-button {
          position: static;
        }
      }
    }

    .condition1 {
      height: auto;

      .el-button {
        background-color: $background-red;
      }

      .el-button:hover {
        background-color: $background-hover-red;
      }
    }

    .sort {
      text-align: left;
      margin-top: 20px;

      .sortList {
        display: inline-block;
        width: 300px;
        padding: 10px 0px;
        text-align: left;

        span {
          padding: 5px 10px;
          color: $color-grey;
          border: solid 1px $color-grey;
          border-radius: 3px;
          margin-right: 20px;
          cursor: pointer;

          i {
            display: inline-block;
            margin-left: 5px;
          }
        }

        span:hover, .active {
          color: $link-hover;
          // background-color:$link-hover;
          border-color: $link-hover;
        }
      }

      .search {
        display: inline-block;
        width: 280px;
        height: 40px;
        float: right;
        .el-input__inner{
          border:$border-grey;
        }
        .el-button{
          color:$color-white;
          background-color:$background-blue;
          border-radius:0 3px 3px 0;
        }
      }
    }
  }

  .content {
    width: $full;
    margin-top: 20px;

    .caseBox {
      background-color: $color-white;

      .caseList {
        ul {
          li {
            display: flex;
            border-bottom: solid 1px $border-color-grey;
            padding: 20px;
            cursor: pointer;

            img {
              flex: 0 0 260px;
              width: 250px;
              height: 150px;
              overflow: hidden;
            }

            .info {
              flex: 1;
              margin-left: 15px;

              p {
                line-height: 30px;
                text-align: left;
              }

              .name {
                height: 30px;
                font-size: $font-16;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .introduct {
                display: flex;
                margin-top: 30px;

                .left {
                  flex: 1;
                }

                .right {
                  flex: 0 0 150px;
                  width: 150px;
                  color: $color-grey;
                  font-size: $font-12;
                  padding-top: 30px;

                  .time {
                    padding-right: 10px;
                    text-align: right;
                  }

                  .view {
                    vertical-align: bottom;
                    text-align: right;

                    img {
                      width: 20px;
                      height: 15px;
                      vertical-align: top;
                      margin-top: 7px;
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

      .page {
        margin-top: 2px;
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
}

>>> .cityList {
  margin-bottom: 10px;

  span {
    line-height: 30px;
    margin-right: 15px;
  }

  p {
    display: inline-block;
    width: 720px;
    margin-left: 20px;
    vertical-align: top;

    span {
      color: $color-blue;
      cursor: pointer;
    }

    span:hover {
      color: $link-hover;
    }
  }

  .letter {
    color: $color-black;
  }
}
</style>
