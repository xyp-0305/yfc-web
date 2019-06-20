<template>
  <div class="page-trains">
    <v-banner></v-banner>
    <div class="opts">
      <el-button type="primary" @click="getMeetingInfo">获取峰会详情</el-button>
      <input type="button" value="合作提报">
      <input type="button" value="开通年度会员">
      <input type="button" value="人才培养咨询">
    </div>
    <div class="content-meeting">
      <div class="meeting">
        <div class="title">壹方城大型峰会</div>
        <ul>
          <li
            v-for="(item,index) in meetingMenu"
            :class="{'active':showIndex == index}"
            :key="index"
          >
            <a href="javascript:void(0);" @click="handleShow">{{item.name}}</a>
          </li>
        </ul>
        <div class="meetings">
          <v-box :data="allMeetingData"></v-box>
        </div>
      </div>
      <div class="article">
        <div class="title">热门文章</div>
        <ul>
          <li class="active">
            <a href="#">全部</a>
          </li>
          <li>
            <a href="#">峰会报道</a>
          </li>
          <li>
            <a href="#">研学分享</a>
          </li>
          <li>
            <a href="#">行业政策</a>
          </li>
          <li>
            <a href="#">行业资讯</a>
          </li>
        </ul>
        <div class="articles">
          <div v-for="(item,index) in data[1].dataList" :key="index">
            <div class="img">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="info">
              <p class="title">
                <a href="#">{{item.title}}</a>
              </p>
              <p class="date">
                <span>{{item.from}}</span>
                <span>{{item.date}}</span>
              </p>
              <p class="desc">{{item.desc}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="content-learn">
      <div class="title">壹方城标杆项目游学</div>
      <div class="in">
        <span>国内热门</span>
        <ul>
          <li class="active">
            <a href="#">全部</a>
          </li>
          <li>
            <a href="#">杭州</a>
          </li>
          <li>
            <a href="#">成都</a>
          </li>
          <li>
            <a href="#">台湾</a>
          </li>
          <li>
            <a href="#">西安</a>
          </li>
          <li>
            <a href="#">长沙</a>
          </li>
        </ul>
      </div>
      <div class="out">
        <span>国外热门</span>
        <ul>
          <li class="active">
            <a href="#">全部</a>
          </li>
          <li>
            <a href="#">日本</a>
          </li>
          <li>
            <a href="#">欧洲</a>
          </li>
          <li>
            <a href="#">以色列</a>
          </li>
        </ul>
      </div>
      <div class="learns">
        <v-box :data="data[2]"></v-box>
      </div>
    </div>
    <div class="line"></div>
    <div class="content-media">
      <div class="title">汉马研习社群</div>
      <ul>
        <li class="active">
          <a href="javascript:void(0);" @click="showAll">峰会重新看</a>
        </li>
        <li>
          <a href="javascript:void(0);" @click="showAll">汉马-马上说</a>
        </li>
        <li>
          <a href="javascript:void(0);">其他产品待研发</a>
        </li>
      </ul>
      <div class="medias">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="video">
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :playsinline="true"
                :options="playerOptions"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
              ></video-player>
              <div class="name">2019中国首届农旅综合体与特色小镇顶层设计与运营实操</div>
            </div>
          </el-col>
          <el-col :span="16">
            <el-row :gutter="10">
              <el-col :span="6" v-for="(item,index) in data[3].dataList" :key="index">
                <div class="media">
                  <img :src="item.image" :alt="item.title">
                  <div class="name">{{item.title}}</div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getSummitList, getSummitInfo } from "../../api/api";
import vBanner from "./../train/Banner";
import vBox from "./../train/Box";
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      fId:0,
      activeName2: "first",
      data: [
        {
          id: 1,
          col: 8,
          type: "meeting",
          dataList: [
            {
              id: 1,
              type: "特色小镇",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "446",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 2,
              type: "特色小镇",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "467",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 3,
              type: "田园综合体",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "368",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 4,
              type: "特色小镇",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "836",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: true
            },
            {
              id: 5,
              type: "田园综合体",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "278",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 6,
              type: "健康养生",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: true
            },
            {
              id: 7,
              type: "特色小镇",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2018年9月24日",
              endTime: "2018年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: true,
              isFull: false
            },
            {
              id: 8,
              type: "健康养生",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 9,
              type: "特色小镇",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            }
          ]
        },
        {
          id: 2,
          type: "article",
          dataList: [
            {
              id: 1,
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc:
                "描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息描述信息"
            },
            {
              id: 2,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            },
            {
              id: 3,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            },
            {
              id: 4,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            },
            {
              id: 5,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            },
            {
              id: 6,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            },
            {
              id: 7,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            },
            {
              id: 8,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            },
            {
              id: 9,
              title: "第二十四届特色小镇高端总裁峰会",
              date: "2019年9月24日",
              image: require("@/assets/img/banner-1.jpg"),
              from: "壹方城",
              desc: "描述信息描述信息"
            }
          ]
        },
        {
          id: 3,
          col: 6,
          type: "learn",
          dataList: [
            {
              id: 1,
              type: "国内",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "446",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 2,
              type: "国内",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "467",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 3,
              type: "国内",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "368",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: true
            },
            {
              id: 4,
              type: "国外",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "836",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 5,
              type: "国外",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "278",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: true
            },
            {
              id: 6,
              type: "国内",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 7,
              type: "国外",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2018年9月24日",
              endTime: "2018年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: true,
              isFull: true
            },
            {
              id: 8,
              type: "国内",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: false
            },
            {
              id: 9,
              type: "国外",
              title: "第二十四届特色小镇高端总裁峰会",
              startTime: "2019年9月24日",
              endTime: "2019年9月28日",
              address: "杭州",
              enlistNum: "357",
              image: require("@/assets/img/banner-1.jpg"),
              isEnd: false,
              isFull: true
            }
          ]
        },
        {
          id: 4,
          col: 6,
          type: "media",
          dataList: [
            {
              id: 1,
              type: "峰会",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-1.jpg")
            },
            {
              id: 2,
              type: "峰会",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-2.jpg")
            },
            {
              id: 3,
              type: "峰会",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-3.jpg")
            },
            {
              id: 4,
              type: "汉马",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-4.jpg")
            },
            {
              id: 5,
              type: "峰会",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-5.jpg")
            },
            {
              id: 6,
              type: "汉马",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-1.jpg")
            },
            {
              id: 7,
              type: "峰会",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-1.jpg")
            },
            {
              id: 8,
              type: "峰会",
              title:
                "第二十四届特色小镇高端总裁峰会第二十四届特色小镇高端总裁峰会",
              address: "杭州",
              image: require("@/assets/img/banner-1.jpg")
            }
          ]
        }
      ],
      meetingMenu: [
        {
          id: 1,
          name: "全部",
          word: "All"
        },
        {
          id: 2,
          name: "特色小镇",
          word: "Te"
        },
        {
          id: 3,
          name: "健康养生",
          word: "All"
        },
        {
          id: 4,
          name: "田园综合体",
          word: "Te"
        }
      ],
      showIndex: 0,
      allMeetingData: {},
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "",
            src:
              "http://www.bjyfczhkj.com/upload/%E5%B0%8F%E9%95%87%E4%B8%AD%E5%9B%BD%20%E6%9C%89%E9%9F%B3%E4%B9%90.mp4" //url地址
          }
        ],
        poster: "http://192.168.1.239/images/%E9%A6%96%E9%A1%B5/u103.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  created() {
    // 获取数据
    // ...
    this.allMeetingData = Object.assign({}, this.data[0]);
    // 获取峰会产品
    const fparams = {
      Body: {
        TypeId: 1,
        Page: 1,
        Rows: 5
      }
    };
    getSummitList(fparams).then(data => {
      console.log(data);
      this.fId = data.Result.Models[0].Id
    });
    // 获取游学产品
    const yparams = {
      Body: {
        TypeId: 2,
        Page: 1,
        Rows: 5
      }
    };
    setTimeout(function() {
      getSummitList(yparams).then(data => {
        console.log(data);
      });
    }, 100);
  },
  computed: {
    // 峰会数据对象
    meetingData() {
      return this.data[0];
    },
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    // 获取峰会详情
    getMeetingInfo(){
      console.log(this.fId)
      const params = {
        Body:this.fId
      }
      getSummitInfo(params).then(data=>{
        console.log(data)
      })
    },
    // 动态执行方法
    handleShow(ev) {
      switch (ev.target.innerHTML) {
        case "特色小镇":
          this.showOther("特色小镇", 1);
          break;
        case "健康养生":
          this.showOther("健康养生", 2);
          break;
        case "田园综合体":
          this.showOther("田园综合体", 3);
          break;
        default:
          this.showAll();
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 展示全部
    showAll(ev) {
      const dataAll = this.meetingData.dataList;
      this.$set(this.allMeetingData, "dataList", dataAll);
      this.showIndex = 0;
    },
    // 根据类型展示各个类型的资源
    showOther(type, index) {
      const dataOther = this.handleData(type);
      // console.log(dataTe)
      this.$set(this.allMeetingData, "dataList", dataOther);
      this.showIndex = index;
    },
    // 筛选数据
    handleData(type) {
      return this.meetingData.dataList.filter(item => {
        return item.type == type;
      });
    },
    onPlayerPlay(player) {
      // console.log("play");
    },
    onPlayerPause(player) {
      // console.log("pause");
    }
  },
  components: {
    vBanner,
    vBox,
    videoPlayer
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page-trains {
  width: $full;

  .opts {
    width: $full;
    padding: 20px 0;

    input {
      width: 200px;
      height: 50px;
      line-height: 44px;
      font-size: 28px;
      color: $color-white;
      background-color: $background-blue;
      margin: 0 20px;
    }
  }

  .title {
    font-size: $font-22;
    text-align: left;
    margin-bottom: 10px;
  }

  ul {
    display: inline-block;
    margin: 10px 0;

    li {
      display: inline-block;
      width: 80px;
      height: 30px;
      line-height: 30px;
      font-size: $font-13;
      text-align: center;
      background-color: $background-grey;
      margin-right: 10px;

      a {
        display: inline-block;
        width: $full;
        height: $full;
        color: $color-black;
      }
    }

    li:first-child {
      width: 50px;
    }

    .active {
      background-color: $background-blue;

      a {
        color: $color-white;
      }
    }
  }

  .content-meeting {
    display: flex;
    text-align: left;

    .meeting {
      flex: 1;
      margin-right: 20px;

      .meetings {
        width: $full;
      }
    }

    .article {
      flex: 0 0 450px;
      width: 450px;

      .articles {
        width: $full;
        height: 640px;
        border: $border-grey;
        box-sizing: border-box;
        margin-top: 10px;
        overflow-y: auto;

        >div {
          padding: 5px 10px;

          .img {
            display: inline-block;
            width: 110px;
            height: 90px;
            margin-right: 10px;
            overflow: hidden;

            img {
              width: $full;
              height: $full;
              transform: scale(1, 1);
              transition: all 0.2s ease-out;
            }
          }

          .img:hover {
            img {
              transform: scale(1.1, 1.1);
            }
          }

          .info {
            display: inline-block;
            width: 280px;
            height: 90px;
            font-size: $font-12;

            p {
              height: 30px;
              line-height: 30px;
              overflow: hidden;
            }

            .title {
              font-size: $font-16;
              text-overflow: ellipsis;
              white-space: nowrap;

              a {
                color: $color-black;
              }
            }

            .title:hover {
              a {
                color: $link-hover;
              }
            }

            .date {
              color: $color-grey;

              span {
                float: right;
                margin-left: 20px;
              }
            }

            .desc {
              height: 30px;
              line-height: 15px;
            }
          }
        }
      }
    }
  }

  .line {
    margin: 10px 0 20px 0;
    border-top: solid 1px rgba(204, 204, 204, 1);
  }

  .content-learn {
    text-align: left;

    .in, .out {
      span {
        font-size: $font-18;
        margin-right: 20px;
      }
    }

    .learns {
      width: $full;

      .el-row {
        .el-col {
          .item {
            padding: 10px 0;

            img {
              width: 100%;
              height: 150px;
            }

            p {
              height: 20px;
              color: $color-grey;
              font-size: $font-12;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              span {
                float: left;
                margin-right: 10px;
              }

              .end {
                float: right;
                margin: 0;
              }

              .full {
                color: $color-red;
              }

              span:last-child {
                color: $color-blue;
              }
            }

            .title {
              color: $color-black;
              font-size: $font-14;
            }
          }
        }
      }
    }
  }

  .content-media {
    text-align: left;

    ul {
      li {
        width: 200px;
        height: 50px;
        line-height: 50px;
      }
    }

    .medias {
      .el-row {
        .el-col {
          .name {
            padding: 0 10px;
            color: $color-white;
            text-align: center;
            background-color: $background-black;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .video {
            width: $full;

            .name {
              height: 30px;
              line-height: 30px;
              font-size: $font-13;
            }
          }

          .media {
            width: $full;
            height: auto;
            font-size: 0;
            margin-bottom: 5px;

            img {
              width: $full;
              height: 107px;
            }

            .name {
              height: 20px;
              line-height: 20px;
              font-size: $font-12;
            }
          }
        }
      }
    }
  }
}
</style>
