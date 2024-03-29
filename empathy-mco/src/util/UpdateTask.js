import { app, db } from './firebase.js'
import { getDocs, doc, collection, updateDoc, deleteDoc } from "firebase/firestore";
import{ calculatePriority } from './DatabaseFunctions.js';

export default {
    name: 'UpdateTask',
    props: ['task', 'userId'],
    data() {
        return {
          categories: [],
          showDatePicker: true,
          localTask: {...this.task}
        };  
    },
    async created() {
      const userId = this.$route.params.id
      const categoriesCollection = collection(db, "Users", userId, "Categories")
      const categoriesDocs = await getDocs(categoriesCollection)

      categoriesDocs.forEach((data) => {
          console.log(data.data())
          this.categories.push(data.data().Value)
      })
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
          const date = new Date(this.formattedDate);
          const today = new Date().toLocaleDateString("en-CA")
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

          const prioVal = calculatePriority(date.toLocaleDateString('en-CA', options), this.localTask.priority)
          try {
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

              const dailyRef = doc(db, "Users", this.userId, "Daily", today, "Tasks", this.task.id)
              const reference2 = await updateDoc(dailyRef, {
                  title: this.localTask.title,
                  description: this.localTask.description,
                  duration: this.localTask.duration,
                  category: this.localTask.category,
                  priority: this.localTask.priority,
                  priority_val: prioVal,
                  status: this.localTask.status,
                  deadline: date.toLocaleDateString('en-CA', options)
              })
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