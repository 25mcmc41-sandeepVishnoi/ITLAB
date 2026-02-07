
var Status;
(function (Status) {
    Status[Status["Pending"] = 0] = "Pending";
    Status[Status["Completed"] = 1] = "Completed";
})(Status || (Status = {}));


var sampleTuple;
sampleTuple = ["Example Task", "2026-02-07"];


var Task = /** @class */ (function () {
    function Task(text, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = Status.Pending;
    }
    Task.prototype.markDone = function () {
        this.status = Status.Completed;
    };
    return Task;
}());
var tasks = [];
function addTask() {
    var textInput = document.getElementById("taskInput");
    var dateInput = document.getElementById("dateInput");
    var text = textInput.value;
    var dateValue = dateInput.value;
    if (text === "") {
        alert("Enter task first");
        return;
    }
    var task = new Task(text, new Date(dateValue));
    tasks.push(task);
    displayTasks();
    textInput.value = "";
}
function displayTasks() {
    var ul = document.getElementById("taskList");
    ul.innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");
        if (tasks[i].status === Status.Completed) {
            li.className = "completed";
        }
        li.innerHTML =
            tasks[i].text +
                " (Due: " + formatDate(tasks[i].dueDate) + ")" +
                " <button onclick='markDone(" + i + ")'>Done</button>" +
                " <button onclick='deleteTask(" + i + ")'>X</button>";
        ul.appendChild(li);
    }
}
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}
function markDone(index) {
    tasks[index].markDone();
    displayTasks();
}
function formatDate(date) {
    if (isNaN(date.getTime()))
        return "No date";
    return (date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear());
}
