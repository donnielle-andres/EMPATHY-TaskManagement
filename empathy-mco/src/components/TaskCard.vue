<template>
  <v-container>
       <v-row>
         <v-col cols="auto">
           <v-card class="mx-auto" max-width="344">
             <v-card-item>
               <div class="task-content">
                 <div class="task-title">
                  <input v-if="isEditing" v-model="localTask.title" type="text">
                  <div v-else>{{ localTask.title }}</div>
                 </div>
                 <div class="task-description">
                  <textarea v-if="isEditing" v-model="localTask.description"></textarea>
                  <div v-else>{{ localTask.description }}</div>
                 </div>
                 <div class="task-deadline">
                  <i class="material-symbols-outlined">alarm</i>
                  <div>
                  <span class="deadline">Deadline:</span>
                  <span class="deadline">{{ localTask.deadline }}</span>
                  </div>
                  <div class="button">
                  <v-btn class="done-task-btn" @click="deleteTask()"> Done? </v-btn>
                  </div>
                 </div>
               </div>
             </v-card-item>
           </v-card>
         </v-col>
       </v-row>
  </v-container>
 </template>
 
 <script>
 import { getTodayTasksForUser } from '../util/DatabaseFunctions.js';
 
 export default {
  name: 'TaskCard',
  props: {
     task: {
       type: Object,
       required: true
     },
     userId: {
       type: String,
       required: true
     },
     today: {
       type: String,
       required: true
     }
  },
  data() {
     return {
       isEditing: false, // Flag to toggle edit mode
       localTask: {
         title: this.task ? this.task.title : '',
         description: this.task ? this.task.description : '', 
         deadline: this.task ? this.task.deadline : ''
       }
     };
  },
  created() {
     // Assuming userId and today are passed as props
     this.fetchTaskData(this.userId, this.today);
  },
  methods: {
     deleteTask() {
       this.$emit('taskDeleted', this.task);
     },
     async fetchTaskData(userId, today) {
       try {
         const tasks = await getTodayTasksForUser(userId, today);
         if (tasks && tasks.length > 0) {
           // Assuming you want to display the first task for now
           this.localTask = tasks[0];
         } else {
           console.log("No tasks found for today.");
         }
       } catch (error) {
         console.error("Error fetching task data:", error);
       }
     }
  }
 }
 </script>
 
   
<style scoped>
   v-container {
       background-color: #d7c1d8;
       border-radius: 10px;
       height: 150px;
       width: 250px;
       box-shadow: 0 0 8px rgba(0, 0, 0, 0.2); /* Adds a drop shadow */
   }

   .button{
    padding-left: 70px;
   }

   .done-task-btn {
      height: 20px;
      width: 40px;
      outline: 2px solid black;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 10px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    }

    .done-task-btn:hover{
      background-color: rgba(198, 255, 195, 0.656);
      cursor: pointer;
    }

   .task-content {
       padding: 20px;
       display: flex; /* Make .task-content a flex container */
       flex-direction: column; /* Stack children vertically */
       justify-content: space-between; /* Pushes task-deadline to the bottom */
       height: 100%; /* Ensures .task-content takes up the full height */
   }
   
   .task-title {
        font-weight: bolder;
        font-size: medium;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
   }
   
   .task-description {
        height: 4em; /* Adjusted to ensure the container is tall enough for three lines */
        font-size: 13px;
        font-weight: 500;
        color: #00000060;
        overflow: hidden;
        white-space: text-wrap;
        text-overflow: ellipsis;
        display: -webkit-box;
        display: flex; /* Standard syntax */
        -webkit-line-clamp: 3; /* Limit to three lines */
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -ms-flex-direction: column;
        -webkit-flex-direction: column;
        flex-direction: column;
    }

   
   .task-deadline {
       font-size: 10px;
       font-weight: bolder;
       display: flex;
       align-items: center; /* Aligns the icon and text vertically */
   }
   
   .task-deadline i {
       margin-right: 10px; /* Adds space between the icon and the text */
   }
   
   .deadline {
       display: block; /* Makes the deadline text appear on a new line */
   }
   
   .v-progress-linear__bar {
       background: linear-gradient(to right, #dab59b, #ca5b91);
   }
</style>
   
   
   