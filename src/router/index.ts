import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/build',
    name: 'build',
    component: () => import(/* webpackChunkName: "build" */ '../views/BuildPage.vue')
  },
  {
    path: '/personagem',
    name: 'personagem',
    component: () => import(/* webpackChunkName: "build" */ '../views/PersonagemPage.vue')
  },
  {
    path: '/curriculo',
    name: 'curriculo',
    component: () => import(/* webpackChunkName: "curriculo" */ '../views/Curriculo.vue')
  },
  {
    path: '/painel',
    name: 'painel',
    component: () => import(/* webpackChunkName: "painel" */ '../views/PainelPage.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/registrar',
    name: 'registrar',
    component: () => import(/* webpackChunkName: "registrar" */ '../views/RegistrarView.vue')
  }
  ,
  {
    path: '/rituais',
    name: 'rituais',
    component: () => import(/* webpackChunkName: "rituais" */ '../views/RituaisView.vue')
  }
  ,
  {
    path: '/sessao',
    name: 'sessao',
    component: () => import(/* webpackChunkName: "sessao" */ '../views/SessaoPage.vue')
  }
  ,
  {
    path: '/ritual',
    name: 'ritual',
    component: () => import(/* webpackChunkName: "ritual" */ '../views/RitualView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
