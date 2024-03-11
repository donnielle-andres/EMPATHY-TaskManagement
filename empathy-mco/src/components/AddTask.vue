<template>
  <div class="overlay" @click="closeForm">
    <div class="container" @click.stop>
      <div class="form">
        <div class="head">
          <div class="title"> Add a New Task </div>
          <v-btn class="close-btn" @click="closeForm()">
            <span class="material-symbols-outlined">
            close
            </span>
          </v-btn>
        </div>

        <div class="body">
          <div class="tasktitle"> Task Title: </div>
          <input class="title-input" v-model="title" placeholder="Task Title" />

          <div class="taskdeets"> Task Details: </div>
          <p style="white-space: pre-line;"> </p>
          <textarea class="deets-input" v-model="details" placeholder="Task Details"></textarea>

          <div class="prio-section">
            <div class="taskprio">Task Priority </div>
            <select class="prio-input" v-model="priolevel">
              <option disabled value="">Please select one</option>
              <option>High Priority</option>
              <option>Mid Priority</option>
              <option>Low Priority</option>
            </select>
          </div>

          <div class="ddl-section">
            <div class="taskddl-left">Task Deadline
            <v-btn class="add-task-btn" @click="addTask()"> Add Task </v-btn>
            </div>

            <div class="taskddl-right" @click="showDatePicker = showDatePicker">
              {{ formattedDate }}
              <v-date-picker
                v-if="showDatePicker"
                v-model="selectedDate"
                :portrait="true"
              ></v-date-picker>
            </div>
          </div>

          
        </div>

        <!--
        <div class="button">
          <v-btn class="add-task-btn" @click="addTask()"> Add Task </v-btn>
        </div>
        -->

      </div>
    </div>
  </div>
</template>
  
<script>
  export default {
  name: 'AddTask',
  data() {
      return {
        selectedDate: null,
        showDatePicker: true,
      };
  },
  created() {
      this.selectedDate = this.getToday();
  },
  computed: {
    formattedDate() {
      if (!this.selectedDate) return '';
      const date = new Date(this.selectedDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  },
  methods: {
      closeForm() {
        this.$emit('close');
      },
      getToday() {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();

        return `${yyyy}-${mm}-${dd}`;
      },
      addTask() {
        // Add code to push thru the db
        this.$router.push({ name: 'SchedBoard' }); // should refresh to the schedboard
        this.$emit('taskAdded'); // Emit the custom event
      }
  }
  };
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
      height: 570px;
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

    .tasktitle, .taskdeets, .taskprio, .taskddl-left{
      font-weight: bold;
      margin-bottom: 5px;
    }

    .title-input{
      margin-bottom: 20px;
      width: 535px;
      height: 30px;
    } 

    .deets-input {
      margin-bottom: 20px;
      position: static;
      width: 535px;
      height: 70px;
      resize: none;
    }

    .prio-section {
      display: flex;
      gap: 40px;
      margin-bottom: 20px;
      align-content: center;
    }

    .prio-input {
      width: 396px;
    }

    .add-task-btn {
      margin-top: 220px;
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

    .ddl-section {
      display: flex;
      gap: 18px;
    }

    .taskddl-right {
      font-size: medium;
      cursor: pointer;
      display: flex; 
      align-items: top; 
      gap: 30px; 
    }
    

    .ddl-input{
      width: 200px;
    }


</style>
