"use strict"

const haushaltsbuch = {

    gesamtbilanz: new Map(),

    eintraege: [],

    eintrag_erfassen(){
        let neuer_eintrag = new Map();
               
        neuer_eintrag.set("titel", prompt("Titel:"));
        neuer_eintrag.set("typ", prompt("Typ (Einnahme oder Ausgabe)"));
        neuer_eintrag.set("betrag", parseInt(prompt("Betrag: (in Cent)")));
        neuer_eintrag.set("datum", new Date(prompt("Datum: ")));
        neuer_eintrag.set("id", Date.now());
        this.eintraege.push(neuer_eintrag);

        // this.gesamtbilanz.set("titel", prompt("Titel:"));
        // this.gesamtbilanz.set("typ", prompt("Typ (Einnahme oder Ausgabe)"));
        // this.gesamtbilanz.set("betrag", parseInt(prompt("Betrag: (in Cent)")));
        // this.gesamtbilanz.set("datum", prompt("Datum (jjjj-mm-tt)"));
        // this.eintraege.push(this.gesamtbilanz);
    },

    eintraege_sortieren(){
        this.eintraege.sort(function(a, b){
            if (a.get("datum") > b.get("datum")){
                return -1;
            } else if (a.get("datum") < b.get("datum")){
                return 1;
            } else {
                return 0;
            }
        });
    },

    eintraege_ausgeben(){
        console.clear();
        this.eintraege.forEach(function(eintrag){
            console.log(`Titel: ${eintrag.get("titel")},\nTyp: ${eintrag.get("typ")},\nBetrag: ${eintrag.get("betrag")} ct,\nDatum: ${eintrag.get("datum").toLocaleString("de-DE", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                })}.`);
        });
    },


    gesamtbilanz_erstellen(){
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("einnahmen", 0);
        neue_gesamtbilanz.set("ausgaben", 0);
        neue_gesamtbilanz.set("bilanz", 0);        

        this.eintraege.forEach(function(eintrag){
            switch (eintrag.get("typ")){
                case "e":
                    neue_gesamtbilanz.set("einnahmen", neue_gesamtbilanz.get("einnahmen") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") + eintrag.get("betrag"));
                break;
                case "a":
                    neue_gesamtbilanz.set("ausgaben", neue_gesamtbilanz.get("ausgaben") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") - eintrag.get("betrag"));
                    break;
                default: 
                    console.log(`Der Typ "${eintrag.get("betrag")}" ist nicht bekannt.`);
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
    },

    gesamtbilanz_ausgeben(){
        console.log(`Einnahmen: ${this.gesamtbilanz.get("einnahmen")} ct\n`
            + `Ausgaben: ${this.gesamtbilanz.get("ausgaben")} ct\n`
            + `Bilanz: ${this.gesamtbilanz.get("bilanz")} ct\n`
            + `Bilanz ist positiv: ${this.gesamtbilanz.get("bilanz") >= 0}`);
    },

    eintrag_hinzufuegen(){
        let weiterer_eintrag = true;
        while (weiterer_eintrag == true) {
            this.eintrag_erfassen();
            this.eintraege_sortieren();
            this.eintraege_ausgeben();
            this.gesamtbilanz_erstellen();
            this.gesamtbilanz_ausgeben();
            weiterer_eintrag = confirm("Noch ein Eintrag?");
        }
        
    }
}


// Gesamtbilanz ausgeben

haushaltsbuch.eintrag_hinzufuegen();     
console.log(haushaltsbuch);