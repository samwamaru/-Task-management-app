firebase.initializeApp({
    apiKey: "AIzaSyCT3uQ-kvMB2bDqd_xpjYReNbHWE6q4U70",
  authDomain: "wamaru-app.firebaseapp.com",
  projectId: "wamaru-app",
  storageBucket: "wamaru-app.appspot.com",
  messagingSenderId: "440025183215",
  appId: "1:440025183215:web:bc4fb3e7573989015d7c1a"
});

const db = firebase.firestore();

//function to add tasks
function addTask(){
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if(task !== ""){
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        taskInput.value = "";
        console.log("Task added.");
    }
}

function renderTasks(doc){
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type === "added"){
                renderTasks(change.doc);
            }
        })
    });


    function deleteTask(id){
        db.collection("tasks").doc(id).delete();
        
    }