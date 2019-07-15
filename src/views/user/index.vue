<template>
  <div class="container">
    <header class="header">个人中心头部</header>
    <div class="content">
      <router-view></router-view>
    </div>
    <div>其余的内容</div>
  </div>
</template>

<script>
export default {
  watch:{
    $route (newVal,oldVal){
      if(newVal.name === "user"){
        const {$store: {state: { loginState } } } =this
        // if(localStorage.getItem("isLogin")==="ok"){
        if(loginState === "ok"){
          this.$router.replace("/user/login")
        }else{
          this.$router.replace("/user/nologin")
        }
      }
      // console.log("这是userindex.vue的watch")
    }
  },

  beforeRouteEnter(to,from,next){
    next(vm => {
      // console.log(to.name)
      if(to.name === "user"){
        const {$store: {state: { loginState } } } =vm
        // if(localStorage.getItem("isLogin")==="ok"){
        if(loginState === "ok"){
          vm.$router.replace("/user/login")
        }else{
          vm.$router.replace("/user/nologin")
        }
      }else{
        next()
      }
    })
  }
}
</script>

<style lang="scss">

</style>
