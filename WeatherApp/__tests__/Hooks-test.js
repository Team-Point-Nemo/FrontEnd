import { renderHook, waitFor, act } from '@testing-library/react-native';
import { expect } from '@jest/globals';
import useCityName from '../hooks/useCityName';
import useUserLocation from '../hooks/useUserLocation';
import * as Location from 'expo-location';
import * as api from '../api';
import useWeather from '../hooks/useWeather';
import useCitySearch from '../hooks/useCitySearch';
import useRecentSearch from '../hooks/useRecentSearch';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(),
    getCurrentPositionAsync: jest.fn(),
    reverseGeocodeAsync: jest.fn(),
}));

jest.mock('../api', () => ({
    getCurrentWeatherInLocation: jest.fn(),
    getCityCoords: jest.fn(),
}));

describe('Hooks', () => {

    test('useUserLocation should return the location of the user', async () => {

        Location.requestForegroundPermissionsAsync.mockResolvedValue({
            status: 'granted',
        });

        Location.getCurrentPositionAsync.mockResolvedValue({
            coords: {
                latitude: 60.1011,
                longitude: 24.5618,
            },
        });

        const { result } = renderHook(() => useUserLocation());

        await waitFor(() => {
            expect(result.current.location).toEqual({
                latitude: 60.1011,
                longitude: 24.5618,
            })
        })

        expect(result.current.loading).toBe(false);
    });



    test('useCityName should return city name for given location', async () => {

        Location.reverseGeocodeAsync.mockResolvedValue([{
            city: 'Helsinki',
        }])

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };

        const { result } = renderHook(() => useCityName(location));

        await waitFor(() => {
            expect(result.current.city).toBe('Helsinki');
        })
    })

    test('useWeather should return weather for given location', async () => {
        
        const mockWeather = {
            temp: 15,
            feels_like: 13,
            wind: "3 m/s",
        }

        api.getCurrentWeatherInLocation.mockResolvedValue(mockWeather);

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        }

        const { result } = renderHook(() => useWeather(location));

        await waitFor(() => {
            expect(result.current.weather).toEqual(mockWeather);
        });
    });

    test('useCitySearch should return searched location for the given city', async () => {
        
        api.getCityCoords.mockResolvedValue({
            coord: {
                lat: 60.1011,
                lon: 24.5618
            },
        });

        const { result } = renderHook(() => useCitySearch());

        await act(async () => {
            await result.current.searchCity('Helsinki');
        });

        expect(result.current.searchLocation).toEqual({
            latitude: 60.1011,
            longitude: 24.5618
        });
    })

    test('useRecentSearch should load recent searched cities from AsyncStorage', async () => {

        const mockCities = JSON.stringify(['Helsinki', 'Espoo']);
        AsyncStorage.getItem.mockResolvedValue(mockCities);

        const { result } = renderHook(() => useRecentSearch());

        await waitFor(() => 
            expect(result.current.recentCities).toEqual(['Helsinki', 'Espoo']));

    })


});