import { combineReducers } from 'redux';

import dataRoom from './dataRoom'
import currentRoom from './currentRoom'
import showInfoRoom from './showInfoRoom'

const myReducer = combineReducers({
  dataRoom: dataRoom,
  currentRoom: currentRoom,
  showInfoRoom: showInfoRoom
});

export default myReducer;