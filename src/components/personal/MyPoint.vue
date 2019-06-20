<template>
  <div class="page">
    <div class="pointInfo">
      <div class="listBox">
          <div class="title"> 
              积分管理
          </div>
          <div class="pointBoxLeft">
              <img src="@/assets/img/member/jifen.png" alt="积分" style=""/>
              <p>
                  <span class="spanLeft">我的积分</span>
                  <span class="spanRight">{{integralNum}}</span>
              </p>
          </div>
          <div class="pointBoxRight">
              <p class="pLeft">积分介绍</p>
              <p class="pRight">完善资料、完成积分任务可以获得积分奖励，积分在平台及子平台使用。可用于兑换服务及商品</p>
          </div> 
       </div>
    </div>
    <div class="memberInfo">
        <div class="content content-buildService" id="memeberji" style="padding:0px;">
            <div class="content-main">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="积分规则" name="first" style="text-algin:ctent;font-size:18px;">
                    <template>
                        <el-table :data="tableData" stripe border :header-cell-style="styleObj" style="width: 95%;margin-left: 17px;">
                        <el-table-column prop="IntegralTypeName" label="行为" width="250" align="center"></el-table-column>
                        <el-table-column prop="IntegralNum" label="积分奖励" width="250" align="center"></el-table-column>
                        <el-table-column prop="Frequency" label="频次" align="center"> </el-table-column>
                        </el-table>
                    </template>
                    </el-tab-pane>
                    <el-tab-pane label="收支明细" name="third">
                    <div class="project" style="height:441px;">
                        <template>
                        <el-table :data="integralData" stripe border :header-cell-style="styleObj" style="width: 95%;margin-left: 17px;">
                            <el-table-column prop="CreateTime" :formatter="formatDate" label="获取时间" width="250" align="center"></el-table-column>
                            <el-table-column prop="IntegralNum" label="收入/支出" width="200" align="center"></el-table-column>
                            <el-table-column prop="IntegralTypeName" label="行为说明" align="center"> </el-table-column>
                        </el-table>
                        </template>
                    </div>
                    <div class="page" style="margin-top: 15px;">
                    <el-pagination
                        background
                        :current-page="pageIndex"
                        layout="prev, pager, next"
                        :page-size="10"
                        :total="integralListTotal"
                        @current-change="handlePageChange">
                        </el-pagination>
                    </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
  getIndustryQAList,
  getIndustryQATypeList,
  getIntegralTypeList,
  getIntegralList
} from "../../api/api";
export default {
  data() {
    return {
      styleObj: {'background-color':'#eee'},
      activeName: 'first',
      tabPosition: 'top',
      tableData: [],
      integralData:[],
      integralListTotal: 0,
      pageIndex: 1,
      integralNum:0,
      }
  },
  created() {
    // 获取页面数据并渲染
    this.getMyIntegralType(1);
  },
  methods: {
    //选项卡切换事件
    handleClick(tab, event) {
      console.log(tab, event);
      if (this.tableData.length == 0) {
        this.getMyIntegralType(); 
      }
      if (this.integralData.length == 0) {
        this.getIntegralList(this.pageIndex); 
      }
    },
    // 获取积分类型
    getMyIntegralType(){
      const token = JSON.parse(sessionStorage.getItem("token"));
      this.integralNum=sessionStorage.getItem("integralNum");
      const params = {
        Body: {
          Token: token
        }
      };
      getIntegralTypeList(params).then(data => {
        let { Message, ReturnCode, Result } = data;
        if (ReturnCode == 200) {
          for(var i=0;i<Result.length;i++)
          {
            Result[i].Frequency="每天限"+Result[i].Frequency+"次";
          }
          this.tableData=Result;
        }
      });
    },
    //获取积分收支明细
    getIntegralList(pageIndex)
    {
      const token = JSON.parse(sessionStorage.getItem("token"));
      //时间戳
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      //绑定请求参数
      const params = {
        Body: {
          Token: token,
          Page: pageIndex,
          Rows: 10,
          Sort: "CreateTime",
          IsAsc:false
        }
      };
      getIntegralList(params).then(data => {
        let { Message, ReturnCode, Result } = data;
        if (ReturnCode == 200) {
            console.log(Result.Models);
          this.integralData = Result.Models;
          this.integralListTotal = Result.Total;
        }
      });
    },
    formatDate: function (row, column) {
      var fmt="yyyy-MM-dd hh:mm:ss";
      var date = new Date(row.CreateTime);
      var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日   
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;
    },
    handlePageChange(currentPage) {
      this.pageIndex = currentPage;
      this.getIntegralList(this.pageIndex);
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  .pointInfo {
    display: flex;
    background-color: $color-white;
    padding: 20px 0px 20px 0px;

    .listBox
    {
      width:100%;

      .title
      {
        padding: 6px 20px;
        text-align: left;
        font-size: 18px;
        color: #409EFF;
      }

      .pointBoxLeft
      {
          border-top: 3px solid rgb(62, 125, 241);
          height: 100px;
          width: 180px;
          float:left;
          p{
            float:left;
            width: 100px;
            margin-top: 20px;
          }

          .spanLeft
          {
            font-size: 16px;font-weight: 550;
          }

          .spanRight
          {
            font-size: 30px;font-weight: 700;color: rgb(56, 123, 238);line-height: 50px;
          }
      }

      .pointBoxRight
      {
         border-top: 1px solid rgb(220, 220, 220);
         height: 100px;
         margin-left: 120px;
         margin-top:2px;

         .pLeft{
            text-align: left;margin-left: 150px;margin-top: 20px;font-size: 16px;
         }

          .pRight{
            text-align: left;margin-left: 150px;margin-top: 10px;font-size: 14px;
         }
      }

      img {
        width: 40px;
        height: 40px;
        margin-right:10px;
        vertical-align: middle;
        float:left;
        margin-left:30px;
        margin-top:15px;
      }
    }
    p {
      font-size: $font-16;
      line-height: 30px;
      text-align: left;
      img{
          vertical-align:top;
          margin-top:5px;
          margin-right:5px;
      }
    }

    .img {
      flex: 0 0 100px;
      width: 100px;

      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }

      .update {
        color: $color-blue;
        text-align: center;
        cursor: pointer;
      }

      .update:hover {
        color: $link-hover;
      }
    }

    .point, .member {
      flex: 0 0 300px;
      width: 200px;
      margin-left: 20px;
      margin-top:20px;
    }

    .member {
      flex: 1;
    }
  }

  .memberInfo {
    background-color: $color-white;
    margin-top: 20px;
    height :550px;
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

    .serviceBox {
      border-top: solid 1px $border-color-grey;

      .serviceInfo {
        padding: 20px;

        .level {
          margin: 10px auto;
        }

        p {
          color: $color-black;
          line-height: 30px;
          text-align: center;
        }
        .levelName{
            font-size:$font-16;
        }

        .endTime {
          color: $color-grey;
        }

        .none {
          color: $color-white;
        }

        .rights {
          height: 60px;
          line-height: 60px;
          color: $color-white;
          font-size: $font-20;
          background-color: #B0C11D;
        }

        .rightsInfo {
          background-color: #F7FAE9;
          padding: 20px 0;

          p {
            padding: 0 20px;
            font-size:$font-16;
            text-align: left;

            span {
              float: right;
            }
          }

          .descBox {
            margin-top: 20px;
            border-top: solid 1px $border-color-grey;

            ul {
              margin-top: 20px;

              li {
                p {
                  color: $color-grey;
                  font-size:$font-14;
                  line-height: 30px;
                }

                .title {
                  color: $color-black;
                  font-size: $font-16;
                  font-weight: 400;
                  border-left: solid 3px #B0C11D;
                  padding-left: 10px;
                  margin-bottom: 20px;
                }

                .desc {
                  font-size: $font-12;
                  line-height: 15px;
                  margin-bottom: 10px;
                }
              }
            }

            ul:first-child {
              margin-top: 0;
            }
          }
        }
      }

      .el-col:nth-child(2) {
        .rights {
          background-color: #FA9219;
        }

        .rightsInfo {
          background-color: #FEF4E8;
        }

        .descBox {

          ul {
            li {
              .title {
                border-color: #FA9219;
              }
            }
          }
        }
      }

      .el-col:nth-child(3) {
        .rights {
          background-color: #497EF0;
        }

        .rightsInfo {
          background-color: #ECF3FD;
        }

        .descBox {

          ul {
            li {
              .title {
                border-color: #497EF0;
              }
            }
          }
        }
      }
    }
  }

  #memeberji >>>.el-tabs__active-bar is-top{
    width: 90px; 
  }
  #memeberji >>>.el-tabs__item:hover {
  
  }

  #memeberji >>>.el-tabs__item{
      width:120px;
  }

  #memeberji >>>.el-tabs__item.is-active{
      width:120px;
  }
}
</style>
