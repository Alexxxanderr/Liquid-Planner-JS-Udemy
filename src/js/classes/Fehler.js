"use strict"

class Fehler {

    constructor(fehlerText, formularFehler) {
        this._fehlerText = fehlerText;
        this._formularFehler = formularFehler;
        this._html = this._html_generieren();
    }
    
    _html_generieren() {

        let fehlerbox = document.createElement("div");
        fehlerbox.setAttribute("class", "fehlerbox");
        
        let fehlertext = document.createElement("span");
        fehlertext.textContent = this._fehlerText;
        fehlerbox.insertAdjacentElement("afterbegin", fehlertext);

        let fehlerliste = document.createElement("ul");
        this._formularFehler.forEach(e => {
            let fehlerlistenpunkt = document.createElement("li")
            fehlerlistenpunkt.textContent = e;
            fehlerliste.insertAdjacentElement("beforeend", fehlerlistenpunkt);
        });

        fehlerbox.insertAdjacentElement("beforeend", fehlerliste);

        return fehlerbox;
    }

    _entfernen() {
        let bestehendeFehlerbox = document.querySelector(".fehlerbox");
        if (bestehendeFehlerbox !== null){
            bestehendeFehlerbox.remove();
        }
    }

    anzeigen() {
        this._entfernen();
        let eingabeformular = document.querySelector("#eingabeformular");
        if (eingabeformular !== null) {
            eingabeformular.insertAdjacentElement("afterbegin", this._html);
        }

    }

}