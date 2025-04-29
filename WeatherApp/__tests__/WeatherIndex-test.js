import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-native-paper';
import Forecast from '../components/weather/forecast/Forecast';
import WeatherIndex from '../components/weather/WeatherIndex';

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

describe('Components displayed on the IndexScreen', () => {

  test('should display the current day', () => {

    const { getByText } = render(
      <Provider>
        <WeatherIndex />
      </Provider>
    );

    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;
    getByText(formattedCurrentDate);
  })

  test('should display location button on the screen', () => {

    const { getByTestId } = render(
      <Provider>
        <WeatherIndex />
      </Provider>
    );
    const button = getByTestId('locationButton');

    expect(button).toBeTruthy();

  })

  test('should display searchbar on the screen', () => {

    const { getByPlaceholderText } = render(
      <Provider>
        <WeatherIndex />
      </Provider>
    );
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



