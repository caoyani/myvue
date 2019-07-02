<template>
  <div id="home">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!-- <i class="el-icon-switch-button" type="large"></i> -->
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>查看</el-dropdown-item> -->
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>Nicole</span>
      </el-header>

  
      <el-main>Main</el-main>
      <el-footer height="60px">
        <el-button  type="primary">提交</el-button>
      </el-footer>
    </el-container>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      author: "微信公众号 jinkey-love",
      articles: [],
    }
  },
  mounted: function() {
    this.$http.jsonp('https://api.douban.com/v2/movie/top250?count=10', {}, {
        headers: {
 
        },
        emulateJSON: true
    }).then(function(response) {
      // 这里是处理正确的回调
       this.articles = [{"msg":"invalid_apikey","code":104,"request":"GET \/v2\/movie\/top250"}],

        this.articles = response.data.subjects
        // this.articles = response.data["subjects"] 也可以
        console.info(this.articles);
 
    }, function(response) {
        this.articles = [{"msg":"invalid_apikey","code":104,"request":"GET \/v2\/movie\/top250"}],
        // 这里是处理错误的回调
        console.log(response)
    });
  }

}
</script>
 
<style>

  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 450px;
  }
  
 .el-container {
   margin-top: 1px;
    margin-bottom: 5px;
    /* border-radius: 40px; */
  }
  


</style>