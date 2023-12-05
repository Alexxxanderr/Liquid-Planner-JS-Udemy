"use strict"

let titel_1 = prompt("Titel:");
let typ_1 = prompt("Typ (Einnahme oder Ausgabe)");
let betrag_1 = parseInt(prompt("Betrag: (in Cent)"));
let datum_1 = prompt("Datum (jjjj-mm-tt)");

console.log(`Titel: ${titel_1},\nTyp: ${typ_1},\nBetrag: ${betrag_1}ct,\nDatum: ${datum_1}.`);

console.log(betrag_1);

let titel_2 = prompt("Titel:");
let typ_2 = prompt("Typ (Einnahme oder Ausgabe)");
let betrag_2 = parseInt(prompt("Betrag: (in Cent)"));
let datum_2 = prompt("Datum (jjjj-mm-tt)");

console.log(`Titel: ${titel_2},\nTyp: ${typ_2},\nBetrag: ${betrag_2}ct,\nDatum: ${datum_2}.`);

console.log(betrag_2);

let einnahmen;
let ausgaben;
let bilanz = betrag_1 + betrag_2;
console.log(`Bilanz: ${bilanz}`);

let positiv = bilanz >= 0;
console.log(`Bilanz ist positiv: ${positiv}`);