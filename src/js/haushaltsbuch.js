"use strict"

const haushaltsbuch = {

    gesamtbilanz: new Map(),

    eintraege: [],

    eintrag_hinzufuegen(formulardaten){
        let neuerEintrag = new Map();
        neuerEintrag.set("titel", formulardaten.titel);
        neuerEintrag.set("betrag", formulardaten.betrag);
        neuerEintrag.set("typ", formulardaten.typ);
        neuerEintrag.set("datum", formulardaten.datum);
        neuerEintrag.set("timestamp", Date.now());
        this.eintraege.push(neuerEintrag);
        this.eintraege_sortieren();
        this.eintraege_anzeigen();
        this.gesamtbilanz_erstellen();
        this.gesamtbilanz_anzeigen();
    },

    eintragEntfernen(timestamp){

        let index;
        for (let i = 0; i < this.eintraege.length; i++){
            if( this.eintraege[i].get("timestamp") === parseInt(timestamp)){
                index = i;
                break;
            }
        };
        this.eintraege.splice(index, 1);
        this.eintraege_anzeigen();
        this.gesamtbilanz_erstellen();
        this.gesamtbilanz_anzeigen();
    },

    eintraege_sortieren(){
        this.eintraege.sort((a, b) => {
            return a.get("datum") > b.get("datum") ? -1 : a.get("datum") < b.get("datum") ? 1 : 0;
        });
    },

    eintraege_ausgeben(){
        console.clear();
        this.eintraege.forEach((eintrag) => {
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
        listenpunkt.setAttribute("data-timestamp", eintrag.get("timestamp"));

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

        this.eintragEntfernenEventHinzufuegen(listenpunkt);
        
        return listenpunkt;
        
    },

    eintragEntfernenEventHinzufuegen(listenpunkt){
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
            let loeschen = confirm("Sicher, dass du löschen willst?");
            if (loeschen){
                let timestamp = e.target.parentElement.getAttribute("data-timestamp");
                this.eintragEntfernen(timestamp);
            }
        });
    },

    eintraege_anzeigen(){
        document.querySelectorAll(".monatsliste ul").forEach(e => e.remove());
        let eintragsliste = document.createElement("ul");
        
        this.eintraege.forEach(eintrag => { eintragsliste.insertAdjacentElement("beforeend",  this.html_eintrag_generieren(eintrag)); });
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", eintragsliste);
    },


    gesamtbilanz_erstellen(){
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("einnahmen", 0);
        neue_gesamtbilanz.set("ausgaben", 0);
        neue_gesamtbilanz.set("bilanz", 0);        

        this.eintraege.forEach((eintrag) => {
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
        einnahmenBetrag.textContent = (this.gesamtbilanz.get("einnahmen")/100).toFixed(2).replace(/\./, ",")+ " €";
        einnahmenZeile.insertAdjacentElement("beforeend", einnahmenBetrag);
        gesamtbilanz.insertAdjacentElement("beforeend", einnahmenZeile);

        let ausgabenZeile = document.createElement("div");
        ausgabenZeile.setAttribute("class", "gesamtbilanz-zeile ausgaben");
        let ausgabenTitel = document.createElement("span");
        ausgabenTitel.textContent = "Ausgaben:";
        ausgabenZeile.insertAdjacentElement("afterbegin", ausgabenTitel);
        let ausgabenBetrag = document.createElement("span");
        ausgabenBetrag.textContent = (this.gesamtbilanz.get("ausgaben")/100).toFixed(2).replace(/\./, ",") + " €";
        ausgabenZeile.insertAdjacentElement("beforeend", ausgabenBetrag);
        gesamtbilanz.insertAdjacentElement("beforeend", ausgabenZeile);

        let bilanzZeile = document.createElement("div");
        bilanzZeile.setAttribute("class", "gesamtbilanz-zeile bilanz");
        let bilanzTitel = document.createElement("span");
        bilanzTitel.textContent = "Bilanz:";
        bilanzZeile.insertAdjacentElement("afterbegin", bilanzTitel);
        let bilanzBetrag = document.createElement("span");
        this.gesamtbilanz.get("bilanz") >= 0 ? bilanzBetrag.setAttribute("class", "positiv") : bilanzBetrag.setAttribute("class", "negativ");
        bilanzBetrag.textContent = (this.gesamtbilanz.get("bilanz")/100).toFixed(2).replace(/\./, ",") + " €";
        bilanzZeile.insertAdjacentElement("beforeend", bilanzBetrag);
        gesamtbilanz.insertAdjacentElement("beforeend", bilanzZeile);

        return gesamtbilanz;

    },

    gesamtbilanz_anzeigen(){
        let gesamtbilanz = document.querySelector("#gesamtbilanz");
        gesamtbilanz.remove();
        document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());
    },
        
}