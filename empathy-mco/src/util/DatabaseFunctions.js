import { collection, addDoc, getDocs} from "firebase/firestore";
import { db } from './firebase.js'

function calculatePriority(dl, prio) {
    const ts = Date.parse(dl)
    const deadline = new Date(ts)
    const current = new Date()

    let difference = deadline.getTime() - current.getTime()
    
    difference = difference / 1000 * 60 //From ms to minutes

    let multiplier = 0;
    
    switch(prio) {
        case "Low Priority":
            multiplier = 0.5
            break
        
        case "Mid Priority":
            multiplier = 0.75
            break
        
        case "High Priority":
            multiplier = 1
            break
    }

    let priorityVal = difference * multiplier

    
    return priorityVal
}

async function getTasks() {
    let tasks = []

    const query = await getDocs(collection(db, "Tasks"));
            
    console.log("Queried")
    query.forEach((doc) => {

        const data = doc.data()

        //Follows format for displaying in MainPage
        let task = {
            title: data.Title,
            description: data.Description,
            duration: data.Duration,
            category: data.Category,
            priority: data.Priority,
            priority_val: data.Priority_Value,
            status: data.Status,
            deadline: data.Deadline,
        }

        tasks.push(task)
    })

    console.log(tasks)

    return tasks
}

export { calculatePriority, getTasks}