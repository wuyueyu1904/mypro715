<template>
  <div class="box">
    <div class="container">
      <van-nav-bar
        :title="title"
        left-text="返回"
        right-text="分享"
        left-arrow
        @click-left="back"
        @click-right="share"
      />
      <div class="content">
        {{ title }}
        <Rating :rating="(rating / 2).toFixed(1)"/>
        {{ this.$store.getters.len}} --- {{len}}
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
        text="客服"
        @click="chat"
      />
      <van-goods-action-icon
        info="5"
        icon="cart-o"
        text="购物车"
        @click="goCart"
      />
      <van-goods-action-icon
        icon="shop-o"
        text="店铺"
        @click="goShop"
      />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart"
      />
      <van-goods-action-button
        type="danger"
        text="立即购买"
        @click="buy"
      />
    </van-goods-action>
    <van-sku
      v-model="show"
      stepper-title="我要买"
      :sku="sku"
      :goods="goods"
      show-add-cart-btn
      reset-stepper-on-hide
      :initial-sku="initialSku"
    >
    </van-sku>
  </div>
</template>

<script>
import Vue from 'vue'
import { GoodsAction, GoodsActionIcon, GoodsActionButton, Sku, NavBar } from 'vant'
import Rating from '@/components/common/Rating'
import { mapState , mapGetters} from 'vuex'

Vue.use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton)
Vue.use(Sku)
Vue.use(NavBar)
export default {
  data () {
    return {
      title: '',
      rating: '',
      show: false,
      goods: {
        // 商品标题
        title: '测试商品',
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      },
      initialSku: {
        // 键：skuKeyStr（sku 组合列表中当前类目对应的 key 值）
        // 值：skuValueId（规格值 id）
        s1: '30349',
        s2: '1193',
        // 初始选中数量
        selectedNum: 3
      },
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl: 'https://img.yzcdn.cn/1.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
              },
              {
                id: '1215',
                name: '蓝色',
                imgUrl: 'https://img.yzcdn.cn/2.jpg'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '1' // 是否必填 '1' 表示必填
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      }
    }
  },
  components: {
    Rating
  },
  computed: {
    ...mapState({// ...涉及到对象的合并
      // loginState:(state)=>{ return state.loginState }
      loginState:'loginState'
    }),
    ...mapGetters({
      len:'len'
    })
  },
  mounted () {
    // console.log(this.$route) // 打印当前路由的信息
    // const id = this.$route.params.id
    // const { id } = this.$route.params
    // const { params: { id } } = this.$route // 解构中的解构
    const { $route: { params: { id } } } = this
    // console.log(id)
    fetch('https://www.daxunxun.com/detail?id=' + id).then(res => res.json()).then(data => {
      console.log(data[0])
      this.title = data[0].title
      this.rating = data[0].rating.average
    })
  },
  methods: {
    chat () {
      console.log('客服')
    },
    goCart () {
      console.log('去购物车')
    },
    goShop () {
      console.log('店铺')
    },
    addCart () {
      // 传统方法
      const { $store:{ state: { loginState } } }=this
      if( loginState === "ok" ){
        console.log('加入购物车')
        this.show = true
      }else{
        this.$router.push('/login')
      }
    },
    buy () {
      if(this.loginState === "ok"){
        console.log('立即购买')
      }else{
        this.$router.push("/login")
      } 
    },
    back () {
      this.$router.back()
    },
    share () {
      console.log('分享')
    }
  }
}
</script>

<style lang="scss">
.van-nav-bar {
  background-color: #f66;
  color: #fff;
}
.van-nav-bar__text, .van-nav-bar__title {
  color: #fff;
}
.van-nav-bar .van-icon {
    color: #fff;
}
</style>
