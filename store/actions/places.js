export const ADD_PLACES = "ADD_PLACES";
export const DELETE_PLACES ="DELETE_PLACES"

export const addPlaces = (title, image) => {
  return { type: ADD_PLACES, placeData: { title: title, imageUri: image} };
};

export const deletePlaces = (id) => {
  return { type: DELETE_PLACES, id :id };
};
