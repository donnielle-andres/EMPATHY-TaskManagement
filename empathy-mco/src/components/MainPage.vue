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
        <h3> Tasks to do today! </h3>
        <v-btn class="task-button" @click="addTask()" > + Add Task</v-btn>
        <task-form :userId="userId" v-if="showAddTask" @close="showAddTask = false" @taskAdded="addUpdateTaskFinish"></task-form>
      </div>

      <!-- Task Cards -->
      <div class="task-cards">
        <task-card class="task-card" v-for="(task, index) in currentDayTasks" :key="index" :task="task" @click="deleteTask(task, index)"/>
      </div>
      
    </div>

    <!-- To Do List Section -->
    <div class="todo-section">
      <div class="left-section"> 
          <h3> To Do List </h3>

          <!-- To Do Table -->
          <div class="todo-table"> 
            <table>
                <thead>
                  <tr>
                    <th v-for="(column, index) in header" :key="index">{{ column.text }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(task, index) in allTasks" :key="index" @click="updateTask(task)" :class="{ 'overdue': isDeadlineBeforeToday(task.deadline) }">
                    <td>{{ task.title }}</td>
                    <td>{{ task.description }}</td>
                    <td>{{ task.category }}</td>
                    <td>{{ task.priority }}</td>
                    <td>{{ task.deadline }}</td>
                    <td>{{ task.status }}</td>
                  </tr>
                </tbody>
            </table>
            <div class="right-section">
              <div class="tips">
                <div class="tips-content">
                  <h2>
                    💡 Tips!
                  </h2>
                  <h4>
                    {{ randomTip }}
                  </h4>
              </div>
            </div>
          </div>
            <!-- Overlay for the Update Task -->

            <div v-if="showUpdateTaskForm" class="updateTaskOverlay">
                <updatetask-form :task="selectedTask" :userId="userId" @close="showUpdateTaskForm = false" @taskDeleted="addUpdateTaskFinish" @taskUpdated="addUpdateTaskFinish"></updatetask-form>
            </div>

          </div>

      </div>

      <!-- RECOMMENDER SECTION -->
      <div class="right-section">
        <h3> Quote </h3>

        <div class="quote">
          <div class="quote-content">
            <h2>
              {{ quote }}
            </h2>
            <br>
            <h4>
              {{ author }}
            </h4>
        </div>
      </div>
    </div>

    </div>


  </div>
</template>

<script>
  import { getTasksForUser, getTodayTasksForUser } from '../util/DatabaseFunctions.js'
  import axios from 'axios';
  import { db } from '../util/firebase.js'

  import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore"

  export default {
    name: 'MainPage',
    data() {
      return {
          userId: null,
          showAddTask: false,
          showUpdateTaskForm: false,
          selectedTask: null,
          currentTime: '', 
          currentDay: '', 
          currentDayTasks: [],
          allTasks: [],
          header: [
            { text: 'Title', value: 'title' },
            { text: 'Description', value: 'description' },
            { text: 'Category', value: 'category' },
            { text: 'Priority', value: 'priority' },
            { text: 'Deadline', value: 'deadline' },
            { text: 'Status', value: 'status' },
          ],
          quote: '',
          tipsArray: [
            "Tip 1: Always start with a clear goal.",
            "Tip 2: Break down your tasks into manageable parts.",
            "Tip 3: Take regular breaks to avoid burnout.",
            "Tip 4: Stay organized with a to-do list.",
            "Tip 5: Prioritize your tasks based on urgency and importance."
          ],
          randomTip: '',
      };
    },

    watch: {
      '$route.params.id': {
        handler(newVal, oldVal) {
          this.userId = newVal;
          this.populateTodo()
        },
        immediate: true, // Access the initial value on component creation
      },
    },

    mounted() {
      this.getCurrentTime();
      this.getCurrentDay();
      this.getRandomTip();
      setInterval(() => {
        this.getCurrentTime();
      }, 1000); // Update time every second
      this.fetchQuoteContent();
    },

    methods: {
      getCurrentTime() {
        const now = new Date();
        this.currentTime = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'});
      },
      getCurrentDay() {
        const now = new Date();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayOfWeek = days[now.getDay()];
        const options = { month: 'long', day: 'numeric' };
        const formattedDate = now.toLocaleDateString(undefined, options);
        this.currentDay = `${formattedDate}, ${dayOfWeek}`;
      },
      addTask() {
        this.showAddTask = true;
      },
      getRandomTip() {
        const randomIndex = Math.floor(Math.random() * this.tipsArray.length);
        this.randomTip = this.tipsArray[randomIndex];
      },
      isDeadlineBeforeToday(deadline) {
        const currentDate = new Date();
        const deadlineDate = new Date(deadline);
        return deadlineDate < currentDate;
      },
      
      async deleteTask(task, index) {
        const userId = this.$route.params.id
        const today = new Date().toLocaleDateString("en-CA")
        const dailyTaskRef = doc(db, "Users", userId, "Daily", today, "Tasks", task.id)

        await updateDoc(dailyTaskRef, {
          finish: true
        })
        this.currentDayTasks.splice(index, 0)
        this.updateDailies()
      },
      async updateDailies() {
        const userId = this.$route.params.id
        const today = new Date().toLocaleDateString("en-CA")
        const dailyRef = collection(db, "Users", userId, "Daily", today, "Tasks")

        const dailyTasksDocs = await getDocs(dailyRef)     

        this.currentDayTasks = []
        dailyTasksDocs.forEach((task) => {
          if(!task.data().finish) {
            console.log(task.data())
            let t = task.data()
            this.currentDayTasks.push({
                id: t.id,
                title: t.title,
                description: t.description,
                duration: t.duration,
                category: t.category,
                priority: t.priority,
                priority_val: t.priority_val,
                status: t.status,
                deadline: t.deadline,
                finish: t.finish
            })
          }
        })
      },
      updateTask(task){
        console.log("Opening Update Task Form for: " + task.id)
        this.showUpdateTaskForm = true;
        this.selectedTask = task;
      },
      async addUpdateTaskFinish() {
        this.showAddTask = false
        this.showUpdateTaskForm = false
        this.populateTodo()
      },
      async fetchQuoteContent() {
        const category = 'success';
        try {
          const response = await axios.get('https://api.api-ninjas.com/v1/quotes?category=' + category, {
            headers: { 'X-Api-Key': 'k22YCJcdYiumLcLaipsCwA==cHfmjpZMFvKRwWFg' }
          });
          console.log('response.data.text:', response.data);
          this.quote = response.data[0].quote;
          this.author = response.data[0].author;
        } catch (error) {
          console.error('Failed to fetch quote content:', error);
        }
      },
      async populateTodo() {
        // If userId doesn't exist or no userId param, default to testId1
        const tasks = await getTasksForUser(this.userId)
        if (tasks == null)
          this.$router.push({ name: 'MainPage', params: {id: "testId1"}})
        else {
          this.allTasks = tasks


          this.allTasks.sort((a, b) => {

            const tsa = Date.parse(a.deadline)
            const tsb = Date.parse(b.deadline)

            const dateA = new Date(tsa)
            const dateB = new Date(tsb)

            return dateA.getTime() - dateB.getTime() 
          })
        }

        const today = new Date().toLocaleDateString("en-CA")
        this.currentDayTasks = await getTodayTasksForUser(this.userId, today)


        

      }
    },
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
    margin-left: 30px;
  }

  .task-card:hover {
    background-color: rgba(0, 0, 0, 0.1); 
    cursor: pointer;
  }


  /** To Do List Section Style */
  .todo-section {
    margin: 10px;
    display: flex; 
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    width: 98%; 
  }

  .left-section {
    flex: 8; 
    padding: 5px;
    height: 320px;
    position: static;
  }

  .left-section h3{
    padding-left: 10px;
  }


  .todo-table {
    margin: 20px;
    margin-top: 10px;
    height: 260px;
  }

  .overdue {
    background-color: #f8d7da; /* Example background color for overdue tasks */
  }

  .todo-table tr.overdue:hover {
    background-color: #f5c6cb; /* Example background color for overdue tasks */
  }

  .right-section {
    flex: 3; 
    padding: 5px; 
    height: 320px;
    position: static;

  }

  .quote {
    margin: 20px;
    margin-top: 20px;
    height: wrap-content;
    width: 20vw;
    border-radius: 10px;
    background-color: #e7e7e7bb;
  }

  .quote-content{
    font-family: 'Inter';
    font-weight: 600;
    padding: 30px;
  }
  .tips {
    margin: 10px;
    margin-right: 0px;
    padding: 0px;
    height: wrap-content;
    width: 98%;
    border-radius: 10px;
    background-color: #e7e7e7bb;
  }

  .tips-content{
    font-family: 'Inter';
    font-weight: 600;
    padding: 1vw;
  }
  .tips-content h4{
    font-weight: normal;
    padding-left: 1vw;
    padding-top: 0.5vh;
  }

  .todo-table table {
      width: 100%;
      border-collapse: collapse;
      font-size: 15px;
      font-family: 'Inter';
      
  }

  .todo-table th {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
  }

  .todo-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
      font-size: 13px;
  }

  .todo-table th {
      background-color: #f2f2f2;
      color: black;
  }

  .todo-table tr:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .updateTaskOverlay {
    display: flex; 
    overflow-x: auto; 
    gap: 20px; 
    padding: 10px; 
    margin-left: 30px;
 }

  
</style>

