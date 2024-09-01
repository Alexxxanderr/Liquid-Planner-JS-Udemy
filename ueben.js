"use strict"

// Cookie setzen

document.cookie = "MyCookieName=Wert";
document.cookie = "Alexander=Gerdt";
document.cookie = `${encodeURIComponent("ein key;value-paar")}=${encodeURIComponent("key=value")}`;
document.cookie = "3SekCookie=; max-age=3";
// setTimeout(() => console.log(document.cookie),2000);
// setTimeout(() => console.log(document.cookie),4000);
document.cookie = `24SHCookie=; max-age=${60*60*24*365}`;

const set_Cookie = function(name, wert, haltbarkeit){
    let cookie = `${encodeURIComponent(name)}=`;
    if(wert){
        cookie += `${encodeURIComponent(wert)}`;
    }
    if(haltbarkeit){
        cookie += `; max-age=${haltbarkeit}`;
    }
    document.cookie = cookie;
}

set_Cookie("passwort", "§$%uI[]!Äd", 60*60*8);
set_Cookie("passwörter");

// Cookie überschreiben

set_Cookie("zahlen", "5548978", 60*60*24*30);
set_Cookie("zahlen", "8856473", 60*60*24*30);

// Cookie löschen

const delete_cookie = function(name){
    document.cookie = `${encodeURIComponent(name)}=; max-age=-1`;
}

delete_cookie("zahlen");

// Cookie auslesen
// MyCookieName=Wert; Alexander=Gerdt; ein%20key%3Bvalue-paar=key%3Dvalue; 24SHCookie=; passwort=%C2%A7%24%25uI%5B%5D!%C3%84d; passw%C3%B6rter=; zahlen; 3SekCookie=

const get_cookie = function(name){
    let cookie_array = document.cookie.split(";");
    let regex = new RegExp(`^\\s?${encodeURIComponent(name)}=`);
    for(let cookie of cookie_array){
        if(cookie.match(regex)){
            return decodeURIComponent(cookie.replace(regex, ""));
        }
    }
}

console.log(get_cookie("passwort"));

const has_cookie = function(name){
    let cookie_array = document.cookie.split(";");
    let regex = new RegExp(`^\\s?${encodeURIComponent(name)}=`);
    for(let cookie of cookie_array){
        if(cookie.match(regex)){
            return true;
        }
    }
    return false;
}

console.log(has_cookie("passswort"));

console.log(document.cookie);

class Konto {

    constructor(iban, inhaber, einzahlung) {
        this.iban = iban;
        this.inhaber = [inhaber];
        this.saldo = parseFloat(einzahlung);
        this.aktiv = true
    }

    set einzahlen(einzahlung){
        this.saldo += einzahlung;
    }

    set abheben(auszahlung){
        this.saldo -= auszahlung;
    }

    get kontostand_abfragen(){
        return this.saldo;
    }
}

let k = new Konto("DE125489658555","Max Mustermann", 5000);
console.log(k);

let k_als_json_string = JSON.stringify(k);
console.log(k_als_json_string);

let k_als_objekt = JSON.parse(k_als_json_string);
console.log(k_als_objekt);

let k_neu = new Konto(k_als_objekt.iban, k_als_objekt.inhaber, k_als_objekt.saldo);
console.log(k_neu);

// Items setzen

localStorage.setItem("name", "Gerdt");
localStorage.setItem("alter", "40");
console.log(localStorage);
console.log(localStorage.getItem("alter"));

// Items entfernen

localStorage.removeItem("name");
console.log(localStorage);

// Localstorage leeren/löschen

// localStorage.clear();
// console.log(localStorage);

sessionStorage.setItem("Mitglied", true);
console.log(sessionStorage);

sessionStorage.setItem("Status", "unbekannt");
sessionStorage.removeItem("Mitglied");
console.log(sessionStorage);
