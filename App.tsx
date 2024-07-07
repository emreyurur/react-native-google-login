import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'react-native-get-random-values';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProposalScreen from './src/screens/ProposalScreen';
import ProposalDetailScreen from './src/screens/ProposalDetailScreen';

type RootStackParamList = {
  WelcomeScreen: undefined;
  ProposalScreen: undefined;
  ProposalDetailScreen: { title: string; description: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProposalScreen">
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="ProposalScreen" component={ProposalScreen}/>
          <Stack.Screen 
            name="ProposalDetailScreen" 
            component={ProposalDetailScreen}
            options={{ title: 'Proposal Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
