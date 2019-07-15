<template>
  <div class="container">
    <header class="header">分类头部</header>
    <div class="content">
     {{info}}<button @click="add">累加数字</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      info:0
    }
  },
  methods:{
    add(){
      this.info+=1
    }
  }
}
</script>

<style lang="scss">

</style>
