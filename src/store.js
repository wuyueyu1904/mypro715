import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {// 需要管理的组件的状态
    loginState:'',
    list:["a0",2,5,5,9,'33b',789,12]
  },
  getters:{
    len(state){
      return state.list.length
    }
  },
  mutations: {// 唯一改变状态的地方
    changeLoginState(state, data){// state代表的是初始化的数据，data代表的是数据
      state.loginState = data
    }
  },
  actions: {// 异步操作

  }
})
