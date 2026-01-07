// Treballarem sempre amb una variable global, obj,
// que conté tots els accidents carregats del CSV.

/* =================== EXERCICI 2.1 =================== */
/* Nombre total d'accidents de l'any seleccionat       */
function exercici01() {
  let resultat = document.getElementById("resultats");
  resultat.innerHTML = "";

  // El nombre total d'accidents és la mida de l'array
  let total = obj.length;

  let p = document.createElement("p");
  p.innerHTML = "<strong>Nombre total d'accidents:</strong> " + total;
  resultat.appendChild(p);
}

/* =================== EXERCICI 2.2 =================== */
/* Dia de la setmana amb més accidents                 */
function exercici02() {
  let resultat = document.getElementById("resultats");
  resultat.innerHTML = "";

  let comptador = {};

  // Comptem quants accidents hi ha per cada dia
  for (let i = 0; i < obj.length; i++) {
    let dia = obj[i].diaSet;

    if (comptador[dia] === undefined) {
      comptador[dia] = 1;
    } else {
      comptador[dia]++;
    }
  }

  // Busquem el dia amb el nombre més gran d'accidents
  let diaMax = "";
  let maxAccidents = 0;

  for (let dia in comptador) {
    if (comptador[dia] > maxAccidents) {
      maxAccidents = comptador[dia];
      diaMax = dia;
    }
  }

  let p = document.createElement("p");
  p.innerHTML =
    "<strong>Dia amb més accidents:</strong> " +
    diaMax +
    " (" +
    maxAccidents +
    ")";
  resultat.appendChild(p);
}

/* =================== EXERCICI 2.3 =================== */
/* Nombre d'accidents per districte                    */
function exercici03() {
  let resultat = document.getElementById("resultats");
  resultat.innerHTML = "";

  // Array de 0 a 10 (0 = Altres / desconegut)
  let comptador = new Array(11).fill(0);

  for (let i = 0; i < obj.length; i++) {
    let d = obj[i].nDist;

    if (d >= 1 && d <= 10) {
      comptador[d]++;
    } else {
      comptador[0]++;
    }
  }

  let ul = document.createElement("ul");

  let liAltres = document.createElement("li");
  liAltres.innerHTML = "Altres / desconegut: " + comptador[0];
  ul.appendChild(liAltres);

  for (let i = 1; i <= 10; i++) {
    let li = document.createElement("li");
    li.innerHTML = "Districte " + i + ": " + comptador[i];
    ul.appendChild(li);
  }

  resultat.appendChild(ul);
}

/* =================== EXERCICI 2.4 =================== */
/* Formulari per seleccionar districte                */
function exercici04() {
  // Crea el formulari amb el select de districtes
  creaFormulari();

  let select = document.getElementById("districtes");

  // Quan canvia el districte, es recalculen els accidents
  select.addEventListener("change", function () {
    let resultat = document.getElementById("resultats");

    let districteSeleccionat = select.value;
    let comptador = 0;

    for (let i = 0; i < obj.length; i++) {
      if (obj[i].districte === districteSeleccionat) {
        comptador++;
      }
    }

    let p = document.createElement("p");
    p.innerHTML =
      "Accidents al districte <strong>" +
      districteSeleccionat +
      "</strong>: " +
      comptador;

    resultat.appendChild(p);
  });
}
