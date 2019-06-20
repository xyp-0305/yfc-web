<template>
  <div class="supplier">
    <div>
      <img class="logo" :src="suppliersData.supplierImg" :alt="suppliersData.supplierName">
      <div class="info">
        <p class="name">
          <span>{{suppliersData.supplierName}}</span>
          <img v-show="suppliersData.isCertificate" src="@/assets/img/img-renzheng.png" alt="认证">
          <img v-show="suppliersData.isGuarantee" src="@/assets/img/img-zhibao.png" alt="质保">
        </p>
        <p>
          <i class="el-icon-location"></i>
          <span>{{suppliersData.supplierProvince}}</span>
          <span>{{suppliersData.supplierCity}}</span>
          <input class="enter" type="button" value="进入店铺">
        </p>
      </div>
    </div>
    <div class="tags">
      <p v-show="suppliersData.tags.length>0">
        <img :src="suppliersData.imgTag" alt="标签">
        <span v-for="(item,index) in suppliersData.tags" :key="index">{{item}}</span>
      </p>
      <p v-show="suppliersData.types.length>0">
        <img :src="suppliersData.imgType" alt="标签">
        <span v-for="(item,index) in suppliersData.types" :key="index">{{item}}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["suppliersData"],
  data() {
    return {};
  },
  created() {
    // const Timestamp1 = Math.round(new Date() / 1000); // 获取当前时间戳
    // console.log("时间戳1：--" + Timestamp1);
    // const key = "RWERFGSDDGTWETGD";
    // const sign1 = this.$md5(
    //   key + "Key" + key + "Timestamp" + Timestamp1 + key
    // ).toUpperCase();
    // console.log("sign1：--" + sign1);
    // const data1 = {
    //   Key: key,
    //   Sign: sign1,
    //   Timestamp: Timestamp1,
    //   Body: "admin"
    // };
    // const url1 = this.HOST + "/api/Account/GetToken";
    // const url2 = this.HOST + "/api/Account/UserLogin";
    // const that = this;
    // that.$jquery.ajax({
    //   url: url1,
    //   type: "POST",
    //   data: data1,
    //   dataType: "json", //指定服务器返回的数据类型
    //   success: function(data) {
    //     var result = data;
    //     console.log("result1:--" + result);
    //     const Timestamp2 = Math.round(new Date() / 1000);
    //     console.log("时间戳2：--" + Timestamp2);
    //     const sign2 = that
    //       .$md5(key + "Key" + key + "Timestamp" + Timestamp2 + key)
    //       .toUpperCase();
    //     console.log("sign2:--" + sign2);
    //     const token = result.Result;
    //     console.log("token:--" + token);
    //     const loginData = {
    //       Phone: "admin",
    //       LoginPassword: "123456",
    //       LoginType: 1,
    //       Token: token
    //     };
    //     setTimeout(function() {
    //       that.$jquery.ajax({
    //         url: url2,
    //         type: "POST",
    //         data: {
    //           Body: loginData,
    //           Timestamp: Timestamp2,
    //           Key: key,
    //           Sign: sign2
    //         },
    //         dataType: "json", //指定服务器返回的数据类型
    //         success: function(data) {
    //           var result = JSON.stringify(data);
    //           console.log(result);
    //         },
    //         error: function(err) {
    //           console.log(err);
    //         }
    //       });
    //     }, 1000);
    //   },
    //   error: function(err) {
    //     console.log(err);
    //   }
    // });
    
    // this.$jquery.ajax({
    //         url: 'http://192.168.1.7:8088/api/HomePage/GetColumnList',
    //         type: "POST",
    //         // data:{
    //         //   Body:{
    //         //     Page:1,
    //         //     Rows:10
    //         //   }
    //         // },
    //         dataType: "json", //指定服务器返回的数据类型
    //         success: function(data) {
    //           console.log(data)
    //           console.log(data.Result)
    //           var result = JSON.parse(data.Result);
    //           console.log(result);
    //         },
    //         error: function(err) {
    //           console.log(err);
    //         }
    //       });
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';
.supplier {
  height:140px;
  padding: 10px;

  >div {
    display: flex;
    width: $full;
    font-size: $font-14;

    .logo {
      flex: 0 0 60px;
      width: 60px;
      height: 60px;
      border: $border-grey;
      margin-right: 10px;
    }

    .info {
      flex: 1;
      width: calc(100% - 70px);
      min-width: 150px;
      height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      p {
        line-height: 30px;
        text-align: left;

        span {
          margin-right: 10px;
        }

        img {
          display: inline-block;
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }

        .enter {
          color: $color-white;
          font-size: $font-12;
          background-color: $background-red;
        }
      }
    }
  }

  .tags {
    display: block;
    width: $full;
    height: auto;
    text-align: left;
    margin-top:10px;

    >p {
      display: inline-block;
      width: $full;
      height:30px;
      line-height: 30px;
      overflow: hidden;
      white-space: nowrap;

      img {
        display:inline-block;
        width:18px;
        height:18px;
        margin-right: 10px;
        vertical-align:middle;
      }

      span {
        font-size: $font-11;
        color: $color-white;
        background-color: $background-blue;
        padding: 2px 10px;
        margin-right: 10px;
      }
    }
  }
}
</style>
