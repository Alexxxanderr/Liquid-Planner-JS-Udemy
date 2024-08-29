"use strict"

class Eingabeformular {

    constructor() {
        this._html = this._html_generieren();
    }

    _formulardatenHolen(e) {

        return {
            titel: e.target[0].value,
            betrag: e.target[3].value,
            einnahme: e.target[1].checked,
            datum: e.target[4].valueAsDate
        }
    }

    _formularDatenVerarbeiten(formulardaten){
        return {
            titel: formulardaten.titel.trim(),
            typ: formulardaten.einnahme === false ? "ausgabe" : "einnahme",
            betrag: parseFloat(formulardaten.betrag) * 100,
            datum: formulardaten.datum,
        }
    }

    _formularDatenValidieren(formulardaten){
        let fehler = []; 
        if (formulardaten.titel === ""){
            fehler.push("Der Titel wurde nicht angegeben!");
        }
        if (isNaN(formulardaten.betrag) === true){
            fehler.push("Der Typ Betrag ist unbekannt!");
        }
        if (formulardaten.datum === null){
            fehler.push("Das Datumsformat ist unbekannt!");
        }
        return fehler;
    }
    
    _datumAktualisieren(){
        let datumInput = document.querySelector("#datum");
        if (datumInput !== null){
            datumInput.valueAsDate = new Date();
        }
    }

    _absendeEventHinzufuegen(eingabeformular){
        eingabeformular.querySelector("#eingabeformular").addEventListener("submit", e => {
            e.preventDefault();
            let formulardaten = this._formularDatenVerarbeiten(this._formulardatenHolen(e));
            let formularFehler = this._formularDatenValidieren(formulardaten);
            if(formularFehler.length === 0){
                haushaltsbuch.eintrag_hinzufuegen(formulardaten);
                this._fehlerEntfernen();
                e.target.reset(); 
                this._datumAktualisieren();
            }else { 
                let fehler = new Fehler("Folgende Felder wurden nicht korrekt ausgefüllt!", formularFehler);
                fehler.anzeigen();
            } 
        });
    }

    _fehlerEntfernen() {
        let bestehendeFehlerbox = document.querySelector(".fehlerbox");
        if (bestehendeFehlerbox !== null){
            bestehendeFehlerbox.remove();
        }
    }

    _html_generieren(){
        let formularhtml = `<form id="eingabeformular" action="#" method="get"></form>
        <div class="eingabeformular-zeile">
            <h1>Neue Einnahme / Ausgabe hinzufügen</h1>
        </div>
        <div class="eingabeformular-zeile">
            <div class="titel-typ-eingabe-gruppe">
                <label for="titel">Titel</label>
                <input type="text" id="titel" form="eingabeformular" name="titel" placeholder="z.B. Einkaufen" size="10" title="Titel des Eintrags" >
                <input type="radio" id="einnahme" name="typ" value="einnahme" form="eingabeformular" title="Typ des Eintrags">
                <label for="einnahme" title="Typ des Eintrags">Einnahme</label>
                <input type="radio" id="ausgabe" name="typ" value="ausgabe" form="eingabeformular" title="Typ des Eintrags" checked>
                <label for="ausgabe" title="Typ des Eintrags">Ausgabe</label>
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <div class="betrag-datum-eingabe-gruppe">
                <label for="betrag">Betrag</label>
                <input type="number" id="betrag" name="betrag" form="eingabeformular" placeholder="z.B. 10,42" size="10" step="0.01" title="Betrag des Eintrags (max. zwei Nachkommastellen, kein €-Zeichen)" >
                <label for="datum">Datum</label>
                <input type="date" id="datum" name="datum" form="eingabeformular" placeholder="jjjj-mm-tt" size="10" title="Datum des Eintrags (Format: jjjj-mm-tt)" >
            </div>
        </div>
        <div class="eingabeformular-zeile">
            <button class="standard" type="submit" form="eingabeformular">Hinzufügen</button>
        </div>`;
        let eingabeformular = document.createElement("section");
        eingabeformular.setAttribute("id", "eingabeformular-container");
        eingabeformular.innerHTML = formularhtml;
        
        this._absendeEventHinzufuegen(eingabeformular);

        return eingabeformular;
    }
    anzeigen(){
        let nav = document.querySelector("body");
        if (nav !== null){
            nav.insertAdjacentElement("afterbegin", this._html);
            this._datumAktualisieren();
        }
    }
    
}