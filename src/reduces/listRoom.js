import actionTypes from '../const/actionTypes';
// import _ from 'lodash'

var initialState = []

var myReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.getListRoom:
      return action.data.data;

    default:
      return state;
  }
}

export default myReducer;