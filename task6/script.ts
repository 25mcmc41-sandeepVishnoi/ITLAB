
enum Status {
    Pending,
    Completed
}

let sampleTuple: [string, string];
sampleTuple = ["Example Task", "2026-02-07"];

type TaskType = {
    text: string;
    dueDate: Date;
    status: Status;
};

class Task {
    text: string;
    dueDate: Date;
    status: Status;

    constructor(text: string, dueDate: Date) {
        this.text = text;
        this.dueDate = dueDate;
        this.status = Status.Pending;
    }

    markDone(): void {
        this.status = Status.Completed;
    }
}

let tasks: Task[] = [];

function addTask(): void {
    let textInput = document.getElementById("taskInput") as HTMLInputElement;
    let dateInput = document.getElementById("dateInput") as HTMLInputElement;

    let text: string = textInput.value;
    let dateValue: string = dateInput.value;

    if (text === "") {
        alert("Enter task first");
        return;
    }

    let task = new Task(text, new Date(dateValue));
    tasks.push(task);

    displayTasks();
    textInput.value = "";
}

function displayTasks(): void {
    let ul = document.getElementById("taskList") as HTMLUListElement;
    ul.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {

        let li = document.createElement("li");

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

function deleteTask(index: number): void {
    tasks.splice(index, 1);
    displayTasks();
}

function markDone(index: number): void {
    tasks[index].markDone();
    displayTasks();
}

function formatDate(date: Date): string {
    if (isNaN(date.getTime())) return "No date";

    return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear()
    );
}
