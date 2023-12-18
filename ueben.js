"use strict"

let zahlen = [12, 3, 20, 2, 66, 15, 20, 45, 37, 50];

zahlen.forEach(function(e){
    if ([e] <= 20){
        console.log(e);
    }
});


let kleinerAls20 = zahlen.filter(function(e){
    if(e <= 20){
        return true;
    } else {
        return false;
    }
});

console.log(kleinerAls20);

let Zahlen = [1, 20, 2000, 1000000, 50];

console.log(Zahlen);

Zahlen.sort(function(a, b){
    return a - b;
});

console.log("Hier: " + Zahlen);



let woerter = ["Monkey",  "Affe", "Zebra", "Schlange", "Giraffe"];

woerter.sort();

console.log(woerter);