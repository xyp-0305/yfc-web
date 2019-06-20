<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="sidebar">
          <ul>
            <li v-for="(item,index) in sidebar" :key="index">
              <p v-if="item.children" class="main" @click="showChild(index)">
                <img :src="item.img" :alt="item.title">
                {{item.title}}
                <i
                  v-show="!item.showChild"
                  class="iconfont icon-jiantou-right"
                ></i>
                <i v-show="item.showChild" class="iconfont icon-jiantou-down"></i>
              </p>
              <p
                v-else
                :class="item.name==routeName ? 'main active':'main'"
                @click="handleRoute(item.name)"
              >
                <img :src="item.img" :alt="item.title">
                {{item.title}}
              </p>
              <el-collapse-transition>
                <ul v-show="item.showChild">
                  <li v-for="(item1,index1) in item.children" :key="index1">
                    <p :class="{active:item1.name==routeName}" @click="handleRoute(item1.name)">
                      <img :src="item1.img" :alt="item1.title">
                      {{item1.title}}
                    </p>
                  </li>
                </ul>
              </el-collapse-transition>
            </li>
          </ul>
        </div>
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content">
          <transition name="move" mode="out-in">
            <keep-alive :include="menuList">
              <router-view></router-view>
            </keep-alive>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from "./../common/bus";
export default {
  data() {
    return {
      sidebar: [
        {
          name: "member",
          title: "会员中心",
          img: require("@/assets/img/personal/member.png")
        },
        {
          name: "personalService",
          title: "个人服务",
          img: require("@/assets/img/personal/service.png"),
          showChild: false,
          children: [
            {
              name: "myOrder",
              title: "我的订单",
              img: require("@/assets/img/personal/myorder.png")
            },
            {
              name: "myCollect",
              title: "我的收藏",
              img: require("@/assets/img/personal/mycollect.png")
            },
            {
              name: "myQA",
              title: "我的问答",
              img: require("@/assets/img/personal/myqa.png")
            },
            {
              name: "myDemand",
              title: "我的需求",
              img: require("@/assets/img/personal/mydemand.png")
            },
            {
              name: "myPoint",
              title: "积分管理",
              img: require("@/assets/img/personal/mypoint.png")
            },
            {
              name: "feedback",
              title: "意见反馈",
              img: require("@/assets/img/personal/feedback.png")
            }
          ]
        },
        {
          name: "bill",
          title: "发票管理",
          img: require("@/assets/img/personal/bill.png"),
          showChild: false,
          children: [
            {
              name: "myBill",
              title: "发票管理",
              img: require("@/assets/img/personal/mybill.png")
            }
          ]
        },
        {
          name: "spread",
          title: "推广",
          img: require("@/assets/img/personal/spread.png"),
          showChild: false,
          children: [
            {
              name: "invitSpread",
              title: "邀请推广",
              img: require("@/assets/img/personal/myspread.png")
            }
          ]
        }
      ],
      menuList: [],
      routeName: "member"
    };
  },
  created() {
    bus.$on("menu", msg => {
      let arr = [];
      for (let i = 0; i < msg.length; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.menuList = arr;
    });
  },
  methods: {
    // 切换左侧导航栏
    showChild(index) {
      this.sidebar[index].showChild = !this.sidebar[index].showChild;
    },
    // 点击左侧导航栏跳转到对应的路由
    handleRoute(name) {
      // console.log(name)
      this.$router.push({ name: name });
      bus.$emit("menu", name);
      this.routeName = name;
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.content {
  padding: 20px 0;

  .sidebar {
    background-color: $color-white;

    ul {
      li {
        p {
          line-height: 50px;
          height: 50px;
          padding: 0 20px;
          color: $color-grey;
          font-size: $font-16;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;

          img {
            vertical-align: top;
            margin-top: 13px;
            margin-right: 10px;
          }
        }

        .main {
          position: relative;
          line-height: 60px;
          height: 60px;
          color: $color-black;
          text-align: left;
          border-top: solid 1px $border-color-grey;
          padding-right: 20px;

          img {
            margin-top: 18px;
          }

          i {
            position: absolute;
            right: 10px;
            // top:5px;
            color: $color-grey;
          }
        }

        p:hover, .active {
          color: $link-hover;
        }

        >ul {
          border-top: solid 1px $border-color-grey;

          li {
            p{
              text-align:left;
              padding-left:60px;
            }
            p:hover {
              color: $link-hover;
            }
          }
        }
      }

      li:first-child {
        .main {
          border: none;
        }
      }
    }
  }
}
</style>
