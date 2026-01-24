var tasks = [];

function addTask() {
    var taskText = document.getElementById("taskinput").value;
    var date = document.getElementById("dateinput").value;

    if (taskText == "") {
        alert("please enter task");
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

    document.getElementById("taskinput").value = "";
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

// here we are sorting using Date object
function sortTasks() {
    tasks.sort(function(a, b) {
        return a.dueDate - b.dueDate;
    });
}

// Simple date formatting
function formatDate(date) {
    if (isNaN(date)) return "No date";
    return date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
}
