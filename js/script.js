import { clockStart } from "../js/clock.js";
import { clearDoneTasks } from "../js/settings.js";
clockStart();

const form = document.querySelector(".todolist__form");
const task = document.querySelector(".todolist__text");
const btn = document.querySelector(".todolist__btn");
const list = document.getElementById("list");
const errorMessage = document.querySelector(
  ".todolist__error-message_disabled"
);
const doingList = document.querySelector(".doing__list");
const doneList = document.querySelector(".done__list");

task.addEventListener("focus", handleFocus);
form.addEventListener("submit", handleSubmit);
list.addEventListener("click", handleDeleteTask);
list.addEventListener("click", handleEditTask);
list.addEventListener("click", handleGetTask);
doingList.addEventListener("click", handleDoneTask);
doingList.addEventListener("click", handleReturnTask);
// doingList.addEventListener("click", handleStopwatch);
doneList.addEventListener("click", handleDeleteTask);

function handleFocus() {
  const errorField = task.classList.contains("error");

  if (errorField) {
    task.classList.remove("error");
    let errorMessages = document.querySelectorAll(".todolist__error-message");
    errorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    });
    errorMessage.classList.toggle("active");
    btn.disabled = false;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  if (task.value.trim().length === 0) {
    task.classList.add("error");
    errorMessage.classList.toggle("active");
    btn.disabled = true;
    return;
  } else {
    addNewTask();
  }
}

function addNewTask() {
  let li = document.createElement("li");
  li.className = "todolist__item";

  let taskArea = document.createElement("input");
  taskArea.type = "text";
  taskArea.className = "todolist__task";
  taskArea.value = task.value;
  taskArea.setAttribute("readonly", "readonly");

  let editTask = document.createElement("button");
  editTask.className = "todolist__edit-btn";

  let getTask = document.createElement("button");
  getTask.className = "todolist__get-btn";

  let delTask = document.createElement("button");
  delTask.className = "todolist__del-btn";

  let colorTask = document.createElement("input");
  colorTask.className = "todolist__task-color";
  colorTask.type = "color";

  colorTask.addEventListener("input", (event) => {
    const task = event.target.closest(".todolist__item");
    const taskInput = task.querySelector(".todolist__task");

    if (task.className == "todolist__item") {
      task.style.backgroundColor = `${event.target.value}`;
      taskInput.style.backgroundColor = `${event.target.value}`;
    } else {
      task.style.backgroundColor = event.target.value;
      taskInput.style.backgroundColor = event.target.value;
    }
  });

  list.append(li);
  li.append(taskArea);
  taskArea.before(colorTask);
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
  let taskRow = row.querySelector(".todolist__task");

  if (editTask) {
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
  let color = row.style.backgroundColor;

  if (getButton) {
    let li = document.createElement("li");
    li.className = "doing__item";
    li.style.backgroundColor = color;

    let taskArea = document.createElement("input");
    taskArea.type = "text";
    taskArea.className = "todolist__task";
    taskArea.value = taskText;
    taskArea.style.backgroundColor = color;
    taskArea.setAttribute("readonly", "readonly");

    let stopwatchIcon = document.createElement("div");
    stopwatchIcon.className = "stopwatch__icon";

    // let stopwatchContainer = document.createElement("div");
    // stopwatchContainer.className = "stopwatch__container";

    // let stopwatch = document.createElement("div");
    // stopwatch.className = "stopwatch";

    // let hoursElement = document.createElement("div");
    // hoursElement.className = "hours";

    // let minutesElement = document.createElement("div");
    // minutesElement.className = "minutes";

    // let secondsElement = document.createElement("div");
    // secondsElement.className = "seconds";

    // let startButton = document.createElement("button");
    // startButton.className = "stopwatch__start";

    // let pauseButton = document.createElement("button");
    // pauseButton.className = "stopwatch__pause";

    let doneTask = document.createElement("button");
    doneTask.className = "todolist__done-btn";

    let returnTask = document.createElement("button");
    returnTask.className = "todolist__return-btn";

    doingList.append(li);
    li.append(taskArea);
    // taskArea.after(stopwatchIcon);
    // stopwatchIcon.append(stopwatchContainer);
    // stopwatchContainer.append(stopwatch);
    // stopwatch.append(hoursElement);
    // hoursElement.after(minutesElement);
    // minutesElement.after(secondsElement);
    // stopwatch.before(startButton);
    // startButton.before(pauseButton);
    li.append(returnTask);
    li.append(doneTask);
    row.remove();
  }
}

function handleDoneTask(event) {
  let doneButton = event.target.className === "todolist__done-btn";
  let row = event.target.closest(".doing__item");
  let textArea = row.querySelector(".todolist__task");
  let taskText = textArea.value;

  if (doneButton) {
    let li = document.createElement("li");
    li.className = "todolist__item done__item";
    li.classList.toggle("done");

    let taskArea = document.createElement("input");
    taskArea.type = "text";
    taskArea.className = "todolist__task";
    taskArea.value = taskText;
    taskArea.setAttribute("readonly", "readonly");
    taskArea.classList.toggle("done");

    let delTask = document.createElement("button");
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
  let color = row.style.backgroundColor;

  if (returnButton) {
    addNewTask();
    let li = document.querySelector(".todolist__list li:last-child");
    li.style.backgroundColor = color;

    let taskArea = li.querySelector(".todolist__task");
    taskArea.style.backgroundColor = color;
    taskArea.value = taskText;

    row.remove();
  }
}

// STOPWATCH

// function handleStopwatch(event) {
//     let startButton = event.target.className === "stopwatch__start";
//     let pauseButton =  event.target.className === "stopwatch__pause";

//     let stopwatchContainer = event.target.closest(".stopwatch__container");
//     let stopwatch = stopwatchContainer.querySelector(".stopwatch");
//     let hoursElement = stopwatch.querySelector(".hours");
//     let minutesElement = stopwatch.querySelector(".minutes");
//     let secondsElement = stopwatch.querySelector(".seconds");

//     // Variables

//     let hours = 0;
//     let minutes = 0;
//     let seconds = 0;
//     let milliseconds = 0;
//     let interval;

//     function startTask() {
//         clearInterval(interval);
//         interval = setInterval(startStopwatch, 10);
//     }

//     function startStopwatch() {

//         milliseconds++;

//         if (milliseconds > 99) {
//             seconds++;
//             secondsElement.innerText = "0" + seconds;
//             milliseconds = 0;
//         }

//         if (seconds < 9) {
//             secondsElement.innerText = "0" + seconds;
//         }

//         if (seconds > 9) {
//             secondsElement.innerText = seconds;
//         }

//         if (seconds > 59) {
//             minutes++;
//             minutesElement.innerText = "0" + minutes + ":";
//             seconds = 0;
//             secondsElement.innerText = "0" + seconds;
//         }

//         if (minutes < 9) {
//             minutesElement.innerText = "0" + minutes + ":";
//         }

//         if (minutes > 9) {
//             minutesElement.innerText = minutes + ":";
//         }

//         if (minutes > 59) {
//             hours++;
//             hoursElement.innerText = "0" + hours + ":";
//             minutes = 0;
//             minutesElement.innerText = "0" + minutes + ":";
//         }

//         if (hours < 9) {
//             hoursElement.innerText = "0" + hours + ":";
//         }

//         if (hours > 9) {
//             hoursElement.innerText = hours + ":";
//         }
//     }

//     if(startButton){
//         startTask();
//         event.target.closest(".stopwatch__start").disabled = true;
//     }

//     if(pauseButton){
//         clearInterval(interval);
//     }

// }
