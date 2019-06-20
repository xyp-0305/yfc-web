<template>
  <div class="header">
    <div class="container">
      <div class="logo">
        <img src="@/assets/img/logo.png" alt="yfc">
        <div class="navbar" @mouseleave="hideSubitems">
          <div class="subnav">
            <h3>{{submenuTitle}}</h3>
            <div class="submenu" v-show="showSubmenu">
              <ul class="el-menu-demo" ref="submenu">
                <li
                  v-for="(item,index) in submenus"
                  :key="index"
                  @mouseover="showSubitems(index)"
                  :class="{'current':showitem == index}"
                >
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{item.ColumnName}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="subitems" v-show="index==showitem" v-for="(item,index) in submenus" :key="index">
            <ul v-show="item.NavigationList.length>0" v-for="(item1,index1) in item.NavigationList" :key="index1">
              <p>{{item1.ColumnName}}</p>
              <li
                v-show="item1.NavigationList.length>0"
                v-for="(item2,index2) in item1.NavigationList"
                :key="index2"
              >
                <a :href="item2.Url">{{item2.ColumnName}}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="nav">
        <div class="search">
          <el-input placeholder="请输入内容" v-model="word" class="input-with-select">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <el-button slot="append" @click="handleSearch">搜索</el-button>
          </el-input>
        </div>
        <div class="hotword">
          <span>热门搜索：</span>
          <a href>政策</a>
          <a href>专家</a>
          <a href>规划</a>
          <a href>运营</a>
        </div>
        <div class="menu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item
              :index="`${i+1}`"
              v-for="(item,i) in menus"
              :key="i"
              :class="$route.path==item.path ? 'is-active':''"
            >
              <router-link :to="{name:item.name}">{{item.meta.title}}</router-link>
            </el-menu-item>
          </el-menu>
        </div>
      </div>
      <div class="login">
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
        <el-dropdown :hide-on-click="false" @command="handleCommand">
          <span class="el-dropdown-link">
            个人中心
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="member">
              个人资料
              <!-- <router-link to="/personal"></router-link> -->
            </el-dropdown-item>
            <el-dropdown-item command="updatePassword">
              修改密码
              <!-- <router-link to="/updatePassword"></router-link> -->
            </el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import routes from "../../router/index.js";
import { getCommonalityHeadList } from "../../api/api.js";
export default {
  props: ["showSubmenu"],
  data() {
    return {
      activeIndex: "1",
      word: "", // 搜索内容
      state: "",
      result: [],
      timeout: null,
      subitemsShow: false,
      items: [],
      submenuTitle: "",
      submenus: [],
      showitem: -1
    };
  },
  created() {
    getCommonalityHeadList().then(data => {
      // console.log(data);
      let { ReturnCode, Message, Result } = data;
      // console.log(Result);
      if (ReturnCode == 200) {
        let { NavigationInfo, UserInfo } = Result;
        // console.log(NavigationInfo)
        this.submenuTitle = NavigationInfo.NavigationList[0].ColumnName; // 左侧栏目大标题
        this.submenus = NavigationInfo.NavigationList[0].NavigationList; // 左侧栏目列表
        // console.log(UserInfo)
      }
    });
  },
  methods: {
    // 搜索
    handleSearch() {
      console.log(this.word);
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        }
      ];
    },
    // 执行异步查询，将数据显示在输入框下面作为提示
    querySearchAsync(queryString, cb) {
      const result = this.result;
      const results = queryString
        ? result.filter(this.createStateFilter(queryString))
        : result;

      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 3000 * Math.random());
    },
    // 创建输入值的过滤器（如果输入值包含查询参数返回true,否则返回false）
    createStateFilter(queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    // 执行选择时，获取当前选项的数据
    handleSelect(item) {
      // console.log('active:'+item);
      this.activeIndex = item + "";
    },
    // 显示子栏目
    showSubitems(item) {
      // console.log(item);
      // if (this.subitemsShow) {
      //   this.subitemsShow = !this.subitemsShow;
      //   this.showitem = -1;
      // } else {
        if (this.submenus[item].NavigationList.length > 0) {
          // this.items = this.submenus[item].NavigationList;
          // console.log(this.items);
          // this.subitemsShow = true;
          this.showitem = item;
        } else {
          // this.subitemsShow = false;
          this.showitem = -1;
        }
      // }
    },
    // 隐藏子栏目
    hideSubitems(){
      // this.subitemsShow = false;
      this.showitem = -1;
      // this.items=[];
    },
    // 点击下拉菜单跳转到对应页面
    handleCommand(command) {
      // console.log(command)
      this.$router.push({ name: "" + command });
    }
  },
  computed: {
    // 获取导航栏数据
    menus() {
      return routes.options.routes.filter(data => {
        return data.name == "main";
      })[0]["children"];
    }
  },
  mounted() {
    // 当页面渲染后，加载所有数据
    this.result = this.loadAll();
    // console.log(this.menus);
    console.log(this.$route.path);
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.header {
  height: 130px;
  color: $color-black;
  background-color: $background-white;
  z-index: 5;

  .container {
    position: relative;
    width: 1200px;
    margin: 0 auto;
    height: $full;
    text-align: left;

    .logo {
      position: relative;
      display: inline-block;
      width: 200px;
      height: $full;
      margin: 10px 0;
      font-size: 0;

      img {
        width: 200px;
        height: 70px;
      }

      .subnav {
        position: absolute;
        left: 0;
        top: 80px;
        width: $full;
        z-index: 999;

        h3 {
          height: 40px;
          line-height: 40px;
          font-size: $font-18;
          font-weight: 400;
          text-align: center;
          color: $color-white;
          background-color: $link-hover;
        }

        .submenu {
          li {
            width: 200px;
            height: 109px;
            color: $color-white;
            font-size: $font-16;
            background-color: $background-blue;
            border-left: solid 2px $color-blue;
            padding: 0 20px;
            margin-top: 1px;
            box-sizing: border-box;

            i {
              display: block;
              line-height: 30px;
              color: $color-white;
              font-size: 30px;
              padding: 20px 0 10px 0;
            }

            p {
              line-height: 40px;
            }
          }

          li:first-child {
            height: 110px;
            margin-top: 0;
            border-top: solid 2px $color-blue;
          }

          li:last-child {
            border-bottom: solid 2px $color-blue;
          }

          .mysubmenu {
            .el-submenu__title {
              color: $color-white;
            }
          }

          li:hover, .current {
            color: $color-blue;
            background-color: $background-white;

            i {
              color: $color-blue;
            }
          }
        }
      }

      .subitems {
        position: absolute;
        top: 120px;
        left: 200px;
        width: 400px;
        height: 440px;
        padding: 20px;
        z-index: 999;
        border-2: $color-blue;
        border-left: none;
        box-sizing: border-box;
        background-color: $background-white;

        ul {
          margin-bottom: 10px;

          p {
            color: $color-blue;
            font-size: $font-14;
            line-height: 30px;
            border-bottom: solid 1px $color-grey;
          }

          li {
            display: inline-block;
            width: 50%;
            font-size: $font-14;
            line-height: 30px;
            text-align: left;

            a {
              color: $color-grey;
              text-decoration: none;
            }

            a:hover {
              color: $link-hover;
            }
          }
        }
      }
    }

    .nav {
      display: inline-block;
      position: absolute;
      left: 50%;
      top: 0px;
      width: 780px;
      height: 100px;
      margin-left: -400px;
      padding: 20px 0 10px 0;

      .search {
        width: 700px;
        height: 40px;
        margin: 0 auto;

        .el-autocomplete {
          width: $full;

          .el-input__prefix {
            color: #666666 !important;
          }

          .el-input__inner {
            height: $full;
            color: #666666 !important;
          }

          .el-button {
            color: $color-white;
            background-color: $background-blue;
            border-radius: 0 3px 3px 0;
          }
        }

        .el-input__inner {
          border: $border-grey;
        }

        .el-button {
          color: $color-white;
          background-color: $background-blue;
          border-radius: 0 3px 3px 0;
        }
      }

      .hotword {
        width: 700px;
        margin: 0 auto;

        a {
          color: $color-blue;
          margin-right: 20px;
        }

        a:hover {
          color: $link-hover;
        }
      }

      .menu {
        width: 750px;
        height: auto;
        margin: 10px auto;

        .el-menu-demo.el-menu.el-menu--horizontal {
          background-color: rgba(255, 255, 255, 0);
          border: none;
          color: #303133;

          li.el-submenu.mysubmenu {
            .el-submenu__title {
              color: #ffffff !important;
            }
          }

          li.el-submenu.mysubmenu:hover {
            .el-submenu__title {
              color: #303133 !important;
            }
          }

          .el-menu-item {
            height: 30px;
            font-size: $font-16;
            line-height: 30px;
            color: $color-black;
            text-align: center;
            margin: 0 14px;
            border: none;

            a {
              display: inline-block;
              width: $full;
              height: $full;
            }
          }

          .el-menu-item:hover {
            color: $link-hover;
          }

          .el-menu-item.is-active {
            color: $link-hover;
          }

          .el-menu--popup {
            .el-menu-item:hover {
              background-color: $link-hover;
            }
          }
        }
      }
    }

    .login {
      display: inline-block;
      float: right;
      width: auto;
      height: 110px;
      padding: 10px 0;
      font-size: 14px;
      line-height: 50px;
      text-align: center;

      .el-dropdown-link {
        cursor: pointer;
        color: $color-blue;
      }

      .el-icon-arrow-down {
        font-size: 12px;
      }

      a {
        margin: 0 10px;
        color: $color-blue;
        text-decoration: none;
      }

      a:hover, a:active {
        color: $link-hover;
      }
    }
  }
}
</style>
