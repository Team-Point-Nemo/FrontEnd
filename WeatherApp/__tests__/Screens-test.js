import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-native-paper';
import FavoritesScreen from '../screens/FavoritesScreen';
import IndexScreen from '../screens/IndexScreen';
import Map from '../screens/MapScreen';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'), //has navigationContainer etc.
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

describe('Screens', () => {

  test('should render IndexScreen', () => {

    const { getByText } = render(
      <Provider>
        <IndexScreen />
      </Provider>
    )

    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

    expect(getByText(formattedCurrentDate)).toBeTruthy();
  });

  test('should render FavoritesScreen', async () => {

    const { getByText } = render(
      <Provider>
        <FavoritesScreen />
      </Provider>
    )

    expect(getByText('Favorite Places')).toBeTruthy();
  });


});
