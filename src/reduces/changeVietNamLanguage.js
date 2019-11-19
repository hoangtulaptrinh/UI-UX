import actionTypes from '../const/actionTypes';

var initialState = false;
var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.setChangeVietNamLanguage:
      return state = !state;

    default:
      return state;
  }
}

export default myReducer;