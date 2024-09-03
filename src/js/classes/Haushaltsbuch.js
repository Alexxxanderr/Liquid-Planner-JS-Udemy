import Navigationsleiste from "./Navigationsleiste.js";
import Eingabeformular from "./Eingabeformular.js";
import Monatslistensammlung from "./Monatslistensammlung.js";
import Gesamtbilanz from "./Gesamtbilanz.js";
import Eintrag from "./Eintrag.js";

export default class Haushaltsbuch {

    constructor() {
        this._eintraege = [];
        this._navigationsleiste = new Navigationsleiste();
        this._eingabeformular = new Eingabeformular();
        this._monatslistensammlung = new Monatslistensammlung();
        this._gesamtbilanz = new Gesamtbilanz();
        this._wiederherstellen();
    } 

    _speichern(){
       localStorage.setItem("eintraege", JSON.stringify(this._eintraege));
    }

    _wiederherstellen(){
        let eintraege = localStorage.getItem("eintraege");
        eintraege = JSON.parse(eintraege);
        if (eintraege !== null) {
            eintraege.forEach(element => {
                this.eintrag_hinzufuegen({
                    titel: element._titel,
                    betrag: element._betrag,
                    typ: element._typ,
                    datum: new Date(element._datum)
                });
             });
        }
    }

    eintrag_hinzufuegen(formulardaten) { 
        let neuer_eintrag = new Eintrag(
            formulardaten.titel,
            formulardaten.betrag,
            formulardaten.typ,
            formulardaten.datum
        );
        this._eintraege.push(neuer_eintrag); 
        this._speichern();
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege);
    }
        
    eintrag_entfernen(timestamp){
        let start_index;
        for (let i = 0; i < this._eintraege.length; i++){
            if(this._eintraege[i].timestamp() === parseInt(timestamp)){
                start_index = i;
                break;
            }
        }
        this._eintraege.splice(start_index,1);
        this._monatslistensammlung.aktualisieren(this._eintraege);
        this._gesamtbilanz.aktualisieren(this._eintraege); 
        this._speichern();
    }
    
    start(){
        this._navigationsleiste.anzeigen();
        this._eingabeformular.anzeigen();
        this._monatslistensammlung.anzeigen();
        this._gesamtbilanz.anzeigen();
    }
}