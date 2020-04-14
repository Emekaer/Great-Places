import React from 'react';
import {} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from '../screens/MapScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import PlaceListScreen from '../screens/PlaceListScreen'


const Stack = createStackNavigator();

const PlacesNavigator =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Map Screen" component={MapScreen} />
        </Stack.Navigator>
    )

};

export default PlacesNavigator;