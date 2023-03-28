import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mestre',
    name: 'mestre',
    component: () => import(/* webpackChunkName: "mestre" */ '../views/HomeMestreView.vue')
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
    path: '/ritual',
    name: 'ritual',
    component: () => import(/* webpackChunkName: "ritual" */ '../views/RitualView.vue')
  }
  ,
  {
    path: '/jogador',
    name: 'jogador',
    component: () => import(/* webpackChunkName: "jogador" */ '../views/JogadorView.vue')
  }
  ,
  {
    path: '/createdetalhes',
    name: 'createdetalhes',
    component: () => import(/* webpackChunkName: "createdetalhes" */ '../views/DetalhesView.vue')
  }
  ,
  {
    path: '/createavatar',
    name: 'createavatar',
    component: () => import(/* webpackChunkName: "createavatar" */ '../views/AvatarView.vue')
  }
  ,
  {
    path: '/createatributos',
    name: 'createatributos',
    component: () => import(/* webpackChunkName: "createatributos" */ '../views/AtributosView.vue')
  }
  ,
  {
    path: '/createpericia',
    name: 'createpericia',
    component: () => import(/* webpackChunkName: "createpericia" */ '../views/PericiaisView.vue')
  }
  ,
  {
    path: '/createresistencias',
    name: 'createresistencias',
    component: () => import(/* webpackChunkName: "createresistencias" */ '../views/ResistenciasView.vue')
  }
  ,
  {
    path: '/createarmamento',
    name: 'createarmamento',
    component: () => import(/* webpackChunkName: "createarmamento" */ '../views/ArmamentosView.vue')
  },
  {
    path: '/createantescendente',
    name: 'createantescendente',
    component: () => import(/* webpackChunkName: "createantescendente" */ '../views/AntescendenteView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
