import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import api from './utils/api';
import { useAppDispatch } from './utils/context';
import StartScreen from './screens/Start';
import EndScreen from './screens/End';
import MainScreen from './screens/Main';
import Providers from './Providers';

const Stack = createStackNavigator();

function Root() {
  const dispatch = useAppDispatch();
  const [inited, setInited] = React.useState(false);
  const [initialRoute, setInitialRoute] = React.useState();

  React.useEffect(() => {
    async function init() {
      const data = await api.getUserData();

      if (data) {
        dispatch({ type: 'set-data', payload: data });
        setInitialRoute('Main');
      } else {
        setInitialRoute('Start');
      }

      setInited(true);
    }

    init();
  }, [dispatch]);

  return (
    <NavigationNativeContainer>
      {inited && initialRoute && (
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Start"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="End"
            component={EndScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationNativeContainer>
  );
}

export default function App() {
  return (
    <Providers>
      <Root />
    </Providers>
  );
}
