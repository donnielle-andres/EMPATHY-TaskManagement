<template>
  <v-container>
     <v-row>
       <v-col cols="auto">
         <v-card class="mx-auto" max-width="344">

           <v-card-item>
             <div class="task-content">
                  <div class="task-title"> {{ task.title }} </div>

                  <div class="task-description"> {{ task.description }} </div>

                  <div class="task-deadline">
                      <i class="material-symbols-outlined">alarm</i>
                      <div>
                          <span class="deadline">Deadline:</span>
                          <span class="deadline">{{ task.deadline }}</span>
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
 export default {
  name: 'TaskCard',
  props: {
     task: {
       type: Object,
       required: true
     }
  },
  methods: {
    deleteTask() {
      this.$emit('taskDeleted', this.task);
    }
  }
 }
 </script>
 
<style scoped>
 v-container {
     background-color: #C1D8C3;
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
    background-color: rgba(0, 0, 0, 0.1);
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
 