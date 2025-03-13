import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, SegmentedButtons } from 'react-native-paper';
import ForecastFor16Days from "./ForecastFor16Days";


export default function Forecast() {

    const [value, setValue] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: '5 Days',
                        label: '5 Days'
                    },
                    {
                        value: '16 Days',
                        label: '16 Days'
                    },
                ]}
            />

            <ForecastFor16Days />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%'
    },
})