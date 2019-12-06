import actionTypes from '../const/actionTypes';

var initialState = false;
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setIsNewRoom:
      return state = action.data;

    default:
      return state;
  }
}

export default myReducer;