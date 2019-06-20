<template>
  <div class="page">
    <div class="statusInfo">
      <p>当前订单状态：{{statusName}} {{info}}</p>
      <div v-show="status==1">
        <p>
          您可以点击
          <span class="pay">付款</span>到付款页面进行支付
        </p>
        <p>如您对订单还有疑惑，欢迎您联系在线客服咨询</p>
      </div>
      <div v-show="status==2">
        <p>
          <el-button @click.native.prevent="handleRefund">申请退款</el-button>
        </p>
        <p>关于发票，如提交订单未申请发票可在当前页面下方申请；（如申请退款先需把发票寄回主办方）</p>
        <p>主办方会将在N个工作日内确认您的订单，请您在会前一周时间到当前页面下载报道通知；</p>
        <p>主办方确认订单后，您可以在当前页面选择您的席位；（如有不能选择的席位，则可能由于该席位已被其他客户选择以及您的订单不属于该区域）</p>
      </div>
    </div>
    <div class="orderInfo">
      <div class="title">
        <span>订单信息</span>
      </div>
      <p>
        <span>订单号：{{orderId}}</span>
        <span>下单时间：{{orderTime}}</span>
      </p>
      <div class="productInfo">
        <p class="head">
          <span class="col1">研学名称</span>
          <span class="col2">项</span>
          <span class="col3">单价</span>
          <span class="col4">数量</span>
          <span class="col5">金额</span>
        </p>
        <div class="productList" v-for="(item,index) in product" :key="index">
          <div class="col1">
            <p>{{item.Name}}</p>
            <p class="place">地点：{{item.Place}}</p>
            <p class="time">时间：{{item.Time}}</p>
          </div>
          <div class="col2">
            <p v-for="(item1,index1) in item.SubitemList" :key="index1">{{item1.ProductName}}</p>
          </div>
          <div class="col3">
            <p v-for="(item1,index1) in item.SubitemList" :key="index1">￥{{item1.UnitPrice}}</p>
          </div>
          <div class="col4">
            <p v-for="(item1,index1) in item.SubitemList" :key="index1">{{item1.Quantity}}</p>
          </div>
          <div class="col5">
            <p
              v-for="(item1,index1) in item.SubitemList"
              :key="index1"
            >￥{{item1.Quantity*item1.UnitPrice}}</p>
          </div>
        </div>
        <div class="productList">
          <div class="col1">
            <p>总计</p>
          </div>
          <div class="col2"></div>
          <div class="col3"></div>
          <div class="col4"></div>
          <div class="col5">
            <p>￥{{price}}</p>
            <p>(折扣)-￥{{discount}}</p>
            <p>(积分抵扣)-￥{{integralDiscount}}</p>
            <p>￥{{totalPrice}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="liaisonInfo">
      <div class="title">
        <span>人员信息</span>
      </div>
      <div class="liaison">
        <p>
          <span>姓名：</span>
          {{liaison.Contact}}
        </p>
        <p>
          <span>证件号：</span>
          {{liaison.LicenseNumber}}
        </p>
        <p>
          <span>手机：</span>
          {{liaison.ContactNumber}}
        </p>
        <p>
          <span>邮箱：</span>
          {{liaison.Email}}
        </p>
        <p>
          <span>公司：</span>
          {{liaison.Company}}
        </p>
        <p>
          <span>职位：</span>
          {{liaison.Position}}
        </p>
      </div>
    </div>
    <div class="invoiceInfo">
      <div class="title">
        <span>发票信息</span>
      </div>
      <div class="invoice">
        <P>发票申请量较大，申请提交后我们会统一提交财务，需等待7-10个工作日，如有问题请咨询在线客服</P>
        <p class="state" v-if="Object.keys(invoice).length>0">开票状态：已申请</p>
        <p class="state apply" v-else @click="handleInvoice">申请发票</p>
        <div class="invoiceDesc" v-show="Object.keys(invoice).length>0">
          <p>
            <span class="title">发票类型</span>
            <span>{{invoice.InvoiceType}}</span>
          </p>
          <p>
            <span class="title">发票抬头</span>
            <span>{{invoice.InvoiceTitle}}</span>
            <span class="title">税号</span>
            <span>{{invoice.TaxNumber}}</span>
          </p>
          <p>
            <span class="title">开户行</span>
            <span>{{invoice.Bank}}</span>
          </p>
          <p>
            <span class="title">开户行账号</span>
            <span>{{invoice.BankNumber}}</span>
          </p>
          <p>
            <span class="title">收票地址</span>
            <span>{{invoice.Name}}</span>
            <span>{{invoice.TelPhone}}</span>
            <span>{{invoice.Address}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderItemInfo } from "../../api/api";

export default {
  data() {
    return {
      orderId: 0, // 订单号
      orderTime: "", // 下单时间
      statusInfo: [
        {
          name: "待付款",
          info: "请在24小时内付款，若超时订单自动关闭"
        },
        {
          name: "已付款",
          info:
            "您已付款到平台，等待平台为您确认订单发出报道通知，您也可以联系在线客服咨询"
        },
        {
          name: "关闭",
          info: "您的订单已关闭"
        },
        {
          name: "已完成",
          info: "您的订单已确认完毕"
        },
        {
          name: "自动取消",
          info: "您的订单由于超过24小时未付款，已自动取消，请重新下单"
        }
      ],
      status: 0, // 订单状态
      statusName: "", // 订单状态名称
      info: "", // 订单提示文字
      product: [], // 产品信息
      price: 0, // 原价
      discount: 0, // 折扣价
      integralDiscount: 0, // 积分抵扣价格
      totalPrice: 0, // 应付价格
      liaison: {}, // 联系人信息
      invoice: {} // 发票信息
    };
  },
  created() {
    this.orderId = this.$route.query.orderId;
    // console.log(this.orderId);
    this.getOrderInfo(this.orderId);
  },
  methods: {
    // 获取订单详情
    getOrderInfo(id) {
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
          Id: id
        }
      };
      getOrderItemInfo(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        console.log(Result);
        if (ReturnCode == 200) {
          this.status = Result.OrderStatus;
          this.statusName = Result.OrderStatusName;
          this.statusInfo.forEach((e, i) => {
            if (this.status - 1 == i) {
              this.info = e.info;
            }
          });
          this.orderTime = Result.OrderDate;
          this.price = Result.OriginalPrice;
          this.discount = Result.DiscountPrice;
          this.integralDiscount = Result.IntegralDiscount;
          this.totalPrice = Result.TotalPrice;
          this.product = Result.ProductList;
          this.liaison = Result.ParticipantInfo;
          this.invoice =
            Result.InvoiceInfo == undefined ? {} : Result.InvoiceInfo;
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 申请退款
    handleRefund() {
      console.log(this.orderId);
      // 跳转到退款页面
      // ...
    },
    // 申请发票
    handleInvoice() {
      console.log(this.orderId);
      // 跳转到添加发票页面
      // ...
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  .statusInfo {
    padding: 10px 20px;
    background-color: $color-white;
    font-size: 0;

    p {
      font-size: $font-14;
      line-height: 40px;
      text-align: left;

      .pay {
        color: $color-blue;
        font-size: $font-20;
        cursor: pointer;
        margin: 0 5px;
      }

      .pay:hover {
        color: $link-hover;
      }

      .el-button {
        color: $color-white;
        background-color: $background-blue;
        border-radius: 5px;
        margin-top: 15px;
      }

      .el-button:hover {
        background-color: $link-hover;
      }
    }

    p:first-child {
      font-size: $font-16;
      line-height: 50px;
    }
  }

  .orderInfo {
    padding: 10px 0px;
    margin-top: 20px;
    background-color: $color-white;

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

    p {
      line-height: 30px;
      text-align: left;
    }

    >p {
      padding: 0 20px;
      margin-top: 10px;

      span {
        display: inline-block;
        font-size: $font-14;
        margin-right: 20px;
      }
    }

    .productInfo {
      margin-top: 20px;
      padding: 0 20px;

      .head {
        font-size: 0;
        height: 50px;
        line-height: 50px;

        span {
          display: inline-block;
          font-size: $font-16;
          text-align: center;
          border-top: solid 1px $border-color-grey;
          border-right: solid 1px $border-color-grey;
          border-bottom: solid 1px $border-color-grey;
          box-sizing: border-box;
        }

        span:first-child {
          border-left: solid 1px $border-color-grey;
        }
      }

      .productList {
        height: 120px;
        font-size: 0;

        >div {
          display: inline-block;
          height: $full;
          padding: 0 5px;
          font-size: $font-14;
          border-right: solid 1px $border-color-grey;
          border-bottom: solid 1px $border-color-grey;
          box-sizing: border-box;
          vertical-align: middle;

          p {
            text-align: center;
          }

          .place, .time {
            font-size: $font-12;
          }
        }

        >div:first-child {
          border-left: solid 1px $border-color-grey;

          p {
            text-align: left;
          }
        }

        >div:nth-child(3), >div:nth-child(5) {
          p {
            text-align: right;
          }
        }
      }

      .col1 {
        width: 40%;
      }

      .col2 {
        width: 15%;
      }

      .col3 {
        width: 15%;
      }

      .col4 {
        width: 10%;
      }

      .col5 {
        width: 20%;
      }
    }
  }

  .liaisonInfo {
    padding: 10px 0;
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

    .liaison {
      margin-top: 10px;
      padding: 0 20px;
    }

    p {
      line-height: 40px;
      text-align: left;

      span {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }
  }

  .invoiceInfo {
    padding: 10px 0;
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

    .invoice {
      margin-top: 10px;
      padding: 0 20px;

      .state {
        font-size: $font-18;
      }

      .apply {
        color: $color-blue;
        cursor: pointer;
      }

      .apply:hover {
        color: $link-hover;
      }

      p {
        font-size: $font-14;
        line-height: 45px;
        text-align: left;

        span {
          display: inline-block;
          line-height: 30px;
          background-color: #F7F7F7;
          padding: 0;
          padding: 0px 10px;
          border: $border-grey;
        }

        .title {
          width: 100px;
          text-align: right;
          border: none;
        }
      }
    }
  }
}
</style>
