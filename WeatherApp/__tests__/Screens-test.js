/*
Docs:
    React-native-maps mocking for testing:
    https://dev.to/cecheverri4/google-maps-geolocation-and-unit-test-on-react-native-4eim
*/

import { render, screen } from '@testing-library/react-native';
import FavoritesScreen from '../screens/FavoritesScreen';
import IndexScreen from '../screens/IndexScreen';


describe('Screens', () => {

  test ('Renders IndexScreen', () => {
    const { getByText } = render(<IndexScreen />)

    const currentDate = new Date();
    const formattedCurrentDate = `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`;

    expect(getByText(formattedCurrentDate)).toBeTruthy();
  });

  test('Renders FavoritesScreen', async () => {

    render(<FavoritesScreen />);

    expect(screen.getByText('Favorites')).toBeTruthy();
  });


});
  // jest.mock('react-native-maps', () => {
    //   const React = require('react');
    //   const { View } = require('react-native');
    //   class MockMapView extends React.Component {
    //     render() {
    //       const { testID, children, ...props } = this.props;
    //       return (
    //         <View {...{ ...props, testID }}>
    //           {children}
    //         </View>
    //       );
    //     }
    //   }
    //   const mockMapTypes = {
    //     STANDARD: 0,
    //     SATELLITE: 1,
    //     HYBRID: 2,
    //     TERRAIN: 3,
    //     NONE: 4,
    //     MUTEDSTANDARD: 5,
    //   };

    //   return {
    //     __esModule: true,
    //     default: MockMapView,
    //     MAP_TYPES: mockMapTypes,
    //     PROVIDER_DEFAULT: 'default',
    //     PROVIDER_GOOGLE: 'google',
    //   };
    // });