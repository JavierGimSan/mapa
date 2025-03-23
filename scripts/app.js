const mapa = new Mapa();

const dropZoneObj = document.querySelector(".dropZone");

let fitxer = []

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
    reader.onload = () => {
        // Aquí rebem la informació
        fitxer = reader.result.trim().split("\n").slice(1);
        console.log(fitxer);
    };
    reader.onerror = () => {
        showMessage("Error reading the file. Please try again.", "error");
    };
    reader.readAsText(file, "UTF-8");
}

const pintarEspai = function(obj){
    const pi = document.createElement("div");
    //pi.textContent = //obj.etc...
}

const pintarMuseu = function(obj){
    
}

const pintarAtraccio = function(obj){
    
}

const loadData = function (fitxer) {
    numId++;
    fitxer.forEach((obj) => {
        let dades = liniaCSV.split(CHAR_CSV); // CHAR_CSV es una oncstante definida en const.js. No hace falta definirla pero son buenas prácticas.
        switch (obj.tipus.toLowerCase()) {
            case "espai":
                console.log("Instancia objecte PuntInteres");
                const espaiObj = new PuntInteres(numId, dades[PAIS], dades[CODI],);
                PuntInteres.push(obj);
                //FEINA PER FER: PUSH DE LA INSTÀNCIA DE L'OBJECTE
                pintarEspai(obj);
                break;

            case "museu":
                console.log("Instancia objecte PuntInteres");
                const museuObj = new Museu(dades[PAIS], dades[CODI]);
                PuntInteres.push(museuObj);
                //FEINA PER FER: PUSH DE LA INSTÀNCIA DE L'OBJECTE
                pintarMuseu(obj);
                break;

            case "atraccio":
                console.log("Instancia objecte PuntInteres");
                const atraccioObj = new Atraccio(dades[PAIS], dades[CODI]);
                PuntInteres.push(atraccioObj);
                //FEINA PER FER: PUSH DE LA INSTÀNCIA DE L'OBJECTE
                pintarAtraccio(obj);
                break;

            default:
                throw new Error(() => {
                    alert("Has afegit un tipus que no és correcte");
                });
        }
    });
}








// //Posar un punt al mapa
// const markerPosition = [41.3870, 2.1699];

// const popupText = `<h2>Punt d'interès</h2>
//                     <h3>Barcelona</h3>`;
// const marker = L.marker(markerPosition).bindPopup(popupText).addTo(map).openPopup();
