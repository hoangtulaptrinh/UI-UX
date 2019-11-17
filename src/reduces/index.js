import { combineReducers } from 'redux';

import dataRoom from './dataRoom'
import currentRoom from './currentRoom'

const myReducer = combineReducers({
  dataRoom: dataRoom,
  currentRoom: currentRoom,
});

export default myReducer;