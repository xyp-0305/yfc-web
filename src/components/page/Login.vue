<template>
  <div class="login">
    <el-form
      :model="ruleForm2"
      :rules="rules2"
      ref="ruleForm2"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">系统登录</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm2.checkPass"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit"
          :loading="logining"
        >登录</el-button>
        <el-button @click.native.prevent="handleRegister">注册</el-button>
        <el-button @click.native.prevent="handleReset2">重置</el-button>
      </el-form-item>
      <p>推荐使用火狐，谷歌，IE11浏览器访问</p>
    </el-form>
  </div>
</template>

<script>
import { requestLogin } from "../../api/api";
export default {
  data() {
    return {
      logining: false,
      ruleForm2: {
        account: "12345678901",
        checkPass: "123456"
      },
      rules2: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        checkPass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true,
      redirect:''
    };
  },
  methods: {
    // 重置表单
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    // 提交登录
    handleSubmit(ev) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;

          // var token = sessionStorage.getItem("token");
          // console.log("token:--" + token);
          const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
          //   console.log("时间戳1：--" + timestamp);
          const key = "RWERFGSDDGTWETGD";
          const sign = this.$md5(
            key + "Key" + key + "Timestamp" + timestamp + key
          ).toUpperCase();
          // console.log("sign1：--" + sign);
          var loginParams = {
            Key: key,
            Sign: sign,
            Timestamp: timestamp,
            Body:
              {
                UserPhone: this.ruleForm2.account,
                LoginPassword: this.ruleForm2.checkPass,
                LoginType: 1
              }
          };
          requestLogin(loginParams).then(data => {
            // console.log(data);
            this.logining = false;
            let { Message, ReturnCode, Result } = data;
            // console.log(ReturnCode);
            if (ReturnCode !== 200) {
              this.$message({ message: Message, type: "error" });
            } else {
              sessionStorage.setItem("user", JSON.stringify(this.ruleForm2.account));
              sessionStorage.setItem("password", JSON.stringify(this.ruleForm2.checkPass));
              sessionStorage.setItem("loginType", JSON.stringify(1));
              sessionStorage.setItem("token", JSON.stringify(Result));
              this.$router.push({ name: "home",params:{isShowSubmenu:true}});
            }
          });
        } else {
          this.$message.error('请按照规则正确填写登录信息！')
          return false;
        }
      });
    },
    // 跳转到注册页
    handleRegister(){
      console.log(this.$router)
      this.$router.push({name:'register'});
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
.login-container {
  /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02); */
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
