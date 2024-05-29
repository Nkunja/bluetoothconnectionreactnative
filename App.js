import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsPage from './screens/SettingsPage';
import { BluetoothProvider } from "rn-bluetooth-classic";

const Stack = createStackNavigator();

const App = () => {
  return (
    <BluetoothProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Settings" component={SettingsPage} />
      </Stack.Navigator>
    </NavigationContainer>
    </BluetoothProvider>
  );
};

export default App;
