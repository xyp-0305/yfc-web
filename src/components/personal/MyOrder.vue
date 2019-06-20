<template>
  <div class="page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0">
        <div class="orderList">
          <p class="head">
            <span class="col1">订单/产品图片</span>
            <span class="col2">时间/产品名称</span>
            <span class="col3">金额/产品项</span>
            <span class="col4">状态/单价</span>
            <span class="col5">操作/数量</span>
          </p>
          <ul>
            <li v-for="(item,index) in orderData" :key="index">
              <p>
                <span class="col1 order">订单号：{{item.OrderId}}</span>
                <span class="col2 time">订单提交时间：{{item.OrderDate}}</span>
                <span class="col3 price">￥{{item.TotalPrice}}</span>
                <span class="col4 status">{{item.OrderStatusName}}</span>
                <span class="col5 view" @click="orderDetail(item.OrderId)">查看详情</span>
              </p>
              <div class="product" v-for="(item1,index1) in item.ProductList" :key="index1">
                <div class="col1">
                  <p>
                    <img :src="HOST+item1.ImageUrl" :alt="item1.Name">
                  </p>
                </div>
                <div class="col2 name">
                  <p>{{item1.Name}}</p>
                </div>
                <div class="col3 item">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.ProductName}}</p>
                </div>
                <div class="col4 unitPrice">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">￥{{item2.UnitPrice}}</p>
                </div>
                <div class="col5 num">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.Quantity}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="page" v-show="orderTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="orderTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待付款" name="1">
        <div class="orderList">
          <p class="head">
            <span class="col1">订单/产品图片</span>
            <span class="col2">时间/产品名称</span>
            <span class="col3">金额/产品项</span>
            <span class="col4">状态/单价</span>
            <span class="col5">操作/数量</span>
          </p>
          <ul>
            <li v-for="(item,index) in orderData" :key="index">
              <p>
                <span class="col1 order">订单号：{{item.OrderId}}</span>
                <span class="col2 time">订单提交时间：{{item.OrderDate}}</span>
                <span class="col3 price">￥{{item.TotalPrice}}</span>
                <span class="col4 status">{{item.OrderStatusName}}</span>
                <span class="col5 view" @click="orderDetail(item.OrderId)">查看详情</span>
              </p>
              <div class="product" v-for="(item1,index1) in item.ProductList" :key="index1">
                <div class="col1">
                  <p>
                    <img :src="HOST+item1.ImageUrl" :alt="item1.Name">
                  </p>
                </div>
                <div class="col2 name">
                  <p>{{item1.Name}}</p>
                </div>
                <div class="col3 item">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.ProductName}}</p>
                </div>
                <div class="col4 unitPrice">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">￥{{item2.UnitPrice}}</p>
                </div>
                <div class="col5 num">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.Quantity}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="page" v-show="orderTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="orderTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已付款" name="2">
        <div class="orderList">
          <p class="head">
            <span class="col1">订单/产品图片</span>
            <span class="col2">时间/产品名称</span>
            <span class="col3">金额/产品项</span>
            <span class="col4">状态/单价</span>
            <span class="col5">操作/数量</span>
          </p>
          <ul>
            <li v-for="(item,index) in orderData" :key="index">
              <p>
                <span class="col1 order">订单号：{{item.OrderId}}</span>
                <span class="col2 time">订单提交时间：{{item.OrderDate}}</span>
                <span class="col3 price">￥{{item.TotalPrice}}</span>
                <span class="col4 status">{{item.OrderStatusName}}</span>
                <span class="col5 view" @click="orderDetail(item.OrderId)">查看详情</span>
              </p>
              <div class="product" v-for="(item1,index1) in item.ProductList" :key="index1">
                <div class="col1">
                  <p>
                    <img :src="HOST+item1.ImageUrl" :alt="item1.Name">
                  </p>
                </div>
                <div class="col2 name">
                  <p>{{item1.Name}}</p>
                </div>
                <div class="col3 item">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.ProductName}}</p>
                </div>
                <div class="col4 unitPrice">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">￥{{item2.UnitPrice}}</p>
                </div>
                <div class="col5 num">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.Quantity}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="page" v-show="orderTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="orderTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="关闭" name="3">
        <div class="orderList">
          <p class="head">
            <span class="col1">订单/产品图片</span>
            <span class="col2">时间/产品名称</span>
            <span class="col3">金额/产品项</span>
            <span class="col4">状态/单价</span>
            <span class="col5">操作/数量</span>
          </p>
          <ul>
            <li v-for="(item,index) in orderData" :key="index">
              <p>
                <span class="col1 order">订单号：{{item.OrderId}}</span>
                <span class="col2 time">订单提交时间：{{item.OrderDate}}</span>
                <span class="col3 price">￥{{item.TotalPrice}}</span>
                <span class="col4 status">{{item.OrderStatusName}}</span>
                <span class="col5 view" @click="orderDetail(item.OrderId)">查看详情</span>
              </p>
              <div class="product" v-for="(item1,index1) in item.ProductList" :key="index1">
                <div class="col1">
                  <p>
                    <img :src="HOST+item1.ImageUrl" :alt="item1.Name">
                  </p>
                </div>
                <div class="col2 name">
                  <p>{{item1.Name}}</p>
                </div>
                <div class="col3 item">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.ProductName}}</p>
                </div>
                <div class="col4 unitPrice">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">￥{{item2.UnitPrice}}</p>
                </div>
                <div class="col5 num">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.Quantity}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="page" v-show="orderTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="orderTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="4">
        <div class="orderList">
          <p class="head">
            <span class="col1">订单/产品图片</span>
            <span class="col2">时间/产品名称</span>
            <span class="col3">金额/产品项</span>
            <span class="col4">状态/单价</span>
            <span class="col5">操作/数量</span>
          </p>
          <ul>
            <li v-for="(item,index) in orderData" :key="index">
              <p>
                <span class="col1 order">订单号：{{item.OrderId}}</span>
                <span class="col2 time">订单提交时间：{{item.OrderDate}}</span>
                <span class="col3 price">￥{{item.TotalPrice}}</span>
                <span class="col4 status">{{item.OrderStatusName}}</span>
                <span class="col5 view" @click="orderDetail(item.OrderId)">查看详情</span>
              </p>
              <div class="product" v-for="(item1,index1) in item.ProductList" :key="index1">
                <div class="col1">
                  <p>
                    <img :src="HOST+item1.ImageUrl" :alt="item1.Name">
                  </p>
                </div>
                <div class="col2 name">
                  <p>{{item1.Name}}</p>
                </div>
                <div class="col3 item">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.ProductName}}</p>
                </div>
                <div class="col4 unitPrice">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">￥{{item2.UnitPrice}}</p>
                </div>
                <div class="col5 num">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.Quantity}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="page" v-show="orderTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="orderTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="自动取消" name="5">
        <div class="orderList">
          <p class="head">
            <span class="col1">订单/产品图片</span>
            <span class="col2">时间/产品名称</span>
            <span class="col3">金额/产品项</span>
            <span class="col4">状态/单价</span>
            <span class="col5">操作/数量</span>
          </p>
          <ul>
            <li v-for="(item,index) in orderData" :key="index">
              <p>
                <span class="col1 order">订单号：{{item.OrderId}}</span>
                <span class="col2 time">订单提交时间：{{item.OrderDate}}</span>
                <span class="col3 price">￥{{item.TotalPrice}}</span>
                <span class="col4 status">{{item.OrderStatusName}}</span>
                <span class="col5 view" @click="orderDetail(item.OrderId)">查看详情</span>
              </p>
              <div class="product" v-for="(item1,index1) in item.ProductList" :key="index1">
                <div class="col1">
                  <p>
                    <img :src="HOST+item1.ImageUrl" :alt="item1.Name">
                  </p>
                </div>
                <div class="col2 name">
                  <p>{{item1.Name}}</p>
                </div>
                <div class="col3 item">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.ProductName}}</p>
                </div>
                <div class="col4 unitPrice">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">￥{{item2.UnitPrice}}</p>
                </div>
                <div class="col5 num">
                  <p v-for="(item2,index2) in item1.SubitemList" :key="index2">{{item2.Quantity}}</p>
                </div>
              </div>
            </li>
          </ul>
          <div class="page" v-show="orderTotal>pageSize">
            <el-pagination
              background
              :current-page="pageIndex"
              layout="prev, pager, next"
              :page-size="pageSize"
              :total="orderTotal"
              @current-change="handlePageChange"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getOrderInfoList } from "../../api/api";
export default {
  data() {
    return {
      activeName: "0", // 当前标签页码
      orderType: 0, // 当前订单类型
      pageIndex: 1, // 当前页码
      pageSize: 5, // 每页显示条数
      orderData: [], // 订单数据
      orderTotal: 0 // 订单总条数
    };
  },
  created() {
    this.getOrder(this.orderType, this.pageIndex, this.pageSize);
  },
  methods: {
    // 标签切换
    handleClick(tab, event) {
      // console.log(tab, event);
      this.pageIndex = 1
      this.orderType = parseInt(this.activeName);
      this.getOrder(this.orderType, this.pageIndex, this.pageSize);
    },
    // 获取订单数据
    // orderType 订单类型
    // pageIndex 当前页码
    // pageSize 每页显示条数
    getOrder(orderType, pageIndex, pageSize) {
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
          OrderStatus: orderType,
          Page: pageIndex,
          Rows: pageSize
        }
      };
      getOrderInfoList(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.orderData = Result.Models;
          this.orderTotal = Result.Total;
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
      this.getOrder(this.orderType, this.pageIndex, this.pageSize);
    },
    // 跳转到订单详情
    orderDetail(id) {
    //   console.log(id);
      let router = this.$router.resolve({path:'/orderDetail',query:{orderId:id}})
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

  .orderList {
    .head {
      background-color: #E4E4E4;
      font-size: 0;

      span {
        display: inline-block;
        font-size: $font-16;
        line-height: 50px;
      }
    }

    .col1 {
      width: 25%;
    }

    .col2 {
      width: 40%;
    }

    .col3 {
      width: 15%;
    }

    .col4 {
      width: 10%;
    }

    .col5 {
      width: 10%;
    }

    ul {
      li {
        padding: 10px 0;
        border-bottom: solid 1px $border-color-grey;

        p {
          line-height: 30px;
        }

        >p {
          font-size: 0;

          span {
            display: inline-block;
            font-size: $font-14;
            font-weight: 700;
          }

          .view {
            color: $color-blue;
            cursor: pointer;
          }

          .view:hover {
            color: $link-hover;
          }
        }

        .product {
          font-size: 0;
          padding: 10px 0;
          border-top:dotted 2px $border-color-grey;

          >div {
            display: inline-block;
            font-size: $font-14;
            vertical-align:middle;

            p {
              line-height: 30px;

              img {
                width: 120px;
                height: 80px;
                vertical-align: top;
              }
            }
          }
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
