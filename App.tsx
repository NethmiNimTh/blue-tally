import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appearance, useColorScheme } from 'react-native';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect, useState } from 'react';
import SQLite from 'react-native-sqlite-storage';

// Import core screens
import StartPage from './src/component/start-pages/start-page';
import LoginPage from './src/component/login-page/login-page';
import RegisterPage from './src/component/register-page/register-page';

import CitizenDashboard from './src/component/Citizen/CitizenDashboard';

// Import language selection screens
import WelcomeEnglish from './src/component/start-pages/WelcomeEnglish';
import WelcomeTamil from './src/component/start-pages/WelcomeTamil';
import WelcomeSinhala from './src/component/start-pages/WelcomeSinhala';
import OptionSelection from './src/component/start-pages/OptionSelection';

// Import authentication related screens
import VerifyEmail from './src/component/register-page/veryfy-email';
import SetPin from './src/component/register-page/pin-password';
import ForgetPasswordPage from './src/component/login-page/forgot-pasword';
import VerifyFPEmail from './src/component/login-page/veryfy-fogotPW-email';
import ResetPassword from './src/component/login-page/reset-password';

import AnimalDataCollection from './src/component/Citizen/AnimalDataCollections';
import PlantDataCollection from './src/component/Citizen/PlantDataCollection';
import NatureDataCollection from './src/component/Citizen/NatureDataCollection';
import HumanActivityDataCollection from './src/component/Citizen/HumanActivityDataCollection';    
import CreditInterface from './src/component/Citizen/CreditInterface';
import LanguageSelection from './src/component/LanguageSelection/LanguageOption';


// Google Client Configuration
const GOOGLE_WEB_CLIENT_ID: string = '532310046514-217fr842olbptie78ubtgi4mkq84ljo8.apps.googleusercontent.com';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
  scopes: ['profile', 'email'],
});

// Custom Light and Dark Themes
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200EE',
    background: '#FFFFFF',
    text: '#000000',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    background: '#121212',
    text: '#FFFFFF',
  },
};

// Create the Stack Navigator
const Stack = createNativeStackNavigator();

const customAnimation = {
  animationEnabled: true,
  gestureEnabled: true,
  cardStyleInterpolator: ({
    current,
  }: {
    current: { progress: { interpolate: Function } };
  }) => ({
    cardStyle: {
      opacity: current.progress.interpolate({
        inputRange: [0, 0.5, 0.9, 1],
        outputRange: [0, 0.25, 0.7, 1],
      }),
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [1000, 0],
          }),
        },
      ],
    },
  }),
};

const App = () => {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme);
  const [initialRoute, setInitialRoute] = useState(null);

  // Database configuration
  const db = SQLite.openDatabase(
    {name: 'user_db.db', location: 'default'},
    () => console.log('Database opened successfully'),
    error => console.error('Error opening database: ', error),
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });
    setInitialRoute('StartPage');
    return () => listener.remove();
  }, []);

  if (!initialRoute) return null;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            ...customAnimation,
          }}>
          <Stack.Screen name="StartPage" component={StartPage} />
          <Stack.Screen name="LoginPage" component={LoginPage} />
          <Stack.Screen name="RegisterPage" component={RegisterPage} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen name="SetPin" component={SetPin} />
         
          <Stack.Screen name="CitizenDashboard" component={CitizenDashboard} />
          <Stack.Screen name="WelcomeEnglish" component={WelcomeEnglish} />
          <Stack.Screen name="WelcomeTamil" component={WelcomeTamil} />
          <Stack.Screen name="WelcomeSinhala" component={WelcomeSinhala} />
          <Stack.Screen name="OptionSelection" component={OptionSelection} />
          <Stack.Screen name="ForgetPasswordPage" component={ForgetPasswordPage} />
          <Stack.Screen name="VerifyFPEmail" component={VerifyFPEmail} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="AnimalDataCollection" component={AnimalDataCollection} />
          <Stack.Screen name="PlantDataCollection" component={PlantDataCollection} />
          <Stack.Screen name="NatureDataCollection" component={NatureDataCollection} />
          <Stack.Screen name="HumanActivityDataCollection" component={HumanActivityDataCollection} />
          <Stack.Screen name="CreditInterface" component={CreditInterface} />
          <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;