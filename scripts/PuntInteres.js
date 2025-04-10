class PuntInteres {
    #id
    #esManual

    static totalTasques = 0;

    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio) {
        this.#id = id;
        this.#esManual = esManual;
        this.pais = pais;
        this.ciutat = ciutat;
        this.nom = nom;
        this.direccio = direccio;
        this.tipus = tipus;
        this.latitud = latitud;
        this.longitud = longitud;
        this.puntuacio = puntuacio;

        PuntInteres.totalTasques++;
    }

    get id() {
        return this.#id;
    }

    get esManual() {
        return this.#esManual;
    }

    set id(nouId) {
        this.#id = nouId;
    }

    set esManual(nouEsManual) {
        this.#esManual = nouEsManual;
    }

    static obtenirTotalElements() {
        return PuntInteres.totalTasques;
    }

}

class Atraccio extends PuntInteres {
    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
    }

    get preuIva() {
        if (moneda === '€') {
            IVA = ivaEspanya;
        } else if (moneda === '£') {
            IVA = ivaAnglaterra;
        } else if (!moneda) {
            IVA = 1;
        }
    }
}

class Museu extends PuntInteres {

    constructor(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio, horaris, preu, moneda, descripcio) {
        super(id, esManual, pais, ciutat, nom, direccio, tipus, latitud, longitud, puntuacio);
        this.horaris = horaris;
        this.preu = preu;
        this.moneda = moneda;
        this.descripcio = descripcio;
    }

    get preuIva() {
        if (moneda === '€') {
            IVA = ivaEspanya;
        } else if (moneda === '£') {
            IVA = ivaAnglaterra;
        } else if (!moneda) {
            IVA = 1;
        }
    }
}