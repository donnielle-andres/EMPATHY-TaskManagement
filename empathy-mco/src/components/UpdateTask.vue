<template>
  <div class="overlay" @click="closeForm">
    <div class="container" @click.stop>
      <div class="form">
        <div class="head">
          <div class="title"> Update Task </div>
          <v-btn class="close-btn" @click="closeForm()">
            <span class="material-symbols-outlined">
            close
            </span>
          </v-btn>
        </div>

        <div class="body">
          <div class="tasktitle"> Task Title: </div>
          <input class="title-input" v-model="localTask.title"/>

          <div class="taskdeets"> Task Details: </div>
          <p style="white-space: pre-line;"> </p>
          <textarea class="deets-input" v-model="localTask.description"></textarea>

          <div class="taskduration"> 
            <div class="duration"> 
              <div>
                Task Daily Duration
                <span class="note">Note! Maximum Daily Duration must be less than 300 minutes.</span>
              </div>
              <textarea class="dur-input" v-model="localTask.duration"></textarea>
            </div>
          </div>
          <div class="categ-section">
            <div class="taskcateg">Task Category </div>
            <select class="categ-input" v-model="localTask.category">
              <option disabled value="">Please select one</option>
              <option v-for="category in categories" :key="category">{{ category }}</option>
            </select>
          </div>
          

          <div class="prio-section">
            <div class="taskprio">Task Priority </div>
            <select class="prio-input" v-model="localTask.priority">
              <option disabled value="">Please select one</option>
              <option>High Priority</option>
              <option>Mid Priority</option>
              <option>Low Priority</option>
            </select>
          </div>

          <div class="status-section">
            <div class="taskstatus">Task Status </div>
            <select class="status-input" v-model="localTask.status">
              <option disabled value="">Please select one</option>
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </div>

          <div class="ddl-section">
            <div class="taskddl-left">Task Deadline
              <div class="button-section">
                <v-btn class="update-task-btn" @click="updateTask()"> Save </v-btn>
                <span class="material-symbols-outlined" @click="deleteTask()"> delete </span>
              </div>
            </div>

            <div class="taskddl-right" @click="showDatePicker = showDatePicker">
              {{ formattedDate }}
              <v-date-picker
                v-if="showDatePicker"
                v-model="localTask.deadline"
                :portrait="true"
              ></v-date-picker>
            </div>
          </div>
          
        </div>

      </div>
    </div>
  </div>
</template>
  
<script>
  import UpdateTask from '../util/UpdateTask.js' /** Change the content of the update task */
  export default UpdateTask
</script>


<style scoped>
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .container {
      background-color: white;
      border-radius: 15px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    .form {
      height: 710px;
      width: 600px;
      font-family: 'Inter';
      font-size: medium;
      border-radius: 15px;
    }

    .head {
      margin: 20px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-around;
      font-weight: bolder;
      font-size: larger;
    }

    .title{
      flex: 7;
    }

    .close-btn {
      text-align: center;
      border-radius: 40px;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }

    .close-btn:hover{
      color: rgba(0, 0, 0, 0.63);
    }

    .body {
      margin: 30px;
      margin-top: 10px;
      position: relative; 
    }

    .tasktitle, .taskdeets, .taskprio, .taskstatus, .taskduration, .taskcateg, .taskddl-left{
      font-weight: bold;
      margin-bottom: 5px;
    }

    .taskduration{
      margin-bottom: 7px;
    }
    
    .note{
      font-size: 10px;
      font-weight: normal;
      display: block; 
      margin-top: 2px; 
      width: 150px;
    }

    .title-input{
      margin-bottom: 20px;
      padding: 3px;
      width: 535px;
      height: 30px;
    } 

    .deets-input {
      margin-bottom: 20px;
      padding: 3px;
      position: static;
      width: 535px;
      height: 70px;
      resize: none;
    }

    .duration {
      width: 534px;
      display: flex;
      margin-right: 10px;
    }

    .dur-input {
      margin-bottom: 20px;
      margin-left: 43px;
      position: static;
      width: 340px;
      height: 25px;
      resize: none;
      padding: 3px;
    }

    .categ-section {
      display: flex;
      gap: 40px;
      margin-bottom: 20px;
      align-content: center;
    }

    .categ-input {
      margin-left: 40px;
      width: 340px;
      padding: 3px;
    }

    .prio-section {
      display: flex;
      gap: 40px;
      margin-bottom: 20px;
      align-content: center;
    }

    .prio-input {
      margin-left: 56px;
      width: 340px;
    }

    .status-section {
      display: flex;
      gap: 40px;
      margin-bottom: 20px;
      align-content: center;
    }

    .status-input {
      margin-left: 62px;
      width: 340px;
    }

    .update-task-btn {
      height: 30px;
      width: 110px;
      outline: 2px solid black;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      font-size: 14px;
      box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    }

    .update-task-btn:hover {
      background-color: rgba(0, 0, 0, 0.1);
      cursor: pointer;
    }

    .ddl-section {
      display: flex;
    }

    .taskddl-left{
      flex: 3;
    }

    .button-section {
      display: flex;
      margin-top: 220px;
      gap: 15px;
    }

    .button-section span{
      color: rgba(255, 0, 0, 0.363);
      cursor: pointer;
    }

    .button-section span:hover{
      color: rgba(255, 0, 0, 0.63);
      cursor: pointer;
    }

    .taskddl-right {
      flex: 8;
      margin-left: 10px;
      font-size: 14px;
      cursor: pointer;
      display: flex; 
      align-items: top; 
      margin-left: 25px;
      gap: 8px; 
    }
    
    .ddl-input{
      width: 200px;
    }


</style>
