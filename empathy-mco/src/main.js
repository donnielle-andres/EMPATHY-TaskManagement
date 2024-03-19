import { createApp } from 'vue';

import App from './App.vue';
import router from './router.js';
import SideNav from './components/SideNav.vue';
import TaskCard from './components/TaskCard.vue';
import TaskTable from './components/TaskTable.vue';
import AddTask from './components/AddTask.vue';
import ViewTask from './components/UpdateTask.vue';

import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import {DayPilotCalendar} from '@daypilot/daypilot-lite-vue'

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primevue/resources/themes/aura-light-green/theme.css'

import { ScheduleComponent} from '@syncfusion/ej2-vue-schedule';
import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key: https://help.syncfusion.com/common/essential-studio/licensing/how-to-register-in-an-application
registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhNYVJ2WmFZfVpgdVdMY1xbR3VPIiBoS35RckVgWH5fcndXRGBfWURy');

const app = createApp(App);

// Register components globally
app.component('side-nav', SideNav);
app.component('task-card', TaskCard);
app.component('task-table', TaskTable);
app.component('task-form', AddTask);
app.component('updatetask-form', ViewTask);
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)
app.component('ejs-schedule', ScheduleComponent)
app.component('DataTable', DataTable)
app.component('DataColumn', Column)
app.component('DayPilotCalendar', DayPilotCalendar)




// Use the router
app.use(router);

// Mount the app
app.mount('#app');
