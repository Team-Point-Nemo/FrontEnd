import { parseString } from 'react-native-xml2js';

const API_URL = "https://opendata.fmi.fi/wfs";
const STORED_QUERY = "ecmwf::forecast::surface::point::multipointcoverage"; // FMI:n valmiit kyselyt
const SITE = "helsinki"; // Voit vaihtaa paikan

export function getWeatherData() {
    return fetch(`${API_URL}?service=WFS&version=2.0.0&request=getFeature&storedquery_id=${STORED_QUERY}&place=${SITE}&`)
        .then(response => {
            if (!response.ok) throw new Error("Error in fetch: " + response.statusText);
            return response.text(); // Huom! Palauttaa XML:n tekstimuodossa
        })
    .then(xmlText => {
        return new Promise((resolve, reject) => {
            parseString(xmlText, (err, result) => {
                if (err) {
                    reject("XML Parsing Error: " + err);
                } else {
                    resolve(result);
                }
            });
        });
    });
}

// https://opendata.fmi.fi/wfs?service=WFS&version=2.0.0&request=getFeature&storedquery_id=fmi::forecast::harmonie::surface::point::multipointcoverage&place=helsinki&