import actionTypes from '../const/actionTypes';

var initialState = true;
var myReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.setShowInfoRoom:
            return state = !state;

        default:
            return state;
    }
}

export default myReducer;