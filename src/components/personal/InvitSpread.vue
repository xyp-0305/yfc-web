<template>
  <div class="page">
    <div class="personalInfo">
      <div class="listBox">
        <div class="title"> 
            <span>邀请推广</span>
        </div>
        <div class="personalLeft">
             <img src="@/assets/img/member/jifen.png" alt="积分"/>
              <p>
                  <span>积分累计收益:</span>
                  <span class="spanIntegralNum">{{sumIntegralNum}}</span>
              </p>
        </div>
        <div class="personalRight">
              <div>
                <p class="pTop">推广介绍</p>
                <p class="pBottom">
                    完成邀请用户注册后，邀请人会得到积分奖励，被邀请的人在平台内邀请
                    新人注册后，其邀请人也能得到平台的奖励。执行A→B→C的邀请方式。
                </p>
              </div>      
        </div> 
        </div>
    </div>
    <div class="invitationInfo">
        <div class="title"> 
          <div>
            <span>我的邀请函</span>
          </div>
        </div>
        <div class="titleBottom">
            <p>用微信或者手机浏览器扫描二维码获取邀请函，转发给微信好友/群</p>  
            <div id="qrcode"></div>   
        </div> 
    </div>
    <div class="memberInfo" style="height:560px;">
        <div class="title"> 
          <div>
            <span>邀请记录</span>
          </div>
        </div>
        <div class="titleBottom">
              <div class="project" style="height: 441px;margin-top: 20px;">
                  <template>
                  <el-table :data="recommendedData" stripe border :header-cell-style="styleObj" style="width: 95%;margin-left: 17px;">
                      <el-table-column prop="Name" label="姓名" width="300" align="center"></el-table-column>
                      <el-table-column prop="CreateTime" :formatter="formatDate" label="注册时间" width="300" align="center"></el-table-column>
                      <el-table-column prop="IntegralNum" label="积分收益" align="center"></el-table-column>
                  </el-table>
                  </template>
              </div>
              <div class="page" style="margin-top: 15px;text-align: center;">
                <el-pagination
                  background
                  :current-page="pageIndex"
                  layout="prev, pager, next"
                  :page-size="10"
                  :total="recommendedTotal"
                  @current-change="handlePageChange">
                  </el-pagination>
              </div>
        </div>
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'  
import {
  getRecommendedRecordList
} from "../../api/api";
export default {
  data() {
    return {
      styleObj: {'background-color':'#eee'},
      activeName: 'first',
      tabPosition: 'top',
      sumIntegralNum:0,
      recommendedLink:"",
      recommendedData: [],
      recommendedTotal: 0, 
      pageIndex: 1, 
      }
  },
  created() {
    // 获取页面数据并渲染
    this.getRecommendedList(1);
  },
  mounted()
  {
     
  },
  methods: {
    //获取邀请推广明细
    getRecommendedList(pageIndex)
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
      

      getRecommendedRecordList(params).then(data => {
        let { Message, ReturnCode, Result } = data;
        if (ReturnCode == 200) {
          this.sumIntegralNum = Result.Data.IntegralCount;
          this.recommendedLink=Result.Data.Link;
          this.recommendedData = Result.Models;
          this.recommendedTotal = Result.Total;
          document.getElementById("qrcode").innerHTML = "";
          let qrcode = new QRCode('qrcode', {  
            width: 100,  
            height: 100, // 高度  
            text: this.recommendedLink// 二维码内容  
          }); 
        }
      });
    },
    //分页方法
    handlePageChange(currentPage) {
      // console.log(currentPage); // 当前页码
      this.pageIndex = currentPage;
      // 积分收支明细
      this.getRecommendedList(this.pageIndex);
    },
    //格式化时间
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
    }
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  .personalInfo {
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

      .personalLeft {
          border-top: 3px solid rgb(62, 125, 241);
          height: 120px;
          width: 210px;
          float:left;

          img {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            vertical-align: middle;
            float: left;
            margin-left: 30px;
            margin-top: 35px;
          }

          p{
            float: left; 
            width: 150px;
            margin-top: 20px;
          }

          .spanIntegralNum
          {
            font-size: 20px;
            font-weight: 700;
            color: rgb(56, 123, 238);
            line-height: 50px;
          }
      }

      .personalRight {
          border-top: 1px solid rgb(220, 220, 220);
          height: 120px;
          margin-left: 150px;
          margin-top:2px;

          div
          {
            text-align: left;
            font-size: 16px; 
            margin-left: 100px;
            margin-top: 10px; 
            border-left: 1px solid rgb(220, 220, 220);
            height: 100px; 
          }

          .pTop
          {
            margin-left: 20px;
          }

          .pBottom
          {
            margin-left: 20px;text-align: left;margin-top: 25px;font-size:14px;padding-right: 50px;
          }
      }
    }
    p {
      font-size: $font-16;
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

  .invitationInfo{
    background-color: $color-white;
    margin-top: 20px;
    height :220px;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 10px 20px;

      div{
        width: 150px;margin-left: -20px;
      }

      span {
        border-left: solid 3px $color-blue;
        padding-left: 10px;
        margin-left: 10px;
      }

      a {
        float: right;
        color: $color-blue;
      }

      a:hover {
        color: $link-hover;
      }
    }

    .titleBottom
    {
      border-top: 1px solid rgb(220, 220, 220);
      height: 150px;
      margin-top:2px;
      text-align:left;

      p{
        margin-top: 10px;
        margin-left: 22px;
      }

      #qrcode {
        border: 1px solid rgb(220, 220, 220);
        width: 110px;
        margin-left: 22px;
        height: 110px;
        margin-top: 10px;
      }  
      #qrcode >>> img {
        margin-left :5px;
        margin-top :5px;
      }
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

      div
      {
        width: 150px;
        margin-left: -20px;
      }
      span {
        border-left: solid 3px $color-blue;
        padding-left: 10px;
        margin-left: 10px;
      }

      a {
        float: right;
        color: $color-blue;
      }

      a:hover {
        color: $link-hover;
      }
    }

    .titleBottom
    {
        border-top: 1px solid rgb(220, 220, 220);
        height: 150px;
        margin-top:2px;
        text-align:left;
    }
  }

}

</style>
