<template>
  <div id="homepage">
    <el-container style="height: auto; width: auto; border: 1px; solid #eee">
      <el-header id="homeheader">
        <img style="width: 130px; height: 60px; float: left;" src="../assets/logo.png">
        <span style="margin-left: 10px; float: left">{{$t("common.header")}}</span>
        <div style="margin-right: 5px; float: right;">
          <el-link type="primary" 
          :underline="false" 
          icon="el-icon-user-solid" 
          style="margin-right: 10px; color: #E5E6DB;" 
          >&thinsp;{{profile}}</el-link>

          <el-link type="primary" 
          :underline="false" 
          icon="el-icon-switch-button" 
          style="margin-right: 10px; color: #E5E6DB;" 
          @click="logout"
          >&thinsp;{{$t("home.exit")}}</el-link>

          <el-link 
          :underline="false" 
          icon="el-icon-user-solid" style="margin-right: 1px; color: #E5E6DB;">&thinsp;{{profile}}
          </el-link>

          <el-dropdown trigger="click" @command="handleCommand">
            <i class="el-icon-s-tools" style="color: #E5E6DB">
              <span class="el-dropdown-link" style="color: #E5E6DB">{{$t("common.lang")}}<i class="el-icon-arrow-down el-icon-right"></span>
            </i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item commond = "en">English</el-dropdown-item>
              <el-dropdown-item commond = "cn">中文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </div>
      </el-header>

      <el-container style = "width: auto; height: auto; float: left;">
        <el-aside>
          <el-scrollbar style="height: 100%">
            <!-- :default-active="this.$router.path" -->
            <el-menu :default-openeds="['1']" :default-active="activerrouter" router 
            background-color="#545c64"
            text-color="#fff" active-text-color="#ffd04b">
              <el-menu-item index="/createcomp"><i class="el-icon-s-home"></i>{{$t("aside.createcomp")}}</el-menu-item>
              <el-menu-item index="/deletecomp"><i class="el-icon-scissors"></i>{{$t("aside.deletecomp")}}</el-menu-item>
              <el-menu-item index="/more"><i class="el-icon-loading"></i>{{$t("aside.more")}}</el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>

        <el-container>
          <el-header style="height: 30px; line-height: 0px">
            <p><i><small>{{$t("common.reminder")}}</small></i></p>
          </el-header>

          <el-main>
            <el-scrollbar style="height: 100%">
              <router-view/>
            </el-scrollbar>
          </el-main>

          <el-footer id="sub-footer" style="height:20px; font-sytle: italic; font-size:x-small;">{{$t("common.footer")}}</el-footer>
        
        </el-container>

      </el-container>

      <!-- <el-footer id="sub-footer" style="height:20px; font-sytle: italic; font-size:x-small;">{{$t("common.footer")}}</el-footer> -->

    </el-container>
  </div>
</template>
 
<script>
import axios from "@/axios.js"

export default {
  data() {
    return {
      profile: this.$store.state.username,
      staffid: this.$store.state.sid,
      email: this.$store.state.email,
      activerouter: '',
      lang: 'en',
    };
  },
  mounted: function() {
    //get地址栏的路由，设置导航栏的选中状态
    this.activerouter = window.location.pathname;
    this.$i18n.locale = localStorage.lang;
  },
  methods: {
    logout() {
      this.$confirm(this.$t('home.ifExit'), this.$t('home.warning'), {
        confirmButtonText: this.$t('home.ok'),
        cancelButtonText: this.$t('home.cancel'),
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('UserLogout');
        //跳到目标页面
        this.$router.push('/');

        this.$message({
          type: 'success',
          message: this.$t('home.exitCompleted')
        });
      }).catch(() => {
          this.$message({
          type: 'info',
          message: this.$t('home.exitCanceled')
        }); 
      });   
    },

    handleCommon(command) {
      switch(command) {
        case "cn": {
          this.lang = "cn";
          this.$i18n.locale = this.lang;
          localStorage.lang = this.lang;
          break;
        }
        case "en": {
          this.lang = "en";
          this.$i18n.locale = this.lang;
          localStorage.lang = this.lang;
          break;
        }
        default: break;
      }
    },

  }

}
</script>
 
<style>

#homepage {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}
#homeheader {
  background-color: #213A54;
  color: #E5E6DB;
  /* text-align: center; */
  line-height: 60px;
  vertical-align: middle;
  font-size: 16px;
}
.el-container {
  line-height: 40px;
  font-size: 14px;
  /* min-height: 100%; */
}
#sub-footer {
  background-color: #8493a3;
  color: #E5E6DB;
  display: flex;
  align-items: center;
}
.el-aside {
  background-color: #545c64;
  height: calc(100vh - 60px);
}
.el-scrollbar__wrap {
  overflow-x: hidden;
  overflow-y: auto;
}
.el-main {
  padding: 3px;
  padding-left: 8px;
  padding-right: 8px;
  background-color: aliceblue;
  height: calc(100vh - 116px);
}
.comment {
  line-height: 12px;
  text-align: right;
  margin-top: 16px;
  color: rgb(0, 0, 200);
}
.grid-content {
  border-radius: 4px;
  margin-right: 6px;
  margin-bottom: 1px;
  margin-top: 20px;
}
.el-link {
  color: #E5E6DB
}
.bg-purple {
  background-color: #d3dce6;
}
.bg-purple-light {
  background-color: #e5e9f2;
}
.grid-content-right {
  padding-left: 6px;
  padding-right: 12px;
}
.box-card-header {
  text-align: left;
  line-height: 5px;
  font-weight: bold;
}
.el-card__body {
  padding-top: 0%;
}
.el-form-item__label {
  padding: 0%;
  text-align: left;
  color: black;
}
#sbmbutton {
  text-align: center;
  line-height: 80px;
}
.footer-button {
  box-shadow: 0 2px 12px 0 #868383;
  width: 150px;
}
.el-select-dropdown__list {
  margin-bottom: 18px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
 

</style>