import { createApp } from 'vue';


import App from './App.vue';
import router from './router.js';
import SideNav from './components/SideNav.vue';
import TaskCard from './components/TaskCard.vue';
import TaskTable from './components/TaskTable.vue';
import AddTask from './components/AddTask.vue';

import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

const app = createApp(App);

// Register components globally
app.component('side-nav', SideNav);
app.component('task-card', TaskCard);
app.component('task-table', TaskTable);
app.component('task-form', AddTask);

// Use the components
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)



// Use the router
app.use(router);

// Mount the app
app.mount('#app');
