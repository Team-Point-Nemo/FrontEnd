import { setImageByTime } from "../components/date/DateService";
import { setThemeByTime } from "../components/date/DateService";
import { mapForecastData } from "../components/weather/forecast/DataEdit";

describe('setImageByTime', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return a galaxy image for the night', () => {
        jest.setSystemTime(new Date(2024, 4, 27, 19, 0));
        const result = setImageByTime();
        expect(result).toBe(require("../assets/galaxy.jpg"));
    })

    test('should return a sunrise image for the morning', () => {
        jest.setSystemTime(new Date(2024, 4, 27, 8, 0));
        const result = setImageByTime();
        expect(result).toBe(require("../assets/sunrise.jpg"));
    })

    test('should return a cloudy image for the day', () => {
        jest.setSystemTime(new Date(2024, 4, 27, 12, 0));
        const result = setImageByTime();
        expect(result).toBe(require("../assets/cloudy.jpg"));
    })

})

describe(' setThemeByTime', () => {

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should return dark theme for the night times', () => {
        jest.setSystemTime(new Date(2024, 3, 27, 19, 23));
        const result = setThemeByTime();
        expect(result).toEqual(['#0E1013', '#1A1D23', '#2B303B']);
    })

    test('should return morning colors for the morning times', () => {
        jest.setSystemTime(new Date(2024, 3, 27, 19, 8));
        const result = setThemeByTime();
        expect(result).toEqual(['#0E1013', '#1A1D23', '#2B303B']);
    })

    test('should return day colors for the day times', () => {
        jest.setSystemTime(new Date(2024, 3, 27, 19, 12));
        const result = setThemeByTime();
        expect(result).toEqual(['#0E1013', '#1A1D23', '#2B303B']);
    })


})

describe('Map forecast data', () => {
    test('should return mapped forecast data for 16 days', () => {

        const mockData = {
            list: [
                {
                    dt: 1714471200,
                    temp: { day: 15.6 },
                    feels_like: { day: 14.2 },
                    speed: 5.3,
                    weather: [{ icon: '01d' }],
                },
                {
                    dt: 1714557600,
                    temp: { day: 18.1 },
                    feels_like: { day: 17.5 },
                    speed: 4.7,
                    weather: [{ icon: '02d' }],
                },
            ],
        };

        const result = mapForecastData(mockData);

        expect(result).toEqual([
            {
                dt: '30.04.',
                tempDay: 16,
                feelsLikeDay: 14,
                wind: 5,
                weatherIcon: '01d',
            },
            {
                dt: '01.05.',
                tempDay: 18,
                feelsLikeDay: 18,
                wind: 5,
                weatherIcon: '02d',
            },
        ])
    })


})