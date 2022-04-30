import { clockStart } from "../js/clock.js";
import { clearDoneTasks } from "../js/settings.js";
clockStart();

const form = document.querySelector(".todolist__form");
const task = document.querySelector(".todolist__text");
const btn = document.querySelector(".todolist__btn");
const list = document.getElementById("list");
const errorMessage = document.querySelector(".todolist__error-message_disabled");

task.addEventListener("focus", handleFocus );
form.addEventListener("submit", handleSubmit );
list.addEventListener("click", deleteTask );
list.addEventListener("click", editTask );
list.addEventListener("click", changeTaskButton );
list.addEventListener("change", handleDone );


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
    let done = document.createElement('input');
    done.type = "checkbox";
    done.className = "form-check-input";
    let editTask = document.createElement('button');
    editTask.className = "todolist__edit-btn";
    editTask.innerHTML = "edit";
    let getTask = document.createElement('button');
    getTask.className = "todolist__get-btn";
    getTask.innerHTML = "Get";
    let delTask = document.createElement('button');
    delTask.className = "todolist__del-btn";
    delTask.innerHTML = "Delete";
    list.append(li);
    li.append(taskArea);
    li.append(editTask);
    li.append(getTask);
    li.append(delTask);
    li.prepend(done);
    form.reset();
}

function handleDone(event) {
    const doneButton = event.target.className === "form-check-input";
    
    if(doneButton) {
        let row = event.target.closest(".todolist__item");
        let taskRow = row.querySelector('.todolist__task');
        row.classList.toggle("done");
        taskRow.classList.toggle("done");
        row.querySelector(".todolist__del-btn").remove();
        row.querySelector(".todolist__get-btn").remove();
        row.querySelector(".todolist__edit-btn").remove();
        event.target.disabled = true;
        clearDoneTasks();
    }
}


function deleteTask(event) {
    const removeButton = event.target.className === "todolist__del-btn";

    if (removeButton) {
        let row = event.target.closest(".todolist__item");
        row.remove();
    }
}


function editTask(event) {
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

function changeTaskButton(event) {
    let editTask = event.target.className === "todolist__edit-btn";

    if (editTask.toString().toLowerCase() == "edit") {
        editTask.innerHTML = "Save";
        editTask.classList.toggle("editing");
    } else {
        editTask.innerText = "Edit";
        editTask.classList.toggle("editing");
    }
}



