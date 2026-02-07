var tasks = [];

function addTask() {
    var taskText = document.getElementById("taskInput").value;
    var date = document.getElementById("dateInput").value;

    if (taskText == "") {
        alert("Enter task");
        return;
    }

    var task = {
        text: taskText,
        completed: false,
        dueDate: new Date(date)
    };

    tasks.push(task);
    sortTasks();
    displayTasks(tasks);

    document.getElementById("taskInput").value = "";
}

function displayTasks(list) {
    var ul = document.getElementById("taskList");
    ul.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var li = document.createElement("li");

        if (list[i].completed) {
            li.className = "completed";
        }

        li.innerHTML = 
            list[i].text + 
            " (Due: " + formatDate(list[i].dueDate) + ")" +
            "<div>" +
            "<button onclick='markDone(" + i + ")'>Done</button>" +
            "<button onclick='deleteTask(" + i + ")'>X</button>" +
            "</div>";

        ul.appendChild(li);
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks(tasks);
}

function markDone(index) {
    tasks[index].completed = true;
    displayTasks(tasks);
}

function showAll() {
    displayTasks(tasks);
}

function showCompleted() {
    var completed = tasks.filter(function(t) {
        return t.completed == true;
    });
    displayTasks(completed);
}

function showPending() {
    var pending = tasks.filter(function(t) {
        return t.completed == false;
    });
    displayTasks(pending);
}

function sortTasks() {
    tasks.sort(function(a, b) {
        return a.dueDate - b.dueDate;
    });
}

function formatDate(date) {
    if (isNaN(date)) return "No date";
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
}
