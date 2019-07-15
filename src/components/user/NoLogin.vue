<template>
  <div>
    <!-- <button>登陆</button>
    <button>注册</button> -->
    <router-link to="/login">
      <van-button type="primary">登陆</van-button>
    </router-link>
    <router-link to="/register">
      <van-button type="primary">注册</van-button>
    </router-link>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'vant'
Vue.use(Button)//类似于全局注册组件，无需在JS中再次使用components注册组件
export default {
  beforeRouteEnter(to,from,next){
    // if(localStorage.getItem("isLogin")==="ok"){
    //   next("/user/login")
    // }else{
    //   next()
    // }
    next(vm=>{
      const {$store: {state: { loginState } } } =vm
      if(loginState === "ok"){
        next("/user/login")
      }else{
        next()
      }
    })
    
  }


}
</script>
<style>
  div{
    text-align: center
  }
  button{
     margin:0 50px;
     border:2px solid red;
  }
  
</style>


