import { render, screen, fireEvent } from '@testing-library/react-native';

import WeatherIndex from '../components/weather/WeatherIndex';
import useWeather from '../hooks/useWeather';


    test('The current day is rendered', () =>  {
        const { getByText } = render(<WeatherIndex/>);
        const currentDate = new Date();
        const formattedCurrentDate = `${currentDate.getDate()}.${currentDate.getMonth() +1}.${currentDate.getFullYear()}`;
        getByText(formattedCurrentDate);
    })


    // test('Displays temperature, feels like and wind speed for the current day', () => {
        

    //     const mockWeather = {
    //         main: {
    //             temp: 7,
    //             feels_like: 5
    //         },
    //         weather: [{
    //             icon:'01d'
    //         }],
    //         wind: {
    //             speed: 2
    //         }
    //     };


    //     render(<WeatherIndex />);
    //     expect(screen.getByText('Feels like: 7°')).toBeOnTheScreen();
    //     expect(screen.getByText('5°')).toBeOnTheScreen();
    //     expect(screen.getByText('Wind speed: 2 m/s')).toBeOnTheScreen();

    // })




