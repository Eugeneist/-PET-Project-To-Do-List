const clearBtn = document.querySelector(".form-check-input");
const doneList = document.querySelector(".done__list");
clearBtn.addEventListener("change", allDoneTasks );


export function clearDoneTasks() {
    if(clearBtn.checked) {
        setTimeout(DoneTasks, 2000);
    }
}

function DoneTasks() {
    let doneTask = doneList.querySelector(".done");
    doneTask.remove();
}

function allDoneTasks() {
    let doneTasks = doneList.querySelectorAll(".done");
    setTimeout(() => { doneTasks.forEach(doneTask => { doneTask.remove();}) }, 400);
}
