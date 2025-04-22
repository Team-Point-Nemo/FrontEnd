import * as React from 'react';
import { IconButton, MD3Colors } from 'react-native-paper';

export default function FavoriteIconButton () {
    return (
        <IconButton
            icon="heart"
            iconColor={MD3Colors.error50}
            size={30}
            onPress={() => console.log('Pressed')}
        />
    )
};