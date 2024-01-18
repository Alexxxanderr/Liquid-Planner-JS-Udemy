"use strict"

// const multiplizieren = function(a,b) { return a * b; };
// const multiplizieren = (a,b) => { return a * b };
// const multiplizieren = (a,b) => a * b ;

// const begruessung = function(name) { return "Hallo" + name; };
// const begruessung = (name) => "Hallo " + name;
// const begruessung = name => "Hallo " + name;

// const sinnDesLebens = function(){
//     return 45;
// };
// const sinnDesLebens = () => 45;

// let einkaufsliste = [
//     "Bort",
//     "Käse",
//     "Milch",
//     "Butter"
// ];

// einkaufsliste.forEach(function(e){
//     console.log(e);
// });

// einkaufsliste.forEach(e => console.log(e));

let peron1 = {
    vorname: "Anna",
    nachname: "Musterfrau",
    alter: 24,
    meineMethode() { console.log(this);}
}

peron1.meineMethode();

// Die Nutzung von this innerhalb einer Funktion "fällt das this aus dem Kontext"
// Bei Stict-Mode ist es undefined

let person2 = {
    vorname: "Anna",
    nachname: "Musterfrau",
    alter: 24,
    meineMethode(){
        const meineFunktion = function(){
            console.log(this);
        };
        meineFunktion();
    }
}

// Pfeil-Funktionen erhalten den Kontext zum Objekt in dem Sie erstellt werden.

person2.meineMethode();

let person3 = {
    vorname: "Anna",
    nachname: "Musterfrau",
    alter: 24,
    meineMethode(){
        const meineFunktion = () => console.log(this);
        meineFunktion();
    }
}

person3.meineMethode();

