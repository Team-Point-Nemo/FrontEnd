## Ohjelmistoprojekti 2:n sääsovelluksen frontendin testausta Jestilla ja React Native Testing Librarylla

Seminaarityön tavoitteena on testata Ohjelmistoprojekti 2 -kurssilla toteutetun sääsovelluksen koodia Jest-kirjaston avulla. Työssä keskitytään sovelluksen toiminnallisuuden varmistamiseen sekä käyttöliittymän luotettavuuden parantamiseen. Tavoitteena on syventää ymmärrystä testauksen merkityksestä frontend -kehityksessä, oppia luomaan laadukkaita testejä ja perehtyä Jest-kirjaston sekä React Native Testing kirjaston käyttöön.

Testit löytyvät WeatherApp sovelluksen frontend repositorista jest-haarasta.

> [Jest-haara](https://github.com/Team-Point-Nemo/FrontEnd/tree/jest/WeatherApp)

### Käytetyt tekniikat

Testaamisessa käytettiin Jest-kirjastoa, joka tarjoaa tehokkaita työkaluja yksikkötestaukseen esimerkiksi jest-mockeja, joiden avulla testattiin komponenttien riippuvuuksia kuten API-kutsuja ja hookeja.

React Native Testing Library mahdollisti komponenttien testaamisen käyttäjänäkökulmasta. Kirjaston avulla voitiin simuloida käyttäjätoimintoja - napin painalluksia käyttäen fireEvent ja press-komentoja. Näiden avulla testattiin, että sovellus reagoi oikein napin painalluksiin.
Lisäksi sovelluksen API-kutsut mockattiin global.fetch-funktion avulla, jotta testejä voitiin suorittaa ilman oikeita verkkoyhteyksiä.

#### Automatisoidun testauksen työkalut

- Jest (Expo test)
- React Native Testing Library

### Testauksen vaiheet

1. Testauksen suunnittelu
2. Jestiin ja React Native Testing Libraryyn tutustuminen ja tiedonhankita
3. Testien laatiminen
4. Testien ajaminen ja virheiden korjaus
5. Testauksen arviointi ja yhteenveto

<details><summary>Testit </summary>

#### IndexScreen

* Renders IndexScreen
* The current day is displayed
* The Location button is on the screen
* The searchbar is on the screen
* Segmented buttons include options for 5 and 16 days are on the screen
* Displays no weather when weather.main is null
* Displays weather on the screen including temperature, feels like and wind

#### Forecast

These tests were left out due to functionality issues.
  
* 5-day forecast is displayed on the screen
* 16-day forecast is displayed on the screen

#### Hooks

* Returns city name for a given location
* Returns location of the user
* Returns weather for a given location
* Returns searched location for the given city
* Returns recent searched cities from AsyncStorage
  
#### MapScreen

These tests were left out due to functionality issues.

* Displays map on the screen
* Map menu is displayed

#### Favorites

* Renders FavoriteDialog
  * Calls onConfirm
  * Calls onCancel
* Renders FavoriteIconButton
  * saves city to favorites
  * opens dialog if city is already in favorites
  * deletes city from favorites
  
#### Date and data

* DataService
  * returns correct image and colors
* DataEdit
  * returns mapped data
  
</details>


#### Lopulliset testitulokset

![suoritetut testit](image.png)

### Yhteenveto

Testausympäristön pystyttäminen oli haastavaa, koska ohjeet vaihtelivat eri sivuilla erityisesti react-test-rendererin osalta. Eri lähteet antoivat ristiriitaisia ohjeita siitä, tulisiko kyseinen kirjasto asentaa vai ei, mikä hidasti aloitusta ja loi epäselvyyksiä testausasetusten suhteen. Minulla oli käytössä Expo, joten minun piti lisätä expo-fonttien mockkaus jest.setup.js -tiedostoon, jotta sain testiympäristön toimintakuntoon.

Testaukseen sisältyi komponenttien, hookien ja käyttäjätoimintojen testaamista, mukaan lukien API-kutsujen mockkaaminen.Testausprosessin aikana tuli esiin monia tärkeitä oivalluksia sovelluksen rakenteesta ja kehityksestä. Yksi tärkeimmistä huomioista oli, kuinka tärkeää on pilkkoa koodia pienempiin osiin, jolloin yksittäisten osien testaaminen on helpompaa ja mahdolliset virheet havaittaisiin aikaisemmin. Tämä pilkkominen parantaisi myös koodin ylläpidettävyyttä. Erityisesti käyttöliittymän ja suosikkikaupunkitoimintojen osalta varmistui, että sovellus reagoi oikein painalluksiin ja toimii odotetusti. Tämän lisäksi sovelluksen etusivulle renderöity oikein mockattu sää ja kuluva päivä. 

Testauksen aikana opin myös paljon mockkien käytöstä ja asynkronisten toimintojen testaamisesta. Näillä testeillä saatiin 42 prosenttia koko koodin funktioista testattua. Branch coveragen osuus oli 36.6%, joka kertoo, että mahdollisten virhetilanteiden testauksessa olisi ollut parantamisen varaa. Testin tulokseen vaikutti paljon se, etten saanut Map tabin ja forecastin testejä toimimaan. Erityisesti nämä osiot eivät tunnistaneet antamiani testID:tä tai accessibilityLabel:tä. Tämä tarkoittaa, että käyttöliittymän elementtien tunnistaminen oli haasteellista testien suorittamisen aikana.

Kaiken kaikkiaan testausprosessi tarjosi arvokasta oppia sekä testauksen työkalujen käytöstä että sovelluksen rakenteen parantamisesta. Haasteista huolimatta testaus toi esiin konkreettisia kehityskohteita ja vahvisti ymmärrystäni siitä, miten laadukas testaus voi tukea ohjelmistokehitystä tehokkaasti.

#### Lähteet

[Expo - Unit testing with Jest](https://docs.expo.dev/develop/unit-testing/)

[React Native Testing Library](https://callstack.github.io/react-native-testing-library/)

[Jest documentation](https://jestjs.io/docs/api)

[Expo Issue - Expo fonts]( https://github.com/callstack/react-native-paper/issues/4561 )

[Jest functions, object and array](https://dev.to/srnux/partially-matching-object-array-and-function-with-jest-5453)

[Google Maps jest mocks](https://www.npmjs.com/package/@googlemaps/jest-mocks)

[Map mock](https://dev.to/cecheverri4/google-maps-geolocation-and-unit-test-on-react-native-4eim)

[Global fetch](https://www.browserstack.com/guide/jest-mock-fetch-requests)

Ohjelmistokehityksen teknologiat – Seminaarityö
Heidi Ahlgren, Haaga-Helia ammattikorkeakoulu
