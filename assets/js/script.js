/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto questi commenti.
- Pattern fondamentale: stato -> render() -> eventi.
  Tutto cio' che vedi a schermo dipende dallo stato.
  Gli eventi modificano lo stato e poi chiamano render().
- Apri index.html nel browser. Apri la console (DevTools) per gli errori.
- Niente AI per generare codice. Niente template scaricati.
*/


const film = [
   {
      titolo: 'Le ali della libertà',
      regista: 'Frank Darabont',
      anno: 1994,
      id: Date.now() + 1,
      stato: 'Da guardare'
   },
   {
      titolo: 'Il padrino',
      regista: 'Francis Ford Coppola',
      anno: 1972,
      id: Date.now() + 2,
      stato: 'Visto'
   },
   {
      titolo: 'Il cavaliere oscuro',
      regista: 'Christopher Nolan',
      anno: 2008,
      id: Date.now() + 3,
      stato: 'Da guardare'
   },
   {
      titolo: 'Pulp Fiction',
      regista: 'Quentin Tarantino',
      anno: 1994,
      id: Date.now() + 4,
      stato: 'Visto'
   },
   {
      titolo: 'Inception',
      regista: 'Christopher Nolan',
      anno: 2010,
      id: Date.now() + 5,
      stato: 'Visto'
   }
];

const movieForm = document.querySelector('#movieForm');
const listaFilm = document.querySelector('#listaFilm');
const searchBar = document.querySelector('#searchBar');
const themeToggle = document.querySelector('#themeToggle');

const totalCount = document.querySelector('#totalCount');
const watchedCount = document.querySelector('#watchedCount');
const toWatchCount = document.querySelector('#toWatchCount');
const progressBar = document.querySelector('#progressBar');

// Cambio tema
themeToggle.addEventListener('click', () => {
   document.body.classList.toggle('dark-mode');

   if (document.body.classList.contains('dark-mode')) {
      themeToggle.textContent = 'Tema chiaro';
   } else {
      themeToggle.textContent = 'Tema scuro';
   }
});

// Aggiunta di film
movieForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const titoloInput = document.querySelector('#titolo').value.trim();
   const registaInput = document.querySelector('#regista').value.trim();
   const annoInput = document.querySelector('#anno').value.trim();
   const statoInput = document.querySelector('#stato').value;

   if (titoloInput === '' || registaInput === '' || annoInput === '') {
      return;
   }

   const newFilm = {
      id: Date.now(),
      titolo: titoloInput,
      regista: registaInput,
      anno: Number(annoInput),
      stato: statoInput
   };

   film.push(newFilm);
   movieForm.reset();

   // NOTIFICA AGGIUNTA
   mostraNotifica('Hai aggiunto un nuovo film', 'successo');

   render(searchBar.value);
});

// Form ricerca
searchBar.addEventListener('input', (e) => {
   render(e.target.value);
});

// Lista film e statistiche
function render(searchTerm = '') {
   // Filtro per titolo o regista
   const filteredFilms = film.filter((f) => {
      const titoloOk = f.titolo.toLowerCase().includes(searchTerm.toLowerCase());
      const registaOk = f.regista.toLowerCase().includes(searchTerm.toLowerCase());
      return titoloOk || registaOk;
   });

   listaFilm.textContent = '';

   if (filteredFilms.length === 0) {
      const p = document.createElement('p');
      p.textContent = 'Nessun film trovato.';
      p.style.textAlign = 'center';
      p.style.color = '#888';
      listaFilm.appendChild(p);
   } else {
      filteredFilms.forEach((f) => {
         const filmItem = document.createElement('div');
         filmItem.className = 'film-item';

         filmItem.setAttribute('id', 'card-' + f.id);

         if (f.stato === 'Visto') {
            filmItem.classList.add('visto');
         }

         // Colonna info
         const filmInfo = document.createElement('div');
         filmInfo.className = 'film-info';

         const h3 = document.createElement('h3');
         h3.textContent = f.titolo;
         h3.setAttribute('id', 'titolo-testo-' + f.id);

         const p = document.createElement('p');
         p.textContent = f.regista + ' — ' + f.anno;

         filmInfo.appendChild(h3);
         filmInfo.appendChild(p);

         // Colonna azioni
         const filmActions = document.createElement('div');
         filmActions.className = 'film-actions';

         // Badge
         const badge = document.createElement('span');
         badge.className = 'badge';
         if (f.stato === 'Visto') {
            badge.classList.add('visto');
         } else {
            badge.classList.add('da-guardare');
         }
         badge.textContent = f.stato;

         // Bottone Toggle
         const btnToggle = document.createElement('button');
         btnToggle.setAttribute('type', 'button');
         btnToggle.className = 'btn-action btn-toggle';
         btnToggle.setAttribute('id', 'toggle-' + f.id);
         if (f.stato === 'Visto') {
            btnToggle.textContent = 'Segna da guardare';
         } else {
            btnToggle.textContent = 'Segna visto';
         }

         // Bottone Modifica
         const btnModifica = document.createElement('button');
         btnModifica.setAttribute('type', 'button');
         btnModifica.className = 'btn-action btn-modifica';
         btnModifica.setAttribute('id', 'modifica-' + f.id);
         btnModifica.textContent = 'Modifica';

         // Bottone Elimina
         const btnElimina = document.createElement('button');
         btnElimina.setAttribute('type', 'button');
         btnElimina.className = 'btn-action btn-elimina';
         btnElimina.setAttribute('id', 'elimina-' + f.id);
         btnElimina.textContent = 'Elimina';

         filmActions.appendChild(badge);
         filmActions.appendChild(btnToggle);
         filmActions.appendChild(btnModifica);
         filmActions.appendChild(btnElimina);

         filmItem.appendChild(filmInfo);
         filmItem.appendChild(filmActions);

         listaFilm.appendChild(filmItem);
      });
   }

   updateStats();
}

// Barra dinamica
function updateStats() {
   const total = film.length;

   const watched = film.filter((f) => f.stato === 'Visto').length;
   const toWatch = total - watched;

   let percentuale = 0;

   if (total > 0) {
      percentuale = (watched / total) * 100;
   }

   totalCount.textContent = total;
   watchedCount.textContent = watched;
   toWatchCount.textContent = toWatch;
   progressBar.style.width = percentuale + '%';
}

// Click sulla lista
listaFilm.addEventListener('click', (e) => {
   if (e.target.type === 'button') {

      const fullId = e.target.id;

      const isModifica = fullId.startsWith('modifica-');
      const isSalva = fullId.startsWith('salva-');
      const isToggle = fullId.startsWith('toggle-');
      const isElimina = fullId.startsWith('elimina-');

      let stringId = fullId.replace('toggle-', '');
      stringId = stringId.replace('modifica-', '');
      stringId = stringId.replace('salva-', '');
      stringId = stringId.replace('elimina-', '');

      const realId = Number(stringId);

      let index = -1;
      for (let i = 0; i < film.length; i++) {
         if (film[i].id === realId) {
            index = i;
            break;
         }
      }

      if (index !== -1) {

         if (isToggle) {
            if (film[index].stato === 'Visto') {
               film[index].stato = 'Da guardare';
            } else {
               film[index].stato = 'Visto';
            }
            render(searchBar.value);
         }

         if (isElimina) {
            film.splice(index, 1);

            // NOTIFICA ELIMINAZIONE
            mostraNotifica('Hai eliminato un film', 'errore');

            render(searchBar.value);
         }

         if (isModifica) {
            const h3 = document.querySelector('#titolo-testo-' + film[index].id);
            if (h3) {
               h3.style.display = 'none';
            }

            const inputTitolo = document.createElement('input');
            inputTitolo.setAttribute('type', 'text');
            inputTitolo.setAttribute('id', 'input-titolo-' + film[index].id);
            inputTitolo.value = film[index].titolo;
            inputTitolo.style.width = '90%';

            const filmInfo = h3.parentNode;
            filmInfo.insertBefore(inputTitolo, filmInfo.children[1]);

            e.target.setAttribute('id', 'salva-' + film[index].id);
            e.target.textContent = 'Salva';
         }

         if (isSalva) {
            const inputTitolo = document.querySelector('#input-titolo-' + film[index].id);

            if (inputTitolo && inputTitolo.value.trim() !== '') {
               film[index].titolo = inputTitolo.value.trim();

               mostraNotifica('Hai modificato un film', 'successo');
            }

            render(searchBar.value);
         }
      }
   }
});

// Funzione notifica
function mostraNotifica(testo, tipo = "successo") {
   const notificaDiv = document.getElementById("notifica");

   if (!notificaDiv) return;

   notificaDiv.innerText = testo;

   notificaDiv.style.display = "block";
   notificaDiv.style.position = "fixed";
   notificaDiv.style.top = "20px";
   notificaDiv.style.right = "20px";
   notificaDiv.style.padding = "12px 24px";
   notificaDiv.style.borderRadius = "6px";
   notificaDiv.style.color = "#ffffff";
   notificaDiv.style.fontWeight = "bold";
   notificaDiv.style.zIndex = "9999";
   notificaDiv.style.boxShadow = "0 4px 6px rgba(0,0,0,0.15)";

   if (tipo === "successo") {
      notificaDiv.style.backgroundColor = "#16a34a"; // Verde
   } else {
      notificaDiv.style.backgroundColor = "#dc2626"; // Rosso
   }

   if (window.timerNotifica) {
      clearTimeout(window.timerNotifica);
   }

   window.timerNotifica = setTimeout(() => {
      notificaDiv.style.display = "none";
   }, 3000);
}

render();