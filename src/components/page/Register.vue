<template>
  <div style="display:inline-block;width:800px;margin:10px auto;">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户类型" prop="userType">
        <el-select v-model="ruleForm.userType" placeholder="请选择注册用户类型">
          <el-option label="普通用户" value="1"></el-option>
          <el-option label="专家" value="2"></el-option>
          <el-option label="服务商" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="userName">
        <el-input v-model="ruleForm.userName" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="userPhone">
        <el-input v-model="ruleForm.userPhone" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="ruleForm.email" placeholder="请输入电子邮箱"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="companyName">
        <el-input v-model="ruleForm.companyName" placeholder="请输入公司名称"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="position">
        <el-input v-model="ruleForm.position" placeholder="请输入职位"></el-input>
      </el-form-item>
      <el-form-item label="所在行业" prop="industry">
        <el-input v-model="ruleForm.industry" placeholder="请输入所在行业"></el-input>
      </el-form-item>
      <el-form-item label="服务经理" prop="managerNumber">
        <el-input v-model="ruleForm.managerNumber" placeholder="请输入服务经理"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="handleUpdate">修改信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  requestRegister,
  getGoodAtList,
  getProvinceCityList
} from "../../api/api";
export default {
  data() {
    return {
      goodAtList: [],
      defaultProps: {
        children: "GoodAtList",
        label: "Name"
      },
      showCity: false,
      activeName: "first",
      cityList: [],
      ABCDList: [],
      EFGHList: [],
      JKLMList:[],
      NPQRList:[],
      STWList:[],
      XYZList:[],
      ruleForm: {
        userType: "普通用户",
        userName: "",
        password: "",
        name: "",
        userPhone: "",
        email: "",
        companyName: "",
        position: "",
        industry: "",
        managerNumber: "",
        goodAtTypeId: [],
        city: "",
        businessSite: "",
        businessScale: "",
        introduction: ""
      },
      rules: {
        userType: [
          { required: true, message: "请选择用户类型", trigger: "change" }
        ],
        userName: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的11位手机号（目前只支持中国大陆的手机号码）',trigger: "blur"}
        ],
        password:[
          { required: true, message: "请设定登录密码，必须含数字字符特殊符号", trigger: "blur" },
          { pattern:  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{4,16}$/, message: "新密码必须由 4-16位字母、数字、特殊符号线组成", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 4, message: "长度在 2 到 4 个字符", trigger: "blur" }
        ],
        userPhone: [
          { required: true, message: "请输入注册的手机号", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        companyName: [
          { required: true, message: "请输入公司名称", trigger: "blur" }
        ],
        position: [
          { required: true, message: "请输入职位名称", trigger: "blur" }
        ],
        industry: [
          { required: true, message: "请输入所属行业", trigger: "blur" }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    // 显示擅长列表
    getGoodAtList().then(data => {
      // console.log(data);
      this.goodAtList = data.Result;
    });
  },
  methods: {
    // 获取城市数据
    getCityList() {
      getProvinceCityList().then(data => {
        // console.log(data);
        this.cityList = data.Result;
        this.ABCDList = this.cityList.splice(0, 4);
        this.EFGHList = this.cityList.splice(0, 4);
        this.JKLMList = this.cityList.splice(0, 4);
        this.NPQRList = this.cityList.splice(0, 4);
        this.STWList = this.cityList.splice(0, 3);
        this.XYZList = this.cityList.splice(0, 3);
      });
    },
    // 选择城市
    selectCity(id,name){
      // console.log(id)
      // console.log(name)
      // this.ruleForm.cityId = id
      this.ruleForm.city = name
    },
    // 显示城市列表
    showCities() {
      if (this.cityList.length == 0) {
        this.getCityList();
      }
      this.showCity = true;
    },
    // 隐藏城市列表
    hideCities() {
      this.showCity = false;
    },
    // 切换城市组
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          const registerData = {
            Body: {
              UserType: 1,
              UserPhone: "12345678901",
              Name: "张三",
              UserName: "12345678901",
              Password: "123456",
              Email: "xxx@163.com",
              CompanyName: "公司集团",
              Position: "工程师",
              Industry: "文旅"
            }
          };
          requestRegister(registerData).then(data => {
            console.log(data);
          });
        } else {
          console.log("error register!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 修改用户信息
    handleUpdate() {
      this.$router.push({ name: "update" });
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.city {
  position: relative;
  border: solid 1px #dcdfe6;
  border-radius: 4px;
  padding: 0 10px 10px 10px;

  .is-circle {
    position: absolute;
    right: 10px;
    top: 5px;
    font-size: 16px;
    padding: 5px;
    z-index: 100;
    cursor: pointer;
  }

  .el-tabs__content {
    text-align: left;

    .cityList {
      display: flex;

      >span {
        flex: 0 0 20px;
        width: 20px;
      }

      >p {
        flex: 1;
        height: auto;
        margin-left: 10px;
        text-align: left;

        span {
          color: $color-blue;
          margin-right: 15px;
          cursor: pointer;
        }

        span:hover {
          color: $link-hover;
        }
      }
    }
  }
}
</style>
