<template>
<v-btn class="task-button" @click="test()" > + Add Task</v-btn>
</template>

<script>
import test from '../util/test.js'

export default test
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
    border: 2px solid #e7e7e7bb;
  }


  .right-section {
    flex: 3; 
    margin-left: 20px; 
    padding: 5px; 
    height: 320px;
    position: static;
  }

  .recommender {
    margin: 20px;
    margin-top: 20px;
    height: 250px;
    border-radius: 10px;
    background-color: #e7e7e7bb;
  }

  .recom-content{
    font-family: 'Inter';
    font-weight: 600;
    padding: 30px;
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

  
</style>

