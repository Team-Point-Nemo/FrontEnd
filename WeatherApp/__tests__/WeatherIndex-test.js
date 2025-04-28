import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { useTheme } from 'react-native-paper';
import WeatherIndex from '../components/weather/WeatherIndex';
import Forecast from '../components/weather/forecast/Forecast';
import App from '../App';
import TabNavigator from '../navigation/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';

describe('Components displayed on the IndexScreen', () => {

    test('should render the current day', () => {
        const { getByText } = render(<WeatherIndex />);
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
        
        getByText(formattedCurrentDate);
    })

    test('should display location button on the screen', () => {
        const { getByTestId } = render(<WeatherIndex />);
        const button = getByTestId('location-button');

        expect(button).toBeTruthy();

    })

    test('should display searchbar on the screen', () => {
        const { getByPlaceholderText } = render(<WeatherIndex />);
        const searchbar = getByPlaceholderText("Search city...")
        expect(searchbar).toBeTruthy();
    })


    test('should display segmented buttons including options for 5 and 16 days on the screen', () => {
        const { getByText } = render(<Forecast />);
        const fiveDaysButton = getByText('5 Days');
        const sixteenDaysButton = getByText('16 Days');

        expect(fiveDaysButton).toBeTruthy();
        expect(sixteenDaysButton).toBeTruthy();

    })
});



