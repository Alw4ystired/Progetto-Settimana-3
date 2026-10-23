# Progetto-Settimana-3
Pagina web per gestire una lista di film permettendo di aggiungerli, segnarli come "visti" e cercarli.

Tecnologie Utilizzate (Tech Stack):
- HTML5 (semantico)

- CSS3 (Box Model, Float, temi con classi)

- JavaScript ES6+ (Vanilla,)

L'applicazione si basa sul pattern Stato → Render → Eventi.

Lo Stato: Un array chiamato film contiene tutti i dati.

Il Render: La funzione render() legge l'array e ricostruisce l'interfaccia HTML da zero (usando createElement e appendChild).

Gli Eventi: Le azioni dell'utente (submit, click, input) modificano l'array e richiamano render().