// DeclaraciÃ³ de variables globales
let obj = [];
// Fi de la declaraciÃ³ de variables globales

/********************************************************************************/
/* FunciÃ³ readSingleFile(e)                                                     */
/* FunciÃ³ que permet que l'usuari recuperi un arxiu del seu disc dur            */
/********************************************************************************/

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  let reader = new FileReader();
  reader.onload = function (e) {
    let contents = e.target.result;
    generaObj(contents);
  };
  reader.readAsText(file);
}


/********************************************************************************/
/* FunciÃ³ generaObj(contents)                                                   */
/* Aquesta funciÃ³ converteix les dades rebudes, en format csv en un objecte     */
/* que tÃ© els segÃ¼ents camps:                                                   */
/* - diaSet --> Dia de la setmana (en text)                                     */
/* - mes --> Mes (nÃºmeric)                                                      */
/* - nomMes --> Nom del mes                                                     */
/* - diaMes --> Dia del mes                                                     */
/* - hora --> hora (sense minuts). Valor enter entre 0 i 23                     */
/* - descAcc --> DescripciÃ³ de l'accident                                       */
/* - districte --> Nom del districte                                            */
/* - nDist --> NÃºmero de districte                                              */
/* - barri --> Nom del barri                                                    */
/* L'arxiu original tÃ© mÃ©s dades, perÃ² per a aquests exercicis s'han agafat     */
/* nomÃ©s aquestes.                                                              */
/********************************************************************************/

function generaObj(contents) {
  const element = document.getElementById("file-parsed");
  const json = contents.split("\r");
  const fi = json.length;
  let taula = [];
  let t = json[1].split(",");
  document.getElementById("any").innerHTML = "Any: "+t[9].replace(/['"]+/g, '');

  for (let i = 1; i < fi-1; i++) {
    let taula = json[i].split(",");
    if (taula[4][0]==='"') {
      obj[i - 1] = {};
      obj[i - 1].diaSet  = taula[9];
      obj[i - 1].mes = parseInt(taula[11]);
      obj[i - 1].nomMes = taula[12];
      obj[i - 1].diaMes = parseInt(taula[13]);
      obj[i - 1].hora = parseInt(taula[14]);
      obj[i - 1].descAcc = taula[15];
      obj[i - 1].districte = taula[2];
      obj[i - 1].nDist = parseInt(taula[1]); 
      obj[i - 1].barri = taula[4]+","+taula[5];
    } else {
      obj[i - 1] = {};
      obj[i - 1].diaSet  = taula[8];
      obj[i - 1].mes = parseInt(taula[10]);
      obj[i - 1].nomMes = taula[11];
      obj[i - 1].diaMes = parseInt(taula[12]);
      obj[i - 1].hora = parseInt(taula[13]);
      obj[i - 1].descAcc = taula[14];
      obj[i - 1].districte = taula[2];
      obj[i - 1].nDist = parseInt(taula[1]); 
      obj[i - 1].barri = taula[4];
    }
  }
  return obj;
}

// Afegim el esdeveniment que crida a la funciÃ³ que llegeix les dades quan es modifica 
// el contingut del camp d'entrada d'arxius.

document.getElementById("file-input").addEventListener("change", readSingleFile, false);

/********************************************************************************/
/* FunciÃ³ creaFormulari()                                                       */
/* Crea un formulari que permet seleccionar el districte i l'opciÃ³ a portar a   */
/* terme. Per a fer aixÃ² es crea un select per seleccionar el districte i uns   */
/* radio buttons per seleccionar quines dades es volen obtenir                  */
/********************************************************************************/

function creaFormulari() {
  let text = document.getElementById("resultats");
  text.innerHTML = ""; // Esborro qualsevol contingut anterior
  // Recuperem els noms dels districtes de la taula obj
  // Hem de tenir present que hi ha un districte -1 que Ã©s "no conegut".
  let f = document.createElement("form"); // Creem el formulari
  f.name="formulari"; // Definim l'atribut name="formulari"

  // CreaciÃ³ del select
  let districtes = [];
  districtes[0] = "Altres";
  for (let i= 1; i < 11; i++) {
    districtes[i] = obj.find(element => element.nDist === i).districte;
  }
  let sel = document.createElement("select");
  sel.name="districtes"; 
  sel.id="districtes";
  for (let i = 0; i < 11; i++) {
    let op = document.createElement("option");
    op.appendChild(document.createTextNode(districtes[i]));
    op.value = districtes[i];
    sel.appendChild(op);
  }
  f.appendChild(sel); // Afegim el select al formulari.

  text.appendChild(f);

}
