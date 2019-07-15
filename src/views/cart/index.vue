<template>
  <div class="container">
    <header class="header">购物车头部</header>
    <div class="content">购物车内容</div>
  </div>
</template>

<script>
export default {
  beforeRouteEnter(to,from,next){
    // if(localStorage.getItem("isLogin")==="ok"){
    //   next()
    // }else{
    //   next("/login")
    // }
    next(vm=>{
      const {$store: {state: { loginState } } } =vm
      if(loginState === "ok"){
        next()
      }else{
        next('/login')
      }
    })



  }
}
</script>

<style lang="scss">

</style>
