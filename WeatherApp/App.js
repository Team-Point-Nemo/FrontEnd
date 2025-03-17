import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from 'react-native-paper';
import StackNavigator from "./navigation/StackNavigator";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}