import actionTypes from '../const/actionTypes';

var initialState = 'Work';
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setCurrentRoom:
      return state = action.data;

    default:
      return state;
  }
}

export default myReducer;