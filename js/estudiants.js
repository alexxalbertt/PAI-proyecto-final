// Treballarem sempre amb una variable global, obj, què és una taula on estan 
// guardats tots els accidents de l'any. Qualsevol altre variable que necessitem
// haurà de ser, necessàriament, una variable local.

// Com que al document html no hi ha controladors d'esdeveniments, els haurem de crear aquí:



// Teniu ja definides les funcions de cada exercici (menys del cinquè), només cal
// que ompliu el codi necessari.

function exercici01() {

}

function exercici02() {

}


function exercici03() {
 
}


function exercici04() {
    creaFormulari();
}
function totalAccidents() {
    return obj.length;
}
function diaAmbMesAccidents() {
    // Objeto para contar por días
    let comptadorDies = {};

    // Recorremos todos los accidentes
    for (let i = 0; i < obj.length; i++) {
        let dia = obj[i].diaSet;

        // Si no existe la clave, la iniciamos
        if (!comptadorDies[dia]) {
            comptadorDies[dia] = 1;
        } else {
            comptadorDies[dia]++;
        }
    }

    // Buscamos el día con más accidentes
    let maxDia = "";
    let maxNum = 0;

    for (let dia in comptadorDies) {
        if (comptadorDies[dia] > maxNum) {
            maxNum = comptadorDies[dia];
            maxDia = dia;
        }
    }

    // Devolvemos el resultado
    return {
        dia: maxDia,
        accidents: maxNum
    };
}
/* 2.3 - devuelve array counts[0..10] (0 = Altres) */
function accidentsPerDistricteCounts() {
  const counts = new Array(11).fill(0);
  for (let i = 0; i < obj.length; i++) {
    let nd = parseInt(obj[i].nDist, 10);
    if (isNaN(nd) || nd < 1 || nd > 10) nd = 0;
    counts[nd]++;
  }
  return counts;
}

/* Muestra la lista en #resultats */
function showAccidentsPerDistricte() {
  const cont = document.getElementById('resultats');
  if (!cont) return;
  cont.innerHTML = ''; // limpiar

  const counts = accidentsPerDistricteCounts();

  const h = document.createElement('h4');
  h.textContent = 'Accidents per districte';
  cont.appendChild(h);

  const ul = document.createElement('ul');
  const liAltres = document.createElement('li');
  liAltres.textContent = `Altres / desconegut: ${counts[0]}`;
  ul.appendChild(liAltres);

  for (let i = 1; i <= 10; i++) {
    const li = document.createElement('li');
    li.textContent = `Districte ${i}: ${counts[i]}`;
    ul.appendChild(li);
  }
  cont.appendChild(ul);
}
/* -------------- listeners y wrappers para mostrar resultados -------------- */

/* Muestra texto simple en #resultats */
function showTextInResultats(html) {
  const cont = document.getElementById('resultats');
  if (!cont) return;
  cont.innerHTML = html;
}

/* exercici01 -> nombre total d'accidents */
function exercici01() {
  const n = totalAccidents();
  showTextInResultats(`<p><strong>Total d'accidents:</strong> ${n}</p>`);
}

/* exercici02 -> dia amb més accidents */
function exercici02() {
  const r = diaAmbMesAccidents();
  showTextInResultats(`<p><strong>Dia amb més accidents:</strong> ${r.dia} (${r.accidents})</p>`);
}

/* exercici03 -> accidents per districte (mostramos la lista) */
function exercici03() {
  showAccidentsPerDistricte();
}

/* exercici04 -> crea el formulari i linka el select */
function exercici04() {
  creaFormulari();
  // Esperamos un poco y enlazamos el listener
  setTimeout(bindSelectListener, 150);
}

/* Listener para el select que crea creaFormulari() */
function bindSelectListener() {
  const sel = document.getElementById('districtes');
  if (!sel) {
    console.warn('bindSelectListener: select #districtes no encontrado.');
    return;
  }
  // Evitamos duplicar listeners: removemos antes (si existe)
  sel.replaceWith(sel.cloneNode(true));
  const selNuevo = document.getElementById('districtes');

  selNuevo.addEventListener('change', function(ev) {
    const val = ev.target.value;
    // contamos por nombre de districte
    let compta = 0;
    for (let i = 0; i < obj.length; i++) {
      if (obj[i].districte === val) compta++;
    }
    showTextInResultats(`<p>Districte seleccionat: <strong>${val}</strong> — ${compta} accidents.</p>`);
  });
}

/* Conectar enlaces del menú (exer01..exer04) para que funcionen sin tocar HTML */
function bindMenuLinks() {
  const ids = ['exer01','exer02','exer03','exer04'];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function(ev) {
      ev.preventDefault();
      // Llamamos a la función correspondiente por nombre
      if (id === 'exer01') exercici01();
      if (id === 'exer02') exercici02();
      if (id === 'exer03') exercici03();
      if (id === 'exer04') exercici04();
    });
  });
}

/* Ejecutar enlace automático tras cargar el DOM */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bindMenuLinks);
} else {
  setTimeout(bindMenuLinks, 50);
}

