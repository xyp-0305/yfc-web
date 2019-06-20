<template>
  <div ref="home">
    <v-banner :carousel-data="carouselData"></v-banner>
    <v-top :top-data="topData"></v-top>
    <v-entry></v-entry>
    <!-- start一站式生态服务 -->
    <div class="content content-ecoService">
      <div class="title">
        <span class="name">产业链一站式生态服务</span>
        <div class="line">
          <span class="name">产业链一站式生态服务</span>
        </div>
      </div>
      <div class="content-main">
        <div class="procedure">
          <ul>
            <li
              :class="{'active':index==currentIndex}"
              @click="handleProcedure(index)"
              v-for="(item,index) in procedureData"
              :key="index"
            >
            <div class="img">
              <b></b>
              <img :src="HOST+item.LogoUrl" :alt="item.Name">
            </div> 
              <p>{{item.Name}}</p>
            </li>
          </ul>
          <div class="procedureBox">
            <div class="title">{{currentProcedureData.Name}}</div>
            <div class="desc">{{currentProcedureData.Introduction}}</div>
            <div class="procedureItem">
              <ul>
                <li
                  v-for="(item1,index1) in currentProcedureData.ProcessNavigationList"
                  :key="index1"
                >
                  <img :src="HOST+item1.LogoUrl" :alt="item1.Name">
                  <p class="name">{{item1.Name}}</p>
                  <p class="introduct">{{item1.Introduction}}</p>
                  <!-- <ul class="info">
                    <li v-for="(item2,index2) in item1.tags" :key="index2">{{item2}}</li>
                  </ul>-->
                  <el-button class="apply" @click.native.prevent="handleApply(item1.Id)">立即申请</el-button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end一站式生态服务 -->

    <!-- start产业服务 -->
    <div class="content content-buildService">
      <div class="title">
        <span class="name">产业服务</span>
        <div class="line">
          <span class="name">产业服务</span>
        </div>
      </div>
      <div class="content-main">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="产业招商" name="first">
            <div class="bussiness">
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content">
                    <div
                      :class="[index==partnerCurrentIndex ? 'partner active':'partner']"
                      v-for="(item,index) in industryBuissness"
                      :key="index"
                    >
                      <div class="name" @click="handleStage(index)">
                        <img :src="partnerImg[index]" :alt="item.Name">
                        <p>{{item.Name}}</p>
                        <p class="line">
                          <span>{{item.Name}}</span>
                        </p>
                      </div>
                      <div class="stage">
                        <!-- <span
                          :class="{'active':index1==industryBuissness[index].StageCurrentIndex}"
                          v-for="(item1,index1) in item.Stages"
                          :key="index1"
                        >{{item1.Name}}</span> -->
                        <span
                          v-for="(item1,index1) in item.Stages"
                          :key="index1"
                        >{{item1.Name}}</span>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="grid-content">
                    <div
                      :class="index==industryBuissness[partnerCurrentIndex].StageCurrentIndex?'partner partnerList active':'partner partnerList'"
                      v-for="(item,index) in industryBuissness[partnerCurrentIndex].Stages"
                      :key="index"
                    >
                    <!-- <div class="partner partnerList"> -->
                      <div class="stages">
                        <span
                          @mousemove="handleStageInfo(item1)"
                          v-for="(item1,index1) in item.List.ChildList"
                          :key="index1"
                        >{{item1.Name}}</span>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="grid-content">
                    <div class="parterInfo">
                      <!-- <p class="title">详细说明</p> -->
                      <p class="title">{{currentPartnerInfo.Name}}</p>
                      <div class="parterContent">
                        <p>{{currentPartnerInfo.Content}}</p>
                      </div>
                      <div class="parterService">
                        <p class="title">相关服务</p>
                        <ul class="services">
                          <li v-for="(item,index) in 3" :key="index">
                            <a href>
                              <img
                                :src="require(`@/assets/img/home/icon-service-${index+1}.png`)"
                                alt="服务图标"
                              >
                              <span>服务{{index+1}}</span>
                            </a>
                          </li>
                          <li v-for="(item,index) in 3" :key="index+3">
                            <a href>
                              <img
                                :src="require(`@/assets/img/home/icon-service-${index+1}.png`)"
                                alt="服务图标"
                              >
                              <span>服务{{index+1+3}}</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="产业资源" name="second">
            <div class="resource">
              <!-- <div class="title">
                <span>产业资源</span>
                <a class="more" href>查看更多</a>
              </div> -->
              <ul>
                <li
                  v-show="allResourceData.length>0"
                  v-for="(item,index) in allResourceData"
                  :key="index"
                >
                  <a href>
                    <b></b>
                    <img :src="HOST+item.LogUrl" :alt="item.Company">
                  </a>
                </li>
              </ul>
              <div class="bigType">
                <span class="prev">
                  <i class="el-icon-arrow-left" @click="handleResourcePrev()"></i>
                </span>
                <div class="typeResourceBox">
                  <el-row :gutter="20">
                    <el-col
                      v-show="item.IndustryResourcesList.length>0"
                      :span="12"
                      v-for="(item,index) in currentResourceData"
                      :key="index"
                    >
                      <div class="plate">
                        <ul>
                          <li>{{item.TypeName}}</li>
                          <li v-for="(item1,index1) in item.IndustryResourcesList" :key="index1">
                            <a href>
                              <b></b>
                              <img :src="HOST+item1.LogUrl" :alt="item1.Company">
                            </a>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                </div>
                <span class="next">
                  <i class="el-icon-arrow-right" @click="handleResourceNext()"></i>
                </span>
              </div>
              <div class="supplierBox">
                <div class="title">
                <span>优质服务商</span>
                <a class="more" href>查看更多</a>
              </div>
              <el-row :gutter="0">
                <el-col :span="8" v-for="(item,index) in providerData" :key="index">
                  <div class="supplier">
                    <div>
                      <img class="logo" :src="HOST+item.FacialPhotoUrl" :alt="item.Name">
                      <div class="info">
                        <p class="name">
                          <span>{{item.Name}}</span>
                          <img src="@/assets/img/home/renzheng-blue.png" alt="认证">
                          <img src="@/assets/img/home/icon-zhibao.png" alt="质保">
                        </p>
                        <p>
                          <!-- <i class="el-icon-location"></i> -->
                          <img src="@/assets/img/home/icon-address.png" alt="地址">
                          <!-- <span>{{item.ProvincesName}}</span> -->
                          <span>{{item.CityName}}</span>
                          <input
                            class="enter"
                            type="button"
                            value="进入店铺"
                            @click="handleEnter(item.Id)"
                          >
                        </p>
                      </div>
                    </div>
                    <div class="tags">
                      <p v-show="item.GoodAtList.length>0">
                        <img src="@/assets/img/home/icon-type.png" alt="标签">
                        <span v-for="(item1,index1) in item.GoodAtList" :key="index1">{{item1.Name}}</span>
                      </p>
                      <p v-show="item.Industry">
                        <img src="@/assets/img/home/icon-type.png" alt="标签">
                        <span>{{item.Industry}}</span>
                        <!-- <span v-for="(item1,index1) in item.GoodAtList" :key="index1">{{item2}}</span> -->
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
              </div>
              
            </div>
          </el-tab-pane>
          <el-tab-pane label="产业项目" name="third">
            <div class="project">
              <!-- <div class="title">
                <span>产业项目</span>
                <a class="more" href>发布需求</a>
              </div> -->
              <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) in industryProjectData" :key="index">
                  <div class="demand">
                    <div v-if="item.Status==2" class="status zhaodone">{{item.StatusName}}</div>
                    <div v-else-if="item.Status==3" class="status zhaodoing">{{item.StatusName}}</div>
                    <div v-else-if="item.Status==4" class="status done">{{item.StatusName}}</div>
                    <div v-else class="status doing">{{item.StatusName}}</div>
                    <div class="info">
                      <p class="name">{{item.DemandTitle}}</p>
                      <p class="desc">【{{item.DemandTypeName}}】</p>
                      <p v-if="item.Status==1">
                        <input
                          class="enter"
                          type="button"
                          value="承接需求"
                          @click="handleDemand(item.Id)"
                        >
                      </p>
                      <p class="data">
                        <span>{{item.ViewingCount}}人响应</span>
                        <span class="date">{{item.CreateTime}}发布</span>
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- end产业服务 -->
    <!-- start专家智库 -->
    <div class="content content-buildService">
      <div class="title">
        <span class="name">专家智库</span>
        <div class="line">
          <span class="name">专家智库</span>
        </div>
      </div>
      <div class="content-main">
        <div class="expert">
          <div class="title">
            <span>专家工作室</span>
            <a class="more" href>查看更多</a>
          </div>
          <div class="expertBox">
            <div class="expertLeft">
              <el-row :gutter="20">
                <el-col :span="8" v-for="(item,index) in expertStudioData" :key="index">
                  <div class="grid-content">
                    <div class="expertContent">
                      <img class="expertPhoto" :src="HOST+item.FacialPhotoUrl" :alt="item.Name">
                      <img class="renzheng" src="@/assets/img/home/renzheng.png" alt="认证">
                      <p class="name">{{item.Name}}</p>
                      <p class="tags" v-show="item.GoodAtList.length>0">
                        <span v-for="(item1,index1) in item.GoodAtList" :key="index1">{{item1.Name}}</span>
                      </p>
                      <div class="introduceBox">
                        <p class="introduce">{{item.Introduction}}</p>
                      </div>
                      <div class="services">
                        <ul>
                          <li v-for="(item2,index2) in 3" :key="index2">
                            <img
                              class="serviceImg"
                              :src="require(`@/assets/img/home/service-${index2+1}.png`)"
                              alt="服务图标"
                            >
                            <p class="serviceName">服务{{index2+1}}</p>
                            <p class="servicePrice">￥60.00</p>
                          </li>
                        </ul>
                      </div>
                      <div class="news">
                        <el-tabs :v-model="index">
                          <el-tab-pane label="理论体系" name="0" style="font-size:12px">
                            <ul class="newList">
                              <li
                                v-for="(item3,index3) in item.IndustryNewsInfo.Models"
                                :key="index3"
                              >
                                <a href>{{item3.NewsTitle}}</a>
                              </li>
                            </ul>
                          </el-tab-pane>
                          <el-tab-pane label="专家话题" name="1">
                            <ul class="newList">
                              <li
                                v-for="(item4,index4) in item.IndustryQAInfo.Models"
                                :key="index4"
                              >
                                <a href>{{item4.QATitle}}{</a>
                              </li>
                            </ul>
                          </el-tab-pane>
                        </el-tabs>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="expertRight">
              <img
                src="@/assets/img/home/shenbao.png"
                alt="产业申报"
                v-for="(item,index) in 2"
                :key="index"
              >
            </div>
          </div>
          <div class="title">
            <span>知名专家</span>
            <a class="more" href>查看更多</a>
          </div>
          <div class="expertBox">
            <div class="expertLeft">
              <el-row :gutter="0">
                <el-col :span="8" v-for="(item,index) in expertListData" :key="index">
                  <div class="grid-content">
                    <div class="expertContent">
                      <div class="expertMain">
                        <div class="img">
                          <img class="expertPhoto" :src="HOST+item.FacialPhotoUrl" :alt="item.Name">
                          <img class="renzheng" src="@/assets/img/home/renzheng-blue.png" alt="认证">
                        </div>
                        <div class="info">
                          <p class="name">{{item.Name}}</p>
                          <p class="company">{{item.CompanyName}}</p>
                          <p class="tags">
                            <span
                              v-for="(item1,index1) in item.GoodAtList"
                              :key="index1"
                            >{{item1.Name}}</span>
                          </p>
                        </div>
                      </div>
                      <div class="opts">
                        <input class="ask" type="button" value="咨询专家">
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="expertRight">
              <img
                src="@/assets/img/home/shenbao.png"
                alt="产业申报"
                v-for="(item,index) in 2"
                :key="index"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end专家智库 -->

    <!-- start商学院 -->
    <div class="content content-buildService">
      <div class="title">
        <span class="name">商学院</span>
        <div class="line">
          <span class="name">商学院</span>
        </div>
      </div>
      <div class="content-main">
        <el-tabs v-model="activeName4" @tab-click="handleClick4">
          <el-tab-pane label="人才培养" name="first">
            <div class="train">
              <div class="trainType">
                <el-row :gutter="20">
                  <el-col :span="6" v-for="(item,index) in ['大文旅','大康养','大科技','大农业']" :key="index">
                    <div class="grid-content">
                      <a href>{{item}}</a>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="trainApply">
                <el-button @click.native.prevent="handleApply">申请合作</el-button>
              </div>
              <div class="trainBox">
                <el-tabs v-model="activeName5" @tab-click="handleClick5">
                  <el-tab-pane label="培养" name="first">
                    <div class="trainContent">
                      <p class="trainTypeList">
                        <span class="all active">全部</span>
                        <span v-for="(item,index) in 20" :key="index">类型{{index+1}}</span>
                      </p>
                      <div class="trainList">
                        <el-row :gutter="20">
                          <el-col :span="6" v-for="(item,index) in 8" :key="index">
                            <div class="grid-content">
                              <div class="trainProduct">
                                <div class="img">
                                  <img src="@/assets/img/train-1.jpg" alt="培训产品">
                                </div>
                                <p class="classType">
                                  班制：
                                  <span>周末班</span>
                                </p>
                                <p class="number">
                                  招生人数：
                                  <span>剩余2个名额</span>
                                </p>
                              </div>
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="招聘" name="second">
                    <div class="recruitContent">
                      <p class="recruitTypeList">
                        <span class="all active">全部</span>
                        <span v-for="(item,index) in 10" :key="index">
                          <span v-for="(item1,index1) in 4" :key="index1">子类型{{index1+1}}</span>
                        </span>
                      </p>
                      <div class="recruitList">
                        <ul>
                          <li v-for="(item,index) in 4" :key="index">
                            <div class="part1">
                              <p class="jobName">项目经理（急）</p>
                              <p class="jobSalary">10K-20K</p>
                              <p class="jobtreatment">
                                <span>五险一金</span>
                                <span>周末双休</span>
                                <span>年底奖金</span>
                                <span>绩效奖金</span>
                              </p>
                            </div>
                            <div class="part2">
                              <p class="jobCompany">北京壹方城科技有限公司</p>
                              <p class="jobAddress">
                                <span>北京</span>
                                <span>1-3年</span>
                                <span>本科</span>
                              </p>
                            </div>
                            <div class="part3">
                              <el-button @click.native.prevent="handleApplyJob">申请职位</el-button>
                            </div>
                            <div class="part4">
                              <p class="jobDate">2019-05-14</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="大型峰会" name="second">
            <div class="meeting">
              <el-row :gutter="20">
                <el-col :span="8" v-for="(item,index) in meetingData" :key="index">
                  <div class="grid-content">
                    <div class="meetingContent">
                      <div class="img">
                        <img :src="HOST+item.ImageUrl" :alt="item.Title">
                      </div>
                      <p class="title">{{item.Title}}</p>
                      <p>
                        <span class="place">{{item.MeetingPlace}}</span>
                        <span
                          v-if="item.ProductState==2"
                          class="state full"
                        >{{item.ProductStateName}}</span>
                        <span
                          v-else-if="item.ProductState==3"
                          class="state doing"
                        >{{item.ProductStateName}}</span>
                        <span
                          v-else-if="item.ProductState==4"
                          class="state over"
                        >{{item.ProductStateName}}</span>
                        <span v-else class="state">{{item.ProductStateName}}</span>
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane label="标杆游学" name="third">
            <ul class="travels">
              <li v-for="(item,index) in travelData" :key="index">
                <a href>
                  <img :src="HOST+item.ImageUrl" :alt="item.Title">
                </a>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- end商学院 -->
    <!-- start投融资 -->
    <div class="content content-buildService">
      <div class="title">
        <span class="name">投融资</span>
        <div class="line">
          <span class="name">投融资</span>
        </div>
      </div>
      <div class="content-main">
        <el-tabs v-model="activeName6" @tab-click="handleClick6">
          <el-tab-pane label="找项目" name="first">
            <div class="findProject">
              <div class="conditionList">
                <div class="condition">
                  <span>投资类型:</span>
                  <p>
                    <span
                      v-for="(item,index) in investTypeData"
                      :key="index"
                      :id="item.Id"
                    >{{item.Method}}</span>
                  </p>
                </div>
                <div class="condition" v-show="showType1">
                  <span>资金类型:</span>
                  <p>
                    <span
                      v-for="(item,index) in fundsTypeData"
                      :key="index"
                      :id="item.Id"
                    >{{item.FundsType}}</span>
                  </p>
                  <el-button @click.native.prevent="showType1 = !showType1">展开</el-button>
                </div>
                <div class="condition1" v-show="!showType1">
                  <span>资金类型:</span>
                  <p>
                    <span
                      v-for="(item,index) in fundsTypeData"
                      :key="index"
                      :id="item.Id"
                    >{{item.FundsType}}</span>
                  </p>
                  <el-button @click.native.prevent="showType1 = !showType1">收起</el-button>
                </div>
                <div class="condition" v-show="showType2">
                  <span>所在地区:</span>
                  <p>
                    <span v-for="(item,index) in cityData" :key="index" :id="item.Id">{{item.Name}}</span>
                  </p>
                  <el-button @click.native.prevent="showType2 = !showType2">展开</el-button>
                </div>
                <div class="condition1" v-show="!showType2">
                  <span>所在地区:</span>
                  <p>
                    <span v-for="(item,index) in cityData" :key="index" :id="item.Id">{{item.Name}}</span>
                  </p>
                  <el-button @click.native.prevent="showType2 = !showType2">收起</el-button>
                </div>
                <div class="condition" v-show="showType3">
                  <span>投资行业:</span>
                  <p>
                    <span
                      v-for="(item,index) in investTradeData"
                      :key="index"
                      :id="item.Id"
                    >{{item.IndustryName}}</span>
                  </p>
                  <el-button @click.native.prevent="showType3 = !showType3">展开</el-button>
                </div>
                <div class="condition1" v-show="!showType3">
                  <span>投资行业:</span>
                  <p>
                    <span
                      v-for="(item,index) in investTradeData"
                      :key="index"
                      :id="item.Id"
                    >{{item.IndustryName}}</span>
                  </p>
                  <el-button @click.native.prevent="showType3 = !showType3">收起</el-button>
                </div>
                <div class="condition" v-show="showType4">
                  <span>投资地区:</span>
                  <p>
                    <span
                      v-for="(item,index) in investCityData"
                      :key="index"
                      :id="item.Id"
                    >{{item.Name}}</span>
                  </p>
                  <el-button @click.native.prevent="showType4 = !showType4">展开</el-button>
                </div>
                <div class="condition1" v-show="!showType4">
                  <span>投资地区:</span>
                  <p>
                    <span
                      v-for="(item,index) in investCityData"
                      :key="index"
                      :id="item.Id"
                    >{{item.Name}}</span>
                  </p>
                  <el-button @click.native.prevent="showType4 = !showType4">收起</el-button>
                </div>
                <div class="condition">
                  <span>投资金额:</span>
                  <p>
                    <span
                      v-for="(item,index) in investMoneyData"
                      :key="index"
                      :id="item.Id"
                    >{{item.AmountDes}}</span>
                  </p>
                </div>
              </div>
              <div class="projectBox">
                <div class="projectList">
                  <p class="sortList">
                    <span class="active">综合排序</span>
                    <span>时间排序</span>
                    <span>金额排序</span>
                  </p>
                  <ul>
                    <li v-for="(item,index) in investListData.Models" :key="index">
                      <p class="projectName">
                        {{item.Name}}
                        <span class="date">{{item.CreateTime}}</span>
                      </p>
                      <p class="projectPrice">
                        投资金额：
                        <span>{{item.AmountId_Name}}</span>
                      </p>
                      <div class="projectInfo">
                        <div class="part1">
                          <p>投资方式：{{item.Method_Name}}</p>
                          <p>
                            投资地区：
                            <span
                              v-for="(item1,index1) in item.InvestmentAreaId_Name"
                              :key="index1"
                            >{{item1.Name}}</span>
                          </p>
                          <p>
                            投资类型：
                            <span
                              v-for="(item1,index1) in item.InvestmentType_Name"
                              :key="index1"
                            >{{item1.InvestmentTypeName}}</span>
                          </p>
                        </div>
                        <div class="part2">
                          <p>资金类型：{{item.TypeFunds_Name}}</p>
                          <p>
                            投资行业：
                            <span
                              v-for="(item1,index1) in item.InvestmentIndustryId_Name"
                              :key="index1"
                            >{{item1.IndustryName}}</span>
                          </p>
                          <p>
                            投资阶段：
                            <span
                              v-for="(item1,index1) in item.StageId_Name"
                              :key="index1"
                            >{{item1.StageDes}}</span>
                          </p>
                        </div>
                        <div class="part3">
                          <p class="name">{{item.CreateName}}</p>
                          <p>{{item.CompanyName}}</p>
                        </div>
                        <div class="part4">
                          <el-button @click.native.prevent="handleDeliver(item.Id)">投递项目</el-button>
                        </div>
                      </div>
                      <!-- <p class="data">
                        <span>78条留言</span>
                        <span>1次投递</span>
                      </p>-->
                    </li>
                  </ul>
                </div>
                <div class="caseList">
                  <div class="title">
                    <span>成功案例推荐</span>
                    <a class="more" href>查看更多</a>
                  </div>
                  <ul>
                    <li v-for="(item,index) in 3" :key="index">
                      <a href>
                        <div class="img">
                          <img src="@/assets/img/case-1.png" alt="案例">
                          <p class="name">成功融资100万元</p>
                        </div>
                        <p class="title">上海海湾国家森林公园</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="找资金" name="second">
            <div class="findProject">
              <div class="conditionList">
                <p class="condition" v-for="(item,index) in 3" :key="index">
                  <span>类型{{index+1}}:</span>
                  <span v-for="(item1,index1) in 10" :key="index1">条件{{index1+1}}</span>
                </p>
              </div>
              <div class="projectBox">
                <div class="projectList">
                  <p class="sortList">
                    <span class="active">综合排序</span>
                    <span>时间排序</span>
                    <span>金额排序</span>
                  </p>
                  <ul>
                    <li v-for="(item,index) in 3" :key="index">
                      <p class="projectName">
                        北京某企业资金100万元-3亿元寻全国项目合作
                        <span class="date">2019-05-14</span>
                      </p>
                      <p class="projectPrice">
                        投资金额：
                        <span>100万-3亿</span>
                      </p>
                      <div class="projectInfo">
                        <div class="part1">
                          <p>投资方式：股权投资</p>
                          <p>投资地区：广东省 广州市</p>
                          <p>投资类型：投资建厂</p>
                        </div>
                        <div class="part2">
                          <p>资金类型：企业资金</p>
                          <p>投资行业：房地产</p>
                          <p>投资阶段：初创期</p>
                        </div>
                        <div class="part3">
                          <p class="name">李先生</p>
                          <p>某公司名称</p>
                        </div>
                        <div class="part4">
                          <el-button @click.native.prevent="handleDeliver">投递项目</el-button>
                        </div>
                      </div>
                      <p class="data">
                        <span>78条留言</span>
                        <span>1次投递</span>
                      </p>
                    </li>
                  </ul>
                </div>
                <div class="caseList">
                  <div class="title">
                    <span>成功案例推荐</span>
                    <a class="more" href>查看更多</a>
                  </div>
                  <ul>
                    <li v-for="(item,index) in 3" :key="index">
                      <a href>
                        <div class="img">
                          <img src="@/assets/img/case-1.png" alt="案例">
                          <p class="name">成功融资100万元</p>
                        </div>
                        <p class="title">上海海湾国家森林公园</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="一键直投" name="third">
            <div class="invest">
              <div class="title">
                <span>2018年投资机构排行榜</span>
                <a class="more" href>查看更多</a>
              </div>
              <div class="investList">
                <ul>
                  <li v-for="(item,index) in 5" :key="index">
                    <span :class="`top top${index+1}`">{{index+1}}</span>
                    <img src="@/assets/img/home/yfc.png" alt="壹方城">
                    <div class="info">
                      <p class="name">北京壹方城科技有限公司</p>
                      <p class="desc">公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍公司介绍</p>
                      <p class="tags">
                        成功案例：
                        <span>新浪</span>
                        <span>阿里巴巴</span>
                        <span>京东</span>
                      </p>
                    </div>
                    <div class="opt">
                      <el-button @click.native.prevent="handleInvest">一键直投</el-button>
                      <p class="lookNumber">100人浏览过</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="投融资委员会" name="fourth">
            <div class="committee">
              <p
                class="introduce"
              >投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会投融资委员会</p>
              <div class="memberList">
                <el-row :gutter="20">
                  <el-col :span="4" v-for="(item,index) in 18" :key="index">
                    <div class="grid-content">
                      <div class="member">
                        <div class="img">
                          <img src="@/assets/img/expert.png" alt="专家">
                          <div class="model">张三</div>
                        </div>
                        <p class="name">XX投资专家</p>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- end投融资 -->

    <!-- start社群 -->
    <div class="content content-buildService">
      <div class="title">
        <span class="name">社群</span>
        <div class="line">
          <span class="name">社群</span>
        </div>
      </div>
      <div class="content-main">
        <el-tabs v-model="activeName7" @tab-click="handleClick7">
          <el-tab-pane label="专家委员会" name="first">
            <div class="expertCommittee">
              <div class="committee">
                <div class="title">
                  <span>专家决策委员会</span>
                  <a class="more" href>查看详情</a>
                </div>
                <p
                  class="introduce"
                >让每一位专家及其专家服务机构把自己的优势融合起来，互相补位，资源共享，跨界、融合、创新，通过跨界创新，融合发展实现商业模式的创新。</p>
                <div class="expert">
                  <img src="@/assets/img/expert.png" alt="专家头像">
                  <p class="name">张三</p>
                  <p class="desc">国家发改委城镇中心原副主任、现城镇中心副理事长、研究员、中国小城镇及城镇化研究专家。</p>
                  <div class="detail">
                    <p>国家发改委城镇中心原副主任、现城镇中心副理事长、研究员、中国小城镇及城镇化研究专家。国家发改委城镇中心原副主任、现城镇中心副理事长、研究员、中国小城镇及城镇化研究专家。</p>
                    <p>国家发改委城镇中心原副主任、现城镇中心副理事长、研究员、中国小城镇及城镇化研究专家。</p>
                  </div>
                </div>
                <div class="expertList">
                  <span class="prev">
                    <i class="el-icon-arrow-left" @click="handleExpertPrev()"></i>
                  </span>
                  <ul>
                    <li v-for="(item,index) in currentExpertData" :key="index">
                      <v-tplExpert :expert-data="item"></v-tplExpert>
                      <!-- <img src="@/assets/img/avatar-expert.jpg" alt="专家头像">
                      <p class="name">张三</p>
                      <p class="type">理论型专家</p>-->
                    </li>
                  </ul>
                  <span class="next">
                    <i class="el-icon-arrow-right" @click="handleExpertNext()"></i>
                  </span>
                </div>
              </div>
              <div class="advantageBox">
                <div class="title">
                  <span>协同服务六大优势</span>
                </div>
                <div class="advantageList">
                  <el-row :gutter="20">
                    <el-col :span="12" v-for="(item,index) in 6" :key="index">
                      <div class="grid-content">
                        <div class="advantage">
                          <img
                            :src="require(`@/assets/img/home/advantage-${index+1}.png`)"
                            alt="优势"
                          >
                          <p class="name">权威专家</p>
                          <p class="desc">精准解读政策助您洞悉产业机遇</p>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="社区会员" name="second">
            <div class="committeeMember">
              <div class="memberBox">
                <div class="memberList" v-for="(item,index) in memberData" :key="index">
                  <p class="level">
                    <img :src="require(`@/assets/img/home/level-${index+1}.png`)" alt="等级图标">
                    <span>{{item.name}}</span>
                  </p>
                  <el-row :gutter="20">
                    <el-col :span="6" v-for="(item1,index1) in item.data" :key="index1">
                      <div class="grid-content">
                        <div class="member">
                          <v-tplExpert :expert-data="item1"></v-tplExpert>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="explainBox">
                <p class="title">会员权益说明</p>
                <div class="explain">
                  <p>汗马会员福利社尊享专属特权；峰会系列可用6次国内研学可用1次；研学可用0次；仅3人及以下人数报名,国内游学任选一站；仅一人《壹方超过3人系统将收取超出城国内标杆文旅、特色小镇项目考员价金额察之旅》；不含港澳台地区</p>
                </div>
                <p class="title">如何加入会员</p>
                <div class="explain">
                  <p>如何加入会员如何加入会员如何加入会员如何加入会员如何加入会员如何加入会员如何加入会员如何加入会员如何加入会员</p>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="汗马研习社群" name="third">
            <div class="association">
              <el-row :gutter="20">
                <el-col :span="8" v-for="(item,index) in hanmaData" :key="index">
                  <div class="grid-content">
                    <div class="video">
                      <div class="img">
                        <img :src="HOST+item.LogoUrl" :alt="item.Title">
                      </div>
                      <p class="name">{{item.Title}}</p>
                      <p class="time"><img src="@/assets/img/home/icon-time.png" alt="时间">{{item.CreateTime}}</p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- end社群 -->
    <!-- start行业知识库 -->
    <div class="content content-buildService">
      <div class="title">
        <span class="name">行业知识库</span>
        <div class="line">
          <span class="name">行业知识库</span>
        </div>
      </div>
      <div class="content-main">
        <div class="knowledge">
          <div class="newBox">
            <div class="title">
                  <span>行业文章</span>
                  <a href="#/articles" target="_blank">查看更多</a>
                  <!-- <router-link class="more" :to="{name:'news'}">查看更多</router-link> -->
                </div>
            <div class="newList">
              <ul>
                <li v-for="(item,index) in newListData" :key="index">
                  <img :src="HOST+item.FacialPhotoUrl" :alt="item.NewsTitle">
                  <div class="info">
                    <p class="name">{{item.NewsTitle}}</p>
                    <p class="author">作者：{{item.AuthorName}}</p>
                    <p class="desc">{{item.NewsContent}}</p>
                  </div>
                  <div class="opt">
                    <p class="date">{{item.CreateTime}}</p>
                    <el-button @click.native.prevent="articleDetail(item.Id,1)">案例资讯</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="otherBox">
            <div class="hotBox">
              <el-tabs v-model="activeName8" @tab-click="handleClick8">
                <el-tab-pane label="本周热门" name="first">
                  <ul>
                    <li v-for="(item,index) in hotWeekData" :key="index" @click="articleDetail(item.Id,1)">
                      <i class="circle"></i>
                      <p>{{item.NewsTitle}}</p>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="本月热门" name="second">
                  <ul>
                    <li v-for="(item,index) in hotMonthData" :key="index" @click="articleDetail(item.Id,1)">
                      <i class="circle"></i>
                      <p>{{item.NewsTitle}}</p>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div class="relativeBox">
              <div class="title">
                <span>相关主题</span>
              </div>
              <p class="themeList">
                <span v-for="(item,index) in themeData" :key="index" @click="articles">{{item.ThematicName}}</span>
              </p>
              <div class="title">
                <span>相关机构</span>
              </div>
              <div class="organList">
                <p v-for="(item,index) in 3" :key="index">
                  <a href>上海理工大学</a>
                </p>
              </div>
              <div class="title">
                <span>相关学者</span>
              </div>
              <p class="scholarList">
                <span v-for="(item,index) in 8" :key="index">张散散</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end行业知识库 -->
    <!-- start精选案例 -->
    <div class="content content-buildService">
      <!-- <div class="title">
        <span class="name">精选案例</span>
        <div class="line">
          <span class="name">精选案例</span>
        </div>
      </div> -->
      <div class="content-main">
        <div class="caseType">
          <el-tabs v-model="activeName9" @tab-click="handleClick9">
            <el-tab-pane label="精选案例" name="first">
              <div class="title">
                <span>精选案例</span>
                <a href="#/cases" target="_blank">查看更多</a>
                <!-- <router-link class="more" :to="{name:'cases'}">查看更多</router-link> -->
              </div>
              <div class="caseList">
                <span class="prev">
                  <i class="el-icon-arrow-left" @click="handleCasePrev0()"></i>
                </span>
                <div class="caseListBox">
                  <ul>
                    <li v-for="(item,index) in currentCaseData0" :key="index" @click="caseDetail(item.Id)">
                      <div class="img">
                        <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                      </div>
                      <p class="name">{{item.CaseTitle}}</p>
                    </li>
                  </ul>
                </div>
                <span class="next">
                  <i class="el-icon-arrow-right" @click="handleCaseNext0()"></i>
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="休闲度假" name="second">
              <div class="title">
                <span>休闲度假</span>
                <a class="more" href>查看更多</a>
              </div>
              <div class="caseList">
                <span class="prev">
                  <i class="el-icon-arrow-left" @click="handleCasePrev1()"></i>
                </span>
                <div class="caseListBox">
                  <ul>
                    <li v-for="(item,index) in currentCaseData1" :key="index" @click="caseDetail(item.Id)">
                      <div class="img">
                        <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                      </div>
                      <p class="name">{{item.CaseTitle}}</p>
                    </li>
                  </ul>
                </div>
                <span class="next">
                  <i class="el-icon-arrow-right" @click="handleCaseNext1()"></i>
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="乡村振兴" name="third">
              <div class="title">
                <span>乡村振兴</span>
                <a class="more" href>查看更多</a>
              </div>
              <div class="caseList">
                <span class="prev">
                  <i class="el-icon-arrow-left" @click="handleCasePrev2()"></i>
                </span>
                <div class="caseListBox">
                  <ul>
                    <li v-for="(item,index) in currentCaseData2" :key="index" @click="caseDetail(item.Id)">
                      <div class="img">
                        <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                      </div>
                      <p class="name">{{item.CaseTitle}}</p>
                    </li>
                  </ul>
                </div>
                <span class="next">
                  <i class="el-icon-arrow-right" @click="handleCaseNext2()"></i>
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="特色小镇" name="fourth">
              <div class="title">
                <span>特色小镇</span>
                <a class="more" href>查看更多</a>
              </div>
              <div class="caseList">
                <span class="prev">
                  <i class="el-icon-arrow-left" @click="handleCasePrev3()"></i>
                </span>
                <div class="caseListBox">
                  <ul>
                    <li v-for="(item,index) in currentCaseData3" :key="index" @click="caseDetail(item.Id)">
                      <div class="img">
                        <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                      </div>
                      <p class="name">{{item.CaseTitle}}</p>
                    </li>
                  </ul>
                </div>
                <span class="next">
                  <i class="el-icon-arrow-right" @click="handleCaseNext3()"></i>
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="文化场馆" name="fifth">
              <div class="title">
                <span>文化场馆</span>
                <a class="more" href>查看更多</a>
              </div>
              <div class="caseList">
                <span class="prev">
                  <i class="el-icon-arrow-left" @click="handleCasePrev4()"></i>
                </span>
                <div class="caseListBox">
                  <ul>
                    <li v-for="(item,index) in currentCaseData4" :key="index" @click="caseDetail(item.Id)">
                      <div class="img">
                        <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                      </div>
                      <p class="name">{{item.CaseTitle}}</p>
                    </li>
                  </ul>
                </div>
                <span class="next">
                  <i class="el-icon-arrow-right" @click="handleCaseNext4()"></i>
                </span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="观光景区" name="six">
              <div class="title">
                <span>观光景区</span>
                <a class="more" href>查看更多</a>
              </div>
              <div class="caseList">
                <span class="prev">
                  <i class="el-icon-arrow-left" @click="handleCasePrev5()"></i>
                </span>
                <div class="caseListBox">
                  <ul>
                    <li v-for="(item,index) in currentCaseData5" :key="index" @click="caseDetail(item.Id)">
                      <div class="img">
                        <img :src="HOST+item.ImageUrl" :alt="item.CaseTitle">
                      </div>
                      <p class="name">{{item.CaseTitle}}</p>
                    </li>
                  </ul>
                </div>
                <span class="next">
                  <i class="el-icon-arrow-right" @click="handleCaseNext5()"></i>
                </span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- end精选案例 -->
  </div>
</template>

<script>
import {
  getHomePageHeadList,
  getHomePageBodyAboveList,
  getHomePageIndustrialResourceList,
  getIndustryDemandList,
  getHomePageBodyInvestmentList,
  getSummitList,
  getHomePageBaseList,
  getUserMemberTypeGroupList,
  getHanMaInstituteList,
  getClassicCaseTypeList
} from "../../api/api";
import vBanner from "./../home/Banner";
import vTop from "./../home/Top";
import vEntry from "./../home/Entry";
import plLazy from "./../common/pl-lazy.vue";
import vTplExpert from "./../home/TplExpert";
import { videoPlayer } from "vue-video-player";
const json = require("./../../assets/json/industryBussiness.json"); // 首页-产业服务-产业招商
export default {
  data() {
    return {
      timer: "",
      carouselData: {}, // 轮播图
      topData: [], // 头条
      procedureData: [], // 一站式服务
      currentProcedureData: {}, // 一站式服务-当前服务
      activeName: "first", // 产业服务默认板块
      industryBuissness: [], // 产业服务-产业招商
      partnerImg:{ // 产业服务-产业招商-图标
        0:require("./../../assets/img/home/partner-1.png"),
        1:require("./../../assets/img/home/partner-2.png"),
      },
      partnerCurrentIndex: 0, // 产业服务-产业招商-当前合作商
      currentPartnerInfo: {}, // 产业服务-产业招商-当前商家当前阶段的详细内容
      industryResourceData: [], // 产业服务-产业资源
      allResourceData: [], // 产业服务-产业资源-综合资源
      typeResourceData: [], // 产业服务-产业资源-各大类资源
      currentResourceIndexs: [0, 1], // 产业服务-产业资源-当前展示的2类资源的索引
      currentResourceData: [], // 产业服务-产业资源-当前展示的2类资源数据
      providerData: [], // 产业服务-优质服务商
      industryProjectData: [], // 产业服务-产业项目
      expertStudioData: [], // 专家智库-专家工作室
      expertListData: [], // 专家智库-知名专家
      activeName4: "first", // 商学院默认板块
      activeName5: "first", // 商学院-人才培养默认板块
      meetingData: [], // 商学院-大型峰会
      travelData: [], // 商学院-标杆游学
      activeName6: "first", // 投融资默认板块
      showType1: true, // 投融资-找项目-资金类型结构切换
      showType2: true, // 投融资-找项目-所在地区结构切换
      showType3: true, // 投融资-找项目-投资行业结构切换
      showType4: true, // 投融资-找项目-投资地区结构切换
      investTypeData: [], // 投融资-找项目-投资方式
      fundsTypeData: [], // 投融资-找项目-资金类型
      cityData: [], // 投融资-找项目-所在地区
      investTradeData: [], // 投融资-找项目-投资行业
      investCityData: [], // 投融资-找项目-投资地区
      investMoneyData: [], // 投融资-找项目-投资金额
      investListData: {}, // 投融资-找项目-投资信息
      activeName7: "first", // 社群默认板块
      expertCommitData: [], // 社群-专家委员会
      currentExpertIndexs: [0, 1, 2, 3, 4], // 社群-专家当前展示的5个索引
      currentExpertData: [], // 社群-专家委员会-当前展示的5个专家数据
      memberData: [], // 社群-社区会员
      hanmaData: [], // 社群-汗马研习社群
      newListData: [], // 行业知识库新闻
      activeName8: "first", // 行业知识库-右侧热门默认板块
      hotWeekData: [], // 行业知识库-右侧-周热门
      hotMonthData: [], // 行业知识库-右侧-月热门
      themeData: [], // 行业知识库-右侧-相关主题
      activeName9: "first", // 精选案例默认板块
      currentCaseIndexs0: [0, 1, 2, 3], // 精选案例-案例当前展示的4个索引
      currentCaseIndexs1: [0, 1, 2, 3], // 精选案例-案例当前展示的4个索引
      currentCaseIndexs2: [0, 1, 2, 3], // 精选案例-案例当前展示的4个索引
      currentCaseIndexs3: [0, 1, 2, 3], // 精选案例-案例当前展示的4个索引
      currentCaseIndexs4: [0, 1, 2, 3], // 精选案例-案例当前展示的4个索引
      currentCaseIndexs5: [0, 1, 2, 3], // 精选案例-案例当前展示的4个索引
      caseListData: [], // 精选案例-精选案例
      allCaseData: [], // 精选案例-所有案例
      caseHolidayData: [], // 精选案例-休闲度假
      caseCountryData: [], // 精选案例-乡村振兴
      caseTownData: [], // 精选案例-特色小镇
      caseArtData: [], // 精选案例-文化场馆
      caseSceneryData: [], // 精选案例-观光景区
      caseTypeData: [], // 精选案例-案例类型
      currentCaseData: [], // // 精选案例-当前展示的4个案例
      currentCaseData0: [], // 精选案例-当前展示的4个精选案例
      currentCaseData1: [], // 精选案例-当前展示的4个休闲度假
      currentCaseData2: [], // 精选案例-当前展示的4个乡村振兴
      currentCaseData3: [], // 精选案例-当前展示的4个特色小镇
      currentCaseData4: [], // 精选案例-当前展示的4个文化场馆
      currentCaseData5: [], // 精选案例-当前展示的4个观光景区
      currentIndex: 0
    };
  },
  created() {
    clearTimeout(this.timer);
    // 获取首页第一部分数据
    this.timer = setTimeout(() => {
      // 获取头部信息（轮播图、联盟头条、产业链生态服务）
      getHomePageHeadList().then(data => {
        // console.log(data);
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let {
            CarouselImagesList,
            IndustryNewsList,
            ProcessNavigationResponesList
          } = Result;
          //轮播图
          // console.log(CarouselImagesList);
          this.carouselData = Object.assign(
            {},
            this.carouselData,
            CarouselImagesList
          );
          // 联盟头条
          // console.log(IndustryNewsList);
          this.topData = this.topData.concat(IndustryNewsList);
          // 产业链一站式生态服务
          // console.log(ProcessNavigationResponesList);
          this.procedureData = this.procedureData.concat(
            ProcessNavigationResponesList
          );
          this.currentProcedureData = Object.assign(
            {},
            this.currentProcedureData,
            this.procedureData[0]
          ); // 默认显示第一条数据
        }
      });
    }, 10);
    // console.log(json)
    this.industryBuissness = json; // 产业招商数据
    // console.log(this.industryBuissness)
    this.currentPartnerInfo = this.industryBuissness[0].Stages[0].List.ChildList[0]; // 默认显示第一条信息

    // 修改切换标签的宽度及底边样式
    this.$nextTick(() => {
      let obj = $(".el-tabs__nav");
      // console.log(obj)
      obj.map((index, item) => {
        // console.log(index)
        // console.log(item)
        item.style.width = "100%";
        let children = $(item).children(".el-tabs__item");
        // console.log(children)
        let length = children.length;
        // console.log(length)
        let border = $(item).children(".el-tabs__active-bar")[0];
        border.style.width = "calc(20px + "+(100 / length + "%");
        let positionX = border.style.transform;
        // console.log(positionX);
        let X = positionX.split("(")[1].split("p")[0];
        // console.log(index + ":" + X);
        let X1 = X - 20;
        // console.log(X1)
        border.style.transform = "translateX(" + X1 + "px)";

        // 设置标签宽度
        // 标签宽度 = 100%/标签个数
        for (let i = 0; i < length; i++) {
          // console.log(children[i])
          children[i].style.width = 100 / length + "%";
          children[i].style.padding = "0";
        }
      });
    });
  },
  methods: {
    // 点击切换生态服务流程
    handleProcedure(index) {
      this.currentIndex = index;
      this.currentProcedureData = Object.assign(
        {},
        this.currentProcedureData,
        this.procedureData[this.currentIndex]
      );
    },
    // 一站式服务-申请
    handleApply(id) {
      console.log(id);
    },
    // 产业服务板块切换
    handleClick(tab, event) {
      console.log(tab, event);

      if (this.industryResourceData.length == 0) {
        this.getIndustryResource(); // 获取产业资源数据
      }
      if (this.industryProjectData.length == 0) {
        setTimeout(() => {
          this.getIndustryProject(); // 获取产业项目数据
        }, 100);
      }
    },
    // 获取首页第二部分数据
    getSecondData() {
      // 获取首页内容（专家智库）
      getHomePageBodyAboveList().then(data => {
        // console.log(data);
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let { OrdinaryExpertsList, ExpertStudioList } = Result;
          // 知名专家
          // console.log(OrdinaryExpertsList);
          this.expertListData = OrdinaryExpertsList;
          // 专家工作室
          // console.log(ExpertStudioList);
          this.expertStudioData = ExpertStudioList;
        }

        // 修改切换标签的宽度及底边样式
        this.$nextTick(() => {
          let obj = $(".el-tabs__nav");
          // console.log(obj)
          obj.map((index, item) => {
            // console.log(index)
            // console.log(item)
            item.style.width = "100%";
            let children = $(item).children(".el-tabs__item");
            // console.log(children)
            let length = children.length;
            // console.log(length)
            let border = $(item).children(".el-tabs__active-bar")[0];
            border.style.width = "calc(20px + "+(100 / length + "%");
            let positionX = border.style.transform;
            // console.log(positionX);
            let X = positionX.split("(")[1].split("p")[0];
            // console.log(index + ":" + X);
            let X1 = X - 20;
            // console.log(X1)
            border.style.transform = "translateX(" + X1 + "px)";

            // 设置标签宽度
            // 标签宽度 = 100%/标签个数
            for (let i = 0; i < length; i++) {
              // console.log(children[i])
              children[i].style.width = 100 / length + "%";
              children[i].style.padding = "0";
            }
          });
        });
      });
    },
    // 产业服务-产业资源
    getIndustryResource() {
      getHomePageIndustrialResourceList().then(data => {
        // console.log(data);
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let {
            HomePageIndustrialResourceResponesList,
            ServiceProviderResponesList
          } = Result;
          // 产业资源
          // console.log(HomePageIndustrialResourceResponesList)
          this.industryResourceData = HomePageIndustrialResourceResponesList; // 产业资源
          this.allResourceData = this.allResourceData.concat(
            this.industryResourceData[0].IndustryResourcesList
          ); // 综合资源
          this.typeResourceData = this.typeResourceData.concat(
            this.industryResourceData.slice(1)
          ); // 各大类资源
          this.currentResourceData = this.typeResourceData.concat(
            this.industryResourceData.slice(1)
          ); // 当前展示大类资源
          // 优质服务商
          // console.log(ServiceProviderResponesList)
          this.providerData = ServiceProviderResponesList.Models;
        }
      });
    },
    // 产业服务-产业资源-产业类型前翻
    handleResourcePrev() {
      let arr = [],
        data = [];
      // this.currentResourceIndexs 包括2个大类 length=2
      this.currentResourceIndexs.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.typeResourceData.length - 1;
        }
        arr.push(e);
        data.push(this.typeResourceData[e]);
      });
      this.currentResourceIndexs = arr;
      this.currentResourceData = data;
    },
    // 产业服务-产业资源-产业类型后翻
    handleResourceNext() {
      let arr = [],
        data = [];
      // this.currentResourceIndexs 包括2个大类 length=2
      this.currentResourceIndexs.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.typeResourceData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.typeResourceData[e]);
      });
      this.currentResourceIndexs = arr;
      this.currentResourceData = data;
    },
    // 产业服务-产业资源-优质服务商-进入店铺
    handleEnter(id) {
      console.log(id);
    },
    // 产业服务-产业项目
    getIndustryProject() {
      const params = {
        Body: {
          Page: 1,
          Rows: 8
        }
      };
      getIndustryDemandList(params).then(data => {
        // console.log(data)
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.industryProjectData = Result.Models;
        }
      });
    },
    // 产业服务-产业项目-承接需求
    handleDemand(id) {
      console.log(id);
    },
    // 专家智库-专家工作室1-新闻板块切换
    handleClick1(tab, event) {
      // console.log(tab, event);
    },
    // 专家智库-专家工作室2-新闻板块切换
    handleClick2(tab, event) {
      // console.log(tab, event);
    },
    // 专家智库-专家工作室3-新闻板块切换
    handleClick3(tab, event) {
      // console.log(tab, event);
    },
    // 商学院板块切换
    handleClick4(tab, event) {
      // console.log(tab, event);
      if (this.meetingData.length == 0) {
        this.getMeetingData(); // 获取大型峰会数据
      }
      if (this.travelData.length == 0) {
        setTimeout(() => {
          this.getTravelData(); // 获取标杆游学数据
        }, 100);
      }
    },
    // 商学院-人才培养板块切换
    handleClick5(tab, event) {
      console.log(tab, event);
    },
    // 商学院-大型峰会
    getMeetingData() {
      const params = {
        Body: {
          TypeId: 1,
          Page: 1,
          Rows: 9
        }
      };
      getSummitList(params).then(data => {
        // console.log(data)
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.meetingData = Result.Models;
        }
      });
    },
    // 商学院-大型游学
    getTravelData() {
      const params = {
        Body: {
          TypeId: 2,
          Page: 1,
          Rows: 3
        }
      };
      getSummitList(params).then(data => {
        // console.log(data)
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.travelData = Result.Models;
        }
      });
    },
    // 获取首页第三部分数据
    getThirdData() {
      // 获取首页内容（投融资）
      getHomePageBodyInvestmentList().then(data => {
        // console.log(data);
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let {
            InvestmentMethodInfoList,
            FundsTypeInfoList,
            ProvincesList,
            IndustryInfoList,
            ProvincesInvestList,
            AmountInfoList,
            InvestmentDtoList
          } = Result;
          // 投资方式
          // console.log(InvestmentMethodInfoList)
          this.investTypeData = InvestmentMethodInfoList;
          // 资金类型
          // console.log(FundsTypeInfoList)
          this.fundsTypeData = FundsTypeInfoList;
          // 所在地区
          // console.log(ProvincesList)
          this.cityData = ProvincesList;
          // 投资行业
          // console.log(IndustryInfoList)
          this.investTradeData = IndustryInfoList;
          // 投资地区
          // console.log(ProvincesInvestList)
          this.investCityData = ProvincesInvestList;
          // 投资金额
          // console.log(AmountInfoList)
          this.investMoneyData = AmountInfoList;
          // 投融资信息
          // console.log(InvestmentDtoList)
          this.investListData = InvestmentDtoList;
        }
      });
    },
    // 投融资板块切换
    handleClick6(tab, event) {
      console.log(tab, event);
    },
    // 获取首页第四部分数据
    getFourthData() {
      // 获取首页内容（投融资）
      getHomePageBaseList().then(data => {
        // console.log(data);
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let {
            UserList,
            PageIndustryNews,
            IndustryNewsWeek,
            IndustryNewsMonth,
            ThematicInfoList,
            PageClassicCase,
            ProjectTypeList
          } = Result;
          // 社群-专家委员会
          // console.log(UserList);
          this.expertCommitData = UserList;
          this.currentExpertData = UserList;
          // 行业知识库
          // console.log(PageIndustryNews);
          this.newListData = PageIndustryNews;
          // 周热门
          // console.log(IndustryNewsWeek)
          this.hotWeekData = IndustryNewsWeek;
          // 月热门
          // console.log(IndustryNewsMonth)
          this.hotMonthData = IndustryNewsMonth;
          // 相关主题
          // console.log(ThematicInfoList)
          this.themeData = ThematicInfoList;
          // 精选案例
          // console.log(PageClassicCase);
          this.allCaseData = PageClassicCase;
          this.caseListData = PageClassicCase[0].ClassicCaseList;
          // console.log(this.caseListData)
          this.currentCaseData0 = PageClassicCase[0].ClassicCaseList;
          this.caseHolidayData = PageClassicCase[1].ClassicCaseList;
          // console.log(this.caseHolidayData)
          this.currentCaseData1 = PageClassicCase[1].ClassicCaseList;
          this.caseCountryData = PageClassicCase[2].ClassicCaseList;
          // console.log(this.caseCountryData)
          this.currentCaseData2 = PageClassicCase[2].ClassicCaseList;
          this.caseTownData = PageClassicCase[3].ClassicCaseList;
          // console.log(this.caseTownData)
          this.currentCaseData3 = PageClassicCase[3].ClassicCaseList;
          this.caseArtData = PageClassicCase[4].ClassicCaseList;
          // console.log(this.caseArtData)
          this.currentCaseData4 = PageClassicCase[4].ClassicCaseList;
          this.caseSceneryData = PageClassicCase[5].ClassicCaseList;
          // console.log(this.caseSceneryData)
          this.currentCaseData5 = PageClassicCase[5].ClassicCaseList;
          // 案例类型
          // console.log(ProjectTypeList)
          this.caseTypeData = ProjectTypeList;
        }
      });
    },
    // 社群板块切换
    handleClick7(tab, event) {
      // console.log(tab, event);
      if (this.memberData.length == 0) {
        this.getMemberData(); // 获取社区会员
      }
      if (this.hanmaData.length == 0) {
        setTimeout(() => {
          this.getHanmaData(); // 获取汗马研习社群
        }, 100);
      }
    },
    // 社群-专家委员会-专家前翻
    handleExpertPrev() {
      let arr = [],
        data = [];
      // this.currentExpertIndexs 包括5个专家 length=5
      this.currentExpertIndexs.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.expertCommitData.length - 1;
        }
        arr.push(e);
        data.push(this.expertCommitData[e]);
      });
      this.currentExpertIndexs = arr;
      this.currentExpertData = data;
    },
    // 社群-专家委员会-专家后翻
    handleExpertNext() {
      let arr = [],
        data = [];
      // this.currentExpertIndexs 包括5个专家 length=5
      this.currentExpertIndexs.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.expertCommitData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.expertCommitData[e]);
      });
      this.currentExpertIndexs = arr;
      this.currentExpertData = data;
    },
    // 社群-社区会员
    getMemberData() {
      getUserMemberTypeGroupList().then(data => {
        // console.log(data)
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          let { DiamondUser, GoldUser, PlatinumUser } = Result;
          let obj1 = {},
            obj2 = {},
            obj3 = {},
            arr = [];
          // 黄金会员
          // console.log(GoldUser)
          obj1.name = "黄金会员";
          obj1.data = GoldUser;
          arr.push(obj1);
          // 铂金会员
          // console.log(PlatinumUser)
          obj2.name = "铂金会员";
          obj2.data = PlatinumUser;
          arr.push(obj2);
          // 钻石会员
          // console.log(DiamondUser)
          obj3.name = "钻石会员";
          obj3.data = DiamondUser;
          arr.push(obj3);
          // console.log(arr)
          this.memberData = this.memberData.concat(arr);
        }
      });
    },
    // 社群-汗马研习社群
    getHanmaData() {
      const params = {
        Body: {
          Page: 1,
          Rows: 6
        }
      };
      getHanMaInstituteList(params).then(data => {
        // console.log(data)
        let { ReturnCode, Message, Result } = data;
        // console.log(Result);
        if (ReturnCode == 200) {
          this.hanmaData = Result.Models;
        }
      });
    },
    // 行业知识库板块切换
    handleClick8(tab, event) {
      // console.log(tab, event);
    },
    // 精选案例板块切换
    handleClick9(tab, event) {
      // console.log(tab, event);
      if (this.allCaseData.length == 0) {
        this.getAllCaseData(); // 获取所有案例
      }
    },
    // 产业招商：点击每个阶段展示每个阶段的数据
    // index:各个合作方数据对象索引
    // childIndex:各个合作方的各个阶段数据对象索引
    handleStage(index) {
      // 清除所有合作方所有阶段的当前高亮
      // this.industryBuissness.forEach((e, i) => {
      //   e.StageCurrentIndex = -1;
      // });
      // 设置当前合作方的当前阶段高亮
      // this.industryBuissness[index].StageCurrentIndex = childIndex;
      // 设置当前合作方高亮
      this.partnerCurrentIndex = index;
    },
    // 产业招商：鼠标经过每个产品显示对应的详情
    handleStageInfo(item1) {
      // console.log(item1)
      this.currentPartnerInfo = Object.assign(
        {},
        this.currentPartnerInfo,
        item1
      );
    },
    // 申请职位
    handleApplyJob() {},
    // 投融资-找项目-投递项目
    handleDeliver(id) {
      console.log(id);
    },
    // 一键直投
    handleInvest() {},
    // 跳转到行业文章详情
    articleDetail(id,typeId) {
      // console.log(id)
      let router = this.$router.resolve({ name: "articleDetail", params: { articleId: id,typeId:typeId } });
      console.log(router)
      window.open(router.href,'_blank');
    },
    // 跳转到行业文章库
    articles(){
      let router = this.$router.resolve({name:'articles'})
      window.open(router.href,'_blank')
    },
    // 跳转到案例详情
    caseDetail(id) {
      // console.log(id)
      let router = this.$router.resolve({ name: "caseDetail", params: { caseId: id } });
      window.open(router.href,'_blank')
    },
    // 精选案例-案例前翻
    handleCasePrev0() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs0.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.caseListData.length - 1;
        }
        arr.push(e);
        data.push(this.caseListData[e]);
      });
      this.currentCaseIndexs0 = arr;
      this.currentCaseData0 = data;
    },
    // 精选案例-案例后翻
    handleCaseNext0() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs0.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.caseListData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.caseListData[e]);
      });
      this.currentCaseIndexs0 = arr;
      this.currentCaseData0 = data;
    },
    // 休闲度假-案例前翻
    handleCasePrev1() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs1.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.caseHolidayData.length - 1;
        }
        arr.push(e);
        data.push(this.caseHolidayData[e]);
      });
      this.currentCaseIndexs1 = arr;
      this.currentCaseData1 = data;
    },
    // 休闲度假-案例后翻
    handleCaseNext1() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs1.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.caseHolidayData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.caseHolidayData[e]);
      });
      this.currentCaseIndexs1 = arr;
      this.currentCaseData1 = data;
    },
    // 乡村振兴-案例前翻
    handleCasePrev2() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs2.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.caseCountryData.length - 1;
        }
        arr.push(e);
        data.push(this.caseCountryData[e]);
      });
      this.currentCaseIndexs2 = arr;
      this.currentCaseData2 = data;
    },
    // 乡村振兴-案例后翻
    handleCaseNext2() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs2.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.caseCountryData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.caseCountryData[e]);
      });
      this.currentCaseIndexs2 = arr;
      this.currentCaseData2 = data;
    },
    // 特色小镇-案例前翻
    handleCasePrev3() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs3.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.caseTownData.length - 1;
        }
        arr.push(e);
        data.push(this.caseTownData[e]);
      });
      this.currentCaseIndexs3 = arr;
      this.currentCaseData3 = data;
    },
    // 特色小镇-案例后翻
    handleCaseNext3() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs3.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.caseTownData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.caseTownData[e]);
      });
      this.currentCaseIndexs3 = arr;
      this.currentCaseData3 = data;
    },
    // 文化场馆-案例前翻
    handleCasePrev4() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs4.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.caseArtData.length - 1;
        }
        arr.push(e);
        data.push(this.caseArtData[e]);
      });
      this.currentCaseIndexs4 = arr;
      this.currentCaseData4 = data;
    },
    // 文化场馆-案例后翻
    handleCaseNext4() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs4.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.caseArtData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.caseArtData[e]);
      });
      this.currentCaseIndexs4 = arr;
      this.currentCaseData4 = data;
    },
    // 观光景区-案例前翻
    handleCasePrev5() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs5.forEach((e, i) => {
        e = Number(e) - 1;
        if (e < 0) {
          e = this.caseSceneryData.length - 1;
        }
        arr.push(e);
        data.push(this.caseSceneryData[e]);
      });
      this.currentCaseIndexs5 = arr;
      this.currentCaseData5 = data;
    },
    // 观光景区-案例后翻
    handleCaseNext5() {
      let arr = [],
        data = [];
      // this.currentCaseIndexs 包括4个案例 length=4
      this.currentCaseIndexs5.forEach((e, i) => {
        e = Number(e + 1);
        if (e > this.caseSceneryData.length - 1) {
          e = 0;
        }
        arr.push(e);
        data.push(this.caseSceneryData[e]);
      });
      this.currentCaseIndexs5 = arr;
      this.currentCaseData5 = data;
    }
  },
  mounted() {
    // 监听滚动事件
    // 分段请求api接口
    const home = this.$refs.home;
    // console.log(home)
    let homeHeight = $(home).height(); // home页面的高度
    // console.log(homeHeight)
    let toTwo = false,
      toThird = false,
      toFourth = false;
    let toTwoN = 0,
      toThirdN = 0,
      toFourthN = 0;
    window.addEventListener(
      "scroll",
      () => {
        let scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop ||
          $(this).scrollTop;

        // console.log(scrollTop);
        switch (Math.floor(scrollTop / 1000)) {
          case 1:
            toTwo = true;
            toTwoN += 1;
            toThird = toFourth = false;
            break;
          case 2:
            toThird = true;
            toThirdN += 1;
            toTwo = toFourth = false;
            break;
          case 4:
            toFourth = true;
            toFourthN += 1;
            toTwo = toThird = false;
            break;
          default:
            break;
        }
        if (toTwo && toTwoN == 1) {
          // alert(1)
          this.getSecondData();
          toTwo = false;
          return;
        }
        if (toThird && toThirdN == 1) {
          // alert(2)
          this.getThirdData();
          toThird = false;
          return;
        }
        if (toFourth && toFourthN == 1) {
          // alert(3)
          this.getFourthData();
          toFourth = false;
          return;
        }
      },
      true
    );
  },
  components: {
    vBanner,
    vTop,
    vEntry,
    vTplExpert,
    plLazy
  }
};
</script>

<style lang="stylus" scoped>
@import './../../assets/stylus/base.styl';

.content {
  margin-bottom: 10px;

  .title {
    position: relative;
    border-bottom: $border-grey;
    text-align: center;
    margin: 20px 0;

    .name {
      font-size: 26px;
      // font-weight: 700;
      line-height: 50px;
      // padding: 0 20px;
    }

    .line {
      width: auto;
      height: 5px;
      overflow: hidden;
      margin: 0 auto;

      .name {
        position: relative;
        top: -10px;
        color: $color-blue;
        background-color: $color-blue;
      }
    }
  }
}

.content-main >.el-tabs >>> .el-tabs__nav {
  width: $full;
  .el-tabs__item{
    font-size:$font-18;
  }
}
.caseType .el-tabs >>> .el-tabs__nav {
  width: $full;
  .el-tabs__item{
    font-size:$font-18;
  }
}

.content-ecoService, .content-buildService {
  .content-main {
    width: $full;
    height: auto;

    .procedure {
      font-size: 0;
      background-color:$color-white;
      // padding-top:20px;

      >ul {
        background-color:#eee;
        li {
          display: inline-block;
          width:118px;
          height:auto;
          padding:20px 0;
          background-color:$color-white;
          font-size: $font-18;
          color: $color-black;
          margin: 0 1px;
          vertical-align:middle;
          cursor: pointer;
          .img{
            width:$full;
            height:50px;
            margin-bottom:10px;
            b{
              display: inline-block;
              height: $full;
              vertical-align: middle;
            }

            img {
              width:auto;s
              height:auto;
              max-width:$full;
              max-height:$full;
              vertical-align:middle;
            // margin-bottom:10px;
            }
          }   
        }
        li:first-child{
          margin-left:0;
        }
        li:last-child{
          margin-right:0;
        }

        li:hover, .active {
          color: $background-hover-orange;
          // text-decoration: underline;
        }
      }

      .procedureBox {
        position: relative;
        width: calc(100% - 10px);
        height: 300px;
        margin-left: 10px;
        // margin-top: 10px;
        background-color: $background-orange;

        .title {
          position: relative;
          left: -10px;
          top: 30px;
          width: calc(100% - 30px);
          height: 100px;
          color: $color-white;
          font-size: 24px;
          line-height: 100px;
          background-color: $background-hover-orange;
          border: none;
          text-align: left;
          padding-left: 30px;
          margin: 0;
        }

        .desc {
          position: absolute;
          left: 20px;
          bottom: 80px;
          display: inline-block;
          width: 200px;
          color: $color-white;
          font-size: 24px;
          line-height: 60px;
          text-align: left;
          border-top: dotted 2px #fff;
        }

        .procedureItem {
          position: absolute;
          top: 10px;
          right: 10px;
          width: calc(100% - 250px);
          height: calc(100% - 20px);
          background-color: $background-white;

          >ul {
            display: flex;
            height: $full;

            >li {
              position: relative;
              flex: 1;
              height: $full;
              padding: 0 10px;
              border-right: solid 1px $border-color-grey;

              img {
                width: 50px;
                height: 50px;
                margin-top: 20px;
              }

              .name {
                color: $color-black;
                font-size: 18px;
                line-height: 50px;
              }

              .introduct {
                margin-top: 10px;
                color: $color-grey;
                font-size: 14px;
                line-height: 20px;
              }

              .info {
                margin-top: 10px;
                color: $color-grey;
                font-size: 14px;
                line-height: 20px;

                li {
                  // display: block;
                  list-style: disc outside;
                }
              }

              .apply {
                position: absolute;
                left: 50%;
                bottom: 20px;
                margin-left: -40px;
                margin-top: 20px;
                color: $color-orange;
                border: $border-orange;
                border-radius: 5px;
                background-color: $color-white;
              }

              .apply:hover {
                color: $color-white;
                background-color: $background-orange;
              }
            }

            >li:last-child {
              border: none;
            }

            >li:hover {
              .name, .info {
                color: $color-orange;
              }
            }
          }
        }
      }
    }

    .bussiness {
      height: auto;
      background-color:$color-white;
      padding-top:20px;

      .partner {
        border: dashed 1px $color-grey;
        border-radius: 10px;
        background-color: $background-white;
        padding: 10px 10px 0 10px;
        margin-bottom: 20px;

        .name {
          margin-top: 10px;
          cursor:pointer;

          img {
            width: 50px;
            height: 50px;
            margin-bottom: 10px;
          }

          p {
            color: $color-blue;
            font-size: 22px;
            line-height: 40px;
          }

          .line {
            display: block;
            height: 2px;
            overflow: hidden;

            span {
              position: relative;
              top: -10px;
              background-color: $color-blue;
            }
          }
        }

        .stage {
          margin-top: 10px;
          padding: 20px;

          span {
            display: inline-block;
            width: 45%;
            height: 30px;
            line-height: 30px;
            color: $color-blue;
            border: $border-blue;
            border-radius: 5px;
            cursor: pointer;
          }

          span:nth-child(odd) {
            margin-right: 10px;
            margin-bottom: 10px;
          }

          span:last-child {
            margin-right: 0;
          }

          // span:hover, .active {
          //   color: $color-white;
          //   background-color: $background-blue;
          //   border-color: $color-white;
          // }
        }
      }

      .partner:hover, .active {
        border-color: $color-blue;
      }

      .partnerList {
        border-color: $color-grey;
        border-radius: 10px;
        padding: 10px 10px 0 10px;
        margin-bottom: 20px;

        .stages {
          margin: 0;
          padding: 0;

          span {
            display: inline-block;
            width: auto;
            // width: 30%;
            height: 25px;
            line-height: 25px;
            color: $color-white;
            background-color: $color-blue;
            border-radius: 5px;
            padding: 0 5px;
            margin: 0 5px 10px 5px;
            cursor:pointer;
          }

          // span:nth-child(odd) {
          // margin: 0;
          // }

          // span:nth-child(3n-1), span:nth-child(3n-2) {
          // margin-right: 5px;
          // margin-bottom: 5px;
          // }

          // span:last-child {
          // margin-right: 0;
          // }
          span:hover {
            background-color: $link-hover;
            border-color: $link-hover;
          }
        }
      }
      .partnerList:hover,.partnerList.active{
        border-color:$color-blue;
      }

      .parterInfo {
        height: auto;
        font-size: 14px;
        text-align: left;
        background-color: $background-white;
        border: dashed 1px $color-blue;
        border-radius: 10px;
        padding: 20px 20px 0px 20px;

        p {
          line-height: 20px;
        }

        .title {
          font-size: 16px;
          line-height: 30px;
          text-align: left;
          border: none;
          margin: 0;
        }

        .desc {
          font-size: 16px;
        }

        .parterContent {
          height: 290px;
          border-top: solid 1px #ccc;
          padding: 20px 0;
          margin: 20px 0;

          p {
            text-indent: 2em;
            margin-bottom: 10px;
          }
        }

        .parterService {
          .services {
            margin-top: 10px;
            border-top: solid 1px #ccc;

            li {
              display: inline-block;
              width: 22%;
              font-size: 14px;
              text-align: center;
              margin: 5px 10px;
              padding: 10px 5px;

              a {
                color: $color-blue;

                img {
                  width: 30px;
                  height: 30px;
                }

                span {
                  display: block;
                }
              }

              a:hover {
                color: $link-hover;
              }
            }
          }
        }
      }
    }

    .resource {
      .title {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        border: none;
        padding-right: 20px;
        margin: 20px 0 10px 0;

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

      ul {

        li {
          display: inline-block;
          background-color: $background-white;
          margin: 0 1px;

          a {
            display:inline-block;
            width: 117px;
            height: 117px;
            text-align:center;
            overflow:hidden;
            b{
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }
            img {
              width:auto;
              height:auto;
              max-width:$full;
              max-height:$full;
              vertical-align:middle;
              transition: all 0.5s ease-out;
              transform: scale(1, 1);
            }
          }
        }

        li:hover {
          img {
            transform: scale(1.2, 1.2);
          }
        }
      }

      .bigType {
        margin-top: 20px;
        .prev, .next {
          display: inline-block;
          vertical-align: top;
          margin-top: 140px;
          cursor: pointer;

          i {
            font-size: 40px;
            color: $color-grey;
          }
        }

        .prev:hover, .next:hover {
          i {
            color: $color-blue;
          }
        }

        .typeResourceBox {
          display: inline-block;
          width: 1100px;
          height: 300px;
          overflow: hidden;

          .el-row {
            display: inline-block;
            width: $full;
            height: auto;
          }
        }

        .plate {
          // border: $border-blue;
          background-color: $background-white;

          ul {
            font-size: 0;
            margin: 0;

            li {
              width: 33.3%;
              height: 100px;
              margin: 0;

              a {
                display: inline-block;
                width: $full;
                height: $full;
                b{
                  display: inline-block;
                  height: 100%;
                  vertical-align: middle;
                }   

                img {
                  width:auto;
                  height:auto;
                  max-width:$full;
                  max-height:$full;
                  vertical-align:middle;
                  transform: scale(1, 1);
                  transition: all 0.5s ease-out;
                }
              }
            }

            li:nth-child(odd) {
              background-color:#B2CAF8;
            }

            li:first-child {
              color: $color-white;
              background-color: $link-hover;
              font-size: $font-16;
              text-align: center;
              line-height: 100px;
              vertical-align: top;
            }

            li:hover {
              img {
                transform: scale(1.3, 1.3);
              }
            }
          }
        }
      }

      .supplierBox{
        background-color: $background-white;
        padding:10px 0 0 0;
        margin-top:20px;
        .title{
          padding:0 20px;
          margin:10px 0;
        }
        .el-row {
        // padding: 0 5px;

        .supplier {
          height: 140px;
          padding: 10px 20px;
          border-right:solid 1px $border-color-grey;
          border-top:solid 1px $border-color-grey;

          >div {
            display: flex;
            width: $full;
            font-size: $font-14;

            .logo {
              flex: 0 0 60px;
              width: 60px;
              height: 60px;
              overflow:hidden;
              margin-right: 10px;
            }

            .info {
              flex: 1;
              width: calc(100% - 70px);
              min-width: 150px;
              height: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;

              p {
                color:$color-black;
                line-height: 30px;
                text-align: left;

                span {
                  margin-right: 10px;
                }

                img {
                  display: inline-block;
                  width: 15px;
                  height: 16px;
                  vertical-align: middle;
                }

                .enter {
                  height:30px;
                  color: $color-white;
                  font-size: $font-12;
                  background-color: $background-blue;
                  float: right;
                }

                .enter:hover {
                  background-color: $link-hover;
                }
              }
            }
          }

          .tags {
            display: block;
            width: $full;
            height: auto;
            text-align: left;
            margin-top: 10px;

            >p {
              display: inline-block;
              width: $full;
              height: 30px;
              line-height: 30px;
              overflow: hidden;
              white-space: nowrap;

              img {
                display: inline-block;
                width: 18px;
                height: 18px;
                margin-right: 10px;
                vertical-align: middle;
              }

              span {
                font-size: $font-12;
                color: $color-white;
                background-color: $background-grey;
                border-radius: 3px;
                padding: 3px 10px;
                margin-right: 10px;
              }
            }
          }
        }
        .el-col:nth-child(3n){
          .supplier{
            border-right:none;
          }
        }

        // .supplier:hover {
        //   box-shadow: 0 0 10px $color-blue;
        // }
      }
      }


    }

    .project {
      .title {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        border: none;
        padding-right: 20px;
        margin: 20px 0 10px 0;

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

      .el-row {
        padding: 5px;

        .demand {
          height: 210px;
          position: relative;
          text-align: center;
          background-color: $background-white;
          margin-bottom: 20px;
          padding: 0 20px 20px 20px;

          .status {
            position: absolute;
            left: 50%;
            top: 0;
            margin-left: -50px;
            width: 80px;
            height: 30px;
            color: $color-white;
            line-height: 30px;
            padding: 0 10px;
          }

          .doing {
            background-color: $background-blue;
          }

          .zhaodone {
            background-color: #E0CC49;
          }

          .zhaodoing {
            background-color: #86B800;
          }

          .done {
            background-color: $background-grey;
          }

          .info {
            padding-top: 50px;
            font-size: 14px;

            .name {
              height: 30px;
              font-size: $font-16;
              font-weight: 700;
              line-height: 30px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .desc {
              line-height: 40px;
            }

            .enter {
              color: $color-blue;
              font-size: 16px;
              background-color: $color-white;
              border: $border-blue;
              margin: 30px 0 20px 0;
              box-sizing: border-box;
            }

            .enter:hover {
              color: $color-white;
              background-color: $background-blue;
            }

            .data {
              position: absolute;
              left: 20px;
              bottom: 10px;
              width: calc(100% - 40px);
              color: $color-grey;
              text-align: left;

              .date {
                float: right;
              }
            }
          }
        }

        .demand:hover {
          box-shadow: 0 0 10px $color-blue;
        }
      }
    }

    .expert {
      .title {
        background-color:$color-white;
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        border: none;
        padding:20px;
        margin-top: 10px;

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

      .expertBox {
        display: flex;
        width: $full;
        height: auto;
        background-color: $color-white;

        .expertLeft {
          flex: 1;
          height: 580px;
          background-color: #eee;

          .el-row {
            height: $full;
            margin-right:-10px;

            .el-col {
              height: $full;

              .grid-content {
                height: $full;
              }
            }
          }

          .expertContent {
            position:relative;
            width: calc(100% - 100px);
            height: calc(100% - 40px);
            color: $color-black;
            background-color: $color-white;
            padding: 20px 50px;

            // overflow-y:auto;
            img {
              display: inline-block;
            }

            .expertPhoto {
              position:absolute;
              left:50%;
              width: 80px;
              height: 80px;
              border-radius: 50%;
              margin-left:-40px;
            }

            .renzheng {
              position:absolute;
              left:60%;
              top:80px;
              width: 25px;
              height: 25px;
            }

            p {
              line-height: 30px;
            }

            .name {
              font-size: $font-14;
              margin-top:85px;
            }

            .tags {
              color: $color-blue;
              font-size: $font-12;

              span {
                margin-right: 20px;
              }

              span:last-child {
                margin-right: 0;
              }
            }

            .introduceBox {
              width: $full;
              height: 100px;
              margin-top: 10px;
              overflow-y: auto;

              .introduce {
                width: $full;
                height: auto;
                font-size:$font-12;
                line-height: 25px;
                color: $color-grey;
                text-align: left;
              }
            }

            .services {
              border-top: $border-grey;
              padding-top: 20px;
              margin-top: 10px;

              ul {
                display: flex;

                li {
                  flex: 1;
                  font-size:$font-12;

                  .serviceImg {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    // margin-bottom: 10px;
                  }

                  .servicePrice {
                    color: $color-red;
                  }
                }
              }
            }

            .news {
              .el-tabs .el-tabs__nav >>> .el-tabs__item{
                font-size:$font-12 !important;
              }
              .newList {
                text-align: left;

                li {
                  display: inline-block;
                  width: $full;
                  height: 25px;
                  font-size:$font-12;
                  line-height: 25px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }

                a {
                  color: $color-grey;
                }

                a:hover {
                  color: $link-hover;
                  // text-decoration: underline;
                }
              }
            }
          }

          // .expertContent:hover {
          //   box-shadow: 0 0 10px $color-blue;
          // }
        }

        .expertRight {
          flex: 0 0 150px;
          width: 150px;
          height: 580px;
          background-color: $color-white;
          font-size: 0;

          img {
            width: 130px;
            height: 280px;
            margin-left: 10px;
            margin-bottom: 20px;
          }

          img:last-child {
            margin-bottom: 0;
          }
        }
      }

      .expertBox:last-child {
        height: auto;

        .expertLeft {
          height: auto;
          background-color:$color-white;
          border-top:solid 1px $border-color-grey;
          padding-bottom:10px;

          .el-row {
            height: auto;

            .el-col {
              height: auto;

              .grid-content {
                height: auto;
              }
            }
          }

          .expertContent {
            width: calc(100% - 40px);
            height: 130px;
            padding: 20px;

            .expertMain {
              width: $full;
              height: 80px;
              display: flex;

              .img {
                position: relative;
                flex: 0 0 80px;
                width: 80px;
                height: $full;

                .expertPhoto {
                  width: 80px;
                  height: 80px;
                  border-radius: 0;
                }

                .renzheng {
                  position: absolute;
                  left:65px;
                  top:65px;
                  width:15px;
                  height:15px;
                }
              }

              .info {
                flex: 1;
                height: $full;
                text-align: left;
                margin-left: 15px;
                .name{
                  margin:0;}

                .company {
                  line-height: 20px;
                }

                .tags {
                  display: inline-block;
                  height: 30px;
                  overflow: hidden;

                  span {
                    font-size: $font-12;
                    color: $color-white;
                    background-color: $background-grey;
                    border-radius: 3px;
                    padding: 3px 10px;
                    margin-right: 10px;
                  }
                }
              }
            }

            .opts {
              width: $full;
              margin-top: 20px;
              text-align: left;

              .ask {
                width: 80px;
                line-height: 25px;
                color: $color-white;
                background-color: $background-blue;
              }

              .ask:hover {
                background-color: $link-hover;
              }
            }
          }

          // .expertContent:first-child {
          //   margin-bottom: 20px;
          // }
        }

        .expertRight {
          height: auto;
          border-top:solid 1px $border-color-grey;
          padding-bottom:10px;

          img {
            height: 150px;
            margin:0;
            margin-top:20px;
            margin-left:10px;
          }
        }
      }
    }

    .meeting {
      background-color:$color-white;
      padding:20px 20px 0 20px;
      .meetingContent {
        width: $full;
        height: $full;
        background-color: $color-white;
        border: $border-grey;
        border-radius: 10px;
        box-sizing: border-box;
        overflow: hidden;
        cursor: pointer;

        .img {
          width: $full;
          height: 200px;
          overflow: hidden;

          img {
            width: $full;
            height: $full;
            transition: all 0.5s ease-out;
            transform: scale(1, 1);
          }
        }

        .title {
          height:25px;
          margin: 0;
          padding: 5px 10px;
          line-height: 25px;
          border-bottom: none;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }

        p {
          padding: 0 10px 10px 10px;

          .place {
            margin-right: 20px;
          }

          .state {
            display: inline-block;
            padding: 3px 10px;
            color: $color-white;
            background-color: $color-blue;
            border-radius: 3px;
          }

          .full {
            background-color: #E04A49;
          }

          .doing {
            background-color: #88B60B;
          }

          .over {
            background-color: $color-grey;
          }
        }
      }

      .meetingContent:first-child {
        margin-bottom: 20px;
      }

      .meetingContent:hover {
        border: $border-blue;

        img {
          transform: scale(1.2, 1.2);
        }

        .title {
          color: $link-hover;
        }
      }
    }

    .travels {
      background-color:$color-white;
      padding:20px;
      li {
        width: $full;
        height: 280px;
        margin-bottom: 20px;
        border-radius: 10px;
        overflow: hidden;

        a {
          display: inline-block;
          width: $full;
          height: $full;

          img {
            width: $full;
            height: $full;
            transition: all 0.5s ease-out;
            transform: scale(1, 1);
          }
        }
      }

      li:last-child {
        margin-bottom: 0;
      }

      li:hover {
        img {
          transform: scale(1.1, 1.1);
        }
      }
    }

    .train {
      .trainType {
        .el-row {
          padding: 5px;

          .grid-content {
            height: 150px;
            line-height: 150px;
            border-radius: 10px;
            background-color: $color-white;

            a {
              display: inline-block;
              width: $full;
              height: $full;
              color: $color-black;
              cursor: pointer;
            }
          }

          .grid-content:hover {
            box-shadow: 0 0 10px $color-blue;

            a {
              color: $link-hover;
            }
          }
        }
      }

      .trainApply {
        margin-top: 10px;

        .el-button {
          font-size: 30px;
          width: $full;
          height: 100px;
          color: $color-white;
          background-color: $background-blue;
          border-radius: 10px;
        }

        .el-button:hover {
          background-color: $link-hover;
        }
      }

      .trainBox {
        background-color:$color-white;
        margin-top: 20px;

        .trainContent {
          width: $full;
          height: auto;

          .trainTypeList {
            padding: 10px 20px 0 20px;
            text-align: left;
            line-height: 25px;
            background-color: $color-white;

            >span {
              display: inline-block;
              color: $color-grey;
              padding: 3px 10px;
              margin-right: 20px;
              border-radius: 3px;
              margin-bottom: 10px;
              cursor: pointer;
            }

            span:hover, .active {
              color: $color-white;
              background-color: $background-blue;
            }

            span:last-child {
              margin-bottom: 0px;
            }
          }

          .trainList {
            margin-top: 20px;

            .trainProduct {
              height: auto;

              .img {
                width: $full;
                height: 150px;
                border-radius: 10px;
                margin-bottom: 10px;
                overflow: hidden;

                img {
                  width: $full;
                  height: $full;
                  transition: all 0.5s ease-out;
                  transform: scale(1, 1);
                }
              }

              p {
                color: $color-grey;
                line-height: 25px;
                text-align: left;
                padding: 0 10px;
              }

              .classType, .number {
                span {
                  color: $color-black;
                }
              }
            }

            .trainProduct:first-child {
              margin-bottom: 20px;
            }

            .trainProduct:hover {
              img {
                transform: scale(1.2, 1.2);
              }
            }
          }
        }

        .recruitContent {
          width: $full;
          height: auto;

          .recruitTypeList {
            padding: 10px 20px 0 20px;
            text-align: left;
            line-height: 25px;
            background-color: $color-white;

            >span {
              display: inline-block;
              color: $color-grey;
              padding: 3px 10px;
              margin-right: 20px;
              border-radius: 3px;
              margin-bottom: 10px;
              cursor: pointer;

              >span {
                padding: 0 5px;
                border-right: solid 2px $border-color-grey;
              }

              >span:last-child {
                border-right: none;
              }
            }

            >span:hover, .active {
              color: $color-white;
              background-color: $background-blue;

              >span {
                border-right-color: $color-white;
              }
            }

            >span:last-child {
              margin-bottom: 0px;
            }
          }

          .recruitList {
            width: $full;
            height: auto;
            margin-top: 10px;

            ul {
              li {
                width: calc(100% - 40px);
                height: auto;
                padding: 10px 20px;
                background-color: $color-white;
                border-top: solid 1px $border-color-grey;
                display: flex;

                p {
                  font-size: 14px;
                  color: $color-black;
                  line-height: 30px;
                  text-align: left;
                }

                .part1, .part2 {
                  flex: 1;
                  height: $full;

                  .jobName {
                    font-size: $font-16;
                  }

                  .jobSalary {
                    color: $color-red;
                    font-size: $font-16;
                  }

                  .jobtreatment {
                    color: $color-blue;
                    font-size: $font-12;

                    span {
                      margin-right: 20px;
                    }

                    span:last-child {
                      margin-right: 0;
                    }
                  }

                  .jobCompany {
                    font-size: $font-16;
                    line-height: 50px;
                  }

                  .jobAddress {
                    color: $color-grey;

                    span {
                      display: inline-block;
                      height: 20px;
                      line-height: 20px;
                      padding: 0 5px;
                      border-right: solid 2px $border-color-grey;
                    }
                  }
                }

                .part3, .part4 {
                  flex: 0 0 200px;
                  width: 200px;
                  height: $full;

                  .el-button {
                    color: $color-blue;
                    border: $border-blue;
                    border-radius: 5px;
                    margin-top: 30px;
                  }

                  .el-button:hover {
                    color: $color-white;
                    background-color: $background-blue;
                  }

                  .jobDate {
                    color: $color-grey;
                    line-height: 90px;
                    text-align: right;
                  }
                }
              }

              li:hover {
                .jobName, .jobCompany, .jobDate {
                  color: $link-hover;
                }
              }
            }
          }
        }
      }
    }

    .findProject {
      margin-top: 10px;
      width: $full;
      height: auto;

      .conditionList {
        width: calc(100% - 40px);
        background-color: $color-white;
        padding: 10px 20px;

        .condition, .condition1 {
          position: relative;
          line-height: 30px;
          margin-bottom: 10px;
          text-align: left;
          height: 30px;
          padding-right: 50px;
          overflow: hidden;

          span:first-child {
            font-weight: 700;
            margin-right: 10px;
          }

          p {
            display: inline-block;
            width: calc(100% - 100px);
            height: auto;
            vertical-align: top;

            span {
              margin-right: 20px;
              padding: 3px 10px;
              border-radius: 3px;
              cursor: pointer;
            }

            span:hover, .active {
              color: $color-white;
              background-color: $background-blue;
            }

            span:first-child {
              font-weight: 400;
            }
          }

          .el-button {
            position: absolute;
            top: 0;
            right: 0;
            color: $color-white;
            background-color: $background-blue;
            border-radius: 5px;
          }

          .el-button:hover {
            background-color: $link-hover;
          }
        }

        .condition1 {
          height: auto;

          .el-button {
            background-color: $background-red;
          }

          .el-button:hover {
            background-color: $background-hover-red;
          }
        }
      }

      .projectBox {
        display: flex;
        margin-top: 10px;

        .projectList {
          flex: 1;
          height: auto;
          padding:10px 0;
          text-align: left;
          background-color: $color-white;

          .sortList {
            padding: 10px 20px;

            span {
              margin-right: 50px;
              cursor: pointer;
            }

            span:hover, .active {
              color: $link-hover;
            }
          }

          ul {

            li {
              border-top: solid 1px $border-color-grey;
              padding: 10px 20px;

              p {
                font-size: $font-12;
                color: $color-black;
                line-height: 30px;
                margin-bottom: 10px;
              }

              .projectName {
                font-size: $font-16;

                .date {
                  float: right;
                  color: $color-grey;
                }
              }

              .projectPrice {
                span {
                  color: $color-red;
                  font-size: $font-20;
                  margin-left: 20px;
                }
              }

              .projectInfo {
                display: flex;
                width: $full;
                height: 120px;

                .part1, .part2 {
                  flex: 1;
                  margin-right:5px;
                  p{
                    height:30px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                  }

                  span {
                    margin-right: 10px;
                  }
                }

                .part3 {
                  flex: 0 0 200px;
                  height: 200px;

                  .name {
                    font-size: $font-18;
                    line-height: 40px;
                  }
                }

                .part4 {
                  flex: 0 0 100px;
                  width: 100px;
                  text-align: right;

                  .el-button {
                    color: $color-blue;
                    background-color: $color-white;
                    border: $border-blue;
                    margin-top: 20px;
                  }

                  .el-button:hover {
                    color: $color-white;
                    background-color: $background-blue;
                  }
                }
              }

              .data {
                margin-top: 5px;
                padding-left: 40px;

                span {
                  margin: 0 20px;
                }
              }
            }

            li:hover {
              .projectName {
                color: $link-hover;
              }
            }
          }
        }

        .caseList {
          flex: 0 0 250px;
          width: 250px;
          height: auto;
          padding: 0px 20px 10px 20px;
          background-color: $color-white;
          margin-left: 10px;

          .title {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            text-align: left;
            border: none;
            margin: 20px 0 10px 0;

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

          ul {
            li {
              margin-top: 20px;

              a {
                color: $color-black;
                display: inline-block;

                .img {
                  position: relative;
                  width: 250px;
                  height: 160px;
                  overflow: hidden;

                  img {
                    display: inline-block;
                    width: $full;
                    height: $full;
                    transition: all 0.5s ease-out;
                    transform: scale(1, 1);
                  }

                  .name {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    padding: 0 10px;
                    width: calc(100% - 20px);
                    height: 40px;
                    line-height: 40px;
                    color: $color-white;
                    background-color: rgba(0, 0, 0, 0.3);
                  }
                }

                .title {
                  line-height: 40px;
                  font-weight: 400;
                  margin: 0;
                  padding: 0 10px;
                  text-align: center;
                }
              }
            }

            li:hover {
              a {
                .img {
                  img {
                    transform: scale(1.2, 1.2);
                  }
                }
              }
            }
          }
        }
      }
    }

    .invest {
      background-color: $color-white;
      .title {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        border: none;
        padding: 10px;

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

      .investList {
        margin-top: 10px;

        ul {
          li {
            display: flex;
            padding: 10px 20px;
            border-top: solid 1px $border-color-grey;

            .top {
              display: inline-block;
              width: 40px;
              height: 40px;
              font-size: $font-20;
              font-weight: 700;
              line-height: 40px;
              color: $color-white;
              background-color: $background-grey;
              border-radius: 3px;
              vertical-align: top;
            }

            .top1 {
              background-color: $background-red;
            }

            .top2 {
              background-color: #E0CC49;
            }

            .top3 {
              background-color: #88B60B;
            }

            img {
              flex: 0 0 100px;
              width: 100px;
              height: 80px;
              overflow: hidden;
              padding: 20px;
              margin-top: 20px;
            }

            .info {
              flex: 1;
              margin-left: 20px;

              p {
                font-size: $font-14;
                line-height: 30px;
                text-align: left;
              }

              .name {
                font-size: $font-18;
                line-height: 40px;
              }

              .desc {
                font-size: $font-12px;
              }

              .tags {
                margin-top: 30px;

                span {
                  padding: 3px 10px;
                  margin-right: 20px;
                  color: $color-grey;
                  background-color: #FAD6D6;
                  border-radius: 10px;
                }
              }
            }

            .opt {
              flex: 0 0 150px;
              width: 150px;
              text-align: right;

              .el-button {
                color: $color-white;
                background-color: $background-red;
                border: $border-red;
                border-radius: 5px;
                margin-top: 50px;
              }

              .el-button:hover {
                background-color: $background-hover-red;
              }

              .lookNumber {
                font-size: $font-12;
                color: $color-grey;
                line-height: 40px;
              }
            }
          }

          li:hover {
            .name {
              color: $link-hover;
            }
          }
        }
      }
    }

    .committee {
      background-color: $color-white;
      padding:20px 20px 0 20px;
      margin-top: 10px;

      .introduce {
        display: inline-block;
        width: calc(100% - 40px);
        height: auto;
        font-size: $font-16;
        line-height: 30px;
        padding: 10px 20px;
        background-color: $color-white;
        text-align: left;
        // overflow:hidden;
        // text-overflow: ellipsis;
        // white-space:nowrap;
      }

      .memberList {
        margin-top: 20px;

        // background-color:$color-white;
        .member {
          margin-bottom: 20px;
          border-radius: 5px;
          overflow: hidden;
          cursor: pointer;

          .img {
            position: relative;
            height: 200px;

            img, .model {
              width: $full;
              height: $full;
            }

            .model {
              display: none;
              position: absolute;
              left: 0;
              top: 0;
              color: $color-white;
              font-size: $font-22;
              font-weight: 700;
              line-height: 200px;
              background-color: rgba(0, 0, 0, 0.3);
              transition: all 0.5s ease-out;
            }
          }

          .name {
            padding: 0 10px;
            font-size: $font-16;
            line-height: 40px;
            color: $color-white;
            background-color: $background-grey;
          }
        }

        .member:hover {
          .model {
            display: block;
          }
        }
      }
    }

    .expertCommittee {
      display: flex;

      .committee {
        flex: 1;
        padding: 0 10px;
        background-color: $color-white;

        .title {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          text-align: left;
          border: none;
          padding: 0 10px;
          margin: 20px 0 10px 0;

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

        .introduce {
          color: $color-grey;
          font-size:$font-14;
          line-height: 30px;
        }

        .expert {
          position: relative;
          height: auto;
          font-size:$font-14;
          margin-top: 10px;
          padding: 10px;

          img {
            position: absolute;
            left: 30px;
            top: 20px;
            width: 180px;
            height: 220px;
          }

          p {
            line-height: 30px;
            text-align: left;
            text-indent: 2em;
            padding-left: 220px;
          }

          .name {
            text-indent: 0;
          }

          .desc {
            color: $color-grey;
            margin-top: 10px;
          }

          .detail {
            height: 160px;
            color: $color-grey;
            background-color: #E5EAFE;
            padding: 10px;
            margin-top: 10px;
          }
        }

        .expertList {
          margin: 20px 0;

          .prev, .next {
            display: inline-block;
            vertical-align: top;
            margin-top: 40px;
            cursor: pointer;

            i {
              font-size: 40px;
              color: $color-grey;
            }
          }

          .prev:hover, .next:hover {
            i {
              color: $color-blue;
            }
          }

          ul {
            display: inline-block;
            width: 600px;
            height: 130px;
            overflow: hidden;
            font-size: 0;

            li {
              display: inline-block;
              width: 100px;
              height: $full;
              margin: 0 10px;
              cursor: pointer;
            }
          }
        }
      }

      .advantageBox {
        flex: 0 0 400px;
        width: 400px;
        background-color: $color-white;
        padding: 0 10px;
        margin: 10px 0 0 10px;

        .title {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          text-align: left;
          border: none;
          padding: 0 10px;
          margin: 20px 0 10px 0;

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

        .advantageList {
          .advantage {
            padding: 10px;
            margin-bottom: 20px;

            img {
              width: 80px;
              height: 80px;
              border-radius: 50%;
            }

            .name, .desc {
              font-size: $font-12;
              line-height: 30px;
            }

            .name {
              color: $color-black;
              font-size: $font-20;
              margin-top: 10px;
            }
          }
        }
      }
    }

    .committeeMember {
      margin-top: 10px;
      display: flex;

      .memberBox {
        flex: 1;
        background-color: $color-white;
        padding: 0 20px;

        .memberList {
          margin-top: 10px;

          .level {
            color: #E5C600;
            font-size: $font-16;
            line-height: 30px;
            text-align: left;

            img {
              vertical-align: top;
              margin-top: 4px;
            }
          }

          .member {
            margin: 10px 20px;
            font-size:$font-14;
            cursor: pointer;
          }
        }

        .memberList:nth-child(2) {
          .level {
            color: #A2BE50;
          }
        }

        .memberList:nth-child(3) {
          .level {
            color: #B5D275;
          }
        }
      }

      .explainBox {
        flex: 0 0 380px;
        width: 380px;
        background-color: $color-white;
        padding: 0 20px;
        margin-left: 10px;

        p {
          text-align: left;
          line-height: 25px;
        }

        .title {
          font-size: $font-16;
          line-height: 50px;
        }

        .explain {
          height: 100px;
        }
      }
    }

    .association {
      background-color:$color-white;
      padding: 20px 20px 0 20px;

      .video {
        width: $full;
        border: $border-grey;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 20px;
        cursor: pointer;

        .img {
          width: $full;
          height: 200px;
          overflow: hidden;

          img {
            width: $full;
            height: $full;
            transition: all 0.5s ease-out;
            transform: scale(1, 1);
          }
        }

        p {
          display: inline-block;
          width: calc(100% - 20px);
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          overflow: hidden;
          text-align: left;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .name {
          font-size: $font-16;
        }

        .time {
          color: $color-grey;
          font-size: $font-14;
          img{
            width:19px;
            height:19px;
            vertical-align:middle;
            margin-right:5px;
          }
        }
      }

      .video:hover {
        .img{
          img:first-child {
            transform: scale(1.2, 1.2);
          }
        }

        .name, .time {
          color: $link-hover;
        }
      }
    }

    .knowledge {
      display: flex;

      .newBox {
        flex: 1;
        text-align: left;
        padding: 0 20px;
        background-color: $color-white;

        .title {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
          text-align: left;
          border: none;
          // padding: 0 10px;
          margin: 20px 0 10px 0;

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
        .newList {
          ul {
            li {
              display: flex;
              color: $color-black;
              padding: 10px 0px;
              background-color: $color-white;
              border-top: solid 1px $border-color-grey;

              img {
                flex: 0 0 60px;
                width: 60px;
                height: 60px;
                border-radius:50%;
                margin-top:35px;
                overflow:hidden;
              }

              .info {
                flex: 1;
                margin-left: 20px;

                p {
                  display: inline-block;
                  width: 600px;
                  overflow: hidden;
                  font-size: $font-14;
                  line-height: 30px;
                  text-align: left;      
                }

                .name {
                  height:30px;
                  font-size: $font-16;
                  line-height: 40px;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  margin-bottom: 10px;
                }
                .author{
                  color: $color-grey;
                  line-height:25px;
                  font-size: $font-12;
                }

                .desc {
                  height: 50px;
                  color: $color-grey;
                  line-height:25px;
                  font-size: $font-12;
                }
              }

              .opt {
                flex: 0 0 100px;
                width: 100px;
                text-align: right;

                .date {
                  color:$color-grey;
                  line-height: 25px;
                  margin-top: 5px;
                }

                .el-button {
                  color: $color-white;
                  background-color: $background-green;
                  border: $border-green;
                  border-radius: 5px;
                  margin-top: 20px;
                }

                .el-button:hover {
                  background-color: $background-hover-green;
                }
              }
            }

            li:hover {
              color: $link-hover;
            }
          }
        }
      }

      .otherBox {
        flex: 0 0 300px;
        width: 300px;
        margin-left: 20px;

        .hotBox {
          height: 280px;
          padding: 0 20px 10px 20px;
          margin-bottom: 20px;
          background-color: $color-white;

          ul {
            li {
              font-size:$font-12;
              line-height: 25px;
              text-align: left;
              cursor:pointer;
              i{
                display:inline-block;
                width:6px;
                height:6px;
                background-color:#CCCCCC;
                border-radius:50%;
                vertical-align:middle;
                margin-bottom:2px;
                margin-right:3px;
              }

              p {
                display: inline-block;
                max-width: 240px;
                color: $color-black;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                vertical-align: top;
              }

              p:hover {
                color: $link-hover;
                // text-decoration: underline;
              }
            }
            li:nth-child(1){
              .circle{
                background-color:#FF6F00;
              }
            }
            li:nth-child(2){
              .circle{
                background-color:#FFA40B;
              }
            }
            li:nth-child(3){
              .circle{
                background-color:#F8E31A;
              }
            }
          }
        }

        .relativeBox {
          padding: 20px;
          color: $color-black;
          background-color: $color-white;

          .title {
            margin: 10px 0;
            font-size: 16px;
            text-align: left;

            span {
              color: $color-blue;
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

          .title:first-child {
            margin-top: 0px;
          }

          p {
            font-size:$font-12;
            line-height: 25px;
            text-align: left;

            span {
              margin-right: 35px;
              cursor: pointer;
            }

            span:hover {
              color: $link-hover;
              // text-decoration: underline;
            }
          }

          .organList {
            p {
              line-height: 0;

              a {
                display: inline-block;
                color: $color-black;
                line-height: 25px;
                max-width: 260px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                cursor: pointer;
              }

              a:hover {
                color: $link-hover;
                // text-decoration: underline;
              }
            }
          }

          .scholarList {
            span {
              margin-right: 28px;
            }
          }
        }
      }
    }

    .caseType {
      .title {
        background-color:$color-white;
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        border: none;
        padding: 20px 10px;

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

      .caseList, .ArtBuildingList, .techBuildingList, .townList, .tourList, .fieldList {
        padding: 10px;
        background-color: $color-white;
        font-size: 0;
        margin-bottom:20px;

        .prev, .next {
          display: inline-block;
          vertical-align: top;
          margin-top: 90px;
          cursor: pointer;

          i {
            font-size: 40px;
            color: $color-grey;
          }
        }

        .prev:hover, .next:hover {
          i {
            color: $color-blue;
          }
        }

        .caseListBox {
          display: inline-block;
          width: 1100px;
          height: 210px;
          overflow: hidden;
        }

        ul {
          width: auto;
          height: $full;
          font-size: 0;

          li {
            display: inline-block;
            width: 240px;
            height: auto;
            border: $border-grey;
            border-radius: 10px;
            overflow: hidden;
            margin: 5px 10px;
            cursor: pointer;

            .img {
              position: relative;
              width: $full;
              height: 160px;
              overflow: hidden;

              img {
                width: $full;
                height: $full;
                transition: all 0.5s ease-out;
                transform: scale(1, 1);
              }

              .info {
                display: none;
                position: absolute;
                left: 0;
                top: 0;
                width: calc(100% - 20px);
                padding: 5px 10px;
                background-color: rgba(0, 0, 0, 0.3);

                p {
                  color: $color-white;
                  font-size: $font-12;
                  line-height: 25px;
                  text-align: left;
                }
              }
            }

            .name {
              display: inline-block;
              width: calc(100% - 20px);
              height: 40px;
              padding: 0 10px;
              font-size: $font-16;
              line-height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          li:hover {
            img {
              transform: scale(1.2, 1.2);
            }

            // .info {
            // display: block;
            // }
            .name {
              color: $link-hover;
            }
          }
        }
      }
    }
  }
}
</style>
