// import { render, waitFor } from "@testing-library/react-native";
// import WeatherIndex from "../components/weather/WeatherIndex";
// import ForecastForFiveDays from "../components/weather/forecast/ForecastFor5Days";
// import { getForecastForFiveDays } from '../api';
// import { mockForecastDataFiveDays } from '../__mockData__/mockDataForecastFiveDays';
// import ForecastForFiveDays from '../components/weather/forecast/ForecastFor5Days';

// describe('ForecastForFiveDays', () => {

//     jest.mock('../api', () => ({
//         getForecastForFiveDays: jest.fn(),
//     }))

//     jest.mock('../components/weather/forecast/ForecastFlatList5days', () => 'ForecastFlatList5');

//     jest.mock('../components/weather/forecast/ForecastFlatList5days', () => {
//         return function MockedForecastFlatList5days() {
//           return <div testID="forecast">Forecast flatlist</div>;
//         }
//       });

//     test('should render activity indicator and shows forecast after fetching data', async() => {
       
//         getForecastForFiveDays.mockResolvedValue({
//             list: [
//               {
//                 dt_txt: "2024-04-30 15:00:00",
//                 main: { temp: 16, feels_like: 14 },
//                 weather: [{ icon: '01d' }],
//                 wind: { speed: 5 },
//               },
//               {
//                 dt_txt: "2024-04-30 18:00:00",
//                 main: { temp: 17, feels_like: 15 },
//                 weather: [{ icon: '02d' }],
//                 wind: { speed: 6 },
//               },
//             ],
//           });

//           const location = {
//             latitude: 60.1011, 
//             longitude: 24.5618 
//         }

//         const { getByTestId  } = render(
//             <ForecastForFiveDays location={location} />
//           );

//           expect(getByTestId('activityIndicator')).toBeTruthy();

//           await waitFor(() => {
//             expect(getByTestId('forecast')).toBeTruthy();
//           })
//     })
    
// })

describe('ForecastForFiveDays', () => {
    const location = { 
        latitude: 60.1011, 
        longitude: 24.5618 
    };

    const mockForecastDataFiveDays = {
        list: [
            {
                dt_txt: "2024-04-30 15:00:00",
                main: { temp: 16, feels_like: 14 },
                weather: [{ icon: '01d' }],
                wind: { speed: 5 },
            },
            {
                dt_txt: "2024-04-30 18:00:00",
                main: { temp: 17, feels_like: 15 },
                weather: [{ icon: '02d' }],
                wind: { speed: 6 },
            },
        ],
    };

    beforeEach(() => {
        getForecastForFiveDays.mockResolvedValue(mockForecastDataFiveDays);
    });

    test('Fetches forecast data', async () =>{
        render(<ForecastForFiveDays location={location} />);

        await waitFor(() => {
            expect(getForecastForFiveDays).toHaveBeenCalledWith(location);
        });

    //     const tempElements = screen.getAllBydiv('Temp');
    // expect(tempElements.length).toBe(5);
    

    //     expect(screen.getBydiv('Temp')).toBeTruthy();
    //     expect(tempElements[0]).toHavedivContent('10 °C');
    //     expect(screen.getBydiv('°C')).toBeTruthy();


    })
})