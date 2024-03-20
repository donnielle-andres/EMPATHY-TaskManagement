<template>
    <div class="settings-page">
        <h2 class="title">User Recommender Settings</h2>
        
        <form class="settings-form" @submit.prevent="updateSettings">

            <div class="name-section">
                <h3>Full Name</h3>
                <input class="name-input" type="text" id="fullName" v-model="fullName" />
            </div>

            <hr>

            <h3>User Preference</h3>
            <div class="pref-info">

                <div class="prio-section">
                    <label for="task-category-prioritization">Task Category Prioritization:</label>
                    <div class="prio-input">
                        <div v-for="(priority, index) in taskPriorities" :key="index" class="task-priority-container">
                            <h4>{{ priority.number }}</h4>
                            <input type="text" :id="`taskPriority-${priority.number}`" v-model="priority.value" />
                            <span class="material-symbols-outlined delete-button" @click="deleteTaskPriority(index)"> delete </span>
                        </div>
                        
                        <div class="prio-btn">
                            <button @click="addTaskPriority">Add Task Priority</button>
                        </div>
                    </div>
                </div>

                <div class="daily-sched-section">
                    <label for="daily-schedule">Available Daily Schedule:</label>
                    <div class="dailytime-container">
                        <input type="text" id="dailyTimeInputBefore" v-model="dailyTimeInputBefore" />
                        <h4>-</h4>
                        <input type="text" id="dailyTimeInputAfter" v-model="dailyTimeInputAfter" />
                    </div>
                </div>

                <div class="busy-section">
                    <label for="busy-timeslots">Busy Timeslots:</label>
                    <div class="busy-input">
                        <div v-for="(timeslot, index) in timeslots" :key="index" class="busytime-container">
                            <h4 class="busytime-index">{{ timeslot.number }}</h4>
                            <input type="text" :id="`busy-timeslots-input-before-${timeslot.number}`" v-model="timeslot.before" />
                            <h4>-</h4>
                            <input type="text" :id="`busy-timeslots-input-after-${timeslot.number}`" v-model="timeslot.after" />
                            <span class="material-symbols-outlined delete-button" @click="deleteTimeslot(index)"> delete </span>
                        </div>
                        <div class="busy-btn">
                            <button @click="addTimeslot">Add Timeslot</button>
                        </div>
                    </div>
                </div>

                <div class="save-btn">
                    <button type="submit">Save Settings</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { db } from '../util/firebase.js'
import { doc, getDoc } from "firebase/firestore";

    export default {
    setup() {
        const route = useRoute()

        var fullName = ref(null);
        const dailyTimeInputBefore = ref('08:00');
        const dailyTimeInputAfter = ref('17:00');
        const timeslots = ref([{ number: 1, value: '' }]);
        const taskPriorities = ref([{ number: 1, value: '' }]);

        const updateSettings = () => {
            console.log('Updating settings:', { fullName: fullName.value, taskPriorities:taskPriorities.value, dailyTimeInputBefore:dailyTimeInputBefore.value, dailyTimeInputAfter:dailyTimeInputAfter.value, timeslots: timeslots.value});
            // save settings here
        };

        const addTimeslot = () => {
            const number = timeslots.value.length + 1; // Start from 1 and increment
            timeslots.value.push({ number, before: '', after: '' });
        };

        const deleteTimeslot = (index) => {
            timeslots.value.splice(index, 1);
            timeslots.value.forEach((timeslot, newIndex) => {
                timeslot.number = newIndex + 1; 
            });
        };

        const addTaskPriority = () => {
            const number = taskPriorities.value.length + 1; // Start from 1 and increment
            taskPriorities.value.push({ number, value: '' });
        };

        const deleteTaskPriority = (index) => {
            taskPriorities.value.splice(index, 1);
            taskPriorities.value.forEach((taskPriority, newIndex) => {
                taskPriority.number = newIndex + 1; 
            });
        };

        const fetchUserData = async () => {
            const userId = route.params.id
            const userRef = doc(db, "Users", userId)
            const userResult = await getDoc(userRef);
            fullName.value = userResult.data().Name
        };

        onMounted(() => {
            fetchUserData()
        })

        return {
        timeslots,
        addTimeslot,
        deleteTimeslot,
        taskPriorities,
        addTaskPriority,
        deleteTaskPriority,
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
        position: relative; 
        flex-grow: 1; 
        height: 99vh; 
        display: flex; 
        flex-direction: column; 
        justify-content: flex-start; /* Center children vertically */
        align-items: center; /* Center children horizontally */
        font-family: 'Inter';
    }

    .title {
        font-weight: bolder;
        font-size: 25px;
        display: flex; 
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        width: 100%;
        height: 100px;
        margin-top: 10px;
        margin-bottom: 5px;
        padding: 25px;
    }

    .settings-form{
        width: 700px;
    }

    h3{
        margin-bottom: 10px;
    }

    .name-input{
        margin-left: 7px;
        margin-right: 7px;
        width: 680px;
    }

    hr{
        margin-top: 15px;
        margin-bottom: 15px;
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
        align-items: center; 
        padding:0;
    }

    .task-priority-container label {
        margin-right: 10px;
    }

    .task-priority-container input {
        width: 50vh;
        height: 5vh;
    }

    .prio-input{
        margin-left: 10px;
    }

    .prio-btn {
        margin-bottom: 20px;
    }


    /** AVAILABLE DAILY SCHED */
    h4 {
        margin-left: 1vh;
        margin-right: 1vh;
        height: 4vh;
        width: 2vh;
    }

    .dailytime-container {
        display: flex;
        align-items: center; 
        padding-left: 41px;
        width: 687px;
    }

    .dailytime-container input{
        width: 687px;
    }

    /** BUSY TIMESLOTS */
    .busytime-container {
        display: flex;
        align-items: center; 
        width: 677px;
        margin-left: 10px;
        
    }

    .busytime-container label {
        margin-right: 10px;
    }

    .busytime-container input {
        width: 675px;
        height: 5vh;

    }

    .busytime-index{
        margin-right: 15.5px;
    }


    .busy-btn{
        margin-left: 10px;
    }


    .label-number{
        width: 3vh;
        max-width: 3vh;
        height: 4vh;
        margin-right: 10px;
    }

    input {
        width: 10vh;
        padding: 10px;
        margin-bottom: 10px;
        height: 5vh;
    }

    button {
        height: 30px;
        width: 150px;
        font-size: 12px;
        margin-top: 10px;
        outline: 1 solid black;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    }

    .delete-button {
        height: 5vh;
        cursor: pointer;
        color: rgba(255, 0, 0, 0.363);
    }

    .delete-button:hover {
        color: rgba(255, 0, 0, 0.63);
        cursor: pointer;
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.1); 
    }

    .save-btn {
        margin-top: 30px;
        display: flex; 
        justify-content: center; 
    }

    .save-btn button{
        height: 40px;
        width: 150px;
    }
</style>