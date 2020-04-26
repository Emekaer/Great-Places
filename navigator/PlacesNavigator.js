import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "../components/HeaderButton";

import MapScreen from "../screens/MapScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen from "../screens/NewPlaceScreen";
import PlaceListScreen from "../screens/PlaceListScreen";

import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const defaultOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
};

const PlacesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen
        name="PlaceListScreen"
        component={PlaceListScreen}
        options={(navData) => {
          return {
            title: "All Places",
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                  title="Add Place"
                  iconName="md-add"
                  onPress={() => navData.navigation.navigate("NewPlaceScreen")}
                />
              </HeaderButtons>
            ),
          };
        }}
      />
      <Stack.Screen
        name="PlaceDetailScreen"
        component={PlaceDetailScreen}
        options={(navData) => {
          const placeTitle = navData.route.params.placeTitle;
          return {
            headerTitle: placeTitle,
          };
        }}
      />
      <Stack.Screen
        name="NewPlaceScreen"
        component={NewPlaceScreen}
        options={() => {
          return {
            title: "Add Place",
          };
        }}
      />
      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={(navData) => {
          /* const saveLocation */ console.log(
            navData.route.params.saveLocation
          );

          return {
            title: "Select Map Location",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginHorizontal: 20 }}
                onPress={saveLocation}
              >
                <Text style={{ fontSize: 16, color: "white" }}>Save</Text>
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default PlacesNavigator;
