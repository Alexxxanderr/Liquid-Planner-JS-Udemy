
export default class Monatsliste {

    constructor(jahr, monat){
        this._jahr = jahr;
        this._monat = monat;
        this._eintraege = [];
        this._bilanz = 0;
        this._html = this._html_generieren();
    }

    monat() {
        return this._monat;
    }

    jahr() {
        return this._jahr;
    }

    html() {
        return this._html;
    }

    eintrag_hinzufuegen(eintrag){ 
        this._eintraege.push(eintrag);
        this._aktualisieren();
    }

    _eintraege_sortieren(){
        this._eintraege.sort((eintrag_a, eintrag_b) => {
            if (eintrag_a.datum() > eintrag_b.datum()) {
                return -1;
            } else if (eintrag_a.datum() < eintrag_b.datum()) {
                return 1;
            } else {
                if (eintrag_a.timestamp() > eintrag_b.timestamp()) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
   }

   _bilanzieren(){
    let bilanz = 0;
    this._eintraege.forEach(eintrag => {
        switch (eintrag.typ()) {
            case "einnahme":
                bilanz += eintrag.betrag();
                break;
            case "ausgabe":
                bilanz -= eintrag.betrag();
                break;
        }
    }); 
    this._bilanz = bilanz;
   }
    
    _html_generieren(){

        let article = document.createElement("article");
        article.setAttribute("class", "monatsliste");

        let h2 = document.createElement("h2");
        article.insertAdjacentElement("afterbegin", h2);

        let span = document.createElement("span");
        span.setAttribute("class", "monat-jahr");
        span.textContent = `${new Date(this._jahr, this._monat - 1).toLocaleString("de-DE", {
            month: "long",
            year: "numeric"
        })}`;
        h2.insertAdjacentElement("afterbegin", span);

        let span_2 =document.createElement("span");
        if(this._bilanz < 0){
            span_2.setAttribute("class", "monatsbilanz negativ");
        } else {
            span_2.setAttribute("class", "monatsbilanz positiv");
        }
        span_2.textContent = `${(this._bilanz / 100).toFixed(2).replace(/\./, ",")} €`;
        h2.insertAdjacentElement("beforeend", span_2);

        let eintragsliste = document.createElement("ul");
        this._eintraege.forEach(eintrag => {
            eintragsliste.insertAdjacentElement("beforeend", eintrag.html());
        }); 
        article.insertAdjacentElement("beforeend", eintragsliste); 

        return article;

    }

    _aktualisieren() {
        this._eintraege_sortieren()
        this._bilanzieren();
        this._html = this._html_generieren();
    }

}