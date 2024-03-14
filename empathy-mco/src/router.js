import { createRouter, createWebHistory } from 'vue-router'

import MainPage from './components/MainPage.vue'
import SchedBoard from './components/SchedBoard.vue'
import SettingsPage from './components/SettingsPage.vue'
import TestPage from './components/Test.vue'



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
        path: '/settings',
        name: 'SettingsPage',
        component: SettingsPage
    },
    {
        path: '/test',
        name: 'test',
        component: TestPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
export default router