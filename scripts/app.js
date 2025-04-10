const mapa = new Mapa();

const dropZoneObj = document.querySelector(".dropZone");

let fitxer = []

let puntInteres = [];
let museu = [];
let atraccio = [];

//Funció per detectar quan un fitxer ha sigut arrossegat a la drop zone.
dropZoneObj.addEventListener("dragover", function (event) {
    event.preventDefault(); // Evita que la pantalla refresqui es pugui continuar con el flujo de ejecución.
    console.log("dragover");
});
//Funció per detectar quan un fitxer ha sigut llançat a la drop zone.
dropZoneObj.addEventListener("drop", function (event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    loadFile(files);
})

const loadFile = function (files) {
    if (files && files.length > 0) {
        const file = files[0];
        const extensio = file.name.split(".")[1];
        if (extensio.toLowerCase() === FILE_EXTENSION) {
            console.log("El fitxer té un format correcte.")
            readCSV(file);
        } else {
            alert("El fitxer no té un format correcte.")
        }
    }
}

const readCSV = function (file) {
    const reader = new FileReader();
    const tipusSet = new Set(); //Set que conté els tipus de les ubicacions
    const tipusObj = document.querySelector(".tipus"); //Objecte que desplegarà els tipus a la vista.

    reader.onload = () => {

        // Aquí rebem la informació
        fitxer = reader.result.trim().split("\n").slice(1);
        console.log(fitxer);
        loadData(fitxer)

        //Afegim al tipusSet els tipus que hi ha al CSV
        for(let i = 0; i<fitxer.length; i++){
            const camps = fitxer[i].split(CHAR_CSV);
            const tipus = camps[TIPUS]
            console.log("TESTEST", tipus);
            tipusSet.add(tipus);
        }
        console.log(tipusSet);

        //Per netejar el desplegable al afegir un nou fitxer es crea una copia de tipusObj amb el spreadOperator (...)
        [...tipusObj.options].forEach((option) => {
            if (option.textContent !== "Tots") {
                tipusObj.removeChild(option);
            }
        });

        //Per cada tipus que hi hagi creem un element i l'afegim al desplegable
        tipusSet.forEach((tipus) => {
            const option = document.createElement("option");
            option.value = tipus;
            option.textContent = tipus;
            tipusObj.appendChild(option);
        })

    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file, "UTF-8");

}

const pintarEspai = function(obj){
    const pintarEsp = document.createElement("div"); //Div que contindrà una localització
    pintarEsp.classList.add("espai");

    const titolEsp = document.createElement("div") //Div DINS del contenidor de la localització, amb el nom de l'espai
    const nom = document.createElement("h3");
    nom.textContent = obj.nom;
    titolEsp.appendChild(nom);
    titolEsp.classList.add("titol-localitzacio");
    pintarEsp.appendChild(titolEsp);

    
    const infoEsp = document.createElement("div"); //Div DINS del contenidor de la localització, sota el nom de l'espai, que conté la informació del lloc
    infoEsp.classList.add("info-localitzacio");

    const ciutat = document.createElement("p");
    ciutat.textContent = `Ciutat: ${obj.ciutat} | `;
    infoEsp.appendChild(ciutat);

    const tipus = document.createElement("p");
    tipus.textContent = `Tipus: ${obj.tipus}`;
    infoEsp.appendChild(tipus);
 
    pintarEsp.appendChild(infoEsp);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("boto-delete");
    deleteButton.textContent = "Borrar";
    deleteButton.addEventListener("click", () => {
        pintarEsp.remove();
        puntInteres = puntInteres.filter(item => item !== obj);
    });

    pintarEsp.appendChild(deleteButton);

    document.querySelector(".informacio").appendChild(pintarEsp);    
}

const pintarMuseu = function(obj){
    const pintarMus = document.createElement("div"); //Div que contindrà una localització
    pintarMus.classList.add("museu");

    const titolMus = document.createElement("div") //Div DINS del contenidor de la localització, amb el nom del museu
    const nom = document.createElement("h3");
    nom.textContent = obj.nom;
    titolMus.appendChild(nom);
    titolMus.classList.add("titol-localitzacio");
    pintarMus.appendChild(titolMus);

    
    const infoMus = document.createElement("div"); //Div DINS del contenidor de la localització, sota el nom del museu, que conté la informació del lloc
    infoMus.classList.add("info-localitzacio");

    const ciutat = document.createElement("p");
    ciutat.textContent = `Ciutat: ${obj.ciutat}`;
    infoMus.appendChild(ciutat);

    const tipus = document.createElement("p");
    tipus.textContent = `Tipus: ${obj.tipus}`;
    infoMus.appendChild(tipus);

    const horaris = document.createElement("p");
    horaris.textContent = `Horaris: ${obj.horaris}`;
    infoMus.appendChild(horaris);

    const preu = document.createElement("p");
    preu.textContent = `Preu: ${obj.preu}`;
    infoMus.appendChild(preu);

    const descripcio = document.createElement("p");
    descripcio.textContent = `Descripció: ${obj.descripcio}`;
    infoMus.appendChild(descripcio);
 
    pintarMus.appendChild(infoMus);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("boto-delete");
    deleteButton.textContent = "Borrar";
    deleteButton.addEventListener("click", () => {
        pintarMus.remove();
        museu = museu.filter(item => item !== obj);
    });

    pintarMus.appendChild(deleteButton);

    document.querySelector(".informacio").appendChild(pintarMus);        
}

const pintarAtraccio = function(obj){
    const pintarAtrac = document.createElement("div"); //Div que contindrà una localització
    pintarAtrac.classList.add("atraccio");

    const titolAtrac = document.createElement("div") //Div DINS del contenidor de la localització, amb el nom de la atracció
    const nom = document.createElement("h3");
    nom.textContent = obj.nom;
    titolAtrac.appendChild(nom);
    titolAtrac.classList.add("titol-localitzacio");
    pintarAtrac.appendChild(titolAtrac);

    
    const infoAtrac = document.createElement("div"); //Div DINS del contenidor de la localització, sota el nom de la atracció, que conté la informació del lloc
    infoAtrac.classList.add("info-localitzacio");

    const ciutat = document.createElement("p");
    ciutat.textContent = `Ciutat: ${obj.ciutat}  | `;
    infoAtrac.appendChild(ciutat);

    const tipus = document.createElement("p");
    tipus.textContent = `Tipus: ${obj.tipus}  | `;
    infoAtrac.appendChild(tipus);

    const horaris = document.createElement("p");
    horaris.textContent = `Horaris: ${obj.horaris}  | `;
    infoAtrac.appendChild(horaris);

    const preu = document.createElement("p");
    preu.textContent = `Preu: ${obj.preu}`;
    infoAtrac.appendChild(preu);
 
    pintarAtrac.appendChild(infoAtrac);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("boto-delete");
    deleteButton.textContent = "Borrar";
    deleteButton.addEventListener("click", () => {
        pintarAtrac.remove();
        atraccio = atraccio.filter(item => item !== obj);
    });

    pintarAtrac.appendChild(deleteButton);

    document.querySelector(".informacio").appendChild(pintarAtrac);        
}

const loadData = function (fitxer) {
    console.log("HOLAHOLAHOLA");
    let numId = 1;

    fitxer.forEach((obj) => {
        let dades = obj.split(CHAR_CSV); // CHAR_CSV es una constante definida en const.js. No hace falta definirla pero son buenas prácticas.
        const tipus = dades[TIPUS];
        switch (tipus.toLowerCase()) {
            case "espai":
                console.log("Instancia objecte PuntInteres");
                const espaiObj = new PuntInteres(numId, dades[PAIS], dades[CODI], dades[CIUTAT], dades[NOM], dades[DIR], tipus, dades[LAT], dades[LON], dades[PUNT]);
                puntInteres.push(espaiObj);
                pintarEspai(espaiObj);
                numId++;
                break;

            case "museu":
                console.log("Instancia objecte Museu");
                const museuObj = new Museu(numId, dades[PAIS], dades[CODI], dades[CIUTAT], dades[NOM], dades[DIR], tipus, dades[LAT], dades[LON], dades[PUNT], dades[HORARIS], dades[PREU], dades[MON], dades[DESC]);
                museu.push(museuObj);
                pintarMuseu(museuObj);
                numId++;
                break;

            case "atraccio":
                console.log("Instancia objecte Atracció");
                const atraccioObj = new Atraccio(numId, dades[PAIS], dades[CODI], dades[CIUTAT], dades[NOM], dades[DIR], tipus, dades[LAT], dades[LON], dades[PUNT], dades[HORARIS], dades[PREU], dades[MON]);
                atraccio.push(atraccioObj);
                pintarAtraccio(atraccioObj);
                numId++;
                break;

            default:
                throw new Error(() => {
                    alert("Has afegit un tipus que no és correcte");
                });
        }
    });
    console.log("JIBOIB");
}










// //Posar un punt al mapa
// const markerPosition = [41.3870, 2.1699];

// const popupText = `<h2>Punt d'interès</h2>
//                     <h3>Barcelona</h3>`;
// const marker = L.marker(markerPosition).bindPopup(popupText).addTo(map).openPopup();
