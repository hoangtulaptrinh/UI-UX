import { combineReducers } from 'redux';

import dataRoom from './dataRoom'
import currentRoom from './currentRoom'
import showInfoRoom from './showInfoRoom'
import changeTheme from './changeTheme'

const myReducer = combineReducers({
  dataRoom: dataRoom,
  currentRoom: currentRoom,
  showInfoRoom: showInfoRoom,
  changeTheme: changeTheme
});

export default myReducer;