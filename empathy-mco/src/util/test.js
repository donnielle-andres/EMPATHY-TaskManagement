import { firebase, db } from './firebase.js'
import { collection, addDoc } from "firebase/firestore";
export default {
    name: "TestPage",

    created() {
        console.log("Hellow")
        console.log(firebase)
        try {
            const reference = addDoc(collection(db, "Test"), {
                name: "Sam2"
            })
        } catch(e) {
            console.log(e)
        }
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
        test() {
            db.ref('/users/').push({
                name: "test"
            })
        },

        poop() {
            return "test"
        }

        
    }
}