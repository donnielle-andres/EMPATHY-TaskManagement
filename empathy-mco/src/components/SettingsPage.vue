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
                    <label for="task-category-prioritization">Task Categories:</label>
                    <div class="prio-input">
                        <div v-for="(category, index) in taskCategories" :key="index" class="task-priority-container">
                            <h4>{{ category.number }} </h4> <h4> {{ category.value}} </h4>
                            <span class="material-symbols-outlined delete-button" @click="deleteTaskCategory(index)"> delete </span>
                        </div>
                        <div class="prio-btn">
                            <button @click="addCategory">Add Task Category</button> <input type="text" class="taskCategory" v-model="taskCategory"/>
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

                <div class="save-btn">
                    <button type="submit">Save Settings</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { reactive, VueElement, onMounted, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router'
import { db } from '../util/firebase.js'
import { doc, getDoc, getDocs, deleteDoc, addDoc, collection } from "firebase/firestore";

    export default {

    setup() {
        console.log("Setup")
        const route = useRoute()

        var fullName = ref(null);
        const dailyTimeInputBefore = ref('08:00');
        const dailyTimeInputAfter = ref('17:00');
        const timeslots = ref([{ number: 1, value: '' }]);
        let taskCategories = reactive([])
        
        const updateSettings = () => {
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


        const fetchUserData = async () => {
            const userId = route.params.id
            const userRef = doc(db, "Users", userId)
            const userResult = await getDoc(userRef);
            fullName.value = userResult.data().Name
            
            const categoriesCollection = collection(db, "Users", userId, "Categories")
            const categoriesDocs = await getDocs(categoriesCollection)

            categoriesDocs.forEach((data) => {
                console.log(data.data())
                
                taskCategories.push({
                    number: taskCategories.length + 1,
                    value: data.data().Value, 
                    id: data.id
                })
            })
        };

        onMounted(async() => {
            console.log("Mount")
            
            await fetchUserData()
        })

        return {
        timeslots,
        addTimeslot,
        deleteTimeslot,
        taskCategories,
        fullName,
        dailyTimeInputBefore,
        dailyTimeInputAfter,
        updateSettings,
        };
    },


    methods: {
        async addCategory() {
            const userId = this.$route.params.id
            const categoriesCollection = collection(db, "Users", userId, "Categories")
            const categoriesDocs = await getDocs(categoriesCollection)

            const ref = await addDoc(categoriesCollection, {
                Value: this.taskCategory
            })

            const newDoc = await getDoc(ref)

            const catId = newDoc.id

            console.log("ID: " + catId)
                    
            this.taskCategories.push({
                number: this.taskCategories.length + 1,
                value: this.taskCategory,
                id: catId
            })

            this.taskCategory = ""

            this.taskCategories.forEach((c) => {
                console.log(c.id)
            })
        },
        async getCategories() {
            const userId = this.$route.params.id
            const categoriesCollection = collection(db, "Users", userId, "Categories")
            const categoriesDocs = await getDocs(categoriesCollection)

            categoriesDocs.forEach((data) => {
                console.log(data.data())
            })
        },
        async deleteTaskCategory(index) {
            const userId = this.$route.params.id
            await deleteDoc(doc(db, "Users", userId, "Categories", this.taskCategories[index].id))

            this.taskCategories.splice(index, 1)
        }

        
    }
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

    .taskCategory {
        margin-left: 10px;
        width: 50vh;
    }

    .prio-btn {
        margin-bottom: 20px;
    }


    /** AVAILABLE DAILY SCHED */
    h4 {
        margin-left: 1vh;
        margin-right: 1vh;
        height: 4vh;
        width: 25vh;
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
        margin-left: 10px;
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