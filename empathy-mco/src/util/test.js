import { firebase, db } from './firebase.js'
import { collection, addDoc, getDocs} from "firebase/firestore";
import { getTasksForUser } from './DatabaseFunctions.js'
export default {
    name: "TestPage",

    async created() {
        console.log("In test")
        const tasks = await getTasksForUser("testId1")
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