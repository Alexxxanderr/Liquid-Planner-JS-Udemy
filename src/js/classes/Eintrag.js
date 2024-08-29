"use strict"

class Eintrag {

    constructor(titel, betrag, typ, datum) {
        this._titel = titel;
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum;
        this._timestamp =  Date.now();
        this._html = this._html_generieren();
    }

    titel() {
        return this._titel;
    }

    betrag() {
        return this._betrag;
    }
    
    typ() {
        return this._typ;
    }
    
    datum() {
        return this._datum;
    }

    timestamp() {
        return this._timestamp;
    }

    html() {
        return this._html;
    }

    _html_generieren(){

        let listenpunkt = document.createElement("li");

        listenpunkt.setAttribute("class", this._typ);
        listenpunkt.setAttribute("data-timestamp", this._timestamp);

        let datum = document.createElement("span");
        datum.setAttribute("class", "datum");
        datum.textContent = this._datum.toLocaleString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            });
        listenpunkt.insertAdjacentElement("afterbegin", datum);
        
        let titel = document.createElement("span");
        titel.setAttribute("class", "titel");
        titel.textContent = this._titel;
        datum.insertAdjacentElement("afterend", titel);

        let betrag = document.createElement("span");
        betrag.setAttribute("class", "betrag");
        betrag.textContent = (this._betrag/100).toFixed(2).replace(/\./, ",") + "€";
        titel.insertAdjacentElement("afterend", betrag);

        let button = document.createElement("button");
        button.setAttribute("class", "entfernen-button");
        betrag.insertAdjacentElement("afterend", button);

        let i = document.createElement("i");
        i.setAttribute("class", "fas");
        i.classList.add("fa-trash");
        button.insertAdjacentElement("afterbegin", i);

        this._eintragEntfernenEventHinzufuegen(listenpunkt);
        
        return listenpunkt;
        
    }

    _eintragEntfernenEventHinzufuegen(listenpunkt){
        listenpunkt.querySelector(".entfernen-button").addEventListener("click", e => {
            let loeschen = confirm("Sicher, dass du löschen willst?");
            if (loeschen){
                let timestamp = e.target.parentElement.getAttribute("data-timestamp");
                haushaltsbuch.eintragEntfernen(timestamp);
            }
        });
    }
    
}