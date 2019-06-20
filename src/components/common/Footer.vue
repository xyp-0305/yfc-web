<template>
  <div class="footer">
    <div class="container">
      <div class="company">
        <div class="desc">
          <p class="name">{{company.name}}</p>
          <p>{{company.description}}</p>
          <p>
            <a href="#" target="_blank">官网</a>
            <a href="#" target="_blank">实例展示</a>
            <router-link :to="{name:'about',params:{userId:123}}">关于我们</router-link>
            <router-link :to="{name:'contact',params:{userId:123}}">联系我们</router-link>
          </p>
        </div>
        <div class="erweima">
          <ul>
            <li v-for="item in erweimas" :key="item.index">
              <img :src="item.src" alt="item.name">
              <p>{{item.name}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="info">
        <p>壹方城：</p>
        <p>{{company.info}}</p>
      </div>
      <div class="friends">
        <p>友商：</p>
        <p>{{company.friends}}</p>
      </div>
      <div class="copyright">{{company.copyright}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      company: {
        name: "北京壹方城智汇科技有限公司",
        description: "中国文旅特色小镇全产业链一站式服务平台",
        info:
          "壹方城紧随时代发展的步伐，率先发起集文旅/特色小镇规划设计、产业资源导入、创新模式解构、社群运营、创新IP孵化等于一体的中国文旅/特色小镇全产业链一站式服务平台，创新引领文旅/特色小镇转型发展新方向",
        friends:
          "中青旅、宋城集团、奥伦达部落、华侨城、横店集团、长隆、华强方特、蓝城集团",
        copyright: "@2014-2019 北京壹方城智汇科技有限公司"
      },
      erweimas: [
        {
          index: "0",
          name: "壹方城官微",
          src:
            "data:image/png;base64,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"
        },
        {
          index: "1",
          name: "壹方城智汇",
          src:
            "data:image/png;base64,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"
        },
        {
          index: "2",
          name: "悍马研习社",
          src:
            "data:image/png;base64,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"
        }
      ]
    };
  },
  watch: {
    $route(to, from) {
      // console.log(to)
      // console.log(from)
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.footer {
  width: $full;
  height: 300px;
  background-color: $background-black;

  .container {
    width: 1200px;
    height: auto;
    margin:0 auto;
    color: $color-white;
    font-size: $font-14;
    padding: 20px 60px;
  }

  .company {
    display: flex;
    width: $full;
    margin-bottom: 10px;

    .desc {
      flex: 1;
      height: auto;
      text-align: left;

      p {
        line-height: 20px;
        font-size: $font-14;

        a {
          color: #ffffff;
          text-decoration: none;
          margin-right: 20px;
        }

        a:hover {
          text-decoration: underline;
        }
      }

      .name {
        line-height: 30px;
        font-size: $font-16;
      }
    }

    .erweima {
      flex: 0 0 230px;
      width: 230px;
      height: auto;

      ul {
        display: flex;
        padding: 0;

        li {
          list-style: none;
          flex: 1;

          img {
            width: 100%;
          }

          p {
            line-height: 20px;
          }
        }

        li:nth-child(2) {
          margin: 0 10px;
        }
      }
    }
  }

  .info, .friends {
    text-align: left;
    margin-bottom: 10px;
  }

  .copyright {
    padding-top: 10px;
    border-top: solid 1px #ffffff;
  }
}
</style>
