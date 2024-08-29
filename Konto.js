"use strict"

class Konto {

    constructor(iban, inhaber, einzahlung){
        this._iban = iban;
        this._inhaber = [inhaber];
        this._saldo = einzahlung;
        this._aktiv = true;
    }

    einzahlen(einzahlung) {
        this._saldo += einzahlung;
    }

    abheben(auszahlung) {
        this._saldo -= auszahlung;
    }

    kontostand_abfragen() {
        console.log(this._saldo);
    }

}

class Kinderkonto extends Konto {
    constructor(iban, inhaber, einzahlung, limit){
        super(iban, inhaber, einzahlung);
        this._limit = limit * -1;
    }

    _saldoPruefen(auszahlung){
        return this._saldo - auszahlung < this._limit ? false : true;
    }

    abheben(auszahlung){
        this._saldoPruefen(auszahlung) ? super.abheben(auszahlung) : console.log("Auszahlung nicht möglich!");
    }
}