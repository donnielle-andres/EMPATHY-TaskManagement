import { doc, collection, getDocs, getDoc } from "firebase/firestore";
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

async function getTasksForUser(userId) {
    let tasks = []

    const userRef = doc(db, "Users", userId)
    const userResult = await getDoc(userRef);

    // if userId exists, return all of their tasks
    if (userResult.exists()) {
        console.log(userId + " exists!!!!")
        const tasksRef = collection(db, "Users", userId, "Tasks")
        const tasksResults = await getDocs(tasksRef);

        tasksResults.forEach((doc) => {

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

    return null
    
}

export { calculatePriority, getTasksForUser }