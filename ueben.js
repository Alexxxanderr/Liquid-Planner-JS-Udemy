"use strict"

// let jumbo = document.querySelector(".jumbotron");

// jumbo.addEventListener("click", e => {
//     console.log(e);
//     console.log(e.clientX);
//     console.log(e.clientY);
//     console.log(e.target);
//     console.log(e.screenX);
// });

// jumbo.addEventListener("dblclick", e => {
//     console.log(e);
//     alert("Doppelklick");
// });

// jumbo.addEventListener("mousedown", e => {
//     console.log(e);
//     alert("Maus runter");
// });

// jumbo.addEventListener("mouseup", e => {
//     console.log(e);
//     alert("Maus hoch");
// });

// jumbo.addEventListener("mouseover", e => {
//     console.log(e);
//     alert("Maus over");
// });

// jumbo.addEventListener("mouseout", e => {
//     console.log(e);
//     alert("Maus out");
// });

// let body = document.querySelector("body");
// body.addEventListener("click", e => console.log("davor der Event"));


// let el1 = document.querySelector("#navigation  ul > li:nth-of-type(1) a");
// let el1Parent = el1.parentElement;
// let el2 = document.querySelector("#navigation  ul > li:nth-of-type(2) a");
// let el2Parent = el2.parentElement;

// el1.addEventListener("click", e => {
//     e.preventDefault();
//     console.log("el1 mitbekommen");
// });

// el1Parent.addEventListener("click", e => {
//     console.log("el1Parent mitbekommen");
// });

// el2.addEventListener("click", e => {
//     e.preventDefault();
//     e.stopImmediatePropagation();
//     console.log("el2 mitbekommen");
// });

// el2Parent.addEventListener("click", e => {
//     console.log("el2Parent mitbekommen");
// });

// document.addEventListener("keydown", e => {
//     document.querySelector("h2").innerHTML = e.key;
//     document.querySelector("h2").innerHTML = e.code;
//     console.log(e);

// });

// document.addEventListener("keyup", e => {
//     document.querySelector("h2").innerHTML = e.key;
//     document.querySelector("h2").innerHTML = e.code;
//     console.log(e);

// });

// document.addEventListener("keypress", e => {
//     document.querySelector("h2").innerHTML = e.key;
//     document.querySelector("h2").innerHTML = e.code;
//     console.log(e);

// });

// let formular = document.querySelector("form");

// formular.addEventListener("submit", e => {
//     e.preventDefault();
//     console.log(e);
// });

// formular.addEventListener("reset", e => console.log(e));

// let input = document.querySelector("input[type=text]");
// input.addEventListener("input", e => console.log(e));
// input.addEventListener("change", e => { console.log(e)});

// let textarea = document.querySelector("textarea");
// textarea.addEventListener("input", e => console.log(e));
// textarea.addEventListener("change", e => { console.log(e)});

// let checkboxen = document.querySelectorAll("input[type=checkbox]");
// checkboxen.forEach(el => {
//     el.addEventListener("change", e => {
//         console.log(e);
//         console.log(e.target.checked);
//     })
// });

// let radiobuttons = document.querySelectorAll("input[type=radio]");
// radiobuttons.forEach(el => {
//     el.addEventListener("change", e => {
//         console.log(e);
//         console.log(e.target.value);
//     })
// });

// let range = document.querySelector("input[type=range");
// range.addEventListener("change", e => {
//     console.log(e);
//     console.log(e.target.value);
// });

// window.addEventListener("resize", e => console.log(e.target.innerHeight));
// window.addEventListener("scroll", e => {
//     console.log(e);
//     console.log(scrollX);
//     console.log(scrollY);
// });

// window.addEventListener("load", e => console.log(e));

// let link = document.querySelector("a.active");
// let input = document.querySelector("input[type=text]");
// let formular = document.querySelector("form");

// setTimeout(() => link.click(), 2000); 
// setTimeout(() => input.focus(), 3000); 
// setTimeout(() => input.blur(), 6000); 
// setTimeout(() => formular.reset(), 9000);
// setTimeout(() => formular.submit(), 12000); 


