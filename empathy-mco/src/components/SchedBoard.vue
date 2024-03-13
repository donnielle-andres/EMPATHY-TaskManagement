<template>
    <div class="container">
        <div class="head">
            Daily Recommender Schedule  <!-- <p>{{ dailySchedule }}</p> -->
        </div>
        
        <div class="board">
            <div class="daily-sched">
                <!-- Daily Schedule View Only -->
                <!-- <DayPilotCalendar id="dp" :config="config" ref="calendarRef" />-->
                <ejs-schedule :eventSettings="eventSettings"></ejs-schedule>
                

            </div>

        </div>

    </div>
</template>

<script>
import { Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';


export default {
    name: 'SchedBoard',
    methods: {
        addTask() {
            this.showAddTask = true;
        }
    },
    data() {
        return {
            showAddTask: false,
            selectedDate: new Date(2024, 3, 12),
            eventSettings: {
                dataSource: [{
                    /** Add connection from the db */
                    Id: 1,
                    Subject: 'Meeting',
                    StartTime: new Date(2018, 1, 15, 10, 0),
                    EndTime: new Date(2018, 1, 15, 12, 30)
                }]
            }
        };
    },
    computed: {
        formattedDate() {
            if (!this.selectedDate) return '';
            const date = new Date(this.selectedDate);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
    },
    provide: {
        schedule: [Day, Week, WorkWeek, Month, Agenda]
    }

}
</script>

<style scoped>
    .container {
        position: relative; 
        flex-grow: 1; 
        margin-top: 5px;
        height: 99vh; 
        display: flex; 
        flex-direction: column; 
        justify-content: flex-start;
        align-items: stretch; 
    }

    .head {
        font-weight: bolder;
        font-family: 'Inter';
        font-size: 25px;
        display: flex; 
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        width: 100%;
        height: 110px;
        padding: 25px;
    }

    .board {
        display: flex;
        width: 100%;
    }

    .daily-sched {
        margin-left: 60px;
        margin-right: 50px;
        height: 570px;
        width: 1300px;
        position: static;
    }
    
    
</style>

