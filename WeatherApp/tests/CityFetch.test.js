import React from 'react';
import * as Location from 'expo-location';
import { render, waitFor } from '@testing-library/react-native';

jest.mock('expo-location')

test('gets right city from coordinates outside of city center', async () => {
    const mockLocation = {
        latitude: 60.4193,
        longitude: 22.2315,
    };

});
