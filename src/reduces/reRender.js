import actionTypes from '../const/actionTypes';

var initialState = false;
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.addMemberToRoom:
      return !state;

    case actionTypes.setAllUser:
      return !state;

    case actionTypes.setReRender:
      return !state;

    default:
      return state;
  }
}

export default myReducer;