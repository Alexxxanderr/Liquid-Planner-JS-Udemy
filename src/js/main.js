"use strict"

const haushaltsbuch = {

    gesamtbilanz: new Map(),

    eintraege: [],

    fehler: [],

    eintrag_erfassen(){
        let neuer_eintrag = new Map();      
        neuer_eintrag.set("titel", this.titel_verarbeiten(prompt("Titel:")));
        neuer_eintrag.set("typ", this.typ_verarbeiten(prompt("Typ (Einnahme oder Ausgabe)")));
        neuer_eintrag.set("betrag", this.betrag_verarbeiten(prompt("Betrag: (in €)")));
        neuer_eintrag.set("datum", this.datum_verarbeiten(prompt("Datum: ")));
        neuer_eintrag.set("id", Date.now());
        if (this.fehler.length !== 0){
            console.log("Ihre Eingaben enthalten Fehler:");
            this.fehler.forEach(function(f) {
                console.log(f);
            });
        } else {
            this.eintraege.push(neuer_eintrag);
        }

    },

    fehler_ausgeben(){

    },

    typ_validieren(typ){
        if( typ.match(/^(?:einnahme|ausgabe)$/) !== null){
            return true;
        } else {
            return false;
        }
    },

    typ_verarbeiten(typ){
        typ = typ.trim().toLowerCase();
        if (this.typ_validieren(typ)){
            return typ;
        }else {
            this.fehler.push("Der Typ ist ungültig!");
        }  
    },

    titel_validieren(titel){
        if( titel !== ""){
            return true;
        } else {
            return false;
        }
    },

    titel_verarbeiten(titel){
        titel = titel.trim();
        if (this.titel_validieren(titel)){
            return titel;
        }else {
            this.fehler.push("Der Titel wurde nicht angegeben!");
        }  
    },

    datum_validieren(datum){
        if( datum.match(/^\d{4}(?:-)\d{2}(?:-)\d{2}$/) !== null){
            return true;
        } else {
            return false;
        }
    },

    datum_verarbeiten(datum){
        datum = datum.trim();
        if (this.datum_validieren(datum)){
            return new Date(datum);
        }else {
            this.fehler.push("Das Datumsformat ist unbekannt!");
        }  
    },

    betrag_validieren(betrag){
        if( betrag.match(/^\d+(?:(?:,|\.)\d\d?)?$/) !== null){
            return true;
        } else {
            return false;
        }
    },

    betrag_verarbeiten(betrag){
        betrag = betrag.trim();
        if (this.betrag_validieren(betrag)){
            return parseFloat(betrag.replace(/,/, ".")) * 100;
        }else {
            this.fehler.push("Der Typ Betrag ist unbekannt!");
        }  
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
            console.log(`Titel: ${eintrag.get("titel")},\nTyp: ${eintrag.get("typ")},\nBetrag: ${(eintrag.get("betrag")/100).toFixed(2)} €,\nDatum: ${eintrag.get("datum").toLocaleString("de-DE", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                })}.`);
        });
    },

    html_eintrag_generieren(eintrag){

        let listenpunkt = document.createElement("li");

        listenpunkt.setAttribute("class", eintrag.get("typ"));
        listenpunkt.setAttribute("data-timestamp", eintrag.get("id"));

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = eintrag.get("datum").toLocaleString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            });
        listenpunkt.insertAdjacentElement("afterbegin", datum);
        
        let titel = document.createElement("span");
        titel.setAttribute("class", "titel");
        titel.textContent = eintrag.get("titel");
        datum.insertAdjacentElement("afterend", titel);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = (eintrag.get("betrag")/100).toFixed(2).replace(/\./, ",") + "€";
        titel.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        betrag.insertAdjacentElement("afterend", button);

        let i = document.createElement("i");
        i.setAttribute("class", "fas");
        i.classList.add("fa-trash");
        button.insertAdjacentElement("afterbegin", i);
        
        return listenpunkt;
        
    },

    eintraege_anzeigen(){
        document.querySelectorAll(".monatsliste ul").forEach(e => {
            e.remove();
        });
        let eintragsliste = document.createElement("ul");

        for (let eintrag of this.eintraege){
            eintragsliste.insertAdjacentElement("beforeend",  this.html_eintrag_generieren(eintrag));
        };
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", eintragsliste);
    },


    gesamtbilanz_erstellen(){
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("einnahmen", 0);
        neue_gesamtbilanz.set("ausgaben", 0);
        neue_gesamtbilanz.set("bilanz", 0);        

        this.eintraege.forEach(function(eintrag){
            switch (eintrag.get("typ")){
                case "einnahme":
                    neue_gesamtbilanz.set("einnahmen", neue_gesamtbilanz.get("einnahmen") + eintrag.get("betrag"));
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") + eintrag.get("betrag"));
                break;
                case "ausgabe":
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

    html_gesamtbilanz_generieren(){

        let gesamtbilanz = document.createElement("aside");
        gesamtbilanz.setAttribute("id", "gesamtbilanz");

        let ueberschrift = document.createElement("h1");
        ueberschrift.textContent = "Gesamtbilanz";
        gesamtbilanz.insertAdjacentElement("afterbegin", ueberschrift);

        let einnahmenZeile = document.createElement("div");
        einnahmenZeile.setAttribute("class", "gesamtbilanz-zeile einnahmen");
        let einnahmenTitel = document.createElement("span");
        einnahmenTitel.textContent = "Einnahmen:";
        einnahmenZeile.insertAdjacentElement("afterbegin", einnahmenTitel);
        let einnahmenBetrag = document.createElement("span");
        einnahmenBetrag.textContent = (this.gesamtbilanz.get("einnahmen")/100).toFixed(2).replace(/\./, "," + "€");
        einnahmenZeile.insertAdjacentElement("beforeend", einnahmenBetrag);
        gesamtbilanz.insertAdjacentElement("beforeend", einnahmenZeile);

        let ausgabenZeile = document.createElement("div");
        ausgabenZeile.setAttribute("class", "gesamtbilanz-zeile ausgaben");
        let ausgabenTitel = document.createElement("span");
        ausgabenTitel.textContent = "Ausgaben:";
        ausgabenZeile.insertAdjacentElement("afterbegin", ausgabenTitel);
        let ausgabenBetrag = document.createElement("span");
        ausgabenBetrag.textContent = (this.gesamtbilanz.get("ausgaben")/100).toFixed(2).replace(/\./, "," + "€");
        ausgabenZeile.insertAdjacentElement("beforeend", ausgabenBetrag);
        gesamtbilanz.insertAdjacentElement("beforeend", ausgabenZeile);

        let bilanzZeile = document.createElement("div");
        bilanzZeile.setAttribute("class", "gesamtbilanz-zeile bilanz");
        let bilanzTitel = document.createElement("span");
        bilanzTitel.textContent = "Bilanz:";
        bilanzZeile.insertAdjacentElement("afterbegin", bilanzTitel);
        let bilanzBetrag = document.createElement("span");
        if (this.gesamtbilanz.get("bilanz") >= 0){
            bilanzBetrag.setAttribute("class", "positiv");
        } else if (this.gesamtbilanz.get("bilanz") < 0){
            bilanzBetrag.setAttribute("class", "negativ");
        };
        bilanzBetrag.textContent = (this.gesamtbilanz.get("bilanz")/100).toFixed(2).replace(/\./, "," + "€");
        bilanzZeile.insertAdjacentElement("beforeend", bilanzBetrag);
        gesamtbilanz.insertAdjacentElement("beforeend", bilanzZeile);

        return gesamtbilanz;

    },

    gesamtbilanz_anzeigen(){
        let gesamtbilanz = document.querySelector("#gesamtbilanz");
        gesamtbilanz.remove();

        document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());
        
    },

    eintrag_hinzufuegen(){
        let weiterer_eintrag = true;
        while (weiterer_eintrag == true) {
            this.eintrag_erfassen();
            if(this.fehler.length == 0){
                this.eintraege_sortieren();
                this.eintraege_anzeigen();
                this.gesamtbilanz_erstellen();
                this.gesamtbilanz_anzeigen();
            } else {
                this.fehler = [];
            }
            weiterer_eintrag = confirm("Noch ein Eintrag?");
        }
        
    }
}


// Gesamtbilanz ausgeben

haushaltsbuch.eintrag_hinzufuegen();     
console.log(haushaltsbuch);