import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home';
import { Arrival } from '../screens/Arrival';
import { Departure } from '../screens/Departure';
import React from 'react';
const {Navigator, Screen } = createNativeStackNavigator();


export function AppRoutes(){
    return(
    <Navigator screenOptions={{ headerShown: false}}>
        <Screen 
        name="Home"
        component={Home}
        />

        <Screen 
        name="departure"
        component={Departure}
        />

        <Screen 
        name="arrival"
        component={Arrival}
        />
    </Navigator>
    );
}