import actionTypes from '../const/actionTypes';
import _ from 'lodash'

var initialState = []
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setSendMessage:
      // state[_.findIndex(state, { id: action.data.nameRoom })].data.push({ avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', message: action.data.message, level: 'Member' });
      return state;

    case actionTypes.setSendGif:
      // state[_.findIndex(state, { id: action.data.nameRoom })].data.push({ avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', gif: action.data.gif, level: 'Member' });
      return state;

    case actionTypes.setDataRoom:
      action.data[0].attributes.name = 'Work'
      const dataRoom = _.map(action.data, (n) => (
        {
          id: parseInt(n.id),
          nameRoom: n.attributes.name,
          type: 'Work',
          numberNotificationUnRead: n.attributes.unread,
          Intro: n.attributes.description,
        }
      ))
      console.log(dataRoom)
      return dataRoom;

    default:
      return state;
  }
}

export default myReducer;