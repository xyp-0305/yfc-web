<template>
  <div class="tplExpert">
    <img :src="HOST+expertData.FacialPhotoUrl" :alt="expertData.Name">
    <p class="name">{{expertData.Name}}</p>
    <!-- <p class="type">{{expertData.Position}}</p> -->
  </div>
</template>

<script>
export default {
  props: ["expertData"],
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';
.tplExpert {
  img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
  }

  .name {
    font-size: $font-14;
    color: $color-black;
    line-height: 30px;
    margin-top: 10px;
  }

  .type {
    font-size: $font-12;
    color: $color-grey;
  }
}
.tplExpert:hover{
  .name,.type {
     color: $link-hover;
  }
}
</style>
