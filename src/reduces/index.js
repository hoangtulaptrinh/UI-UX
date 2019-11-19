import { combineReducers } from 'redux';

import dataRoom from './dataRoom'
import currentRoom from './currentRoom'
import showInfoRoom from './showInfoRoom'
import changeTheme from './changeTheme'
import dataVietNamLanguage from './dataVietNamLanguage'
import changeVietNamLanguage from './changeVietNamLanguage'

const myReducer = combineReducers({
  dataRoom: dataRoom,
  currentRoom: currentRoom,
  showInfoRoom: showInfoRoom,
  changeTheme: changeTheme,
  dataVietNamLanguage: dataVietNamLanguage,
  changeVietNamLanguage: changeVietNamLanguage
});

export default myReducer;