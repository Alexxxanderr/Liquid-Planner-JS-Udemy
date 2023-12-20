"use strict"

let datum = new Date();

// console.log(datum.toLocaleString());

let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
    }

let de = datum.toLocaleString("de-DE", options);

console.log("Es ist der " + de + " Uhr");

const uhrzeit = function(){
    let d = new Date();
    d.getTime();
    return d
};
setInterval(function(){
    let das = uhrzeit();
    document.getElementById('bodyy').innerHTML = das;
    
}, 1000);






