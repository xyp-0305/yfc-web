<template>
  <div class="expert">
    <div class="avatar">
      <div class="photo">
        <img :src="expertsData.avatar" alt="专家">
        <img class="renzheng" v-if="expertsData.iscertification" :src="expertsData.certification" alt="认证">
      </div>
      <div class="expert-info">
        <p>{{expertsData.expert}}-{{expertsData.job}}</p>
        <p>{{expertsData.company}}</p>
        <p>
          <span class="tag" v-for="(item,index) in expertsData.tags" :key="index">{{item}}</span>
        </p>
      </div>
    </div>
    <div class="opt">
      <input class="consult" type="button" value="咨询专家">
    </div>
  </div>
</template>

<script>
export default {
  props: ["expertsData"],
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';
.expert {
  text-align: left;
  padding: 10px 0;
  margin-left: 20px;

  .avatar {
    .photo {
      position:relative;
      display: inline-block;
      width: 70px;
      height: 70px;
      background:url(require("@/assets/img/avatar-expert.jpg")) no-repeat 100% 100%;
      vertical-align: bottom;
      margin-right: 10px;

      img {
          width:$full;
      }
      .renzheng{
          position:absolute;
          bottom:0;
          right:0;
          width:13px;
          height:10px;
          background-color:$background-blue;
      }
    }

    .expert-info {
      display: inline-block;

      p {
        line-height: 23px;
        color: $color-black;
        font-size: $font-14;

        .tag {
          font-size: $font-11;
          color: $color-white;
          background-color: $background-blue;
          padding: 2px 10px;
          margin-right: 10px;
        }
      }
    }
  }

  .opt {
    margin-top: 10px;

    .consult {
      color: $color-white;
      font-size: $font-12;
      background-color: $background-red;
    }
  }
}
</style>
