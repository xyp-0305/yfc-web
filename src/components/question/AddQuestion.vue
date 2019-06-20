<template>
  <div class="content">
    <div class="contentBox">
      <div class="title">
        <span>发布问题</span>
      </div>
      <div class="contentForm">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题：" prop="qaName">
            <el-input v-model="ruleForm.qaName"></el-input>
          </el-form-item>
          <el-form-item label="所属业务：" prop="qaType">
            <el-select v-model="ruleForm.qaType">
              <el-option-group v-for="(group,index) in qaTypeList" :key="index" :label="group.Name">
                <el-option
                  v-for="(item,index1) in group.ColumnList"
                  :key="index1"
                  :label="item.Name+item.Id"
                  :value="item.Id"
                ></el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
          <el-form-item label="问题描述：" prop="qaContent">
            <v-editor v-model="ruleForm.qaContent"></v-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getQATypeList, addIndustryQA } from "../../api/api";
import vEditor from "./../common/Editor";
import bus from "./../common/bus.js";
export default {
  data() {
    return {
      qaTypeList: [], // 问答类型
      ruleForm: {
        qaName: "", // 标题
        qaType: "", // 类型
        qaContent: "" // 内容
      },
      rules: {
        qaName: [
          { required: true, message: "请简要说明问题", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        qaType: [
          { required: true, message: "请选择业务问题", trigger: "change" }
        ],
        qaContent: [
          { required: true, message: "请输入问题内容", trigger: "blur" },
          {
            min: 20,
            max: 500,
            message: "长度在 20 到 500 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getQAType();
  },
  methods: {
    // 获取行业问答类型
    getQAType() {
      getQATypeList().then(data => {
        //   console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.qaTypeList = Result;
        }
      });
    },
    // 添加行业问答
    addQA() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = sessionStorage.getItem("token");
      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          QATitle: this.ruleForm.qaName,
          QAContent: this.ruleForm.qaContent,
          TypeId: this.ruleForm.qaType
        }
      };
      addIndustryQA(params).then(data => {
        // console.log(params)
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.$message({message:'已发布成功！',type:'success'})
        }else{
            if(ReturnCode == 301){
              this.$message({message:Message,type:'warning'})
              this.$router.push({name:'login'})
            }else{
              this.$message.error(Message)
            }
        }
      });
    },
    // 提交发布
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addQA(); // 添加问答  
        } else {
          this.$message.error('请按照规则正确填写！')
          return false;
        }
      });
    }
  },
  mounted() {
    // 监听事件，获取问答内容
    bus.$on("editor", content => {
      //   console.log(content)
      this.ruleForm.qaContent = content;
    });
  },
  components: {
    vEditor
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.content {
  padding: 20px 0;

  .contentBox {
    background-color: $color-white;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      border: none;
      padding: 10px 20px;

      span {
        border-left: solid 3px $color-blue;
        padding-left: 10px;
      }

      a {
        float: right;
        color: $color-blue;
      }

      a:hover {
        color: $link-hover;
      }
    }

    .contentForm {
      padding: 20px;

      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
