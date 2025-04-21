import { render, screen, fireEvent, renderHook, waitFor, act } from '@testing-library/react-native';
import { expect } from '@jest/globals';
import useCityName from '../hooks/useCityName';
import useUserLocation from '../hooks/useUserLocation';
import * as Location from 'expo-location';
import * as api from '../api';
import useWeather from '../hooks/useWeather';
import useCitySearch from '../hooks/useCitySearch';

jest.mock('expo-location', () => ({
    requestForegroundPermissionsAsync: jest.fn(),
    getCurrentPositionAsync: jest.fn(),
    reverseGeocodeAsync: jest.fn(),
}));

jest.mock('../api', () => ({
    getCurrentWeatherInLocation: jest.fn(),
    getCityCoords: jest.fn(),
  }));


//useUserLocation
test('Returns location of the user', async () => {

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


//useCityName
test('Returns city name for a given location', async () => {

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

//useWeather
test('Returns weather for a given location', async() => {
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

//useCitySearch
test('Returns searched location for the given city', async () => {
    api.getCityCoords.mockResolvedValue({
        coord:{
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
});