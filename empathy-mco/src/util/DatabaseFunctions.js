import { get, doc, collection, deleteDoc, getDocs, getDoc, addDoc, setDoc } from "firebase/firestore";
import { db } from './firebase.js'

function calculatePriority(dl, prio) {
    const ts = Date.parse(dl)
    const deadline = new Date(ts)
    const current = new Date()

    let difference = deadline.getTime() - current.getTime()
    
    difference = difference / 1000 * 60 //From ms to minutes

    let multiplier = 0;
    
    if(difference <= 0){
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
    }
    else{
        switch(prio) {
            case "Low Priority":
                multiplier = 1
                break
            
            case "Mid Priority":
                multiplier = 0.75
                break
            
            case "High Priority":
                multiplier = 0.5
                break
        }
    
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

async function getTodayTasksForUser(userId, today) {
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

        tasks.sort((a, b) => {
            return a.priority_val - b.priority_val
        })

        // await setDoc(doc(db, "Users", userId, "Daily", today), {
        //     value: "test"
        // })
        console.log("Testing today: " +  today)
        const dailyRef = collection(db, "Users", userId, "Daily", today, "Tasks")
        const testDocs = await getDocs(dailyRef)

        let todayTasks = []
        let totalTime = 0
        console.log(testDocs.empty)

        testDocs.forEach((data)=> {
            deleteDoc(doc(dailyRef, data.id))
        })

        for(let i = 0;i < tasks.length;i++) {
            let tempDuration = Number(tasks[i].duration)
            totalTime += tempDuration

            if(totalTime > 300) {
                console.log(totalTime)
                break;
            }
            else {
                console.log("Added " + tasks[i].title + "| Time is now " + totalTime)
                await setDoc(doc(dailyRef, tasks[i].id), {
                    id: tasks[i].id,
                    title: tasks[i].title,
                    description: tasks[i].description,
                    duration: tasks[i].duration,
                    category: tasks[i].category,
                    priority: tasks[i].priority,
                    priority_val: tasks[i].priority_val,
                    status: tasks[i].status,
                    deadline: tasks[i].deadline,
                    finish: false
                })
            }
        }

        const dailyTasksDocs = await getDocs(dailyRef)     

        dailyTasksDocs.forEach((task) => {
            if(!task.data().finish) {
                console.log(task.data())
                let t = task.data()
                todayTasks.push({
                    id: t.id,
                    title: t.title,
                    description: t.description,
                    duration: t.duration,
                    category: t.category,
                    priority: t.priority,
                    priority_val: t.priority_val,
                    status: t.status,
                    deadline: t.deadline,
                    finish: t.finish
                })
            } 
        })
        
        todayTasks.forEach((t) => {
            console.log(t)
        })
        return todayTasks
    }

    return null
    
}

export { calculatePriority, getTasksForUser, getTodayTasksForUser }