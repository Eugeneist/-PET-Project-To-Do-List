import { clockStart } from "../js/clock.js";
import { clearDoneTasks } from "../js/settings.js";
clockStart();

const form = document.querySelector(".todolist__form");
const task = document.querySelector(".todolist__text");
const btn = document.querySelector(".todolist__btn");
const list = document.getElementById("list");
const errorMessage = document.querySelector(".todolist__error-message_disabled");
const doingList = document.querySelector(".doing__list");
const doneList = document.querySelector(".done__list");

task.addEventListener("focus", handleFocus );
form.addEventListener("submit", handleSubmit );
list.addEventListener("click", handleDeleteTask );
list.addEventListener("click", handleEditTask );
list.addEventListener("click", handleGetTask );
doingList.addEventListener("click", handleDoneTask );
doingList.addEventListener("click", handleReturnTask );
doneList.addEventListener("click", handleDeleteTask );



function handleFocus() {
    const errorField = task.classList.contains("error");

    if (errorField) {
        task.classList.remove("error");
        let errorMessages = document.querySelectorAll(".todolist__error-message");
        errorMessages.forEach(errorMessage => {
            errorMessage.remove();
        });
        errorMessage.classList.toggle("todolist__error-message_active");
        btn.disabled = false;
    }
}

function handleSubmit(event) {
    event.preventDefault()
    if (task.value.trim().length === 0) {
        task.classList.add("error");
        errorMessage.classList.toggle("todolist__error-message_active");
        btn.disabled = true; 
        return;
    } else {
        addNewTask();
    }
}

function addNewTask() {
    let li = document.createElement('li');
    let taskArea = document.createElement('input');
    taskArea.type = "text";
    taskArea.className = "todolist__task";
    taskArea.value = task.value;
    taskArea.setAttribute("readonly", "readonly");
    li.className = "todolist__item";
    let editTask = document.createElement('button');
    editTask.className = "todolist__edit-btn";
    let getTask = document.createElement('button');
    getTask.className = "todolist__get-btn";
    let delTask = document.createElement('button');
    delTask.className = "todolist__del-btn";
    list.append(li);
    li.append(taskArea);
    li.append(editTask);
    li.append(getTask);
    li.append(delTask);
    form.reset();
}

function handleDeleteTask(event) {
    const removeButton = event.target.className === "todolist__del-btn";

    if (removeButton) {
        let row = event.target.closest(".todolist__item");
        row.remove();
    }
}


function handleEditTask(event) {
    let editTask = event.target.className === "todolist__edit-btn";
    let row = event.target.closest(".todolist__item");
    let taskRow = row.querySelector('.todolist__task');

    if(editTask) {
        taskRow.removeAttribute("readonly");
        taskRow.focus();
    } else {
        taskRow.setAttribute("readonly", "readonly");
    }

}

// function changeTaskButton(event) {
//     let editTask = event.target.className === "todolist__edit-btn";

//     if (editTask.toString().toLowerCase() == "edit") {
//         editTask.innerHTML = "Save";
//         editTask.classList.toggle("editing");
//     } else {
//         editTask.innerText = "edit";
//         editTask.classList.toggle("editing");
//     }
// }

function handleGetTask(event) {
    let getButton = event.target.className === "todolist__get-btn";
    let row = event.target.closest(".todolist__item");
    let textArea = row.querySelector(".todolist__task");
    let taskText = textArea.value;

    if(getButton) {
        let li = document.createElement('li');
        let taskArea = document.createElement('input');
        taskArea.type = "text";
        taskArea.className = "todolist__task";
        taskArea.value = taskText;
        taskArea.setAttribute("readonly", "readonly");
        li.className = "doing__item";
        let doneTask = document.createElement('button');
        doneTask.className = "todolist__done-btn";
        let returnTask = document.createElement('button');
        returnTask.className = "todolist__return-btn";
        doingList.append(li);
        li.append(taskArea);
        li.append(returnTask)
        li.append(doneTask);
        row.remove();
    }
}

function handleDoneTask(event) {
    let doneButton = event.target.className === "todolist__done-btn";
    let row = event.target.closest(".doing__item");
    let textArea = row.querySelector(".todolist__task");
    let taskText = textArea.value;

    if(doneButton) {
        let li = document.createElement('li');
        let taskArea = document.createElement('input');
        taskArea.type = "text";
        taskArea.className = "todolist__task";
        taskArea.value = taskText;
        taskArea.setAttribute("readonly", "readonly");
        li.className = "todolist__item done__item";
        li.classList.toggle("done");
        taskArea.classList.toggle("done");
        let delTask = document.createElement('button');
        delTask.className = "todolist__del-btn";
        doneList.append(li);
        li.append(taskArea);
        li.append(delTask);
        row.remove();
    }
    clearDoneTasks();
}


function handleReturnTask(event) {
    let returnButton = event.target.className === "todolist__return-btn";
    let row = event.target.closest(".doing__item");
    let textArea = row.querySelector(".todolist__task");
    let taskText = textArea.value;

    if(returnButton) {
        addNewTask();
        let li = document.querySelector('.todolist__list li:last-child');
        let taskArea = li.querySelector(".todolist__task");
        taskArea.value = taskText;
        li.prepend(taskArea);
        row.remove();
    }
}


