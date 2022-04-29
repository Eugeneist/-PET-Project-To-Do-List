const clock = document.querySelector(".clock");

export const updateClock = () => {

    let date = new Date();

    let day = date.getDate();
    if (day < 10) day = "0" + day;

    let month = date.getMonth();
    if (month < 10) month = "0" + (month + 1) ;

    let year = date.getFullYear();

    let hours = date.getHours();
    if (hours < 10) hours = "0" + hours;
  
    let minutes = date.getMinutes();
    if (minutes < 10) minutes = "0" + minutes;
  
    // let seconds = date.getSeconds();
    // if (seconds < 10) seconds = "0" + seconds;
    // secondsNode.innerHTML = seconds;

    clock.innerHTML = day + "." + month + "." + year + " " + hours + ':' + minutes;
};


  
export const clockStart = () => {
    updateClock();
    setInterval(updateClock, 1000);
};


  
