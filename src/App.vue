<template>
  <div id="app" @click="clicked">
    <router-view class="view"></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      lastTime: new Date().getTime(),    //最后一次点击的时间
      currentTime: new Date().getTime(), //当前时间
      timeout: 60 * 60 * 1000            //超时时间1小时
    }
  },
  mounted () {
    //定时器 间隔1分钟检测是否长时间未操作页面
    window.setInterval(this.testTime, 60 * 1000)
  },
  methods: {
    clicked() {
      this.lastTime = new Date().getTime()  //当界面被点击更新点击时间
    },
    testTime() {
      this.currentTime = new Date().getTime()
      if(this.currentTime - this.lastTime > this.timeout) {
        console.log("login seesion timeout!")
        this.$store.dispatch('UserLogout')
        //跳到目标页
        this.$router.push('/')
      }
    }
  }
}
</script>

<style>


</style>
