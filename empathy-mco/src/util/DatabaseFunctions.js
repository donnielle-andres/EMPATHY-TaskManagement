import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
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
            deadline: data.Deadline,
            priority: data.Priority
        }

        tasks.push(task)
    })

    console.log(tasks)

    return tasks
}

async function updateTask(id, updatedTask) {
    const prioVal = calculatePriority(this.selectedDate, this.priolevel)
    const date = new Date(updatedTask.selectedDate);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    const taskRef = doc(db, 'Tasks', id)
    const reference = await updateDoc(taskRef, {
        Title: updatedTask.title,
        Description: updatedTask.details,
        Duration: updatedTask.duration,
        Priority: updatedTask.priolevel,
        Priority_Value: prioVal,
        Deadline: date.toLocaleDateString('en-CA', options)
    })

    return reference
}

async function deleteTask(id) {
    await deleteDoc(doc(db, "Tasks", id))
}

export { calculatePriority, getTasks, updateTask, deleteTask}