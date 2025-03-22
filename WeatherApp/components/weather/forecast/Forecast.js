import { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { SegmentedButtons } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import ForecastFor16Days from "./ForecastFor16Days";
import ForecastForFiveDays from "./ForecastFor5Days";
import { setThemeByTime } from "../../date/DateService";


export default function Forecast() {

    const [value, setValue] = useState('5');

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={setThemeByTime()} style={styles.background} />
            <SegmentedButtons 
                style={styles.buttonContainer}
                value={value}
                onValueChange={setValue}
                buttons={[
                    {
                        value: '5',
                        label: '5 Days',
                    },
                    {
                        value: '16',
                        label: '16 Days'
                    },
                ]}
            />
            {value === '16' ? <ForecastFor16Days /> : <ForecastForFiveDays />}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    buttonContainer: {
        padding: 20,
    },
    container: {
        flex: 1,
        width: '90%',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 20,
    },
})