"use strict"

//Bedingter ternärer Operator 
//Syntax:  Bedingung ? Ausdruck_1 : Ausdruck_2

// let zahl = 1;

// console.log(zahl > 10 ? "größer als 10" : "Kleiner als 10");

// let geschlecht = 0;
// console.log(`Hallo ${geschlecht ? "Herr" : "Frau"} Mustermann`);

// if (geschlecht){
//     console.log("Hallo Herr Mustermann");
// }else{
//     console.log("Hallo Frau Mustermann");
// }

// let fueherschein = true;

// const fuehrerscheinKontrolle = function(){
//     if (fueherschein){
//         return "Darf Auto fahren!";
//     }else{
//         return "Darf kein Auto fahren";
//     }
// };

// function fuehrerscheinKontrolle () {
//     return fueherschein ? "Darf Auto fahren!" : "Darf kein Auto fahren!"
// }

// console.log(fuehrerscheinKontrolle());

// let erdbeschleunigung = 5.2;
// let panik = false;

// erdbeschleunigung > 9.81 ? (panik = true, erdbeschleunigung = 9.81) : (panik = false, erdbeschleunigung = 9.81);

// console.log(erdbeschleunigung);
// console.log(panik);

// let farbe = "rot";

// if (farbe === "rot"){
//     console.log("Ich mag rot!");
// } else if (farbe === "blau"){
//     console.log("Ich mag auch blau!");
// } else if (farbe === "grün"){
//     console.log("Ich mag nicht grün!");
// } else {
//     console.log(`Zur ${farbe} habe ich keine Meinung!`);
// }

// console.log(farbe === "rot" ? "Ich mag rot!" : farbe === "blau" ? "Ich mag auch blau!" : farbe === "grün" ? "Ich mag nicht grün!" : `Zur ${farbe} habe ich keine Meinung!`)


// für Funktionen
// let meine_zahlen = [44, 51, 36];
// const addieren = function(a, b, c) {
//     console.log(a + b + c);
// };
// addieren(meine_zahlen[0], meine_zahlen[1], meine_zahlen[2]);
// addieren(...meine_zahlen);

// für Arrays
// let kleines_array = ["Apfel", "Banane", "Kiwi", "Pflaumen", "Birnen"];
// let grosses_array = [kleines_array[0], kleines_array[1], kleines_array[2], "Orange", "Weintraube"];
// let grosses_array = [...kleines_array, "Orange", "Weintraube"];
// let sehr_grosses_array = [...kleines_array, "Kartoffel", ...grosses_array, "Möhre"];
// console.log(grosses_array);
// console.log(sehr_grosses_array);

// für Objekte
// let kleines_objekt = {
//     name: "Ein Objekt",
//     groesse: 2,
//     objekt: true
// };
// let grosses_objekt = {
//     betreff: "Spread-Syntax",
//     ...kleines_objekt,
//     datum: new Date()
// };
// console.log(grosses_objekt);

// für Instanzen von Objekten
// let datumswerte = [2020, 5, 14];
// let datum = new Date(datumswerte[0], datumswerte[1], datumswerte[2]);
// let datum = new Date(...datumswerte);
// console.log(datum);

// const addieren = function(array) {
//     let summe = 0;
//     array.forEach(e => summe += e);
//     return summe;
// };
// console.log(addieren([23, 23, 41, 64, 9, 109]));

// const addieren = function(...summanden) {
//     let summe = 0;
//     summanden.forEach(e => summe += e);
//     return summe;
// };
// console.log(addieren(23, 23, 41, 64, 9, 109));

// const personen_addieren = function(name_1, name_2, ...punkte) {
//     let summe = 0;
//     punkte.forEach(e => summe += e);
//     return `${name_1} und ${name_2} haben zusammen ${summe} gesammeln!`;
// };
// console.log(personen_addieren("Jan", "Mona", 56, 89, 13, 67, 98, 100, 156, 76));