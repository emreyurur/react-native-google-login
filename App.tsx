import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'react-native-get-random-values';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProposalScreen from './src/screens/ProposalScreen';


const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="ProposalScreen" component={ProposalScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
