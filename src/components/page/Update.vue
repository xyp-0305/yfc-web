<template>
  <div style="display:inline-block;width:800px;margin:10px auto;">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="公司名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="用户类型" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择注册用户类型">
          <el-option label="普通用户" value="1"></el-option>
          <el-option label="专家" value="2"></el-option>
          <el-option label="服务商" value="3"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="即时配送" prop="delivery">
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质" prop="type">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>      
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getPersonalInfo, updateUserInfo } from "../../api/api";
export default {
  data() {
    return {
      ruleForm: {
        name: "sgs",
        region: "",
        // date1: "",
        // date2: "",
        delivery: false,
        type: [],
        resource: "afgh",
        desc: "sghh"
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  created() {
    // 获取用户信息
    const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
    const key = "RWERFGSDDGTWETGD";
    const sign = this.$md5(
      key + "Key" + key + "Timestamp" + timestamp + key
    ).toUpperCase();
    const token = JSON.parse(sessionStorage.getItem("token"));
    const params = {
      Key: key,
      Sign: sign,
      Timestamp: timestamp,
      Body: token
    };
    getPersonalInfo(params).then(data => {
      console.log(data);
    });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
          const key = "RWERFGSDDGTWETGD";
          const sign = this.$md5(
            key + "Key" + key + "Timestamp" + timestamp + key
          ).toUpperCase();
          const token = JSON.parse(sessionStorage.getItem("token"));
          console.log(token);
          const updateParams = {
            Key: key,
            Sign: sign,
            Timestamp: timestamp,
            Body: {
              Token: token,
              Name: "张三",
              Email: "xxx@163.com",
              CompanyName: "公司集团",
              Position: "工程师",
              Industry: "文旅",
              BusinessScale: "100-200人"
            }
          };
          updateUserInfo(updateParams).then(data => {
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
    }
  },
  components: {}
};
</script>

<style>
</style>
