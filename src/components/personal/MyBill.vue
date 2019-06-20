<template>
  <div class="page">
    <div class="memberInfo">
        <div class="title"> 
          <div><span>发票设置</span></div>
        </div>
         <div class="titleBottom">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="160px" class="demo-ruleForm" style="width:95%;margin-top: 20px;">
              <el-form-item label="发票类型：">
                <el-radio-group v-model="radio" @change="radioChange">
                  <el-radio :label="1">普通发票</el-radio>
                  <el-radio :label="2">增值税发票</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="发票主体：" >
                  <el-radio-group v-model="radio1" @change="radioChange1" :disabled="radioDisabled">
                    <el-radio :label="1">个人</el-radio>
                    <el-radio :label="2">公司</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-row>
                  <el-col :span="12">
                        <el-form-item label="发票抬头：" prop="qaInvoiceTitle">
                      <el-input v-model="ruleForm.qaInvoiceTitle" style="width:250px;"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票收件人：" prop="qaName">
                      <el-input v-model="ruleForm.qaName" style="width:250px;"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="公司税号：" prop="qaTaxNumber" >
                      <el-input v-model="ruleForm.qaTaxNumber" style="width:250px;" :disabled="taxNumberTitle"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票收件人电话：" prop="qaTelPhone">
                      <el-input v-model="ruleForm.qaTelPhone" style="width:250px;"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="公司注册地址：" prop="qaRegisteredAddress">
                      <el-input v-model="ruleForm.qaRegisteredAddress" style="width:250px;" :disabled="registeredAddressTitle"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                     <el-form-item label="发票邮寄地址：" prop="qaAddress">
                      <el-input v-model="ruleForm.qaAddress" style="width:250px;"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            <el-form-item label="公司注册电话："  prop="qaRegisteredPhone">
              <el-input v-model="ruleForm.qaRegisteredPhone" style="width:250px;" :disabled="registeredPhoneTitle"></el-input>
            </el-form-item>
            <el-form-item label="开户行：" prop="qaBank"> 
              <el-input v-model="ruleForm.qaBank" style="width:250px;" :disabled="bankTitle"></el-input>
            </el-form-item>
            <el-form-item label="开户行账户：" prop="qaBankNumber">
              <el-input v-model="ruleForm.qaBankNumber" style="width:250px;"  :disabled="bankNumberTitle"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" style="width:100px;font-size:16px;">保存</el-button>
            </el-form-item>
          </el-form>
         </div>
    </div>
    <div class="invoiceInfo" style="height:560px;">
        <div class="title"> 
          <div>
            <span>发票订单</span>
          </div>
        </div>
        <div class="titleBottom">
            <div class="project" style="height: 441px;margin-top: 20px;">
                <template>
                <el-table :data="invoiceData" stripe border :header-cell-style="styleObj" style="width: 95%;margin-left: 17px;">
                    <el-table-column prop="OrderId" width="150" label="订单号" align="center"></el-table-column>
                    <el-table-column prop="InvoiceType" :formatter="formatInvoiceType" width="100" label="发票类型" align="center"></el-table-column>
                    <el-table-column prop="InvoiceBody" :formatter="formatInvoiceBody" width="98" label="发票主体" align="center"></el-table-column>
                    <el-table-column prop="InvoiceTitle" width="200" label="发票抬头" align="center"></el-table-column>
                    <el-table-column prop="BillingStatus" width="100" label="发票状态" align="center"></el-table-column>
                    <el-table-column prop="PayDate" :formatter="formatDate" label="申请开票时间" width="200" align="center"></el-table-column>
                </el-table>
                </template>
            </div>
            <div class="page" style="margin-top: 15px;text-align: center;">
              <el-pagination
                background
                :current-page="pageIndex"
                layout="prev, pager, next"
                :page-size="10"
                :total="invoiceDataTotal"
                @current-change="handlePageChange">
                </el-pagination>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
  getInvoiceList,
  GetOrderInvoiceList,
  addUpdateInvoice
} from "../../api/api";
export default {
  data() {
    return {
      radio: 1,
      radio1: 1,
      radioDisabled:false,
      taxNumberTitle:true,
      registeredAddressTitle:true,
      registeredPhoneTitle:true,
      bankTitle:true,
      isInvoiceTitle:true,
      bankNumberTitle:true,
      //表格
      styleObj: {'background-color':'#eee'},
      activeName: 'first',
      tabPosition: 'top',
      invoiceData: [],
      invoiceDataTotal:0,
      pageIndex: 1, 
      ruleForm: {
        qaName:"",
        qaTelPhone:"",
        qaAddress:"",
        qaInvoiceTitle:"", 
        qaTaxNumber: "", 
        qaRegisteredAddress: "" ,
        qaRegisteredPhone:"",
        qaBank:"",
        qaBankNumber:""
      },
      rules: {
        qaName: [
          { required: true, message: "请填写发票收件人", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        qaTelPhone: [
          { required: true, message: "请填写发票收件人电话", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        qaAddress: [
          { required: true, message: "发票邮寄地址", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        qaInvoiceTitle: [
          { required: true, message: "请填写发票抬头", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        qaTaxNumber: [
          {
            validator:(rule, value, callback) => {
              if(this.radio==2 || this.radio1==2)
              {
                if (!value) {
                  return callback(new Error('请填写公司税号'));
                }
                else if (value.length < 1 || value.length > 30) {
                   callback(new Error('长度在 2 到 30 个字符'));
                } else {
                   callback();
                }
              }
              else
              {
                 callback();
              }
              
            }, trigger: 'blur'
          }
        ],
        qaRegisteredAddress: [
          {
            validator:(rule, value, callback) => {
              if(this.radio==2)
              {
                if (!value) {
                  return callback(new Error('请填写公司注册地址'));
                }
                else if (value.length < 1 || value.length > 30) {
                   callback(new Error('长度在 2 到 30 个字符'));
                } else {
                   callback();
                }
              }else
              {
                 callback();
              }
            }, trigger: 'blur'
          }
        ],
        qaRegisteredPhone: [
          {
            validator:(rule, value, callback) => {
              if(this.radio==2)
              {
                if (!value) {
                  return callback(new Error('请填写公司注册电话'));
                }
                else if (value.length < 1 || value.length > 30) {
                   callback(new Error('长度在 2 到 30 个字符'));
                } else {
                   callback();
                }
              }
              else
              {
                 callback();
              }
            }, trigger: 'blur'
          }
        ],
        qaBank: [
          {
            validator:(rule, value, callback) => {
              if(this.radio==2)
              {
                if (!value) {
                  return callback(new Error('请填写开户行'));
                }
                else if (value.length < 1 || value.length > 30) {
                   callback(new Error('长度在 2 到 30 个字符'));
                } else {
                   callback();
                }
              }else
              {
                 callback();
              }
            }, trigger: 'blur'
          }
        ],
        qaBankNumber: [
          {
            validator:(rule, value, callback) => {
              if(this.radio==2)
              {
                if (!value) {
                  return callback(new Error('请填写开户行账户'));
                }
                else if (value.length < 1 || value.length > 30) {
                   callback(new Error('长度在 2 到 30 个字符'));
                } else {
                   callback();
                }
              }else
              {
                 callback();
              }
            }, trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.getInvoiceList();
    this.GetOrderInvoiceList(1);
  },
  methods: {
    //获取发票详细
    getInvoiceList(){
       const token = JSON.parse(sessionStorage.getItem("token"));
      //时间戳
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();

      //绑定请求参数
      const params = {
        Body: {
          Token: token
        }
      };

      getInvoiceList(params).then(data => {
        let { Message, ReturnCode, Result } = data;
        if (ReturnCode == 200 && Result != null) {
            Result.forEach(element => {
                switch(element.InvoiceType)
                {
                  case 1:
                    //普通发票
                    sessionStorage.setItem("calInvoice",JSON.stringify(element));  
                    break;
                  case 2:
                    //增值税发票
                    sessionStorage.setItem("vatInvoice",JSON.stringify(element)); 
                    break;
                }
            });

            if(sessionStorage.getItem("calInvoice")!=null)
            {
              this.radio=1;
              this.taxNumberTitle= true
              this.registeredAddressTitle= true;
              this.registeredPhoneTitle= true;
              this.registeredPhoneTitle= true;
              this.bankTitle = true;
              this.bankNumberTitle =true;
              this.radioDisabled=false;
              this.radio1=1;
              this.isRequired=false;

              this.assignInvoice(1);
            }
            else if(sessionStorage.getItem("vatInvoice")!=null)
            {
              this.radio=2;
              this.taxNumberTitle= false;
              this.registeredAddressTitle= false;
              this.registeredPhoneTitle= false;
              this.registeredPhoneTitle= false;
              this.bankTitle = false;
              this.bankNumberTitle =false;
              this.radioDisabled =true;
              this.radio1=2;
              this.isRequired=true;

              this.assignInvoice(2);
            }
        }
      });
    },
    //获取发票列表
    GetOrderInvoiceList(pageIndex){
      const token = JSON.parse(sessionStorage.getItem("token"));
      //时间戳
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();

      //绑定请求参数
      const params = {
        Body: {
          Token: token,
          Page: pageIndex,
          Rows: 10,
          Sort: "CreateTime",
          IsAsc:false
        }
      };

      GetOrderInvoiceList(params).then(data => {
        let { Message, ReturnCode, Result } = data;
        if (ReturnCode == 200) {
            this.invoiceData = Result.Models;
            this.invoiceDataTotal= Result.Total;
        }
      });
    },
    //翻页事件
    handlePageChange(currentPage) {
      this.pageIndex = currentPage;
      this.getInvoiceListList(currentPage);
    },
    //提交添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addUpdateInvoice();
        } else {
          this.$message.error('请按照填写规则，正确填写！')
          return false;
        }
      });
    },
    //添加变更发抬头票信息
    addUpdateInvoice() {
      const timestamp = Math.round(new Date() / 1000); // 获取当前时间戳
      const key = "RWERFGSDDGTWETGD";
      const sign = this.$md5(
        key + "Key" + key + "Timestamp" + timestamp + key
      ).toUpperCase();
      const token = JSON.parse(sessionStorage.getItem("token"));

      var id = 0;
      //判定是新增还是变更
      switch(this.radio)
      {
          case 1:
            var item =JSON.parse(sessionStorage.getItem("calInvoice"));
            if(item != null)
            {
              id=item.Id;
            }
            break;
          case 2:
            const item = JSON.parse(sessionStorage.getItem("vatInvoice"));
            if(item != null)
            {
               id=item.Id;
            }
            break;
      }

      const params = {
        Key: key,
        Sign: sign,
        Timestamp: timestamp,
        Body: {
          Token: token,
          Id:id,
          InvoiceType: this.radio,
          InvoiceBody: this.radio1,
          InvoiceTitle: this.ruleForm.qaInvoiceTitle,
          TaxNumber: this.ruleForm.qaTaxNumber,
          Name: this.ruleForm.qaName,
          TelPhone: this.ruleForm.qaTelPhone,
          Address: this.ruleForm.qaAddress,
          RegisteredAddress: this.ruleForm.qaRegisteredAddress,
          RegisteredPhone: this.ruleForm.qaRegisteredPhone,
          Bank: this.ruleForm.qaBank,
          BankNumber: this.ruleForm.qaBankNumber,
        }
      };
      addUpdateInvoice(params).then(data => {
        let { Message, ReturnCode, Result } = data;
        if (ReturnCode == 200) {
          this.$message({message:'保存成功！',type:'success'});
          this.getInvoiceList();
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
    //格式化时间
    formatDate: function (row, column) {
      var fmt="yyyy-MM-dd hh:mm:ss";
      var date = new Date(row.PayDate);
      var o = {   
        "M+" : date.getMonth()+1,                 //月份   
        "d+" : date.getDate(),                    //日   
        "h+" : date.getHours(),                   //小时   
        "m+" : date.getMinutes(),                 //分   
        "s+" : date.getSeconds(),                 //秒   
        "q+" : Math.floor((date.getMonth()+3)/3), //季度   
        "S"  : date.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;
    },
    //格式化发票类型
    formatInvoiceType: function(row, column){
      var fmt="普通发票";
      var invoiceType = row.InvoiceType;
      if(invoiceType>1)
      {
          fmt="增值税发票";
      }
      return fmt;
    },
    //格式化发票主体
    formatInvoiceBody: function(row, column){
      var fmt="个人";
      var invoiceBody = row.InvoiceBody;
      if(invoiceBody>1)
      {
          fmt="公司";
      }
      return fmt;
    },
    radioChange(){
      if(this.radio==2)
      {
        this.taxNumberTitle= false;
        this.registeredAddressTitle= false;
        this.registeredPhoneTitle= false;
        this.registeredPhoneTitle= false;
        this.bankTitle = false;
        this.bankNumberTitle =false;
        this.radioDisabled =true;
        this.radio1=2;
        this.isRequired=true;
      }
      else
      {
        this.taxNumberTitle= true
        this.registeredAddressTitle= true;
        this.registeredPhoneTitle= true;
        this.registeredPhoneTitle= true;
        this.bankTitle = true;
        this.bankNumberTitle =true;
        this.radioDisabled=false;
        this.radio1=1;
        this.isRequired=false;
      }
      this.assignInvoice(this.radio);
    },
    radioChange1(){
      if(this.radio1==2)
      {
        this.taxNumberTitle= false;
      }
      else
      {
        this.taxNumberTitle= true;
      }
    },
    assignInvoice(radioState)
    {
        this.ruleForm.qaName="",
        this.ruleForm.qaTelPhone="",
        this.ruleForm.qaAddress="",
        this.ruleForm.qaInvoiceTitle="";
        this.ruleForm.qaTaxNumber = "";
        this.ruleForm.qaRegisteredAddress="";
        this.ruleForm.qaRegisteredPhone= "";
        this.ruleForm.qaBank= "";
        this.ruleForm.qaBankNumber= "";
        switch(radioState)
        {
            case 1:
              var item =JSON.parse(sessionStorage.getItem("calInvoice"));
              if(item != null)
              {
                this.ruleForm.qaName=item.Name;
                this.ruleForm.qaTelPhone=item.TelPhone;
                this.ruleForm.qaAddress=item.Address;
                this.ruleForm.qaInvoiceTitle=item.InvoiceTitle;
                if(item.InvoiceBody>1)
                {
                    this.radio1 = item.InvoiceBody;
                    this.ruleForm.qaTaxNumber = item.TaxNumber;
                    this.taxNumberTitle = false;
                }
              }
              break;
            case 2:
              const item = JSON.parse(sessionStorage.getItem("vatInvoice"));
              if(item != null)
              {
                this.ruleForm.qaName=item.Name;
                this.ruleForm.qaTelPhone=item.TelPhone;
                this.ruleForm.qaAddress=item.Address;
                this.ruleForm.qaInvoiceTitle=item.InvoiceTitle;
                this.radio1 = item.InvoiceBody;
                this.ruleForm.qaTaxNumber = item.TaxNumber;
                this.ruleForm.qaRegisteredAddress= item.RegisteredAddress;
                this.ruleForm.qaRegisteredPhone= item.RegisteredPhone;
                this.ruleForm.qaBank= item.Bank;
                this.ruleForm.qaBankNumber= item.BankNumber;
              }
              break;
        }
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  .memberInfo {
    background-color: $color-white;
    margin-top: 0px;
    height :520px;
    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 10px 20px;

      div
      {
        width: 150px;
        margin-left: -20px;
      }
      span {
        color:#409EFF;
        padding-left: 10px;
        margin-left: 10px;
      }

      a {
        float: right;
        color: $color-blue;
      }

      a:hover {
        color: $link-hover;
      }
    }

    .titleBottom
    {
        border-top: 1px solid rgb(220, 220, 220);
        height: 150px;
        margin-top:2px;
        text-align:left;
    }
  }

  .invoiceInfo {
    background-color: $color-white;
    margin-top: 20px;
    height :550px;
    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
      padding: 10px 20px;

      div
      {
        width: 150px;
        margin-left: -20px;
      }
      span {
        color:#409EFF;
        padding-left: 10px;
        margin-left: 10px;
      }

      a {
        float: right;
        color: $color-blue;
      }

      a:hover {
        color: $link-hover;
      }
    }

    .titleBottom
    {
        border-top: 1px solid rgb(220, 220, 220);
        height: 150px;
        margin-top:2px;
        text-align:left;
    }
  }
}
</style>
