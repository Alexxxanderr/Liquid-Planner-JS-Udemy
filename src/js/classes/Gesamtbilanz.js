
export default class Gesamtbilanz {
    
    constructor() {
        this._resetGesamtbilanz();
        this._html = this._html_generieren();
    }

    _resetGesamtbilanz(){
        this._einnahmen = 0;
        this._ausgaben = 0;
        this._bilanz = 0;
    }

    aktualisieren(eintraege) {
        this._resetGesamtbilanz();
        eintraege.forEach(eintrag => {
            switch (eintrag.typ()) {
                case "einnahme":
                    this._einnahmen = this._einnahmen + eintrag.betrag();
                    this._bilanz = this._bilanz + eintrag.betrag();
                    break;
                case "ausgabe":
                    this._ausgaben = this._ausgaben + eintrag.betrag();
                    this._bilanz = this._bilanz - eintrag.betrag();
                    break;
                default:
                    console.log(`Der Typ "${eintrag.typ()}" ist nicht bekannt.`);
                    break;   
            }
        });  
        this._html = this._html_generieren();
        this.anzeigen();          
    }

    _html_generieren() {
        
        let gesamtbilanz = document.createElement("aside");
        gesamtbilanz.setAttribute("id", "gesamtbilanz");

        let ueberschrift = document.createElement("h1");
        ueberschrift.textContent = "Gesamtbilanz";
        gesamtbilanz.insertAdjacentElement("afterbegin", ueberschrift);

        let einnahmen = document.createElement("div");
        einnahmen.setAttribute("class", "gesamtbilanz-zeile einnahmen");
        let span_einnahmen = document.createElement("span");
        span_einnahmen.textContent = "Einnahmen:";
        einnahmen.insertAdjacentElement("afterbegin", span_einnahmen);
        let span_betrag_einnahmen = document.createElement("span");
        span_betrag_einnahmen.textContent = `${(this._einnahmen / 100).toFixed(2).replace(/\./, ",")} €`;
        einnahmen.insertAdjacentElement("beforeend", span_betrag_einnahmen);
        gesamtbilanz.insertAdjacentElement("beforeend", einnahmen);

        let ausgaben = document.createElement("div");
        ausgaben.setAttribute("class", "gesamtbilanz-zeile ausgaben");
        let span_ausgaben = document.createElement("span");
        span_ausgaben.textContent = "Ausgaben:";
        ausgaben.insertAdjacentElement("afterbegin", span_ausgaben);
        let span_betrag_ausgaben = document.createElement("span");
        span_betrag_ausgaben.textContent = `${(this._ausgaben /100).toFixed(2).replace(/\./, ",")} €`;
        ausgaben.insertAdjacentElement("beforeend", span_betrag_ausgaben);
        gesamtbilanz.insertAdjacentElement("beforeend", ausgaben);

        let bilanz = document.createElement("div");
        bilanz.setAttribute("class", "gesamtbilanz-zeile bilanz");
        let span_bilanz = document.createElement("span");
        span_bilanz.textContent = "Bilanz:";
        bilanz.insertAdjacentElement("afterbegin", span_bilanz);
        let span_betrag_bilanz = document.createElement("span");
        this._bilanz >= 0 ? span_betrag_bilanz.setAttribute("class", "positiv") : span_betrag_bilanz.setAttribute("class", "negativ");
        span_betrag_bilanz.textContent = `${(this._bilanz /100).toFixed(2).replace(/\./, ",")} €`;
        bilanz.insertAdjacentElement("beforeend", span_betrag_bilanz);
        gesamtbilanz.insertAdjacentElement("beforeend", bilanz);

        return gesamtbilanz;
    }

    anzeigen() {
        let gesamtbilanz = document.querySelector("#gesamtbilanz");
        if (gesamtbilanz !== null) {
            gesamtbilanz.remove();
        }
        document.querySelector("body").insertAdjacentElement("beforeend", this._html);
    }
}