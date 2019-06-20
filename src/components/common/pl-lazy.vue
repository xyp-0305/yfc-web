<template>
 <div v-if="initSuccess">
 </div>
</template>

<script>
 export default {
     name:"pl-lazy",
     props:{
         time:{ // 可设置延迟加载时间（非必填，默认为0）
             required:false,
             default:0
         }
     },
 data () {
 return {
     initSuccess:false
 }
 },
 created(){
     this.initSlot();
 },
 methods:{
     // 延迟加载
     initSlot(){
         let vm = this;
         setTimeout(()=>{
             vm.initSuccess = true;
         },(Number(vm.time||0)));
     }
 },
 components: {

 }
 }
</script>

<style>

 
</style>
