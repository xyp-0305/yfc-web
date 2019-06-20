import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/Login'
import Template from '@/components/common/Template';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { title: '登录' }
    },
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/components/page/Register'], resolve),
      meta: { title: '注册' }
    },
    {
      path: '/update',
      name: 'update',
      component: resolve => require(['@/components/page/Update'], resolve),
      meta: {
        title: '修改用户信息',
        requireAuth: true
      }
    },
    {
      path: '/updatePassword',
      name: 'updatePassword',
      component: resolve => require(['@/components/page/UpdatePassword'], resolve),
      meta: {
        title: '修改密码',
        requireAuth: true
      }
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/',
      name: 'main',
      component: resolve => require(['@/components/common/Template'], resolve),
      children: [
        {
          path: '/home',
          name: 'home',
          component: resolve => require(['@/components/page/Home'], resolve),
          meta: {
            title: '首页',
            showSubmenu: true
          }
        },
        {
          path: '/industries',
          name: 'industries',
          component: resolve => require(['@/components/page/Industries'], resolve),
          meta: {
            title: '产业服务',
            showSubmenu: false
          }
        },
        {
          path: '/demands',
          name: 'demands',
          component: resolve => require(['@/components/page/Demands'], resolve),
          meta: {
            title: '需求中心',
            showSubmenu: false
          }
        },
        {
          path: '/experts',
          name: 'experts',
          component: resolve => require(['@/components/page/Experts'], resolve),
          meta: {
            title: '专家智库',
            showSubmenu: false
          }
        },
        // 替换之前的人才培养 2019-5-24
        {
          path: '/trains',
          name: 'trains',
          component: resolve => require(['@/components/page/Trains'], resolve),
          meta: {
            title: '商学院',
            showSubmenu: false
          }
        },
        // 新增 2019-5-24
        {
          path: '/invests',
          name: 'invests',
          component: resolve => require(['@/components/page/Invests'], resolve),
          meta: {
            title: '投融资',
            showSubmenu: false
          }
        },
        // 新增 2019-5-24
        {
          path: '/associations',
          name: 'associations',
          component: resolve => require(['@/components/page/Associations'], resolve),
          meta: {
            title: '社群',
            showSubmenu: false
          }
        },
        // 行业知识库与经典案例合并 2019-05-24
        {
          path: '/news',
          name: 'news',
          component: resolve => require(['@/components/page/News'], resolve),
          meta: {
            title: '行业知识库',
            showSubmenu: false
          },
        },
        {
          path: '/questions',
          name: 'questions',
          component: resolve => require(['@/components/page/Questions'], resolve),
          meta: {
            title: '行业问答',
            showSubmenu: false
          }
        }
      ]
    },
    {
      path: '/',
      name: '',
      component: resolve => require(['@/components/common/Template'], resolve),
      children: [
        {
          path: '/cases',
          name: 'cases',
          component: resolve => require(['@/components/page/Cases'], resolve),
          meta: {
            title: '案例库',
            showSubmenu: false
          }
        },
        {
          path: '/caseDetail',
          name: 'caseDetail',
          component: resolve => require(['@/components/page/CaseDetail'], resolve),
          meta: {
            title: '案例详情',
            showSubmenu: false
          }
        },
        {
          path: '/articles',
          name: 'articles',
          component: resolve => require(['@/components/page/Articles'], resolve),
          meta: {
            title: '文章库',
            showSubmenu: false
          }
        },
        {
          path: '/articleDetail',
          name: 'articleDetail',
          component: resolve => require(['@/components/page/ArticleDetail'], resolve),
          meta: {
            title: '文章详情',
            showSubmenu: false
          }
        },
        {
          path: '/addQuestion',
          name: 'addQuestion',
          component: resolve => require(['@/components/question/AddQuestion'], resolve),
          meta: {
            title: '发布问题',
            showSubmenu: false,
            requireAuth: true
          }
        },
        {
          path: '/qaDetail',
          name: 'qaDetail',
          component: resolve => require(['@/components/question/QaDetail'], resolve),
          meta: {
            title: '问答详情',
            showSubmenu: false,
            requireAuth: true
          }
        },
        {
          path: '/meetingDetail',
          name: 'meetingDetail',
          component: resolve => require(['@/components/page/train/MeetingDetail'], resolve),
          meta: {
            title: '峰会详情',
            showSubmenu: false
          }
        }
      ]
    },
    {
      path: '/',
      name: '',
      component: resolve => require(['@/components/common/Template'], resolve),
      children: [
        {
          path: '/personal',
          name: 'personal',
          component: resolve => require(['@/components/page/Personal'], resolve),
          meta: {
            title: '个人中心',
            showSubmenu: false,
            requireAuth: true
          },
          children: [
            {
              path: '/member',
              name: 'member',
              component: resolve => require(['@/components/personal/Member'], resolve),
              meta: {
                title: '会员中心'
              }
            },
            {
              path: '/myOrder',
              name: 'myOrder',
              component: resolve => require(['@/components/personal/MyOrder'], resolve),
              meta: {
                title: '我的订单'
              }
            },
            {
              path: '/orderDetail',
              name: 'orderDetail',
              component: resolve => require(['@/components/personal/OrderDetail'], resolve),
              meta: {
                title: '订单详情'
              }
            },
            {
              path: '/myCollect',
              name: 'myCollect',
              component: resolve => require(['@/components/personal/MyCollect'], resolve),
              meta: {
                title: '我的收藏'
              }
            },
            {
              path: '/myQA',
              name: 'myQA',
              component: resolve => require(['@/components/personal/MyQA'], resolve),
              meta: {
                title: '我的问答'
              }
            },
            {
              path: '/myDemand',
              name: 'myDemand',
              component: resolve => require(['@/components/personal/MyDemand'], resolve),
              meta: {
                title: '我的需求'
              }
            },
            {
              path: '/demandDetail',
              name: 'demandDetail',
              component: resolve => require(['@/components/personal/DemandDetail'], resolve),
              meta: {
                title: '需求详情'
              }
            },
            {
              path: '/myPoint',
              name: 'myPoint',
              component: resolve => require(['@/components/personal/MyPoint'], resolve),
              meta: {
                title: '积分管理'
              }
            },
            {
              path: '/feedback',
              name: 'feedback',
              component: resolve => require(['@/components/personal/Feedback'], resolve),
              meta: {
                title: '意见反馈'
              }
            },
            {
              path: '/myBill',
              name: 'myBill',
              component: resolve => require(['@/components/personal/MyBill'], resolve),
              meta: {
                title: '发票管理'
              }
            },
            {
              path: '/invitSpread',
              name: 'invitSpread',
              component: resolve => require(['@/components/personal/InvitSpread'], resolve),
              meta: {
                title: '邀请推广'
              }
            }
          ]
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/components/page/About'], resolve),
      meta: {
        title: '关于我们',
        showSubmenu: false
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: resolve => require(['@/components/page/Contact'], resolve),
      meta: {
        title: '联系我们',
        showSubmenu: false
      }
    },
    {
      path: '/svip',
      name: 'svip',
      component: resolve => require(['@/components/page/Svip'], resolve),
      meta: {
        title: '会员中心',
        showSubmenu: false
      }
    }
  ]
})
