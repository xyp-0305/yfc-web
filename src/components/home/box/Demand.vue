<template>
  <div class="demand">
    <p><a href="#">{{demandsData.demandName}}</a></p>
    <p>
      <span><i class="el-icon-location"></i>{{demandsData.demandAddress}}</span>
      <span><i class="el-icon-goods"></i>{{demandsData.demandPrice}}</span>
      <span><i class="el-icon-time"></i>{{demandsData.demandDate}}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["demandsData"],
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';
.demand{
    padding:5px 10px;
    border:$border-grey;
    margin:10px;
    p{
        display:inline-block;
        width:100%;
        font-size:$font-14;
        line-height:30px;
        text-align:left;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        a{
            color:$color-black;
        }
        a:hover{
            color:rgb(4,109,168);
        }
        span{
            margin-right:10px;
            i{
                margin-right:5px;
            }
        }
    }
}
</style>
