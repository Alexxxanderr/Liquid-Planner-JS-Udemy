"use strict";

class Eintrag {

    constructor(titel, betrag, typ, datum){  
        this._titel = titel; 
        this._betrag = betrag;
        this._typ = typ;
        this._datum = datum;
        this._timestamp = Date.now();
        this._html = this._html_generieren(); 
    }

    titel(){
        return this._titel;
    }
    typ(){
        return this._typ;
    }
    betrag(){
        return this._betrag;
    }
    datum(){
        return this._datum;
    }
    timestamp(){
        return this._timestamp;
    }
    html(){
        return this._html;
    }

    _html_generieren(){

        let li = document.createElement("li");
        this._typ === "einnahme" ? li.setAttribute("class", "einnahme") : li.setAttribute("class", "ausgabe");
        li.setAttribute("data-timestamp", this._timestamp);

        let  span_datum = document.createElement("span");
        span_datum.setAttribute("class", "datum");
        span_datum.textContent = this._datum.toLocaleDateString("de-DE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
        li.insertAdjacentElement("afterbegin", span_datum);

        let  span_titel = document.createElement("span");
        span_titel.setAttribute("class", "titel");
        span_titel.textContent = this._titel;
        span_datum.insertAdjacentElement("afterend", span_titel);

        let  span_betrag = document.createElement("span");
        span_betrag.setAttribute("class", "betrag");
        span_betrag.textContent = `${(this._betrag / 100).toFixed(2).replace(/\./, ",")} €`;
        span_titel.insertAdjacentElement("afterend", span_betrag);

        let button_entfernen = document.createElement("button");
        button_entfernen.setAttribute("class", "entfernen-button");
        span_betrag.insertAdjacentElement("afterend", button_entfernen);

        let i = document.createElement("i");
        i.setAttribute("class", "fa fa-trash");
        button_entfernen.insertAdjacentElement("afterbegin", i);
        
        this._eintrag_entfernen_event_hinzufuegen(li);

        return li; 
    }

    _eintrag_entfernen_event_hinzufuegen(li){
        li.querySelector(".entfernen-button").addEventListener("click", e => {
            let timestamp = e.target.parentElement.getAttribute("data-timestamp");
            haushaltsbuch.eintrag_entfernen(timestamp);
        })
    }

}