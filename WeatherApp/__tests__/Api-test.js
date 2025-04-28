/* Testing for file api.js that includes api requests to the backend */

/* Docs:
 global.fetch = https://www.browserstack.com/guide/jest-mock-fetch-requests
*/

import { getCurrentWeatherInLocation, getCityCoords, getForecastForFiveDays, getLongTermForecast, getLayerTiles } from "../api";
import { Alert } from "react-native";

describe('getCurrentWeatherInLocation', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should fetch weather from correct URL and return data', async () => {

        process.env.EXPO_PUBLIC_BACKEND_URL = 'https://valora.2.rahtiapp.fi';

        const mockData = {
            main: {
                temp: 10,
                feels_like: 11,
            }
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };

        const result = await getCurrentWeatherInLocation(location);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/weather-now?lat=60.1011&lon=24.5618`
        );
        expect(result).toEqual(mockData);
    });

    test('should throw an error when response is not ok', async () => {

        global.fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Server Error'
        });

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };

        await expect(getCurrentWeatherInLocation(location)).rejects.toThrow('Error in getting local weather');
    });
});

describe('getCityCoords', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
        jest.spyOn(Alert, 'alert');

    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should fetch weather from correct URL and return data', async () => {
        process.env.EXPO_PUBLIC_BACKEND_URL = 'https://valora.2.rahtiapp.fi';

        const mockData = {
            main: {
                temp: 10,
                feels_like: 11,
            }
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        const city = 'Turku';

        const result = await getCityCoords(city);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/city?city=${city}`
        );
        expect(result).toEqual(mockData);
    })

    test('should throw an error when response is not ok', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Server Error'
        });

        const city = 'Turku';

        await expect(getCityCoords(city)).rejects.toThrow('Error in fetching city coordinates');

        expect(Alert.alert).toHaveBeenCalledWith('City not found');
    });
})

describe('getForecastForFiveDays()', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should fetch weather from correct URL and return data', async () => {
        process.env.EXPO_PUBLIC_BACKEND_URL = 'https://valora.2.rahtiapp.fi';

        const mockData = {
            main: {
                temp: 10,
                feels_like: 11,
            }
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };



        const result = await getForecastForFiveDays(location);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/forecast5?lat=${location.latitude}&lon=${location.longitude}`
        );
        expect(result).toEqual(mockData);
    })

    test('should throw an error when response is not ok', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Server Error'
        });

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };

        await expect(getForecastForFiveDays(location)).rejects.toThrow('Error in fetching forecast for five days');

    });
})

describe('getLongTermForecast()', () => {

    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should fetch weather from correct URL and return data', async () => {
        process.env.EXPO_PUBLIC_BACKEND_URL = 'https://valora.2.rahtiapp.fi';

        const mockData = {
            main: {
                temp: 10,
                feels_like: 11,
            }
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };

        const result = await getLongTermForecast(location);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.EXPO_PUBLIC_BACKEND_URL}/forecast16?lat=${location.latitude}&lon=${location.longitude}`
        );
        expect(result).toEqual(mockData);
    })

    test('should throw an error when response is not ok', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
            statusText: 'Server Error'
        });

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };

        await expect(getLongTermForecast(location)).rejects.toThrow("Error in fetching forecast");

    });
})

describe('getLayerTiles', () => {

    test('should return correct URL for given layer', () => {

        process.env.EXPO_PUBLIC_BACKEND_URL = 'https://valora.2.rahtiapp.fi';

        const layer = 'rain';
        const url = `${process.env.EXPO_PUBLIC_BACKEND_URL}/tiles/${layer}/{z}/{x}/{y}.png`;

        const result = getLayerTiles(layer);

        expect(result).toBe(url);
    });
});