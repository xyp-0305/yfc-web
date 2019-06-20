<template>
  <div class="case">
    <img :src="casesData.caseImg" alt>
    <p>{{casesData.caseName}}</p>
    <p>
        <span>{{casesData.caseAddress}}</span>
        <span>竣工时间{{casesData.caseDate}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["casesData"],
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';
.case{
    padding:10px 10px 5px 10px;
    img{
        display:inline-block;
        width:$full;
        height:140px;
    }
    p{
        width:100%;
        height:30px;
        font-size:$font-16;
        line-height:30px;
        margin:0;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        span{
          float:left;
        }
        span:last-child{
          float:right;
        }
    }
    p:last-child{
        color:$color-grey;
        font-size:$font-13;
    }
}
</style>
