import { createRouter, createWebHistory } from 'vue-router'

import MainPage from './components/MainPage.vue'
import SchedBoard from './components/SchedBoard.vue'



const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: MainPage
    },
    {
        path: '/schedboard',
        name: 'SchedBoard',
        component: SchedBoard
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
export default router