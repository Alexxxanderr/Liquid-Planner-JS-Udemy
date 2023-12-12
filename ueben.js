"use strict"

let produkt = "Milch";

switch (produkt){
    case "Brot":
        console.log("1,89€");
        break;
    case "Schokolade":
    case "Chips": 
        console.log("0,99€");
        break;
    case "Apfel":
    case "Milch":
        console.log("0,79€");
        break;
}