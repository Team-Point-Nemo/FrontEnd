import { render, fireEvent } from '@testing-library/react-native';
import FavoriteDialog from '../components/favorites/FavoriteDialog';
import { Provider } from 'react-native-paper';
import { useFavorites } from '../components/favorites/FavoritesContext';
import FavoriteIconButton from '../components/favorites/FavoriteIconButton';
import { useNavigation } from '@react-navigation/native';
import FavoritesList from '../components/favorites/FavoritesList';

jest.mock('../components/favorites/FavoritesContext', () => ({
    useFavorites: jest.fn(),
}));

jest.mock('@react-navigation/native');

describe('FavoriteDialog', () => {

    test('should render FavoriteDialog when visible is true', () => {

        const { getByText } = render(
            <Provider>
                <FavoriteDialog visible={true} onConfirm={() => { }} onCancel={() => { }} />
            </Provider>
        );

        expect(getByText('Are you sure?')).toBeTruthy();
        expect(getByText('Do you want to remove this city from your favorites?')).toBeTruthy();
        expect(getByText('Yes')).toBeTruthy();
        expect(getByText('Cancel')).toBeTruthy();

    })


    test('should call onConfirm when Yes is pressed', () => {

        const onConfirm = jest.fn();
        const onCancel = jest.fn();

        const { getByText } = render(
            <Provider>
                <FavoriteDialog visible={true} onConfirm={onConfirm} onCancel={onCancel} />
            </Provider>
        );

        fireEvent.press(getByText('Yes'));

        expect(onConfirm).toHaveBeenCalledTimes(1);
    })


    test('should call onCancel when Cancel is pressed', () => {

        const onConfirm = jest.fn();
        const onCancel = jest.fn();

        const { getByText } = render(
            <Provider>
                <FavoriteDialog visible={true} onConfirm={onConfirm} onCancel={onCancel} />
            </Provider>
        );

        fireEvent.press(getByText('Cancel'));

        expect(onCancel).toHaveBeenCalledTimes(1);
    })


})

describe("FavoriteIconButton", () => {

    test('should call saveFavorite when icon is pressed and city is not yet a favorite', () => {

        const saveFavoriteMock = jest.fn();

        useFavorites.mockReturnValue({
            saveFavorite: saveFavoriteMock,
            deleteFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
        });

        const { getByRole } = render(
            <Provider>
                <FavoriteIconButton city="Helsinki" />
            </Provider>
        );

        fireEvent.press(getByRole('button'));

        expect(saveFavoriteMock).toHaveBeenCalledWith('Helsinki');
    })

    test('should open dialog if city is already favorite', () => {

        useFavorites.mockReturnValue({
            saveFavorite: jest.fn(),
            deleteFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(true),
        });

        const { getByRole, getByText } = render(
            <Provider>
                <FavoriteIconButton city="Helsinki" />
            </Provider>
        );

        fireEvent.press(getByRole('button'));

        expect(getByText('Are you sure?')).toBeTruthy();
        expect(getByText('Do you want to remove this city from your favorites?')).toBeTruthy();
    })


    test('should call deleteFavorite when Yes button is pressed in dialog', () => {

        const deleteFavoriteMock = jest.fn();

        useFavorites.mockReturnValue({
            saveFavorite: jest.fn(),
            deleteFavorite: deleteFavoriteMock,
            isFavorite: jest.fn().mockReturnValue(true),
        });

        const { getByRole, getByText } = render(
            <Provider>
                <FavoriteIconButton city="Helsinki" />
            </Provider>
        );

        fireEvent.press(getByRole('button'));
        fireEvent.press(getByText('Yes'));

        expect(deleteFavoriteMock).toHaveBeenCalledWith('Helsinki');
    })


    test('should close dialog, when Cancel button is pressed', () => {

        useFavorites.mockReturnValue({
            saveFavorite: jest.fn(),
            deleteFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(true),
        });

        const { getByRole, getByText } = render(
            <Provider>
                <FavoriteIconButton city="Helsinki" />
            </Provider>
        );

        fireEvent.press(getByRole('button'));
        fireEvent.press(getByText('Cancel'));

    })

})


describe('FavoritesList', () => {

    test('should render favorite cities', () => {

        useFavorites.mockReturnValue({
            favorites: ['Helsinki', 'Espoo'],
            saveFavorite: jest.fn(),
            deleteFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
        });

        const { getByText } = render(
            <Provider>
                <FavoritesList />
            </Provider>
        );

        expect(getByText('Helsinki')).toBeTruthy();
        expect(getByText('Espoo')).toBeTruthy();
        expect(getByText('Favorite Places')).toBeTruthy();

    })
    
    test('should navigate to IndexScreen when selected favorite city is pressed', () => {

        useFavorites.mockReturnValue({
            favorites: ['Helsinki', 'Espoo'],
            saveFavorite: jest.fn(),
            deleteFavorite: jest.fn(),
            isFavorite: jest.fn().mockReturnValue(false),
        });

        const mockNavigate = jest.fn();

        useNavigation.mockReturnValue({ navigate: mockNavigate });
      
        const { getByText } = render(
            <Provider>
                <FavoritesList />
            </Provider>
        );

        const city = getByText('Helsinki');
        fireEvent.press(city);

        expect(mockNavigate).toHaveBeenCalledWith('Home', { selectedFavorite: 'Helsinki'});

    })
    

})