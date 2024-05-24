# Interactions

## Home View

Latest Games
Endpoint: GET /api/games?sort=latest&limit=10 -> da verificare
Descrizione: Recupera gli ultimi 10 giochi aggiunti e li mostra dentro la sezione della home in un elenco con immagine e nome. La box contenente queste info sarà un link alla pagina di dettaglio del gioco.
Risposta: Array di oggetti gioco, per i giochi dovrò creare un model per il backend.

Planned Games
Endpoint: GET /api/games/planned?user_id={user_id} -> da verificare
Descrizione: Recupera le giocate pianificate per un utente specifico, pescandole da tutti i den di cui fa parte, e le fa vedere in un elenco con logo del den, nome del den e data e ora della giocata.
Risposta: Array di oggetti gioco pianificati, dovrò creare un model per le giocate pianificate.

Rankings -> funzionalità secondaria da sviluppare in un secondo momento
Endpoint: GET /api/rankings -> da verificare
Descrizione: Recupera la classifica dei giocatori.
Risposta: Array di oggetti giocatore con attributi come id, name, score.

## Den View

Den List -> integrata nella navbar con un elenco a discesa, in modo da decidere direttamente quale den selezionare
Endpoint: GET /api/dens?user_id={user_id} -> da verificare
Descrizione: Recupera tutti i gruppi (Den) per un utente specifico.
Risposta: Array di oggetti Den con attributi come id, name, description.

Den Details
Endpoint: GET /api/dens/{den_id} -> da verificare
Descrizione: Recupera i dettagli di un gruppo specifico.
La pagina dei den è strutturata in più sezioni:

- prossime giocate
- giochi posseduti
- wishlist
- classifiche -> da integrare in un secondo momento

Risposta: Oggetto Den con attributi come da model presente nel backend

## Profile View

User Info
Endpoint: GET /api/users/{user_id} -> da verificare
Descrizione: Recupera le informazioni del profilo utente.
Risposta: Oggetto utente con attributi come da model presente nel backend

Update Profile
Endpoint: PUT /api/users/{user_id} -> da verificare
Descrizione: Aggiorna le informazioni del profilo utente.
Corpo della richiesta: Oggetto utente con dati aggiornati.
Risposta: Oggetto utente aggiornato.

## Login View

Endpoint: da verificare
Descrizione: pagina di login
Risposta: autorizzazione dal middleware di autenticazione