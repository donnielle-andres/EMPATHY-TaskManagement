import { app, db } from './firebase.js'
import { collection, getDocs, addDoc, updateDoc } from "firebase/firestore";
import{ calculatePriority, updateTask } from './DatabaseFunctions.js';

export default {
    name: 'AddTask',
    data() {
        return {
          categories: [],
          selectedDate: null,
          showDatePicker: true,
        };
    },
    props: ["userId"],
    async created() {
        const userId = this.$route.params.id
        const categoriesCollection = collection(db, "Users", userId, "Categories")
        const categoriesDocs = await getDocs(categoriesCollection)

        categoriesDocs.forEach((data) => {
            console.log(data.data())
            this.categories.push(data.data().Value)
        })
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
        async addTask() {
          // Add code to push thru the db
          // this.$router.push({ name: 'MainPage' }); // should refresh to the schedboard

          // Get numerical priority value so we can sort/schedule tasks

          const prioVal = calculatePriority(this.formattedDate, this.priolevel)
          const date = new Date(this.formattedDate);
          const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

          try {
              const reference = await addDoc(collection(db, "Users", this.userId, "Tasks"), {
                  Title: this.title == null ? "" : this.title,
                  Description: this.details == null ? "" : this.details,
                  Duration: this.duration == null ? "" : this.duration,
                  Category: this.category == null ? "" : this.category,
                  Priority: this.priolevel == null ? "" : this.priolevel,
                  Priority_Value: prioVal,
                  Status: this.status == null ? "" : this.status,
                  Deadline: date.toLocaleDateString('en-CA', options)
              })

              console.log(`Added task ${reference.id} for user ${this.userId}`)
          } catch(e) {
              console.log(e)
          }
          this.$emit('taskAdded'); // Emit the custom event
        }
    }
    };