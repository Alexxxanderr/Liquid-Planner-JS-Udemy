"use strict"

class Haushaltsbuch {

    constructor() {
        this._eintraege = [];
        this._monatslistensammlung = new Monatslistensammlung();
        this._gesamtbilanz = new Gesamtbilanz();
    }

    eintrag_hinzufuegen(formulardaten){
        let neuerEintrag = new Eintrag(
            formulardaten.titel,
            formulardaten.betrag,
            formulardaten.typ,
            formulardaten.datum
        );
        this._eintraege.push(neuerEintrag);
        console.log(this);
        this._eintraege_sortieren();
        this._eintraege_anzeigen();
        this._gesamtbilanz_erstellen();
        this._gesamtbilanz_anzeigen();
    }

    eintragEntfernen(timestamp){

        let index;
        for (let i = 0; i < this._eintraege.length; i++){
            if( this._eintraege[i].timestamp() === parseInt(timestamp)){
                index = i;
                break;
            }
        };
        this._eintraege.splice(index, 1);
        this._eintraege_anzeigen();
        this._gesamtbilanz_erstellen();
        this._gesamtbilanz_anzeigen();
    }

    _eintraege_sortieren(){
        this._eintraege.sort((a, b) => {
            return a.datum() > b.datum() ? -1 : a.datum() < b.datum() ? 1 : 0;
        });
    }

    eintraege_ausgeben(){
        console.clear();
        this._eintraege.forEach((eintrag) => {
            console.log(`Titel: ${eintrag.get("titel")},\nTyp: ${eintrag.get("typ")},\nBetrag: ${(eintrag.get("betrag")/100).toFixed(2)} €,\nDatum: ${eintrag.get("datum").toLocaleString("de-DE", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                })}.`);
        });
    }

    _eintraege_anzeigen(){
        document.querySelectorAll(".monatsliste ul").forEach(e => e.remove());
        let eintragsliste = document.createElement("ul");
        
        this._eintraege.forEach(eintrag => { eintragsliste.insertAdjacentElement("beforeend", eintrag.html()); });
        document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", eintragsliste);
    }

}