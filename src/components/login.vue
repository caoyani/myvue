<template>
  <div>
    <div class="background_fixed"></div>
    <el-card class="box-card">
      <b>ABCD tooling system</b>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="$t('login.login')" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item :label="$t('login.username')" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('login.password')" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" auto-complete="off" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t("login.login")}}</el-button>
              <el-button @click="resetForm('ruleForm')">{{$t("login.reset")}}</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import axios from "@/axios.js";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("login.hint2")));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      activeName: "first",
      ruleForm: {
        name: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        name: [
          { required: true, message: this.$t("login.hint1"), trigger: "blur" },
          { min: 1, max: 15, message: this.$t("login.hint3"), trigger: "blur" }
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }]
      }
    };
  },

  methods: {
    //选项卡切换
    handleClick(tab, event) {},
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // axios.ldapAuth(this.ruleForm).then(({ data }) => {
          axios.mockData(this.ruleForm).then(({ data }) => {

            console.info("111111111---" + JSON.stringify(data));
            //账号不存在
            if (data.result === false) {
              this.$message({
                type: "info",
                message: this.$t("login.loginError")
              });
              return;
            } else {
              this.$message({
                type: "success",
                message: this.$t("login.logSucc")
              });
              //拿到返回的token和username，并存到store
              let token = data.token;
              let username = data.name;
              this.$store.dispatch("UserLogin", token);
              this.$store.dispatch("UserName", username);

              this.$emit("profile", username);
              //跳到目标页
              this.$router.push("createcomp");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.box-card {
  width: 450px;
  margin: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 170px;
  padding-right: 40px;
  padding-top: 15px;
  padding-left: 20px;
  text-align: center;
}
.background_fixed {
  background-image: url("../assets/timg.jpg");
  background-size: 100% 100%;
  -webkit-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  z-index: -1;
  zoom: 1;
  background-repeat: no-repeat;
}

</style>