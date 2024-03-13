<template>
    <div class="settings-page">
        <h2 class="title">Settings</h2>
        <form class="settings-form" @submit.prevent="updateSettings">
            <div>
                <label for="fullName">Full Name:</label>
                <input type="text" id="fullName" v-model="fullName" />
            </div>
            <hr>
            <h3>User Preference</h3>
            <div style="margin-left:1vh;">
                <div>
                    <label for="task-category-prioritization">Task Category Prioritization:</label>
                    <div>
                        <div v-for="(priority, index) in taskPriorities" :key="index" class="task-priority-container">
                            <h4>{{ priority.number }}</h4>
                            <input type="text" :id="`taskPriority-${priority.number}`" v-model="priority.value" />
                        </div>
                        <div>
                            <button @click="addTaskPriority">Add Task Priority</button>
                        </div>
                    </div>
                </div>
                <div>
                    <label for="daily-schedule">Daily Schedule:</label>
                    <div class="time-container" style="padding-left:4vh;">
                        <input type="text" id="dailyTimeInputBefore" v-model="dailyTimeInputBefore" />
                        <h4>-</h4>
                        <input type="text" id="dailyTimeInputAfter" v-model="dailyTimeInputAfter" />
                    </div>
                </div>
                <div>
                    <label for="busy-timeslots">Busy Timeslots:</label>
                    <div>
                        <div v-for="(timeslot, index) in timeslots" :key="index" class="time-container">
                            <h4>{{ timeslot.number }}</h4>
                            <input type="text" :id="`busy-timeslots-input-before-${timeslot.number}`" v-model="timeslot.before" />
                            <h4>-</h4>
                            <input type="text" :id="`busy-timeslots-input-after-${timeslot.number}`" v-model="timeslot.after" />
                        </div>
                        <div>
                            <button @click="addTimeslot">Add Timeslot</button>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit">Save Settings</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import { ref } from 'vue';

    export default {
    setup() {
        // database connection here
        const fullName = ref('John Doe');
        const dailyTimeInputBefore = ref('08:00');
        const dailyTimeInputAfter = ref('17:00');
        const timeslots = ref([{ number: 1, value: '' }]);
        const taskPriorities = ref([{ number: 1, value: '' }]);

        const updateSettings = () => {
            console.log('Updating settings:', { fullName: fullName.value, taskPriorities:taskPriorities.value, dailyTimeInputBefore:dailyTimeInputBefore.value, dailyTimeInputAfter:dailyTimeInputAfter.value, timeslots: timeslots.value});
            // save settings here
        };

        const addTimeslot = () => {
            const number = timeslots.value.length + 1; // Start from 2 and increment
            timeslots.value.push({ number, before: '', after: '' });
        };

        const addTaskPriority = () => {
            const number = taskPriorities.value.length + 1; // Start from 1 and increment
            taskPriorities.value.push({ number, value: '' });
        };

        return {
        timeslots,
        addTimeslot,
        taskPriorities,
        addTaskPriority,
        fullName,
        dailyTimeInputBefore,
        dailyTimeInputAfter,
        updateSettings,
        };
    },
    };
</script>

<style scoped>
    .settings-page {
        max-width: 100vh;
        margin: 0 auto;
        padding: 20px;
        margin-top:5vh;
        background-color: #efefef;
        border-radius: 2vh;
    }

    .title {
        text-align: center;
    }

    form div {
        margin-bottom: 10px;
    }

    label {
        display: block;
        margin-top: 1vh;
        margin-bottom: 1vh;
        margin-left: 1vh;
        font-weight: bold;
    }

    .task-priority-container {
        display: flex;
        align-items: center; /* This ensures vertical centering of all items */
        padding:0;
    }

    .task-priority-container label {
        margin-right: 10px; /* Add some space between the label and the h4 */
    }

    h4 {
        margin-left: 1vh;
        margin-right: 1vh; /* Add some space between the h4 and the input */
        height: 4vh;
        width:2vh;
    }

    /* Ensure the input takes up the full height of the container */
    .task-priority-container input {
        width: 50vh;
        height: 4vh;
    }

    .time-container {
        display: flex;
        align-items: center; /* This ensures vertical centering of all items */
        padding:0;
    }

    .time-container input {
        width: 23vh;
        height: 4vh;
    }

    input {
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
    }

    button {
        padding: 10px 20px;
        background-color: #dedede;
        color: black;
        border: none;
        cursor: pointer;
        border-radius: 1vh;
        font-weight: bold;
    }

    button:hover {
        background-color: #d0d0d0;
    }
</style>