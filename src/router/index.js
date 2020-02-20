import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Shopcart = () => import('../views/shopcart/Shopcart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

// 安装插件
Vue.use(VueRouter)

// 创建router
const routes = [
  {
    path:'',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'Home',
    component:Home
  },
  {
    path:'/category',
    name:'Category',
    component:Category
  },
  {
    path:'/shopcart',
    name:'Shopcart',
    component:Shopcart
  },
  {
    path:'/profile',
    name:'Profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    name:'Detail',
    component:Detail
  }

]
const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode:'history'
}) 

export default router