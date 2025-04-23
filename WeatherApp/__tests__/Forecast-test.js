

// import { render, waitFor, act, screen } from '@testing-library/react-native';
// import Forecast from '../components/weather/forecast/Forecast';
// import { getForecastForFiveDays } from '../api';
// import { mockForecastDataFiveDays } from '../__mockData__/mockDataForecastFiveDays';
// import ForecastForFiveDays from '../components/weather/forecast/ForecastFor5Days';



// describe('ForecastForFiveDays', () => {
//     const location = { 
//         latitude: 60.1011, 
//         longitude: 24.5618 
//     };

//     beforeEach(() => {
//         getForecastForFiveDays.mockResolvedValue(mockForecastDataFiveDays);
//     });

//     test('Fetches forecast data', async () =>{
//         render(<ForecastForFiveDays location={location} />);

//         await waitFor(() => {
//             expect(getForecastForFiveDays).toHaveBeenCalledWith(location);
//         });

//         const tempElements = screen.getAllByText('Temp');
//     expect(tempElements.length).toBe(5);
    

//         expect(screen.getByText('Temp')).toBeTruthy();
//         expect(tempElements[0]).toHaveTextContent('10 °C');
//         expect(screen.getByText('°C')).toBeTruthy();


//     })
// })