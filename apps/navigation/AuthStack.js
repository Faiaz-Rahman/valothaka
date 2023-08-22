import React, { useEffect, useState } from 'react'

import { OnboardingScreen, LoginScreen, SignUpScreen } from '../screens'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)

  let routeName

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true)
      } else {
        setIsFirstLaunch(false)
      }
    })
  }, [])

  if (isFirstLaunch === null) {
    return null
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding'
  } else {
    routeName = 'Login'
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Sign up" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
