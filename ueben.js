"use strict"

// let waren = [
//     {
//         nukk: "Äpfel",
//         eins: "Bannen",
//         zwei: "Birnen"
//     },
//     {
//         0: "Möhren",
//         1: "Salerie",
//         2: "Kohl"
//     },
//     {
//         0: "Graubrot",
//         1: "Schwarzbrot",
//         2: "Vollkornbrot"
//     }
// ];

// console.log(waren[0]["nukk"]);

// waren[0].nukk = "Orangen";

// console.log(waren[0]["nukk"]);


let waren2 = [

        "Äpfel",
        "Bannen",
        "Birnen",
        "Möhren",
        "Salerie",
        "Kohl"
];

console.log(waren2.includes("Möhren",4));
console.log(waren2.indexOf("Möhren",5));

let ads = waren2.indexOf("Möhren",4);

if(ads === -1){
    console.log("Es klappt!!!")
}else{
    console.log("Gefunden wurde: "+ads);
}