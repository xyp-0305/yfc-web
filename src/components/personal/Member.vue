<template>
  <div class="page">
    <div class="personalInfo">
      <div class="img">
        <img :src="HOST+photo" :alt="name">
        <p class="update" @click="handleUpdate(id)">修改资料</p>
      </div>
      <div class="point">
        <p>{{name}}</p>
        <p>积分{{point}}</p>
      </div>
      <div class="member">
        <p>
          <img src="@/assets/img/questions/ordernal.png" alt="等级图标">
          {{level}}
        </p>
        <p>职位：{{position}}</p>
      </div>
    </div>
    <div class="memberInfo">
      <div class="title">
        <span>会员服务</span>
      </div>
      <div class="serviceBox">
        <el-row :gutter="20">
          <el-col :span="8" v-for="(item,index) in services" :key="index">
            <div class="grid-content">
              <div class="serviceInfo">
                <img class="level" :src="item.img" alt="会员等级">
                <p class="levelName">{{item.UserLevelName}}</p>
                <p class="endTime" v-if="item.ExpirationTime">到期时间{{item.ExpirationTime}}</p>
                <p class="endTime none" v-else>无</p>
                <p class="rights">{{item.UserLevelName}}权益</p>
                <div class="rightsInfo">
                  <P>
                    峰会系列：
                    <span>{{item.SummitCount}}次</span>
                  </P>
                  <P>
                    游学系列：
                    <span>{{item.StudyTourCount}}次</span>
                  </P>
                  <div class="descBox">
                    <ul v-for="(item1,index1) in item.list" :key="index1">
                      <li>
                        <p class="title">{{item1.title}}</p>
                      </li>
                      <li v-for="(item2,index2) in item1.list" :key="index2">
                        <p>
                          {{item2.title}}
                          <span v-show="item2.num">{{item2.num}}次</span>
                        </p>
                        <p v-show="item2.desc" class="desc">({{item2.desc}})</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getMemberCenterInfo
} from "../../api/api";
export default {
  data() {
    return {
      photo: "", // 会员头像
      id: 0, // 会员id
      name: "", // 会员姓名
      point: 0, // 会员积分
      level: "", // 会员等级
      position: "", // 会员职位
      services: [], // 会员服务
      servicesDesc: [
        // 会员权益详细
        {
          img: require("@/assets/img/home/level-1.png"),
          list: [
            {
              title: "全年深度学习",
              list: [
                {
                  title: "【马上说】汗马研习社"
                },
                {
                  title: "【分享会】峰会社群"
                }
              ]
            },
            {
              title: "自媒体推广权",
              list: [
                {
                  title: "各项需求深度发布、创始人深度连接峰会现场项目展示"
                }
              ]
            },
            {
              title: "自媒体推广权",
              list: [
                {
                  title: "专家到家服务",
                  num: 1,
                  desc: "教练+顾问式的封闭研讨"
                },
                {
                  title: "峰会品牌推广",
                  num: 2
                },
                {
                  title: "品牌传播推广VI、VCR宣传册"
                }
              ]
            }
          ]
        },
        {
          img: require("@/assets/img/home/level-2.png"),
          list: [
            {
              title: "全年深度学习",
              list: [
                {
                  title: "【马上说】汗马研习社"
                },
                {
                  title: "【分享会】峰会社群"
                }
              ]
            },
            {
              title: "自媒体推广权",
              list: [
                {
                  title: "各项需求深度发布、创始人深度连接峰会现场项目展示"
                }
              ]
            },
            {
              title: "自媒体推广权",
              list: [
                {
                  title: "专家到家服务",
                  num: 1,
                  desc: "教练+顾问式的封闭研讨"
                },
                {
                  title: "峰会品牌推广",
                  num: 2
                },
                {
                  title: "品牌传播推广VI、VCR宣传册"
                }
              ]
            }
          ]
        },
        {
          img: require("@/assets/img/home/level-3.png"),
          list: [
            {
              title: "全年深度学习",
              list: [
                {
                  title: "【马上说】汗马研习社"
                },
                {
                  title: "【分享会】峰会社群"
                }
              ]
            },
            {
              title: "自媒体推广权",
              list: [
                {
                  title: "各项需求深度发布、创始人深度连接峰会现场项目展示"
                }
              ]
            },
            {
              title: "自媒体推广权",
              list: [
                {
                  title: "专家到家服务",
                  num: 1,
                  desc: "教练+顾问式的封闭研讨"
                },
                {
                  title: "峰会品牌推广",
                  num: 2
                },
                {
                  title: "品牌传播推广VI、VCR宣传册"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    // 获取会员中心数据
    this.getMember();
  },
  methods: {
    // 获取会员中心数据
    getMember() {
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
        Body: {
          Token: token
        }
      };
      getMemberCenterInfo(params).then(data => {
        // console.log(data);
        let { Message, ReturnCode, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.photo = Result.FacialPhotoUrl;
          this.id = Result.Id;
          this.name = Result.Name;
          this.point = Result.IntegralNum;
          this.level = Result.UserLevelName;
          this.position = Result.Position;
          this.services = Result.UserRightsConfigList;
          let that = this;
          this.servicesDesc.forEach((e, i) => {
            //   console.log(e)
            //   console.log(i)
            that.$set(that.services[i], "img", e.img);
            that.$set(that.services[i], "list", e.list);
            sessionStorage.setItem("integralNum",Result.IntegralNum);
          });
        } else {
          this.$message.error(Message);
        }
      });
    },
    // 跳转到修改资料页面
    handleUpdate(id) {
      console.log(id);
    }
  },
  components: {}
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.page {
  .personalInfo {
    display: flex;
    background-color: $color-white;
    padding: 20px;

    p {
      font-size: $font-16;
      line-height: 30px;
      text-align: left;
      img{
          vertical-align:top;
          margin-top:5px;
          margin-right:5px;
      }
    }

    .img {
      flex: 0 0 100px;
      width: 100px;

      img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }

      .update {
        color: $color-blue;
        text-align: center;
        cursor: pointer;
      }

      .update:hover {
        color: $link-hover;
      }
    }

    .point, .member {
      flex: 0 0 300px;
      width: 200px;
      margin-left: 20px;
      margin-top:20px;
    }

    .member {
      flex: 1;
    }
  }

  .memberInfo {
    background-color: $color-white;
    margin-top: 20px;

    .title {
      margin: 0;
      font-size: 16px;
      font-weight: 700;
      text-align: left;
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

    .serviceBox {
      border-top: solid 1px $border-color-grey;

      .serviceInfo {
        padding: 20px;

        .level {
          margin: 10px auto;
        }

        p {
          color: $color-black;
          line-height: 30px;
          text-align: center;
        }
        .levelName{
            font-size:$font-16;
        }

        .endTime {
          color: $color-grey;
        }

        .none {
          color: $color-white;
        }

        .rights {
          height: 60px;
          line-height: 60px;
          color: $color-white;
          font-size: $font-20;
          background-color: #B0C11D;
        }

        .rightsInfo {
          background-color: #F7FAE9;
          padding: 20px 0;

          p {
            padding: 0 20px;
            font-size:$font-16;
            text-align: left;

            span {
              float: right;
            }
          }

          .descBox {
            margin-top: 20px;
            border-top: solid 1px $border-color-grey;

            ul {
              margin-top: 20px;

              li {
                p {
                  color: $color-grey;
                  font-size:$font-14;
                  line-height: 30px;
                }

                .title {
                  color: $color-black;
                  font-size: $font-16;
                  font-weight: 400;
                  border-left: solid 3px #B0C11D;
                  padding-left: 10px;
                  margin-bottom: 20px;
                }

                .desc {
                  font-size: $font-12;
                  line-height: 15px;
                  margin-bottom: 10px;
                }
              }
            }

            ul:first-child {
              margin-top: 0;
            }
          }
        }
      }

      .el-col:nth-child(2) {
        .rights {
          background-color: #FA9219;
        }

        .rightsInfo {
          background-color: #FEF4E8;
        }

        .descBox {

          ul {
            li {
              .title {
                border-color: #FA9219;
              }
            }
          }
        }
      }

      .el-col:nth-child(3) {
        .rights {
          background-color: #497EF0;
        }

        .rightsInfo {
          background-color: #ECF3FD;
        }

        .descBox {

          ul {
            li {
              .title {
                border-color: #497EF0;
              }
            }
          }
        }
      }
    }
  }
}
</style>
