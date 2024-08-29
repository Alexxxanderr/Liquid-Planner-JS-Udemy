"use strict"

class Gesamtbilanz {

    constructor(einnahmen, ausgaben, bilanz) {
        this._einnahmen = einnahmen;
        this._ausgaben = ausgaben;
        this._bilanz = bilanz;
        this._html = _html_generieren();
    }

    _gesamtbilanz_erstellen(){
        let neue_gesamtbilanz = new Map();
        neue_gesamtbilanz.set("einnahmen", 0);
        neue_gesamtbilanz.set("ausgaben", 0);
        neue_gesamtbilanz.set("bilanz", 0);        

        this._eintraege.forEach((eintrag) => {
            switch (eintrag.typ()){
                case "einnahme":
                    neue_gesamtbilanz.set("einnahmen", neue_gesamtbilanz.get("einnahmen") + eintrag.betrag());
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") + eintrag.betrag());
                break;
                case "ausgabe":
                    neue_gesamtbilanz.set("ausgaben", neue_gesamtbilanz.get("ausgaben") + eintrag.betrag());
                    neue_gesamtbilanz.set("bilanz", neue_gesamtbilanz.get("bilanz") - eintrag.betrag());
                    break;
                default: 
                    console.log(`Der Typ "${eintrag.betrag()}" ist nicht bekannt.`);
                    break;
            }
        });
        this.gesamtbilanz = neue_gesamtbilanz;
    }

    _html_generieren(){

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

    }

    anzeigen(){
        let gesamtbilanz = document.querySelector("#gesamtbilanz");
        if (gesamtbilanz !== null){
            gesamtbilanz.remove();
        }
        document.querySelector("body").insertAdjacentElement("beforeend", this._html_gesamtbilanz_generieren());
    }
    
}