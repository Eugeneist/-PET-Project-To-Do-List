const clearBtn = document.querySelector(".form-check-input");
clearBtn.addEventListener("change", allDoneTasks );


export function clearDoneTasks() {
    if(clearBtn.checked) {
        setTimeout(DoneTasks, 2000);
    }
}

function DoneTasks() {
    let doneTask = list.querySelector(".done");
    doneTask.remove();
}

function allDoneTasks() {
    let doneTasks = list.querySelectorAll(".done");
    setTimeout(() => { doneTasks.forEach(doneTask => { doneTask.remove();}) }, 400);
}
