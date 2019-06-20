<template>
 <div class="question">
     <p><a href="#">{{questionsData.question}}</a></p>
     <p>
         <span>已有{{questionsData.interactionNum}}位用户参与互动</span>
         <span>{{questionsData.answerNum}}条回答</span>
     </p>
 </div>
</template>

<script>
 export default {
     props:['questionsData'],
 data () {
 return {

 }
 },
 components: {

 }
 }
</script>

<style lang="stylus" scoped>
@import './../../../assets/stylus/base.styl';
.question{
    padding:5px 10px;
    font-size:$font-14;
    text-align:left;
    border:$border-grey;
    margin:10px;
    p{
        height:30px;
        line-height:30px;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        a{
            color:$color-black;
        }
        a:hover{
            color:$link-hover;
        }
    }
    p:last-child{
        color:$color-grey;
        font-size:$font-12;
        span{
            float:left;
        }
        span:last-child{
            float:right;
        }
    }
}
</style>
