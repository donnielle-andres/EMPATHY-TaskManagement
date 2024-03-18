import { firebase, db } from './firebase.js'
import { collection, addDoc, getDocs} from "firebase/firestore";
import { getTasks } from './DatabaseFunctions.js'
export default {
    name: "TestPage",

    async created() {
        console.log("Hellow")

        const tasks = await getTasks()
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