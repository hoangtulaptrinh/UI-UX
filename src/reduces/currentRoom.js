import actionTypes from '../const/actionTypes';

var initialState = -1;
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setCurrentRoom:
      return state = action.data;

    default:
      return state;
  }
}

export default myReducer;