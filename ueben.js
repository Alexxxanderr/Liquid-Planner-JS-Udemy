"use strict"


let inhaber_1 = {
    vorname: "Max",
    nachname: "Mustermann",
    geschlecht: "männlich",
    alter: 18,
    inhaber_2: {
        vorname: "Micha",
        nachname: "Muster",
        geschlecht: "männlich",
        alter: 19
    },
    kontostand: 5000,
    aktiv: true,
    einzahlen(e){
        this.kontostand += e;
    },
    abheben(e){
        this.kontostand -= e;
    },
    person_verarbeiten(){
        return {
            v: this.vorname + " ",
            n: this.nachname + " ",
            a: this.alter + " !"
        }
    }
};

console.log(inhaber_1.person_verarbeiten());

let o1 = {
    marke: "BMW",
    modell: "6er Grande"
}

let o2 = {
    marke: "MB",
    modell: "CLS 63"
}

const vergleich = function(a,b){
    if (a.marke === b.marke){
        console.log("Gleich.");
    }else{
        console.log("Ungleich!.");
    }
}

vergleich(o1,o2);