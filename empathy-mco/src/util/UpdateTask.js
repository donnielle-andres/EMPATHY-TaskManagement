import { app, db } from './firebase.js'
import { doc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import{ calculatePriority } from './DatabaseFunctions.js';

export default {
    name: 'UpdateTask',
    props: ['task', 'userId'],
    data() {
        return {
          showDatePicker: true,
          localTask: {...this.task}
        };  
    },
    computed: {
      formattedDate() {
        if (!this.localTask.deadline) return '';
        const date = new Date(this.localTask.deadline);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        console.log("THIS THE FORMATTED DATEEE: " + date.toLocaleDateString('en-US', options))
        return date.toLocaleDateString('en-US', options);
      }
    },
    methods: {
        closeForm() {
          this.$emit('close');
        },
        async updateTask() {
          // Get numerical priority value so we can sort/schedule tasks
          const prioVal = calculatePriority(this.formattedDate, this.localTask.priolevel)
          const date = new Date(this.formattedDate);
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

          try {
            console.log("updating")
              const taskRef = doc(db, 'Users', this.userId, "Tasks", this.task.id)
              const reference = await updateDoc(taskRef, {
                  Title: this.localTask.title,
                  Description: this.localTask.description,
                  Duration: this.localTask.duration,
                  Category: this.localTask.category,
                  Priority: this.localTask.priority,
                  Priority_Value: prioVal,
                  Status: this.localTask.status,
                  Deadline: date.toLocaleDateString('en-CA', options)
              })

              console.log(`Updated task with docId: ${reference.id}`)
          } catch(e) {
              console.log(e)
          }
          this.$emit('taskUpdated');
        },
        async deleteTask() {
          try {
              await deleteDoc(doc(db, "Users", this.userId, "Tasks",  this.task.id))
              console.log(`Task ${this.task.id} deleted successfully`);
              this.$emit('taskDeleted');
          } catch (error) {
              console.error('Error deleting task:', error);
          }
      }
    }
    };