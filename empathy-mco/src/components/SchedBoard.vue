<template>
    <div class="container">
        <div class="head">
            Daily Recommender Schedule
        </div>
        
        <div class="board">

            <div class="left-section">

                <div class="left-head">
                    <h3> Calendar </h3>
                    <div class="task-button">
                        <v-btn class="add-task-btn" @click="addTask()">+ Add Task </v-btn>
                        <task-form v-if="showAddTask" @close="showAddTask = false"  @taskAdded="showAddTask = false"></task-form>
                        
                    </div>
                </div>

                <div class="mini-cal">
                    <!-- Mini calendar component or content goes here -->
                    <VDatePicker class="calendar" v-model='selectedDate'> </VDatePicker>
                </div>
            </div>

            <div class="right-section">
                <!-- Right section content goes here -->
            </div>

        </div>

    </div>
</template>

<script>
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
            selectedDate: null,
        }
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

    /** Time Section Style */
    .head {
        font-weight: bolder;
        font-family: 'Inter';
        font-size: 25px;
        display: flex; 
        flex-direction: column;
        justify-content: center; 
        align-items: center; 
        /** border-bottom: 2px solid black; */
        width: 100%;
        height: 125px;
        padding: 25px; 
    }

    .board {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .left-section{
        flex: 1;
        padding: 10px;
        border: 2px solid blue;
        height: 570px;
        position: static;
    }

    .left-head {
        display: flex;
        gap: 180px; /* Aligns items horizontally with space between them */
        align-items: center; /* Centers items vertically */
        margin-top: 10px;
        margin-bottom: 5px;
        margin-left: 30px;
        margin-right: 30px;
        width: 100%; /* Ensures the container takes up the full width */
    }


    .task-button {
        display: flex;
        justify-content: center;
        align-items: center; 
        width: auto; 
    }

    .add-task-btn {
        height: 30px;
        width: 120px;
        outline: 2px solid black;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    }

    .add-task-btn:hover {
        background-color: rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .mini-cal {
        display: flex; /* Enables Flexbox */
        justify-content: center; /* Centers the calendar horizontally */
        margin-top: 30px;
        height: 70px;
    }

    .right-section {
        flex: 2;
        padding: 20px;
        border: 2px solid rgb(5, 255, 101);
        position: static;
    }
</style>
