const functions = require("firebase-functions");
const axios = require("axios");

exports.getWeather = functions.https.onRequest(async (req, res) => {
  try {
    const apiKey = functions.config().weather.api_key;
    const apiUrl = functions.config().weather.api_url;

    const {city, lat, lon} = req.query;
    let url;
/* eslint-disable */
    if (city) {
        // Finds by city
        url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    }
    else if (lat && lon) {
        // Finds by coordinates
        url = `${apiUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    }
    else {
        return res.status(400).json({ error: "Provide 'city', 'lat' or 'lon' parametres." });
    }

    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({error: "Error in fetch", details: error.message});
  }
});
