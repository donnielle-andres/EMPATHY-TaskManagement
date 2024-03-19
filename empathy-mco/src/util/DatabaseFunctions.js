import { doc, collection, addDoc, getDocs, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
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
        console.log(doc.id)

        //Follows format for displaying in MainPage
        let task = {
            id: doc.id,
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

    return tasks
}

async function getTask(id) {
    const taskRef = doc(db, "Tasks", id);
    const task = await getDoc(taskRef);

    return task
}

async function updateTask(id, updatedTask) {
    const prioVal = calculatePriority(updatedTask.selectedDate, updatedTask.priolevel)
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

export { calculatePriority, getTasks, updateTask, deleteTask, getTask }