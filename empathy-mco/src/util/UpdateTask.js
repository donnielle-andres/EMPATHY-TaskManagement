import { app, db } from './firebase.js'
import { doc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import{ calculatePriority } from './DatabaseFunctions.js';

export default {
    name: 'UpdateTask',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
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
            console.log("updating")
              // const taskRef = doc(db, 'Tasks', this.id)
              // const reference = await updateDoc(taskRef, {
              //     Title: this.title,
              //     Description: this.details,
              //     Duration: this.duration,
              //     Category: this.category,
              //     Priority: this.priolevel,
              //     Priority_Value: prioVal,
              //     Status: this.status,
              //     Deadline: date.toLocaleDateString('en-CA', options)
              // })

              // console.log(`Updated task with docId: ${reference.id}`)
          } catch(e) {
              console.log(e)
          }
          this.$emit('taskUpdated'); // Emit the custom event
        },
        async deleteTask(id) {
          try {
              // Replace 'Tasks' with the actual name of the collection
              await deleteDoc(doc(db, "Tasks", id))
              console.log(`Task ${id} deleted successfully`);
              this.$emit('taskDeleted');
          } catch (error) {
              console.error('Error deleting task:', error);
          }
      }
    }
    };