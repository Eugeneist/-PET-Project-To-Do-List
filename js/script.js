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
    li.textContent = task.value;
    li.className = "todolist__item";
    let done = document.createElement('input');
    done.type = "checkbox";
    done.className = "form-check-input";
    let del = document.createElement('button');
    del.className = "todolist__del-btn";
    del.innerHTML = "Delete";
    list.append(li);
    li.append(del);
    li.prepend(done);
    form.reset();
}

function handleDone(event) {
    const doneButton = event.target.className === "form-check-input";
    
    if(doneButton) {
        let row = event.target.closest(".todolist__item");
        row.classList.toggle("done");
        row.querySelector(".todolist__del-btn").remove();
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



