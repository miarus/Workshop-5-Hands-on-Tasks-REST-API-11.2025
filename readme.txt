ws5-movie-api/
  ├── server.js
  ├── package.json
  ├── .env     ← tämä!
  └── node_modules/



server.js malli:


server.js
--------------
1. importit (require)
2. app = express()
3. middleware (cors, express.json())
4. mongoose.connect()
5. Movie Schema + Model
6. CRUD ROUTES  ← nämä tähän
7. app.listen()


WS5 Movie API – Yksinkertainen selitys 

Tämä projekti on pieni elokuva-API (Application Programming Interface).
API tarkoittaa yksinkertaisesti ”sääntöjä ja osoitteita”, joiden avulla voi pyytää ja lähettää tietoa palvelimelle.

🔧 Mitä tässä projektissa tehdään?

Tässä projektissa rakennamme Express-palvelimen, joka:

ottaa vastaan HTTP-pyyntöjä (kuten GET, POST, PUT, DELETE)

lukee ja tallentaa elokuvatietoja MongoDB-tietokantaan

palauttaa tiedot takaisin pyynnön tehneelle käyttäjälle tai sovellukselle

MongoDB:tä käytetään, koska se on helppo aloittelevalle — se tallettaa tietoja JSONin kaltaisessa muodossa.

🧱 Mongoose

Mongoose on työkalu, jonka avulla kerromme MongoDB:lle, mitä tietoja elokuvassa pitää olla.
Luomme ”kaavan” (schema), jossa määritellään esim:

title (pakollinen)

year

director

rating

Tämän kaavan perusteella luodaan Movie-malli, jonka avulla:

luodaan uusia elokuvia

haetaan elokuvia

päivitetään elokuvia

poistetaan elokuvia

🚀 CRUD-toiminnot

API:ssa on neljä tärkeää toimintoa:

Create → Luo uusi elokuva

Read → Hae kaikki elokuvat tai yksi elokuva

Update → Päivitä olemassa oleva elokuva

Delete → Poista elokuva

Näitä kutsutaan yhdessä CRUD.

🌍 Miksi tarvitsemme .env-tiedoston?

.env-tiedostoon laitetaan salainen yhteysosoite (MONGODB_URI).
Sitä ei saa koskaan laittaa GitHubiin.
Renderissä sama avain lisätään "Environment Variables" -kohtaan.


