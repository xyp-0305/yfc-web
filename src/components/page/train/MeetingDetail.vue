<template>
  <div class="detail">
    <div class="banner">
      <img src="@/assets/img/banner-meeting.png" alt>
      <ul>
        <li :class="{'active':currentIndex==index}" v-for="(item,index) in menus" :key="index">
          <a
            href="javascript:void(0);"
            v-anchor="index+1"
            @click="handleCurrent(index)"
          >{{item.name}}</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <div id="anchor-1">
        <div class="img">
          <img src="@/assets/img/banner-1.jpg" alt>
          <div class="share">
            <span>分享</span>
            <span class="weixin">微信</span>
            <span class="qq">QQ</span>
            <span class="weibo">微博</span>
            <span class="collect" :class="{'collected':collect==true}" @click="handleCollect">
              <i class="el-icon-star-on"></i>
            </span>
            <el-button type="primary" @click="getMyCollect">获取我的收藏</el-button>
          </div>
        </div>
        <div class="info">
          <p class="title">第二十四届特色小镇高端总裁峰会</p>
          <div class="info1">
            <p>会议时间：2018-9-26 09:00 至 2018-9-28 18:00 结束</p>
            <p>会议地点：杭州 淳大万丽酒店 西湖区迎春路719号</p>
            <p>
              会议规模：500人
              <span class="enrolment">已报名：100人</span>
            </p>
          </div>
          <div class="info2">
            <p>发票类型：增值税普通发票 增值税专用发票</p>
            <p>领取方式：付费后在线申请</p>
            <p>发票内容：会议费 会务费 培训费</p>
            <p>参会凭证：凭报道通知现场签到</p>
          </div>
        </div>
      </div>
      <div class="price">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="type" label="席位类别" width="180"></el-table-column>
          <el-table-column prop="endtime" label="截止时间" width="180"></el-table-column>
          <el-table-column prop="price" label="单价" width="180"></el-table-column>
          <el-table-column prop="discount" label="折扣"></el-table-column>
          <el-table-column prop="number" label="数量">
            <template slot-scope="{row,$index}">
              <el-input-number
                v-model="tableData[$index].number"
                @change="handleChange($index,row,tableData)"
                :min="0"
                :max="10"
                label="数量"
              ></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="total">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="title">
            <span class="left">合计</span>
            <span class="right">{{total}}.00</span>
          </div>
          <div>
            <div class="left"></div>
            <div class="right">
              <p>
                <el-radio v-model="radio" label="1">酒店</el-radio>
              </p>
              <p class="warn">
                <span>请悉知：平台只为您保留需求，不代收房费</span>
              </p>
              <p class="room" prop="num1">
                <span>单人间</span>
                <el-input-number
                  v-model="ruleForm.num1"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
                <span>+0.00</span>
              </p>
              <p class="room" prop>
                <span>双人间</span>
                <el-input-number
                  v-model="ruleForm.num2"
                  @change="handleChange"
                  :min="1"
                  :max="10"
                  label="描述文字"
                ></el-input-number>
                <span>+0.00</span>
              </p>
              <p class="coupon">
                <el-checkbox v-model="ruleForm.checked1" @change="handleCheck">优惠券</el-checkbox>
                <el-select v-model="ruleForm.coupon" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span>-{{couponPrice}}.00</span>
              </p>
              <p class="point">
                <el-checkbox v-model="ruleForm.checked2" @change="handleCheck">积分抵扣</el-checkbox>
                <el-input v-model.number="ruleForm.point" placeholder="请输入积分"></el-input>
                <span>-{{pointPrice}}.00</span>
              </p>
            </div>
          </div>
          <div>
            <div class="left"></div>
            <div class="right">
              <p class="room">
                <span>折扣</span>
                <span>-{{discountPrice}}.00</span>
              </p>
            </div>
          </div>
          <div>
            <div class="left"></div>
            <div class="right">
              <p>
                <span>支付</span>
                <span>{{payPrice}}.00</span>
              </p>
              <p>
                <el-button type="primary" @click="getProduct">获取产品</el-button>
                <el-button type="primary" @click="getProductDetail">获取产品详情</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">提交付款</el-button>
                <el-button type="primary" @click="getInfo">获取参会付款信息</el-button>
                <el-button type="primary" @click="submitOrder">提交订单</el-button>
                <el-button type="primary" @click="getMyOrder">获取我的订单</el-button>
                <el-button type="primary" @click="getMyOrderDetail">获取我的订单详情</el-button>
              </p>
            </div>
          </div>
        </el-form>
      </div>
      <div id="anchor-2" name="beijing">
        <div class="head">峰会背景</div>
        <div class="body">峰会背景内容</div>
      </div>
      <div id="anchor-3" name="kuangjia">
        <div class="head">峰会框架</div>
        <div class="body">峰会框架内容</div>
      </div>
      <div id="anchor-4" name="jiabin">
        <div class="head">主讲嘉宾</div>
        <div class="body">主讲嘉宾内容</div>
      </div>
      <div id="anchor-5" name="zhinan">
        <div class="head">参会指南</div>
        <div class="body">
          <p>参会说明：</p>

          <p>现场签到方式：报名微信扫码，或者手动输入报名手机号码均可，领取参会证进入会场。</p>

          <p>活动地址：XXXXXXXXXXXXXXXXXX</p>

          <p>公交路线：可乘坐公交XX、XX、XXX、XX、XXX路至XXXXXXX站，到站步行X分钟即到。</p>

          <p>地铁路线：可乘坐地铁XX、XX号线换乘XX号线至XXXXXXX站，出站步行X分钟即到。</p>

          <p>驾车路线： 驾车导航至“XXXXXXXXXXXXX停车场”，凭参会凭证免费停车。</p>

          <p>贴心提示： 请您提前掌握杭州交通信息，避开严重拥堵的区域和路线，错峰出行或乘坐公共交通工具出行。</p>

          <p>热门问题</p>

          <p>Q1：如何确认是否报名成功？</p>

          <p>付费成功后，系统将自动下发短信。若有疑问可咨询客服。</p>

          <p>Q2：如何入场，有什么凭证？</p>

          <p>报名成功后，我们会第一时间给报名参会者发送报名确认短信和邮件，安排服务经理一对一服务，活动当天可到现场签到台签到，并领取相应胸牌入场。</p>

          <p>Q3：座位是如何分布的，能不能帮我预留座位？</p>

          <p>本次峰会为400人以上规模，我们将设立贵宾和普通参会二种门票类型，其中贵宾限额X张。本次峰会不设预留位置，签到入场较早的观众可以按照自己的门票类型到指定区域内就坐。</p>

          <p>Q4：峰会相关照片及视频会有吗？</p>

          <p>峰会现场会有专门的摄影团队进行照片拍摄及上传，您可在峰会现场第一时间获得活动照片。峰会结束后，您可在壹方城官网及会员专区查看嘉宾的精彩分享内容及演讲片段。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {formatMoney} from './../../../util/util.js'
import {
  getSummitList,
  getSummitInfo,
  addMyCollectInfo,
  getMyCollectList,
  delectMyCollectInfo,
  submitPayment,
  getParticipantsInfo,
  submitOrder,
  getOrderInfoList,
  getOrderItemInfo
} from "../../../api/api";
export default {
  data() {
    return {
      ruleForm: {
        num1: 1,
        num2: 1,
        checked1: false,
        checked2: false,
        coupon: "",
        point: ""
      },
      rules: {
        coupon: [
          { required: false, message: "请选择优惠券", trigger: "change" }
        ],
        point: [{ required: true, message: "请填写积分", trigger: "blur" }]
      },
      menus: [
        {
          id: 1,
          name: "参会报名"
        },
        {
          id: 2,
          name: "峰会背景"
        },
        {
          id: 3,
          name: "峰会框架"
        },
        {
          id: 4,
          name: "主讲嘉宾"
        },
        {
          id: 5,
          name: "参会指南"
        }
      ],
      currentIndex: 0,
      total: 0,
      couponPrice: 0,
      pointPrice: 0,
      discountPrice: 0,
      payPrice: 0,
      radio: "1",
      collect: false,
      tableData: [
        {
          type: "普通席位",
          endtime: "2018-7-5 24:00:00",
          price: "6800.00",
          discount: "3人（含）以上7.1折",
          number: 0
        },
        {
          type: "VIP席位",
          endtime: "2018-7-5 24:00:00",
          price: "8800.00",
          discount: "年度会员免费参与",
          number: 0
        },
        {
          type: "贵宾席",
          endtime: "2018-7-5 24:00:00",
          price: "9800.00",
          discount: "年度会员享受8折",
          number: 0
        }
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      input: "",
      ProId: 0,
      uuid: 0,
      summitId: 0,
      name: "",
      place: "",
      time: ""
    };
  },
  methods: {
    // 设置当前高亮
    handleCurrent(index) {
      this.currentIndex = index;
    },
    // 席位选择
    handleChange(index, row, tableData) {
      console.log(index);
      console.log(row); // 当前行的数据
      console.log(tableData);
      let price = 0;
      const seatData = tableData.filter(item => {
        // 获取已选席位的数据
        return item.number !== 0;
      });
      // console.log(seatData)
      seatData.forEach(element => {
        price += element.number * element.price; // 计算已选席位的总价
      });
      // console.log(price)
      // this.total = formatMoney(price,2,'￥')
      this.total = price;
      this.payPrice = this.total - this.discountPrice;
    },
    // 收藏/取消收藏
    handleCollect() {
      console.log(this.summitId);
      this.collect = !this.collect;
      if (this.collect == true) {
        // 添加我的收藏
        const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
        const key = "RWERFGSDDGTWETGD";
        const sign = this.$md5(
          key + "Key" + key + "Timestamp" + timestamp + key
        ).toUpperCase();
        const token = JSON.parse(sessionStorage.getItem("token"));
        const collectParams = {
          Key: key,
          Sign: sign,
          Timestamp: timestamp,
          Body: {
            Token: token,
            CollectType: 3,
            CollectContentId: this.summitId
          }
        };
        addMyCollectInfo(collectParams).then(data => {
          console.log(data);
        });
        this.$message({
          message: "收藏成功！",
          type: "success"
        });
      } else {
        // 取消收藏
        const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
        const key = "RWERFGSDDGTWETGD";
        const sign = this.$md5(
          key + "Key" + key + "Timestamp" + timestamp + key
        ).toUpperCase();
        const token = JSON.parse(sessionStorage.getItem("token"));
        const collectParams = {
          Key: key,
          Sign: sign,
          Timestamp: timestamp,
          Body: {
            Token: token,
            Id:2
          }
        }
        delectMyCollectInfo(collectParams).then(data=>{
          console.log(data)
        })
        this.$message("已取消收藏！");
      }
    },
    // 获取我的收藏
    getMyCollect() {
      // 获取我的收藏
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const collectParams = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          CollectType:3,
          Page:1,
          Rows:5
        }
      };
      getMyCollectList(collectParams).then(data => {
        console.log(data)
      });
    },
    handleCheck(data) {
      console.log(data);
      this.discountPrice = this.couponPrice + this.pointPrice;
      this.payPrice = this.total - this.discountPrice;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log(this.ruleForm);
        if (valid) {
          // alert("submit!");
          this.$message({
            message: "submit!",
            type: "success"
          });
          const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
          const key = "RWERFGSDDGTWETGD";
          const sign = this.$md5(
            key + "Key" + key + "Timestamp" + timestamp + key
          ).toUpperCase();
          const token = JSON.parse(sessionStorage.getItem("token"));
          // 提交付款
          const payParams = {
            Key: key,
            Sign: sign,
            Timestamp: timestamp,
            Body: {
              UserId: 1,
              UserName: "张三",
              OriginalPrice: "100.00",
              DiscountPrice: "10.00",
              IntegralDiscount: "10.00",
              TotalPrice: "80.00",
              Name: this.name,
              SummitId: this.summitId,
              Place: this.place,
              Time: this.time,
              Token: token,
              PaymentCommoditiesList: [
                {
                  ProductId: 1,
                  ProductName: "普通席位",
                  UnitPrice: "10000.00",
                  Quantity: 1,
                  DateTime: "2019-4-18 17:03:00"
                }
              ]
            }
          };
          submitPayment(payParams).then(data => {
            console.log(data);
            this.ProId = data.Result;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取参会付款信息
    getInfo() {
      console.log(this.ProId);
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
          Id: this.ProId
        }
      };
      getParticipantsInfo(params).then(data => {
        console.log(data);
        this.uuid = data.Result.ProductList[0].UUID;
      });
    },
    // 提交订单
    submitOrder() {
      console.log(this.uuid);
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const orderParams = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          PayType: 1,
          InvoiceInfo: {
            InvoiceType: 1,
            InvoiceBody: 1,
            InvoiceTitle: "发票抬头",
            TaxNumber: "1111111",
            Name: "张三",
            TelPhone: "1414",
            Address: "XXX市",
            RegisteredAddress: "注册地址",
            RegisteredPhone: "注册电话123",
            Bank: "建设银行",
            BankNumber: "110452526366667"
          },
          ParticipantList: [
            {
              OrderId: this.ProId,
              OrderItemUUID: this.uuid,
              Contact: "小王",
              ContactNumber: "1234567890",
              LicenseNumber: "110256199036244647",
              Email: "XXX@163.com",
              Company: "某公司",
              Position: "CEO"
            }
          ]
        }
      };
      submitOrder(orderParams).then(data => {
        console.log(data);
      });
    },
    // 获取我的订单
    getMyOrder() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const orderParams = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Page: 1,
          Rows: 5
        }
      };
      getOrderInfoList(orderParams).then(data => {
        console.log(data);
      });
    },
    // 获取我的订单详情
    getMyOrderDetail() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));
      const orderParams = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id: this.ProId
        }
      };
      getOrderItemInfo(orderParams).then(data => {
        console.log(data);
      });
    },
    // 获取峰会/游学产品
    getProduct() {
      const params = {
        Body: {
          TypeId: 1,
          Page: 1,
          Rows: 5
        }
      };
      getSummitList(params).then(data => {
        console.log(data);
        this.summitId = data.Result.Models[0].Id;
      });
    },
    // 获取峰会/游学产品详情
    getProductDetail() {
      console.log(this.summitId);
      const params = {
        Body: this.summitId
      };
      getSummitInfo(params).then(data => {
        console.log(data);
        this.name = data.Result.Title;
        this.place = data.Result.MeetingPlace;
        this.time = data.Result.StartTime;
      });
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';

.detail {
  width: $full;

  .banner {
    width: $full;
    height: auto;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    img {
      width: $full;
      height: 250px;
    }

    ul {
      height: 50px;

      li {
        display: inline-block;
        line-height: 50px;
        font-size: $font-16;
        margin: 0 50px;

        a {
          color: $color-black;
        }

        a:hover {
          color: $link-hover;
        }
      }

      .active {
        a {
          color: $color-blue;
        }
      }
    }
  }

  .content {
    padding: 0 60px;
    height: auto;

    >div {
      border: $border-grey;
      text-align: left;
      margin-top: 20px;

      .img {
        display: inline-block;
        margin: 20px;

        img {
          width: 500px;
          height: 280px;
        }

        .share {
          .weixin, .qq, .weibo {
            display: inline-block;
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 50%;
            color: $color-white;
            font-size: $font-13;
            text-align: center;
            margin: 10px;
            margin-bottom: 0;
          }

          .weixin {
            background-color: #5cb55c;
          }

          .qq {
            background-color: #3fb1e7;
          }

          .weibo {
            background-color: #fd8149;
          }

          .collect {
            color: $color-grey;
            font-size: 30px;
            float: right;
            margin-top: 10px;
            cursor: pointer;
          }

          .collect:hover {
            color: $color-blue;
          }

          .collected {
            color: $color-blue;
          }
        }
      }

      .info {
        display: inline-block;
        margin: 20px;
        vertical-align: top;

        p {
          line-height: 30px;
          color: $color-black;

          .enrolment {
            color: $color-blue;
            margin-left: 20px;
          }
        }

        .title {
          font-size: $font-24;
        }

        .info1 {
          margin: 20px 0;
        }

        .info2 {
          p {
            color: $color-grey;
          }
        }
      }

      .head {
        height: 50px;
        line-height: 50px;
        border-bottom: solid 1px rgba(204, 204, 204, 1);
        padding: 0 50px;
      }

      .body {
        color: $color-black;
        font-size: $font-14;
        padding: 0 50px;

        p {
          line-height: 40px;
        }
      }
    }

    .total {
      padding: 0 50px;

      .el-form {
        >div {
          display: flex;

          .left {
            flex: 1;
          }

          .right {
            flex: 0 0 300px;
            width: 300px;
          }
        }

        p {
          width: 300px;
          height: 30px;
          line-height: 30px;
          display: inline-block;
          margin-bottom: 10px;

          span:last-child {
            float: right;
            color: $color-blue;
            margin-left: 10px;
          }

          .el-input, .el-select {
            display: inline-block;
            width: 130px;
          }

          .el-select {
            margin-left: 15px;
          }

          .el-checkbox {
            margin-right: 10px;
          }

          .el-button {
            float: right;
          }
        }

        .warn {
          font-size: $font-12;
          padding-left: 15px;

          span {
            color: #FF0000 !important;
          }
        }

        .room {
          padding-left: 25px;

          span:first-child {
            margin-right: 25px;
          }
        }

        .coupon, .point {
          padding-left: 0;
          width: 325px;
        }

        .title {
          color: $color-blue;
          display: block;
          width: 100%;
          height: 30px;
          line-height: 30px;
          margin-left: 0;
          margin: 10px 0;

          .right {
            float: right;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
