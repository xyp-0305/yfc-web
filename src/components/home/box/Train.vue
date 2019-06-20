<template>
  <div class="train">
    <div class="photo">
      <img :src="trainsData.trainImg" alt="培训">
    </div>
    <div class="expert-info">
      <p class="name">{{trainsData.trainName}}</p>
      <p>{{trainsData.trainTag}}</p>
      <p>{{trainsData.trainDesc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["trainsData"],
  data() {
    return {};
  },
  components: {}
};
</script>


<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';
.train {
  padding: 16px 10px;

  .photo {
    display:inline-block;
    width: 150px;
    height: 100px;
    margin-right: 20px;
    vertical-align: top;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .expert-info {
    display:inline-block;
    width:140px;
    height: 100px;

    p {
      display: inline-block;
      width: 100%;
      height:20px;
      font-size: $font-14;
      line-height:20px;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .name {

        height:40px;
      font-size: $font-18;
      line-height: 40px;
    }
  }
}
</style>
