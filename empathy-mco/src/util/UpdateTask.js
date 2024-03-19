import { app, db } from './firebase.js'
import { collection, addDoc } from "firebase/firestore";
import{ calculatePriority } from './DatabaseFunctions.js';

export default {
    name: 'UpdateTask',
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
        async updateTask() {
          // Update this to reflect the contents of the current task and update task

          // Get numerical priority value so we can sort/schedule tasks

          const prioVal = calculatePriority(this.formattedDate, this.priolevel)
          const date = new Date(this.formattedDate);
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

          try {
              const reference = await addDoc(collection(db, "Tasks"), {
                  Title: this.title,
                  Description: this.details,
                  Duration: this.duration,
                  Priority: this.priolevel,
                  Priority_Value: prioVal,
                  Deadline: date.toLocaleDateString('en-CA', options)
              })
          } catch(e) {
              console.log(e)
          }
          this.$emit('taskUpdated'); // Emit the custom event
        },
        async deleteTask() {
          const taskId = ''; // Place Task ID
  
          try {
              // Replace 'Tasks' with the actual name of the collection
              await db.collection('Tasks').doc(taskId).delete();
              console.log('Task deleted successfully');
              this.$emit('taskDeleted'); 
          } catch (error) {
              console.error('Error deleting task:', error);
          }
      }
    }
    };