import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';

import WeatherIndex from '../components/weather/WeatherIndex';
import Forecast from '../components/weather/forecast/Forecast';

test('The current day is rendered ', () => {
    const { getByText } = render(<WeatherIndex />);
    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
    getByText(formattedCurrentDate);
})

test('The Location button is on the screen', () => {
    const { getByTestId } = render(<WeatherIndex />);
    const button = getByTestId('location-button');
    expect(button).toBeTruthy();

})

test('The searchbar is on the screen', () => {
    const { getByPlaceholderText } = render(<WeatherIndex />);
    const searchbar = getByPlaceholderText("Search city...")
    expect(searchbar).toBeTruthy();
})

test('Segmented buttons include options for 5 and 16 days are on the screen', () => {
    const { getByText } = render(<Forecast />);
    const fiveDaysButton = getByText('5 Days');
    const sixteenDaysButton = getByText('16 Days');
    expect(fiveDaysButton).toBeTruthy();
    expect(sixteenDaysButton).toBeTruthy();

})





