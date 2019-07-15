<template>
  <div class="container">
    <van-nav-bar
      title="登录"
      right-text="注册"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="手机号"
          :right-icon="usernameIcon"
          placeholder="请输入手机号"
          :error-message="usernameState"
        />

        <van-field
          v-model="password"
          type="password"
          label="密码"
          clearable
          placeholder="请输入密码"
          :right-icon="passwordIcon"
          :error-message="passwordState"
          required
        />
      </van-cell-group>
      <van-button type="primary" size="normal" @click="login" :block="true" :disabled= "flage" :loading= "flage" loading-text="登陆中...">登录</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Field, Cell, CellGroup, Button, Toast, Dialog } from 'vant'

Vue.use(NavBar)
Vue.use(Field)
Vue.use(Cell).use(CellGroup)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
export default {
  data () {
    return {
      username: '18717771641',
      password: '123456',
      flage:false
    }
  },
  computed: {
    usernameState () {
      if (this.username === '') {
        return ''
      } else if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        return '手机号码格式错误'
      } else {
        return ''
      }
    },
    usernameIcon () {
      if (this.username === '') {
        return ''
      } else if ((/^1[3456789]\d{9}$/.test(this.username))) {
        return 'checked'
      } else {
        return ''
      }
    },
    passwordState () {
      if (this.password === '') {
        return ''
      } else if (this.password.length < 5) {
        return '密码格式错误'
      } else {
        return ''
      }
    },
    passwordIcon () {
      if (this.password === '') {
        return ''
      } else if (this.password.length >= 5) {
        return 'checked'
      } else {
        return ''
      }
    }
  },
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight () {
      this.$router.replace('/register')
    },
    login () {
      if (this.usernameIcon !== 'checked') {
        Toast('手机号格式错误')
        return null
      }
      if (this.passwordIcon !== 'checked') {
        Toast('密码格式错误')
        return null
      }
      this.flage=true
      // 提交数据到服务器
      fetch('https://www.daxunxun.com/users/login', {
        method: 'post',
        headers: { // 看后端的接口
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'username=' + this.username + '&password=' + this.password
      }).then(res => res.json()).then(data => {
        this.flage=false
        if (data === 1) {
          Toast('登录成功')
          // localStorage.setItem("isLogin","ok")
          // 如果使用的token，当你登陆成功，后端返回了一个token值，你将此值存储到本地
          // localStorage.setItem('token', 'sakhsdkjghjksdhfkjhsadhjahdkjsha')
          // 以后在需要验证用户是否登陆时，将此值取出来，然后随着请求发送到服务器，数据库中会有一个字段与之对应，如果匹配，表适用户是登陆的，如果不匹配，表示未登录
          // localStorage.setItem('isLogin', 'ok')
          this.$store.commit('changeLoginState', 'ok')
          this.$router.back()
        } else if (data === 2) {
          Dialog.confirm({
            title: '提示',
            message: '该用户还未注册，是否注册'
          }).then(() => {
            // on confirm
            this.$router.push('/register')
          }).catch(() => {
            // on cancel
          })
        } else if (data === -1) {
          Toast('密码错误')
        } else {
          Toast('登录失败')
        }
      })
    }
  }
}
</script>

<style lang="scss">

</style>
