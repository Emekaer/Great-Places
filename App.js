import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import PlacesNavigator from "./navigator/PlacesNavigator";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import places from "./store/reducer/places";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Database initialized.");
  })
  .catch((err) => {
    console.log("The db failed to initialize.");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: places,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}
