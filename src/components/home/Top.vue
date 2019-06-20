<template>
  <div class="top">
    <span>联盟头条：</span>
    <div class="topBox">
      <transition-group tag="ul" class="slide-ul" name="list">
        <li v-show="currentIndex==index" v-for="(item,index) in topData" :key="item.Id" @mouseenter="stop" @mouseleave="go">
          <a href>{{item.NewsTitle}}</a>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  props: ["topData"],
  data() {
    return {
      currentIndex: 0,
      timer: ""
    };
  },
  created() {
    //在DOM加载完成后，下个tick中开始轮播
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    });
  },
  methods: {
    go() {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    },
    stop() {
      clearInterval(this.timer);
      this.timer = null;
    },
    autoPlay() {
    //   console.log(this.currentIndex);
      this.currentIndex++;
      if (this.currentIndex > this.topData.length - 1) {
        this.currentIndex = 0;
      }
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.top {
  color: $color-black;
  padding: 20px 400px;
  font-size: $font-14;
  text-align: left;

  span {
    display: inline-block;
    line-height: 30px;
    vertical-align: top;
  }

  .topBox {
    display: inline-block;
    width: 320px;
    height: 30px;
    overflow: hidden;

    .slide-ul {
      width: 100%;
      height: auto;

      li {
        // display: inline-block;
        // width: 300px;
        width:600px;
        height: 30px;
        margin-right: 20px;

        a {
          display: inline-block;
          max-width: 600px;
          color: $color-grey;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        a:hover {
          color: $link-hover;
        }
      }
    }

    .list-enter-to {
      transition: all 1s ease;
      transform: translateY(0);
    }

    .list-leave-active {
      transition: all 1s ease;
      transform: translateY(-100%);
    }

    .list-enter {
      transform: translateY(100%);
    }

    .list-leave {
      transform: translateY(0);
    }
  }
}
</style>
