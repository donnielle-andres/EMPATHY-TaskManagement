<template>
  <div class="dashpage">

    <!-- Time Section -->
    <div class="time-section">
      <h5> Today is </h5>
      <h2> {{ currentTime }}  </h2>
      <h5> {{ currentDay }} </h5>
    </div>

    <!-- Task Section -->
    <div class="task-section">

      <!-- Task Label & Button -->
      <div class="task-head"> 
        <h3> Today's Tasks </h3>
        <v-btn class="task-button" @click="handleButtonClick()" > + Add Task</v-btn> 
      </div>

      <!-- Task Cards -->
      <div class="task-cards">
        <task-card v-for="(task, index) in tasks" :key="index" :task="task" />
      </div>
      
    </div>

    <!-- To Do List Section -->
    <div class="todo-section">
      <div class="left-section"> 
          <h3> To Do List </h3>

          <!-- To Do Table -->
          <div class="todo-table"> 
            <task-table class="task-table" />
          </div>

      </div>

      <!-- RECOMMENDER SECTION -->
      <div class="right-section">
        <h3> Recommender </h3>
      </div>

    </div>


  </div>
</template>

<script>

  export default {
    name: 'MainPage',
    data() {
      return {
          currentTime: '', 
          currentDay: '', 
          tasks: [
            { id: 1, title: 'Task 1', description: 'description 1', deadline: '03/10/2024'},
            { id: 2, title: 'Task 2', description: 'description 2', deadline: '04/10/2024' }
          ],
      };
    },

    mounted() {
      this.getCurrentTime();
      this.getCurrentDay();
      setInterval(() => {
        this.getCurrentTime();
      }, 1000); // Update time every second
    },

    methods: {
      getCurrentTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
      },
      getCurrentDay() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[now.getDay()];
        const options = { month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString(undefined, options);
        this.currentDay = `${formattedDate}, ${dayOfWeek}`;
      },
      handleButtonClick() {
        // Handle button click event here
      }
    }
  };
</script>

<style scoped>
  .dashpage {
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
  .time-section {
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    border-bottom: 2px solid black; 
    width: 100%; 
    padding: 25px; 
  }

  h2, h5 {
    margin: 2px; 
  }

  
  /** Task Section Style */
  h3 {
    font-size: larger;
  }
  
  .task-head {
    display: flex;
    justify-content: space-between; 
    align-items: center; 
    margin-top: 15px;
    margin-bottom: 5px;
    margin-left: 30px;
  }

  .task-button {
    height: 30px;
    width: 120px;
    margin-right: 30px;
    outline: 2px solid black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
    
  }

  .task-button:hover {
    background-color: rgba(0, 0, 0, 0.1); 
    cursor: pointer;
  }

  /** Task Cards */
  .task-cards {
    display: flex; 
    overflow-x: auto; 
    gap: 20px; 
    padding: 10px; 
    margin-left: 20px;
  }


  /** To Do List Section Style */
  .todo-section {
    margin: 15px;
    display: flex; 
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    width: 98%; 
  }

  .left-section {
    flex: 7; 
    border: 2px solid black; 
    padding: 5px;
    height: 320px;
    position: static;
  }

  .left-section h3{
    padding-left: 10px;
  }

  .right-section {
    flex: 3; 
    margin-left: 20px; 
    border: 2px solid black; 
    padding: 5px; 
    height: 320px;
    position: static;
  }

  .todo-table {
    margin: 20px;
    margin-top: 10px;
    height: 260px;
    border: 2px solid black;
  }



  
</style>

