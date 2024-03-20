import { firebase, db } from './firebase.js'
import { collection, doc, addDoc, getDocs, getDoc} from "firebase/firestore";
import { getTasksForUser } from './DatabaseFunctions.js'
export default {
    name: "TestPage",

    async created() {
        console.log("In test")
        const tasks = collection(db, "Users", "testId1", "Tasks")
        const test = await getDocs(tasks)

        test.forEach((doc) => {
            console.log(doc.id)
        })
    },

    data(){
        return {
            message: "Hello world"
        };
    },

    test2() {
        db.ref('/users/').push({
            name: "test"
        })
    },

    computed: {
        fart() {
            return "test"
        }
    },

    methods: {
        async test() {
            
        },

        poop() {
            return "test"
        }

        
    }
}