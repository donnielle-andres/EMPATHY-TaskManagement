import { createRouter, createWebHistory } from 'vue-router'

import MainPage from './components/MainPage.vue'
import SchedBoard from './components/SchedBoard.vue'
import AddTask from './components/AddTask.vue'


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
    },
    {
        path: '/addtask',
        name: 'AddTask',
        component: AddTask
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
export default router