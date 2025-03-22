import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from 'react-native-paper';
import ForecastFor16Days from "./ForecastFor16Days";
import ForecastForFiveDays from "./ForecastFor5Days";


export default function Forecast() {

    const [value, setValue] = useState('5');

    return (
        <SafeAreaView style={styles.container}>
            <SegmentedButtons
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: '5',
                        label: '5 Days'
                    },
                    {
                        value: '16',
                        label: '16 Days'
                    },
                ]}
            />
            {value === '16' ? <ForecastFor16Days /> : <ForecastForFiveDays />}
            {/* <ForecastFor16Days /> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%'
    },
})