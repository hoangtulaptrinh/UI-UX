import actionTypes from '../const/actionTypes';
import _ from 'lodash'

var initialState = []
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setSendMessage:
      state[_.findIndex(state, { id: action.data.nameRoom })].data.push({ avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', message: action.data.message, level: 'Member' });
      return state;

    case actionTypes.setSendGif:
      state[_.findIndex(state, { id: action.data.nameRoom })].data.push({ avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', gif: action.data.gif, level: 'Member' });
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
          data: [
            { avatar: 'https://i.imgur.com/qOcNLpLb.jpg', name: 'Loli is to be loved', time: 'Today at 11:34 AM', message: 'hello', level: 'Member' },
            { avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', message: 'hello', level: 'Member' },
            { avatar: 'https://i.imgur.com/3eB7V4jb.jpg', name: 'Alice Senpai', time: 'Today at 7:56 AM', message: 'hello', level: 'Member' },
            { avatar: 'https://i.imgur.com/hYQgQKQb.jpg', name: 'Cute Girl', time: 'Today at 9:34 AM', message: 'hello', level: 'Member' },
            { avatar: 'https://i.imgur.com/YAE3htvb.jpg', name: 'Thirsty Girl ', time: 'Today at 1:34 PM', message: 'hello', level: 'Member' },
            { avatar: 'https://i.imgur.com/Ks7LodGb.jpg', name: 'Tsunade', time: 'Today at 2:11 AM', message: 'hello', level: 'Admin' },
            { avatar: 'https://i.imgur.com/A1pbCLxb.jpg', name: 'Miku', time: 'Today at 3:45 AM', message: 'hello', level: 'Member' },
            { avatar: 'https://i.imgur.com/89aYroeb.jpg', name: 'Motor Show Girl', time: 'Today at 12:34 PM', message: 'hello', level: 'Member' },
            { avatar: 'https://i.imgur.com/ji8Y1Z9b.jpg', name: 'Ai UeHare', time: 'Today at 5:34 PM', message: 'hello', level: 'Member' },
          ],
        }
      ))
      console.log(dataRoom)
      return dataRoom;

    default:
      return state;
  }
}

export default myReducer;