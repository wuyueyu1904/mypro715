<template>
  <div>
    恭喜***登陆成功
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  beforeRouteEnter(to,from,next){
    next(vm=>{
      const {$store: {state: { loginState } } } =vm
      if(loginState === "ok"){
        next()
      }else{
        next("/login")
      }
    })
  }
}
</script>
