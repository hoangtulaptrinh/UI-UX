import actionTypes from '../const/actionTypes';

var initialState = {};
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setCurrentUser:
      return action.data;

    case actionTypes.letChangeInfoUser:
      state.attributes.avatarUrl = action.data.attributes.avatarUrl;
      return state;

    default:
      return state;
  }
}

export default myReducer;