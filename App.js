import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import PlacesNavigator from "./navigator/PlacesNavigator";
import { applyMiddleware, createStore, combineReducers} from "redux";
import {Provider} from "react-redux"
import ReduxThunk from 'redux-thunk'

import places from "./store/reducer/places"

const rootReducer = combineReducers({
  places: places,
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}


