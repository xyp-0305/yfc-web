<template>
  <div class="new">
    <div class="img">
      <img :src="newsData.newImg" alt>
    </div>
    <div class="info">
      <p class="title">
        <a href="#">{{newsData.newTitle}}</a>
      </p>
      <p class="date">
        <span>{{newsData.newDate}}</span>
        <span>{{newsData.newFrom}}</span>
      </p>
      <p class="desc">{{newsData.newDesc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["newsData"],
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';
.new {
  display: flex;
  font-size: $font-12;
  padding: 10px;

  .img {
    flex: 0 0 110px;
    width: 110px;
    height: 90px;
    margin-right: 10px;
    overflow: hidden;

    img {
      width: $full;
      transform: scale(1, 1);
      transition: all 0.1s ease-in-out;
    }
  }

  .img:hover img {
    transform: scale(1.1, 1.1);
  }

  .info {
    flex: 1;
    height: 90px;
    text-align: left;

    p {
      height: 25px;
      line-height: 25px;
      overflow: hidden;
    }

    .title {
      font-size: $font-16;

      a {
        color: $color-black;
      }

      a:hover {
        color: $link-hover;
      }
    }

    .date {
      color: $color-grey;
      text-align: right;

      span {
        margin-left: 10px;
      }
    }

    .desc {
      height: 40px;
      line-height: 20px;
    }
  }
}
</style>
