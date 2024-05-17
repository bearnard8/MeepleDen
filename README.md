# MeepleDen

Epicode WDPT Capstone Project

## Idea progetto :bulb:

MeepleDen vuole essere un sito dove i gruppi di amici possono creare un gruppo privato (Den) e gestire/pianificare le proprie serate di giochi da tavolo/di ruolo.

### Funzionalità previste :hammer_and_wrench:

1. Creazione di un Den, dove poter:  
  a. tenere traccia dei giochi posseduti dal gruppo;  
  b. tenere una classificha dei membri del gruppo, magari divisa per giochi;  
  c. creare un wishlist di giochi da comprare in futuro;  
  d. pianificare le serate di gioco;  
  e. dare una valutazione ai giochi, che influenza poi la valutazione globale;  
2. Database dei giochi da tavolo e di ruolo;  
  a. ricerca di giochi con relative foto, info e eventualmente link per l'acquisto;  
  b. possiblità di aggiungere i giochi alle wishlist dei Den o personale;  

> [!TIP]
> Per il Den pensavo di integrare un VIP status, ipotizzando un piano a pagamento che permette di avere più funzionalità.

### Funzionalità chiave :key:

- Den
  - Pianificazione delle giocate
  - Creazione wishlist
  - Elenco giochi posseduti
- User
  - Pagina info personali
  - Elenco giochi posseduti
  - Registrazione e login
- Generali
  - Ricerca giochi
  - Visualizzazione giochi per valutazione o data di uscita

## Tecnologie :computer:

### Frontend

- React
- Bootstrap
- CSS
- Javascript

### Backend

- NodeJS + Express;
- Mongoose;
- MongoDB

### Risorse e Pacchetti :globe_with_meridians:

#### Risorse

- [GoogleFonts](https://fonts.google.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Neumorphism](https://neumorphism.io/#e0e0e0)

#### Pacchetti

- [Nodemon](https://www.npmjs.com/package/nodemon)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [React Route](https://reactrouter.com/en/main)

## Design :pencil2:

### Palette colori

- Charcoal `#264653`
- Dark Cyan `#279185`
- Burnt Sienna `#E76F51`
- Sandy Brown `#F4A261`
- Saffron `#E9C46A`

[Coolors](https://coolors.co/palette/264653-279185-e9c46a-f4a261-e76f51)

## Strutture :books:

### Sito

#### Views

1. Homepage
   - Navbar con link al sito
   - Novità giochi: giochi appena usciti o meglio valutati
   - Giocate pianificate: calendario con le giocate pianificate nei Den di cui si fa parte
   - Classifiche: possibilità di vedere diverse classifiche dei Den di cui si fa parte
   - Amici online: elenco amici online e possibilità di chattare
2. Dashboard gruppo
   - Classifiche del Den: per ogni gioco una classifica?
   - Wishlist: elenco dei giochi messi in wishlist dal gruppo
   - Giocate pianificate: calendario con le giocate pianificate dal gruppo
   - Sondaggio: possibilità di creare un sondaggio per decidere quando e a cosa giocare
3. Dashboard utente
   - Info utente: nome, Den di appartenenza
   - Den di cui si fa parte, riquadro specifico dei Den con visualizzazione membri o prossima giocata
   - Giochi posseduti: elenco dei giochi posseduti dall'utente
4. Dettagli gioco
   - Foto
   - Info

[Figma](https://www.figma.com/file/Zjzya0FOOzm2sUwyJU7Rl7/Views?type=design&node-id=0%3A1&mode=design&t=VKzbZiStSyljqh3p-1)

#### Albero App

##### Frontend :deciduous_tree:

1. Views
   a. homepage
   b. den page
   c. user page
   d. search page
2. Components
   a. button
   b. login/signin form
   c. navbar
   d. footer
3. Context
4. Assets

##### Backend :deciduous_tree:

1. Routes
   a. denRoutes
      - GET dens/ // richiedi tutti i Den
      - GET dens/:id // richiedi il Den con l'id specificato
      - POST dens/ // crea il Den
      - PUT dens/:id // modifica il Den specificato
      - DELETE dens/:id // cancella il Den specificato
      - PUT dens/:id/addMeeple // aggiunge un meeple al den
   b. userRoutes
      - GET meeples/ // richiedi tutti gli users
      - GET meeples/:id // richiedi l'user con l'id specificato
      - POST meeples/ // crea l'user
      - PUT meeples/:id // modifica l'user specificato
      - DELETE meeples/:id // cancella l'user specificato
2. Middlewares
   a. authentication
   b. errorHandler
   c. multer
3. Models
   a. gameSchema ???
   b. denSchema
   c. userSchema

### Dati :page_with_curl:

#### Den/Group

> id: "string"  
> name: "string"  
> owner: "SchemaTypes.ObjectID" 
> members: [ id: "SchemaTypes.ObjectID" ]  
> dateOfCreation: "string"  
> vipStatus: "boolean"  

#### Meeple/User

> id: "string"  
> name: "string"  
> surname: "string"  
> username: "string"  
> avatar: "image"  
> ownedGames: []  

#### Gioco

> id: "string"  
> name: "string"  
> publishedBy: "string"  
> players: "string"  
> timeOfPlay: "string"  
> extLink: "string"  
> gallery: []  
