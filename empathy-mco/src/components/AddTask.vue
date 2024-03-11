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
          <div class="tasktitle"> Task Title: {{ title }} </div>
          <input class="input" v-model="title" placeholder="Task Title" />

          <div class="taskdeets"> Task Details: </div>
          <p style="white-space: pre-line;"> {{ details }} </p>
          <textarea class="deets-input" v-model="details" placeholder="Task Details"></textarea>

          <div class="taskprio">Task Priority {{ priolevel }}</div>
          <select class="input" v-model="priolevel">
            <option disabled value="">Please select one</option>
            <option>High Priority</option>
            <option>Mid Priority</option>
            <option>Low Priority</option>
          </select>

          <div class="taskddl">Task Deadline {{ deadline }}</div>
        </div>

      </div>
    </div>
  </div>
</template>
  
<script>
  export default { 
    name: 'AddTask',
    data () { 
        return { 
            values: {}, 
            addTask: () => alert('Task Added') 
        } 
    },
    methods: {
      closeForm() {
        this.$emit('close');
      }
    } 
}
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

      height: 500px;
      width: 400px;
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
      margin-top: 20px;
    }

    .tasktitle, .taskdeets, .taskprio, .taskddl{
      font-weight: bold;
      margin-bottom: 10px;
    }

    .input{
      margin-bottom: 20px;
      width: 330px;
      height: 30px;
    } 

    .deets-input {
      margin-bottom: 20px;
      position: static;
      width: 330px;
      height: 70px;
      resize: none;
    }

</style>
