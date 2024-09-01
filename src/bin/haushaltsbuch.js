"use strict";

const haushaltsbuch = {

    gesamtbilanz: new Map(),

    eintraege:[],

        eintrag_hinzufuegen(formulardaten) {
            let neuer_eintrag = new Map;
            neuer_eintrag.set("titel", formulardaten.titel);
            neuer_eintrag.set("typ", formulardaten.typ);
            neuer_eintrag.set("betrag", formulardaten.betrag);
            neuer_eintrag.set("datum", formulardaten.datum);
            neuer_eintrag.set("timestamp", Date.now());
            this.eintraege.push(neuer_eintrag);

            this.eintraege_sortieren();
            this.eintraege_anzeigen();
            this.gesamtbilanz_erstellen();
            this.gesamtbilanz_anzeigen();  
        }, 
          
        eintrag_entfernen(timestamp){
            let start_index;

            for (let i = 0; i < this.eintraege.length; i++){
                if(this.eintraege[i].get("timestamp") === parseInt(timestamp)){
                    start_index = i;
                    break;
                }
            }

            this.eintraege.splice(start_index,1);
            this.eintraege_anzeigen();
            this.gesamtbilanz_erstellen();
            this.gesamtbilanz_anzeigen();    
        },

        // --- Alternative ---
        // eintrag_entfernen(timestamp) {
        //     let index = this.eintraege.findIndex(eintrag => eintrag.get("timestamp") === parseInt(timestamp));
        //     this.eintraege.splice(index, 1);
        //     this.anzeige_aktualisieren();
        //   },
         
        //   anzeige_aktualisieren() {
        //     this.eintraege_sortieren();
        //     this.eintraege_anzeigen();
        //     this.gesamtbilanz_erstellen();
        //     this.gesamtbilanz_anzeigen();
        //   },

        eintrag_entfernen_event_hinzufuegen(li){

            li.querySelector(".entfernen-button").addEventListener("click", e => {
                let timestamp = e.target.parentElement.getAttribute("data-timestamp");
                this.eintrag_entfernen(timestamp);
            })
        },

       eintraege_sortieren(){
            this.eintraege.sort( (a,b) => {
                return a.get("datum") > b.get("datum") ? -1 : a.get("datum") < b.get("datum") ? 1 : 0 ;
            });
       },

        html_eintrag_generieren(eintrag){
            let li = document.createElement("li");
            eintrag.get("typ") === "einnahme" ? li.setAttribute("class", "einnahme") : li.setAttribute("class", "ausgabe");
            li.setAttribute("data-timestamp", eintrag.get("timestamp"));

            let  span_datum = document.createElement("span");
            span_datum.setAttribute("class", "datum");
            span_datum.textContent = eintrag.get("datum").toLocaleDateString("de-DE", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
            li.insertAdjacentElement("afterbegin", span_datum);

            let  span_titel = document.createElement("span");
            span_titel.setAttribute("class", "titel");
            span_titel.textContent = eintrag.get("titel");
            span_datum.insertAdjacentElement("afterend", span_titel);

            let  span_betrag = document.createElement("span");
            span_betrag.setAttribute("class", "betrag");
            span_betrag.textContent = `${(eintrag.get("betrag") / 100).toFixed(2).replace(/\./, ",")} €`;
            span_titel.insertAdjacentElement("afterend", span_betrag);

            let button_entfernen = document.createElement("button");
            button_entfernen.setAttribute("class", "entfernen-button");
            span_betrag.insertAdjacentElement("afterend", button_entfernen);

            let i = document.createElement("i");
            i.setAttribute("class", "fa fa-trash");
            button_entfernen.insertAdjacentElement("afterbegin", i);
            
            this.eintrag_entfernen_event_hinzufuegen(li);

            return li;
        },

       eintraege_anzeigen(){ 

            document.querySelectorAll(".monatsliste ul").forEach(eintragsliste => eintragsliste.remove());
            let eintragsliste = document.createElement("ul");
            this.eintraege.forEach(eintrag => eintragsliste.insertAdjacentElement("beforeend", this.html_eintrag_generieren(eintrag)));
            document.querySelector(".monatsliste").insertAdjacentElement("afterbegin", eintragsliste); 
        },    

        gesamtbilanz_erstellen(){
            let neue_gesamtbilanz = new Map();

            neue_gesamtbilanz.set("einnahmen",0);
            neue_gesamtbilanz.set("ausgaben",0);
            neue_gesamtbilanz.set("bilanz",0);

            this.eintraege.forEach(e => {
                switch (e.get("typ")){
                    case "einnahme":
                        neue_gesamtbilanz.set("einnahmen",neue_gesamtbilanz.get("einnahmen") + e.get("betrag"));
                        neue_gesamtbilanz.set("bilanz",neue_gesamtbilanz.get("bilanz") + e.get("betrag"));
                        break;
                    case "ausgabe":
                        neue_gesamtbilanz.set("ausgaben",neue_gesamtbilanz.get("ausgaben") + e.get("betrag"));
                        neue_gesamtbilanz.set("bilanz",neue_gesamtbilanz.get("bilanz") - e.get("betrag"));
                        break;
                    default:
                        console.log(`Der Typ ist nicht bekannt.`);
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

            let einnahmen = document.createElement("div");
            einnahmen.setAttribute("class", "gesamtbilanz-zeile einnahmen");
            let span_einnahmen = document.createElement("span");
            span_einnahmen.textContent = "Einnahmen:";
            einnahmen.insertAdjacentElement("afterbegin", span_einnahmen);
            let span_betrag_einnahmen = document.createElement("span");
            span_betrag_einnahmen.textContent = `${(this.gesamtbilanz.get("einnahmen") / 100).toFixed(2).replace(/\./, ",")} €`;
            einnahmen.insertAdjacentElement("beforeend", span_betrag_einnahmen);
            gesamtbilanz.insertAdjacentElement("beforeend", einnahmen);

            let ausgaben = document.createElement("div");
            ausgaben.setAttribute("class", "gesamtbilanz-zeile ausgaben");
            let span_ausgaben = document.createElement("span");
            span_ausgaben.textContent = "Ausgaben:";
            ausgaben.insertAdjacentElement("afterbegin", span_ausgaben);
            let span_betrag_ausgaben = document.createElement("span");
            span_betrag_ausgaben.textContent = `${(this.gesamtbilanz.get("ausgaben")/100).toFixed(2).replace(/\./, ",")} €`;
            ausgaben.insertAdjacentElement("beforeend", span_betrag_ausgaben);
            gesamtbilanz.insertAdjacentElement("beforeend", ausgaben);

            let bilanz = document.createElement("div");
            bilanz.setAttribute("class", "gesamtbilanz-zeile bilanz");
            let span_bilanz = document.createElement("span");
            span_bilanz.textContent = "Bilanz:";
            bilanz.insertAdjacentElement("afterbegin", span_bilanz);
            let span_betrag_bilanz = document.createElement("span");
            this.gesamtbilanz.get("bilanz") >= 0 ? span_betrag_bilanz.setAttribute("class", "positiv") : span_betrag_bilanz.setAttribute("class", "negativ");
            span_betrag_bilanz.textContent = `${(this.gesamtbilanz.get("bilanz")/100).toFixed(2).replace(/\./, ",")} €`;
            bilanz.insertAdjacentElement("beforeend", span_betrag_bilanz);
            gesamtbilanz.insertAdjacentElement("beforeend", bilanz);

            return gesamtbilanz;
        },

        gesamtbilanz_anzeigen(){
            document.querySelectorAll("#gesamtbilanz").forEach(w =>  w.remove() );
            document.querySelector("body").insertAdjacentElement("beforeend", this.html_gesamtbilanz_generieren());
        }
};