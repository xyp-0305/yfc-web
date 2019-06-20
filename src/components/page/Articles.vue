<template>
  <div class="article">
    <div class="conditionList">
      <div class="condition">
        <span>案例类型:</span>
        <p>
          <span :class="articleTypeId==0 ?'all active':'all'" @click="selectArticleType(0)">全部</span>
          <span
            :class="{'active':articleTypeId==item.Id}"
            v-for="(item,index) in articleTypeData"
            :key="index"
            :id="item.Id"
            @click="selectArticleType(item.Id)"
          >{{item.Name}}</span>
        </p>
      </div>
      <div class="condition">
        <span>案例地点:</span>
        <span :class="cityId==0 ?'all active':'all'" @click="selectCity(0,'其他')">全部</span>
        <div class="default">
          当前选择城市：
          <div class="cityBox">
            <el-popover
              placement="right-start"
              width="800"
              ref="popoverCity"
              popper-class="city"
              v-model="showCity"
            >
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane
                  :label="item.name"
                  :name="item.name"
                  v-for="(item,index) in articleAddressData"
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
        </div>
      </div>
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
          <el-input placeholder="在当前条件下搜索" v-model="articleWord" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
          </el-input>
        </div>
      </div>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="grid-content">
            <div class="articleBox">
              <div class="articleList">
                <ul>
                  <li
                    v-for="(item,index) in articleData"
                    :key="index"
                    @click="articleDetail(item.Id,1)"
                  >
                    <p class="title">【{{item.NewsTypeName}}】{{item.NewsTitle}}</p>
                    <p class="desc">{{item.NewsContent}}</p>
                    <p class="info">
                      <span v-show="item.NewsFrom" class="from">来源：{{item.NewsFrom}}</span>
                      <span v-show="item.AuthorName" class="author">| 作者：{{item.AuthorName}}</span>
                      <span>| {{item.PlaceName}}</span>
                      <span class="view">
                        <img src="@/assets/img/news/view-white.png" alt="浏览">
                        浏览（{{item.ViewingCount}}）
                      </span>
                      <span class="time">{{item.CreateTime}} 发布</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div class="page">
                <el-pagination
                  background
                  :current-page="pageIndex"
                  layout="prev, pager, next"
                  :page-size="7"
                  :total="articleTotal"
                  @current-change="handlePageChange"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="listBox">
              <div class="hotNewList">
                <div class="title">
                  <span>热门专题</span>
                </div>
                <div class="newList">
                  <ul>
                    <li
                      v-for="(item,index) in hotNewData"
                      :key="index"
                      @click="articleDetail(item.Id,2)"
                    >
                      <div class="img">
                        <img :src="HOST+item.LogoUrl" :alt="item.ThematicName">
                        <!-- <p class="name">名称</p> -->
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="classicCaseList">
                <div class="title">
                  <span>精选案例</span>
                  <router-link class="more" :to="{name:'cases'}">查看更多</router-link>
                </div>
                <div class="caseList">
                  <ul>
                    <li
                      v-for="(item,index) in classicCaseData"
                      :key="index"
                      @click="caseDetail(item.Id)"
                    >
                      <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                      <div class="info">
                        <p class="name">{{item.CaseTitle}}</p>
                        <p class="address">项目地点：{{item.ProjectPlaceName}}</p>
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
import { getIndustryNewsPageList, getNewsList } from "../../api/api";
export default {
  data() {
    return {
      articleTypeId: 0, // 当前选择案例类型ID
      cityName: "全部", // 当前选择城市名称
      showCity:false, // 是否显示城市列表（默认隐藏）
      cityId: 0, // 当前选择城市ID
      activeName: "ABCD", // 案例地点-默认展示
      articleWord: "", // 搜索关键字
      sortTime: 2, // 按发布时间排序
      sortView: 2, // 按浏览量排序
      articleTypeData: [], // 文章类型
      articleAddressData: [], // 文章地点
      articleData: [], // 文章
      articleTotal: 0, // 文章总数量
      pageIndex: 1, // 当前页码(默认为1)
      classicCaseData: [], // 精选案例
      hotNewData: [] // 热门专题
    };
  },
  created() {
    // let typeId = this.$route.params.typeId
    // console.log(typeId)
    // 如果文章类型存在，则按类型获取文章
    // 如果文章类型不存在，则按默认方式获取文章
    // typeId?this.getArticleList(
    //     this.pageIndex,
    //     typeId,
    //     this.cityId,
    //     this.articleWord,
    //     this.sortTime,
    //     this.sortView
    //   ):
      this.initData();
    
  },
  methods: {
    // 初始化页面前获取数据
    initData(){
      // 获取页面数据
    const params = {
      Body: {
        Page: 1,
        Rows: 7
      }
    };
    getIndustryNewsPageList(params).then(data => {
      // console.log(data);
      let { Message, ReturnCode, Result } = data;
      // console.log(Result);
      if (ReturnCode == 200) {
        let {
          NewsTypeList,
          ProvincesList,
          IndustryNewsList,
          ChoicenessCaseList,
          ThematicInfoList
        } = Result;
        // 案例类型
        // console.log(ProjectTypeList)
        this.articleTypeData = NewsTypeList;
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
        this.articleAddressData.push(obj1);
        obj2.name = "EFGH";
        obj2.list = ProvincesList.slice(4, 8);
        this.articleAddressData.push(obj2);
        obj3.name = "JKLM";
        obj3.list = ProvincesList.slice(8, 12);
        this.articleAddressData.push(obj3);
        obj4.name = "NPQR";
        obj4.list = ProvincesList.slice(12, 16);
        this.articleAddressData.push(obj4);
        obj5.name = "STW";
        obj5.list = ProvincesList.slice(16, 19);
        this.articleAddressData.push(obj5);
        obj6.name = "XYZ";
        obj6.list = ProvincesList.slice(19, 22);
        this.articleAddressData.push(obj6);
        // console.log(this.caseAddressData);

        // 案例
        // console.log(ClassicCaseList)
        this.articleData = IndustryNewsList.Models;
        this.articleTotal = IndustryNewsList.Total; // 案例总条数
        // 精选案例
        // console.log(ChoicenessCaseList);
        this.classicCaseData = ChoicenessCaseList;
        // 热门专题
        // console.log(ThematicInfoList);
        this.hotNewData = ThematicInfoList;
      }
    });
    },
    // 文章地点切换
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    // 翻页
    // currentPage 改变时会触发
    handlePageChange(currentPage) {
      // console.log(currentPage); // 当前页码
      this.pageIndex = currentPage;
      // 查询文章
      this.getArticleList(
        this.pageIndex,
        this.articleTypeId,
        this.cityId,
        this.articleWord,
        this.sortTime,
        this.sortView
      ); 
    },
    // 选择案例类型
    selectArticleType(id) {
      // console.log(id)
      this.pageIndex = 1
      this.articleTypeId = id;
      // 查询文章
      this.getArticleList(
        this.pageIndex,
        this.articleTypeId,
        this.cityId,
        this.articleWord,
        this.sortTime,
        this.sortView
      ); 
    },
    // 选择案例地点城市
    selectCity(id, name) {
      // console.log(id)
      this.cityId = id;
      this.cityName = name;
      this.showCity = false; // 隐藏城市列表
      this.pageIndex = 1;
      // 查询文章
      this.getArticleList(
        this.pageIndex,
        this.articleTypeId,
        this.cityId,
        this.articleWord,
        this.sortTime,
        this.sortView
      ); 
    },
    // 按发布时间排序
    sortAtPublish() {
      // console.log(this.sortTime)
      this.sortTime == 0 ? this.sortTime = 2 : this.sortTime=0;
      // 获取页面数据
      // console.log(this.sortTime)
      // 查询文章
      this.getArticleList(
        this.pageIndex,
        this.articleTypeId,
        this.cityId,
        this.articleWord,
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
      // 查询文章
      this.getArticleList(
        this.pageIndex,
        this.articleTypeId,
        this.cityId,
        this.articleWord,
        this.sortTime,
        this.sortView
      ); 
    },
    // 搜索关键字
    handleSearch(){
      // console.log(this.caseWord)
      this.pageIndex = 1;
       // 查询文章
      this.getArticleList(
        this.pageIndex,
        this.articleTypeId,
        this.cityId,
        this.articleWord,
        this.sortTime,
        this.sortView
      ); 
    },
    // 获取文章
    // pageindex 页码
    // articleType 案例类型
    // articleCity 案例地点
    // articleTitle 案例标题关键字
    // sortAsc 排序（升降序）true(升序)/false(降序) 默认为true
    // sortType 排序类型  （”CreateTime”）以时间为条件/（”ViewingCount”）以浏览量为条件
    getArticleList(pageindex, articleType, articleCity, articleTitle, sortTime, sortView) {
      var params = {
        Body: {
          Page: pageindex == 1 ? 1 : pageindex,
          Rows: 7,
          Place: articleCity == 0 ? 0 : articleCity,
          NewsType: articleType == 0 ? 0 : articleType,
          NewsTitle: articleTitle == "" ? "" : articleTitle,
          CreateTimeIsAsc: sortTime == 2 ? 2 : sortTime,
          ViewCountIsAsc: sortView == 2 ? 2 : sortView
        }
      };
      // console.log(params);
      getNewsList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.articleData = Result.Models;
          this.articleTotal = Result.Total;
        }
      });
    },
    // 跳转到行业文章详情
    articleDetail(id,typeId){
      // console.log(id)
      let router = this.$router.resolve({path:'/articleDetail',query:{articleId:id,typeId:typeId}})
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

.article {
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

        .el-input__inner {
          border: $border-grey;
        }

        .el-button {
          color: $color-white;
          background-color: $background-blue;
          border-radius: 0 3px 3px 0;
        }
      }
    }
  }

  .content {
    width: $full;
    margin-top: 20px;

    .articleBox {
      background-color: $color-white;

      .articleList {
        ul {
          li {
            border-bottom: solid 1px $border-color-grey;
            padding: 10px 20px;
            cursor: pointer;

            p {
              line-height: 30px;
              text-align: left;
            }

            .title {
              height: 30px;
              font-size: $font-16;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .desc {
              color: #4E4E4E;
              font-size: $font-14;
              line-height: 25px;
              height: 100px;
              overflow: hidden;
              margin: 10px 0;
            }

            .info {
              .from {
                color: #B9BED1;
              }

              .author {
                color: #4E4E4E;
              }

              .time, .view {
                float: right;
                color: $color-grey;
                margin-left: 20px;

                img {
                  vertical-align: middle;
                  margin-top: -2px;
                  margin-right: 5px;
                }
              }
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

      .hotNewList {
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
                height: 172px;
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

      .classicCaseList {
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
