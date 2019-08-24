<template>
  <div id="home">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <img style="width: 130px; height: 60px; float: left;" src="../assets/logo.png">
        <span>Welcome to the system!</span>
        <div style="margin-right: 5px; float: right;">
          <el-link type="primary" :underline="false" icon="el-icon-s-tools" style="margin-right: 10px; color: #E5E6DB;" @click="logout">&thinsp;{{$t("home.exit")}}</el-link>
          <el-link :underline="false" icon="el-icon-user-solid" style="margin-right: 1px; color: #E5E6DB;">&thinsp;{{profile}}</el-link>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
  
      <el-main>
        <el-form ref="form" :model="form">
          <el-row style="line-height: 12px; margin-top: -12px;">
            <p>
              Please fill out the form below to automatically configure and generate the necessary tools for your dashboard
            </p>
            <p>
              <i><small>This is currently a prototype system.</small></i>
            </p>            
            <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
          </el-row>

          <el-row>
            <el-col :span="12"><div class="grid-content bg-purple">surname</div></el-col>
            <el-col :span="12"><div class="grid-content bg-purple-light"><el-input placeholder="Nicole" v-model="form.surname" size="large" value="Nicole Cao"></el-input></div></el-col>
          </el-row>

        </el-form>
      </el-main>

      <el-footer height="60px">
        <el-button class="footer-button" type="primary" @click="submitForm('form')" round>{{$t("home.submit")}}</el-button>
      </el-footer>
    </el-container>
  </div>
</template>
 
<script>
import axios from "@/axios.js"

export default {
  data() {
    return {
      form: {
        surname: ''
      },
      profile: this.$store.state.username,
    }
  },
  mounted: function() {
  
  },
  methods: {
    logout() {
      this.$confirm(this.$t('home.ifExit'), this.$t('home.warning'), {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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

    //submit form
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.userLogin(this.form)
          .then(({ data }) => {
            console.info("aaaaaaaaaaaaa" + JSON.stringify(this.form));
            //....
          });
        } else {
          console.log("error submit!");
          return false;
        }
      })
    },


  }

}
</script>
 
<style>

  .el-header {
    background-color: #213A54;
    color: #E5E6DB;
    /* text-align: center; */
    line-height: 60px;
    vertical-align: middle;
  }
  
 .el-footer {
    background-color: #F4F9FE;
    color: #E5E6DB;
    text-align: center;
    height: 80px;
    line-height: 60px;
    margin-left: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: left;
    line-height: 45px;
    margin-left: 20px;
    margin-right: 10px;
    margin-bottom: 1px;
    font-size: 14px;
  }
  
 .el-container {
   margin-bottom: 20px;
   background-color: rgb(123, 144, 161);
   margin-top: 10px;
   height: 830px;
   width: 100%;
  }
  
  .footer-buttom {
    border: 1px solid #448bd5;
    background-color: #448bd5;
    box-shadow: 0 2px 12 px #cac6c6;
    width: 300px;
  }

  .el-link {
    color: #E5E6DB;
  }

  .el-row {
    margin-bottom: 1px;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 30px;
    padding-left: 12px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-input {
    font-size: 14px
  }

</style>