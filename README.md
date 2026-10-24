# Progetto-Settimana-3
Una pagina web per tenere traccia dei film che voglio vedere e di quelli che ho già visto. Si possono aggiungere, segnare come "visti", modificarli, cercarli e filtrarli.

Tecnologie Utilizzate:
- HTML5: con tag semantici (header, main, section, footer) per struttura e accessibilità.

- CSS: layout costruito con Box Model e float. Il tema chiaro/scuro è gestito con una classe sul body.

- JavaScript ES6+

La pagina funziona con un ciclo semplice:

- Lo stato: un array chiamato film contiene tutti i film. Ogni film ha titolo, regista, anno, id e stato ("Visto" o "Da guardare").

- Il render: ogni volta che qualcosa cambia, chiamo render(). Questa funzione svuota la lista e la ricostruisce da zero, leggendo l'array. Uso createElement e appendChild invece di innerHTML per evitare problemi di sicurezza con i dati inseriti dall'utente.

- Gli eventi: submit del form, click sui bottoni, input nella barra di ricerca, change sulle select. Ogni evento modifica l'array e poi richiama render().

In pratica: stato → render → eventi → stato.