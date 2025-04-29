import { render, waitFor } from "@testing-library/react-native";
import { Provider } from "react-native-paper";
import WeatherIndex from "../components/weather/WeatherIndex";
import useWeather from "../hooks/useWeather";

jest.mock('../hooks/useWeather');

jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn().mockReturnValue({ params: {} }),
    useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() }),
}));

jest.mock('../components/favorites/FavoritesContext', () => ({
    useFavorites: jest.fn().mockReturnValue({
        saveFavorite: jest.fn(),
        deleteFavorite: jest.fn(),
        isFavorite: jest.fn().mockReturnValue(false),
    }),
}));

describe('Displays weather from WeatherIndex on the IndexScreen', () => {

    test('should display no weather when weather.main is null', () => {

        useWeather.mockReturnValue({});

        const { queryByTestId } = render(
            <Provider>
                <WeatherIndex />
            </Provider>
        );

        expect(queryByTestId('temp')).toBeNull();
    });

    test('should display weather on the screen including temperature, feels like and wind', async () => {

        const mockWeather = {
            main:
            {
                temp: 7,
                feels_like: 5
            },
            wind: { speed: 2 },
            weather: [{
                icon: '10d'
            }],
        };

        useWeather.mockReturnValue({
            weather: mockWeather,
        });

        const location = {
            latitude: 60.1011,
            longitude: 24.5618
        };

        const { getByText } = render(
            <Provider>
                <WeatherIndex location={location} />
            </Provider>

        );

        await waitFor(() =>
        expect(getByText('7°')).toBeTruthy());
        expect(getByText('Feels like: 5°')).toBeTruthy();
        expect(getByText('Wind speed: 2 m/s')).toBeTruthy();
    });
});
