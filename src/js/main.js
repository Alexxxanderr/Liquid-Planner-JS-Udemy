"use strict"

let einnahmen = 0;
let ausgaben = 0;
let bilanz = 0;

let titel_1 = prompt("Titel:");
let typ_1 = prompt("Typ (Einnahme oder Ausgabe)");
let betrag_1 = parseInt(prompt("Betrag: (in Cent)"));
let datum_1 = prompt("Datum (jjjj-mm-tt)");

console.log(`Titel: ${titel_1},\nTyp: ${typ_1},\nBetrag: ${betrag_1}ct,\nDatum: ${datum_1}.`);

if (typ_1 == "e"){
    einnahmen = einnahmen + betrag_1;
    bilanz = bilanz + betrag_1;
}else if (typ_1 == "a"){
    ausgaben = ausgaben + betrag_1;
    bilanz = bilanz - betrag_1;
}else {
    console.log(`Der Typ "${typ_1}" ist nicht bekannt.`);
}

let titel_2 = prompt("Titel:");
let typ_2 = prompt("Typ (Einnahme oder Ausgabe)");
let betrag_2 = parseInt(prompt("Betrag: (in Cent)"));
let datum_2 = prompt("Datum (jjjj-mm-tt)");

console.log(`Titel: ${titel_2},\nTyp: ${typ_2},\nBetrag: ${betrag_2}ct,\nDatum: ${datum_2}.`);

if (typ_2 == "e"){
    einnahmen = einnahmen + betrag_2;
    bilanz = bilanz + betrag_2;
}else if (typ_2 == "a"){
    ausgaben = ausgaben + betrag_2;
    bilanz = bilanz - betrag_2;
}else {
    console.log(`Der Typ "${typ_2}" ist nicht bekannt.`);
}

// Gesamtbilanz ausgeben

let positiv = bilanz >= 0;

console.log(`Einnahmen: ${einnahmen} ct
Ausgaben: ${ausgaben} ct
Bilanz: ${bilanz} ct
Bilanz ist positiv: ${positiv}`);