import { render, waitFor } from "@testing-library/react-native";
import WeatherIndex from "../components/weather/WeatherIndex";
import useWeather from "../hooks/useWeather";

jest.mock('../hooks/useWeather');

describe('WeatherIndex temperature, feels like and wind', () => {
      it('Displays no weather when weather.main is null', () => {
        useWeather.mockReturnValue({}); 

        const { queryByTestId } = render(<WeatherIndex />);

        expect(queryByTestId('temp')).toBeNull();
      });

    it('Displays weather on the IndexScreen including temperature, feels like and wind', async () => {
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

        const { getByTestId, getByText } = render(<WeatherIndex location={location} />);

        await waitFor(() =>

        expect(getByTestId('temp')).toHaveTextContent('7°'));
        expect(getByText('Feels like: 5°')).toBeTruthy();
        expect(getByText('Wind speed: 2 m/s')).toBeTruthy();
    });
});
