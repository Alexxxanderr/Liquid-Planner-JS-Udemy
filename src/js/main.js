"use strict"

let einnahmen = 0,
    ausgaben = 0,
    bilanz = 0,
    titel, typ, betrag, datum;

const eintrag_erfassen = function(){
    titel = prompt("Titel:");
    typ = prompt("Typ (Einnahme oder Ausgabe)");
    betrag = parseInt(prompt("Betrag: (in Cent)"));
    datum = prompt("Datum (jjjj-mm-tt)");
};

const eintrag_ausgeben = function(titel, typ, betrag, datum){
    console.log(`Titel: ${titel},\nTyp: ${typ},\nBetrag: ${betrag} ct,\nDatum: ${datum}.`);
};

const eintrag_mit_gesamtbilanz_verrechnen = function(typ, betrag){
    if (typ == "e"){
        einnahmen = einnahmen + betrag;
        bilanz = bilanz + betrag;
    }else if (typ == "a"){
        ausgaben = ausgaben + betrag;
        bilanz = bilanz - betrag;
    }else {
        console.log(`Der Typ "${typ}" ist nicht bekannt.`);
    }
};

// Gesamtbilanz ausgeben

const gesamtbilanz_ausgeben = function(einnahmen, ausgaben, bilanz){
    console.log(`Einnahmen: ${einnahmen} ct
Ausgaben: ${ausgaben} ct
Bilanz: ${bilanz} ct
Bilanz ist positiv: ${bilanz >= 0}`);
};

const eintrag_hinzufuegen = function(){
    eintrag_erfassen();
    eintrag_ausgeben(titel, typ, betrag, datum);
    eintrag_mit_gesamtbilanz_verrechnen(typ, betrag);
    gesamtbilanz_ausgeben(einnahmen, ausgaben, bilanz);
};

eintrag_hinzufuegen();
eintrag_hinzufuegen();