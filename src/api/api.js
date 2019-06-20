import axios from 'axios'
import qs from 'qs'

let base = '';

// 获取token
export const requestToken = params => {
    return axios.post(`${base}/api/Account/GetToken`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取公共头部（栏目用户信息）
export const getCommonalityHeadList = params => {
    return axios.post(`${base}/api/HomePage/GetCommonalityHeadList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取首页头部信息（轮播图、联盟头条、产业链生态服务）
export const getHomePageHeadList = params => {
    return axios.post(`${base}/api/HomePage/GetHomePageHeadList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取首页内容（产业服务、专家智库）
export const getHomePageBodyAboveList = params => {
    return axios.post(`${base}/api/HomePage/GetHomePageBodyAboveList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取首页-产业服务-产业资源
export const getHomePageIndustrialResourceList = params => {
    return axios.post(`${base}/api/HomePage/GetHomePageIndustrialResourceList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取首页内容下（商学院、投融资）
export const getHomePageBodyInvestmentList = params => {
    return axios.post(`${base}/api/HomePage/GetHomePageBodyInvestmentList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取首页底部（社群、行业知识库、精选案例）
export const getHomePageBaseList = params => {
    return axios.post(`${base}/api/HomePage/GetHomePageBaseList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取首页-社群-社区会员
export const getUserMemberTypeGroupList = params => {
    return axios.post(`${base}/api/HomePage/GetUserMemberTypeGroupList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取首页-社群-汗马研习社群
export const getHanMaInstituteList = params => {
    return axios.post(`${base}/api/HomePage/GetHanMaInstituteList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取首页-精选案例-所有案例
export const getClassicCaseTypeList = params => {
    return axios.post(`${base}/api/HomePage/GetClassicCaseTypeList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取行业知识库二级页面上（轮播图，行业文章，推荐，专题文章）
export const getIndustryKnowUpList = params => {
    return axios.post(`${base}/api/News/GetIndustryKnowUpList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取行业知识库二级页面下（行业问答，排名，精选案例）
export const getIndustryKnowledgeDownList = params => {
    return axios.post(`${base}/api/News/GetIndustryKnowledgeDownList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取案例（三级页面）
export const getIndustryCaseList = params => {
    return axios.post(`${base}/api/ClassicCase/GetIndustryCaseList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取行业文章（三级页面）
export const getIndustryNewsPageList = params => {
    return axios.post(`${base}/api/News/GetIndustryNewsPageList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 查询案例
export const getClassicCaseList = params => {
    return axios.post(`${base}/api/ClassicCase/GetClassicCaseList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取案例详情
export const getClassicCaseInfo = params => {
    return axios.post(`${base}/api/ClassicCase/GetClassicCaseInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 查询行业文章
export const getNewsList = params => {
    return axios.post(`${base}/api/News/GetNewsList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取行业文章详情
export const getNewsInfo = params => {
    return axios.post(`${base}/api/News/GetNewsInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取行业问答（二级页面）
export const getIndustryQAList = params => {
    return axios.post(`${base}/api/Industry/GetIndustryQAList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 查询行业问答
export const getIndustryQATypeList = params => {
    return axios.post(`${base}/api/Industry/GetIndustryQATypeList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 发布问题-获取行业问答类型
export const getQATypeList = params => {
    return axios.post(`${base}/api/Industry/GetQATypeList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 发布问题-添加行业问答
export const addIndustryQA = params => {
    return axios.post(`${base}/api/Industry/AddIndustryQA`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 问答详情-获取行业问答详情
export const getIndustryQAInfo = params => {
    return axios.post(`${base}/api/Industry/GetIndustryQAInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 问答详情-新增行业问答评论
export const addIndustryQAComment = params => {
    return axios.post(`${base}/api/Industry/AddIndustryQAComment`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 问答详情-获取问答评论
export const getQACommentList = params => {
    return axios.post(`${base}/api/Industry/GetQACommentList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 问答详情-删除我的评论
export const delectMyQACommentInfo = params => {
    return axios.post(`${base}/api/Industry/DelectMyQACommentInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 个人中心-会员中心
export const getMemberCenterInfo = params => {
    return axios.post(`${base}/api/Account/GetMemberCenterInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 个人中心-我的收藏-查询我的收藏
export const getMyCollectList = params => {
    return axios.post(`${base}/api/Collect/GetMyCollectList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 个人中心-我的问答-获取我的问题
export const getMyIndustryQAList = params => {
    return axios.post(`${base}/api/Industry/GetMyIndustryQAList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 个人中心-我的问答-获取我已评论的回答
export const getMyCommentIndustryQAList = params => {
    return axios.post(`${base}/api/Industry/GetMyCommentIndustryQAList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 个人中心-我的问答-逻辑删除我的提问
export const delectMyIndustryQA = params => {
    return axios.post(`${base}/api/Industry/DelectMyIndustryQA`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 个人中心-我的需求-获取我的行业需求
export const getMyIndustryDemandList = params => {
    return axios.post(`${base}/api/Industry/GetMyIndustryDemandList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 个人中心-我的需求-需求详情
export const getIndustryDemandInfo = params => {
    return axios.post(`${base}/api/Industry/GetIndustryDemandInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 查询我的订单
export const getOrderInfoList = params => {
    return axios.post(`${base}/api/OrderInfo/GetOrderInfoList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取我的订单详情
export const getOrderItemInfo = params => {
    return axios.post(`${base}/api/OrderInfo/GetOrderItemInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}




// 获取擅长类型
export const getGoodAtList = params => {
    return axios.post(`${base}/api/HomePage/GetGoodAtList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}

// 获取城市码表
export const getProvinceCityList = params => {
    return axios.post(`${base}/api/HomePage/GetProvinceCityList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    }).then(res => res.data);
}
// 用户注册
export const requestRegister = params => {
    return axios.post(`${base}/api/Account/UserRegister`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取个人资料
export const getPersonalInfo = params => {
    return axios.post(`${base}/api/Account/GetPersonalInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 修改用户资料
export const updateUserInfo = params => {
    return axios.post(`${base}/api/Account/UpdateUserInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 修改密码
export const updatePassword = params => {
    return axios.post(`${base}/api/Account/UpdatePassword`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 添加用户积分明细
export const addUserIntegralDetail = params => {
    return axios.post(`${base}/api/Account/AddUserIntegralDetail`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 查询用户积分明细
export const getUserIntegralDetailList = params => {
    return axios.post(`${base}/api/Account/GetUserIntegralDetailList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 用户登录
export const requestLogin = params => {
    return axios.post(`${base}/api/Account/UserLogin`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取轮播图
// export const getCarouselImageList = params => {
//     return axios.post(`${base}/api/HomePage/GetCarouselImageList`, params, {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
//         // transformRequest: [function (data) {
//         //     data = qs.stringify(
//         //         JSON.parse(JSON.stringify(params))
//         //     );
//         //     // console.log(data);
//         //     return data;
//         // }]
//     }).then(res => res.data);
// }

// 获取栏目（导航栏）信息
export const getColumnList = params => {
    return axios.post(`${base}/api/HomePage/GetColumnList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
    }).then(res => res.data);
}

// 获取服务商/专家信息
export const getServiceProviderList = params => {
    return axios.post(`${base}/api/ServiceProvider/GetServiceProviderList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取单个服务商/专家信息
export const getServiceProviderInfo = params => {
    return axios.post(`${base}/api/ServiceProvider/GetServiceProviderInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 产业资源提报
export const addIndustryResources = params => {
    return axios.post(`${base}/api/Industry/AddIndustryResources`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取产业资源
export const getIndustryResourcesList = params => {
    return axios.post(`${base}/api/Industry/GetIndustryResourcesList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取单条产业资源
export const getIndustryResourcesInfo = params => {
    return axios.post(`${base}/api/Industry/GetIndustryResourcesInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取峰会/游学产品
export const getSummitList = params => {
    return axios.post(`${base}/api/TalentTraining/GetSummitList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取峰会/游学产品详情
export const getSummitInfo = params => {
    return axios.post(`${base}/api/TalentTraining/GetSummitInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 新增我的收藏
export const addMyCollectInfo = params => {
    return axios.post(`${base}/api/Collect/AddMyCollectInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 取消收藏
export const delectMyCollectInfo = params => {
    return axios.post(`${base}/api/Collect/DelectMyCollectInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 提交付款
export const submitPayment = params => {
    return axios.post(`${base}/api/OrderInfo/SubmitPayment`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 查询参会信息
export const getParticipantsInfo = params => {
    return axios.post(`${base}/api/OrderInfo/GetParticipantsInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 提交订单
export const submitOrder = params => {
    return axios.post(`${base}/api/OrderInfo/SubmitOrder`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 添加行业需求
export const addIndustryDemand = params => {
    return axios.post(`${base}/api/Industry/AddIndustryDemand`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取行业需求
export const getIndustryDemandList = params => {
    return axios.post(`${base}/api/Industry/GetIndustryDemandList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 新增行业需求评论
export const addDemandComment = params => {
    return axios.post(`${base}/api/Industry/AddDemandComment`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取行业需求评论
export const getDemandCommentList = params => {
    return axios.post(`${base}/api/Industry/GetDemandCommentList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 编辑我的行业问答
export const updateMyIndustryQAInfo = params => {
    return axios.post(`${base}/api/Industry/UpdateMyIndustryQAInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            // console.log(data);
            return data;
        }]
    }).then(res => res.data);
}

// 获取积分类型
export const getIntegralTypeList = params => {
    return axios.post(`${base}/api/account/GetPointDescriptionList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        ,transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            return data;
        }]
    }).then(res => res.data);
}

//获取积分收支明细
export const getIntegralList = params => {
    return axios.post(`${base}/api/account/GetUserIntegralDetailList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        ,transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            return data;
        }]
    }).then(res => res.data);
}

//邀请推广明细
export const getRecommendedRecordList = params => {
    return axios.post(`${base}/api/account/GetRecommendedRecordList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        ,transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            return data;
        }]
    }).then(res => res.data);
}

//获取发票详情
export const getInvoiceList = params => {
    return axios.post(`${base}/api/account/getInvoiceList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        ,transformRequest: [function (data) {
            
            console.log(params);
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            return data;
        }]
    }).then(res => res.data);
}

//获取订单发票列表 
export const GetOrderInvoiceList = params => {
    return axios.post(`${base}/api/account/GetOrderInvoiceList`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        ,transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            return data;
        }]
    }).then(res => res.data);
}

//添加修改发票抬头信息
export const addUpdateInvoice = params => {
    return axios.post(`${base}/api/account/UpdateInvoiceInfo`, params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
        transformRequest: [function (data) {
            data = qs.stringify(
                JSON.parse(JSON.stringify(params))
            );
            return data;
        }]
    }).then(res => res.data);
}

export const getUserList = params => {
    return axios.get(`${base}/user/list`, { params: params });
}

export const getUserListPage = params => {
    return axios.get(`${base}/user/listpage`, { params: params });
}

export const editUser = params => {
    return axios.get(`${base}/user/edit`, { params: params });
}

export const addUser = params => {
    return axios.get(`${base}/user/add`, { params: params });
}