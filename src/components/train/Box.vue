<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="data.col" v-for="(item,index) in data.dataList" :key="index">
        <div class="item" @click="toDetail(item.id)">
          <img :src="item.image" :alt="item.title">
          <p>
            <span>{{item.startTime}}-{{item.endTime}}</span>
            <span>{{item.address}}</span>
            <span class="end" v-show="item.isEnd">已结束</span>
            <span class="full" v-show="!item.isEnd && item.isFull">满员</span>
            <span class="num" v-show="!item.isEnd && !item.isFull">已报名{{item.enlistNum}}</span>
          </p>
          <p class="title">{{item.title}}</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {};
  },
  methods:{
    toDetail(id){
      this.$router.push({name:'meetingDetail',params:{meetingId:id}})
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';
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

        .end,.full,.num {
          float: right;
          margin: 0;
        }
        .full{
            color:$color-red;
        }

        .num {
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
</style>
