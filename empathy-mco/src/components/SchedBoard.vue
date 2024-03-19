<template>
    <div class="container">
        <div class="head">
            Daily Recommender Schedule  
            <h6> {{ formattedDate }}  </h6>
        </div>
        
        <div class="board">
            <div class="daily-sched">
                <!-- Daily Schedule View Only -->
                 <DayPilotCalendar class="daypilotcal" id="dp" :config="config" ref="calendar" />
                
            </div>

        </div>

    </div>
</template>

<script>
import {DayPilot} from '@daypilot/daypilot-lite-vue'

export default {
    name: 'SchedBoard',
    props: ['tasks'],
    computed: {
        formattedDate() {
            const date = new Date();
            const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
            const weekdayOptions = { weekday: 'long' };
            const formattedDatePart = date.toLocaleDateString('en-US', dateOptions);
            const weekday = date.toLocaleDateString('en-US', weekdayOptions);
            return `${formattedDatePart} | ${weekday}`;
        },
        calendar() {
            return this.$refs.calendar.control;
        }
    },
    data: function() {
        return {
            config: {
                viewType: "Day",
            },
        }
    },
    methods: {
        loadEvents() {
        // Dummy Data - Put DB Connection here!!!
        // Use Military Time
        const data = [
            {
            id: 1,
            start: DayPilot.Date.today().addHours(7),
            end: DayPilot.Date.today().addHours(10),
            text: "Task 1"
            },
            {
            id: 2,
            start: DayPilot.Date.today().addHours(13),
            end: DayPilot.Date.today().addHours(16),
            text: "Task 2"
            }
        ];
        this.calendar.update({events: data});
        },
    },
    mounted() {
        this.loadEvents();
    }
    
}
</script>

<style scoped>
    .container {
        position: relative; 
        flex-grow: 1; 
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
        height: 100px;
        margin-top: 10px;
        padding: 25px;
    }

    h6 {
        margin-top: 10px;
        font-size: medium;
    }

    .board {
        display: flex;
        width: 100%;
    }

    .daily-sched {
        margin-left: 60px;
        margin-right: 50px;
        height: 600px;
        width: 1300px;
        position: static;
    }

    
</style>

