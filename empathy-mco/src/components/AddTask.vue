<template>
    <!-- some code condensed for display reasons -->
    <FormulateForm
      v-model="values"
      @submit="addTask"
    >

    <button class="exitAdd" v-on:click="closeForm">
        Exit
      </button>

      <h2>Add Task</h2>
      <FormulateInput type="text" name="taskname" label="Task Name" validation="required|email" />
      <FormulateInput type="text" name="taskdesc" label="Task Description" />
      <FormulateInput type="date" name="taskddl" label="Task Deadline" />
      <FormulateInput name="prio" type="select" label="Task Priority" validation="required" :options="{ lowprio: 'Low Priority', midprio: 'Mid Priority', highprio: 'High Priority'}" />
      <FormulateInput type="submit" label="Add Task" />
      <pre>{{ values }}</pre>
    </FormulateForm>
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
        this.$router.push('/');
      }
    } 
}
</script>

<style scoped>
    FormulateForm {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 500px; /* Adjust as needed */
        margin: 0 auto; /* Centers the form */
    }

    FormulateInput {
        margin-bottom: 20px; /* Adds space between form elements */
        width: 100%; /* Ensures inputs take up the full width of the form */
    }

    FormulateInput[type="submit"] {
        width: auto; /* Allows the submit button to adjust its width based on content */
        background-color: #007bff; /* Example background color for the submit button */
        color: white; /* Example text color for the submit button */
        border: none; /* Removes default border */
        padding: 10px 20px; /* Adds padding */
        cursor: pointer; /* Changes cursor to pointer on hover */
        transition: background-color 0.3s ease; /* Smooth transition for hover effect */
    }

    FormulateInput[type="submit"]:hover {
        background-color: #0056b3; /* Darkens background color on hover */
    }

    .exitAdd {
        position: absolute; 
        top: 10px; 
        right: 10px; 
        background-color: #f44336; 
        color: white; 
        border: none; 
        cursor: pointer; 
        padding: 5px 10px; 
        font-size: 16px;
    }

</style>
