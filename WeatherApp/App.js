import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from './navigation/TabNavigator';

export default function App() {
  return (
    <PaperProvider theme={theme} testID="paperProvider">
      <NavigationContainer testID="navigationContainer">
        <TabNavigator testID/>
      </NavigationContainer>
    </PaperProvider>
  );
};

const theme = {
  ...DefaultTheme,
  colors: {
    primary: "rgb(0, 64, 101)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(205, 229, 255)",
    onPrimaryContainer: "rgb(0, 29, 50)",
    secondary: "rgb(52, 97, 134)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(205, 229, 255)",
    onSecondaryContainer: "rgb(0, 29, 50)",
    tertiary: "rgb(114, 152, 190)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(206, 229, 255)",
    onTertiaryContainer: "rgb(0, 29, 51)",
    error: "rgb(210, 4, 45)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 216)",
    onErrorContainer: "rgb(65, 0, 7)",
    background: "rgb(177, 190, 214)",
    onBackground: "rgb(255, 255, 255)",
    surface: "rgb(252, 252, 255)",
    onSurface: "rgb(255, 255, 255)", // Text-components
    surfaceVariant: "rgb(222, 227, 235)",
    onSurfaceVariant: "rgb(36, 103, 142)",
    outline: "rgb(255, 255, 255)",
    outlineVariant: "rgb(194, 199, 207)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(47, 48, 51)",
    inverseOnSurface: "rgb(240, 240, 244)",
    inversePrimary: "rgb(148, 204, 255)",
    elevation: {
      level0: "transparent",
      level1: "rgb(239, 244, 250)",
      level2: "rgb(232, 240, 247)",
      level3: "rgb(224, 235, 244)",
      level4: "rgb(222, 234, 243)",
      level5: "rgb(217, 231, 241)"
    },
    surfaceDisabled: "rgba(26, 28, 30, 0.12)",
    onSurfaceDisabled: "rgba(26, 28, 30, 0.38)",
    backdrop: "rgba(43, 49, 55, 0.4)",
    backgroundContainer: "rgb(212, 227, 255)",
    onBackgroundContainer: "rgb(0, 28, 58)"
  },
};
