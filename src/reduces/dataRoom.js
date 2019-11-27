import actionTypes from '../const/actionTypes';
import _ from 'lodash'

var initialState = [
  {
    nameRoom: 'Work', type: 'Work', numberNotificationUnRead: '2', Intro: ' Work-to-rule is a job action in which employees do no more than the minimum required by the rules of their contract, and precisely follow all safety or other regulations, which may cause a slowdown or decrease in productivity, as they are no longer working during breaks or during unpaid extended hours and weekends '
    , data: [
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
  },
  {
    nameRoom: 'Shopping', type: 'Shopping', numberNotificationUnRead: '4', Intro: " 1) Create a 'to buy' list and don't veer off into the makeup department no matter how much that new Dior lipstick is calling your name 2) Wear proper undergarments and shoes for a good view of your outfit 3) Shop mornings - it's less crowded, the merchandise is tidy, and the sales associates are fresh "
    , data: [
      { avatar: 'https://i.imgur.com/hYQgQKQb.jpg', name: 'Cute Girl', time: 'Today at 9:34 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/YAE3htvb.jpg', name: 'Thirsty Girl ', time: 'Today at 1:34 PM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/Ks7LodGb.jpg', name: 'Tsunade', time: 'Today at 2:11 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/A1pbCLxb.jpg', name: 'Miku', time: 'Today at 3:45 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/qOcNLpLb.jpg', name: 'Loli is to be loved', time: 'Today at 11:34 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/3eB7V4jb.jpg', name: 'Alice Senpai', time: 'Today at 7:56 AM', message: 'hello', level: 'Admin' },
      { avatar: 'https://i.imgur.com/89aYroeb.jpg', name: 'Motor Show Girl', time: 'Today at 12:34 PM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/ji8Y1Z9b.jpg', name: 'Ai UeHare', time: 'Today at 5:34 PM', message: 'hello', level: 'Member' },
    ],
  },
  {
    nameRoom: 'Party', type: 'Party', numberNotificationUnRead: '6', Intro: ' You’ve got your outfit sorted, the group chat is going off and you’re ready to party. Taking the time to do a bit of planning before you head out the door can make all the difference in how the night goes. Partying safely means that you’re less likely to get into trouble, and more likely to just have a good time ', data: [
      { avatar: 'https://i.imgur.com/YAE3htvb.jpg', name: 'Thirsty Girl ', time: 'Today at 1:34 PM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/Ks7LodGb.jpg', name: 'Tsunade', time: 'Today at 2:11 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/A1pbCLxb.jpg', name: 'Miku', time: 'Today at 3:45 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/89aYroeb.jpg', name: 'Motor Show Girl', time: 'Today at 12:34 PM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/ji8Y1Z9b.jpg', name: 'Ai UeHare', time: 'Today at 5:34 PM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/qOcNLpLb.jpg', name: 'Loli is to be loved', time: 'Today at 11:34 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/3eB7V4jb.jpg', name: 'Alice Senpai', time: 'Today at 7:56 AM', message: 'hello', level: 'Member' },
      { avatar: 'https://i.imgur.com/hYQgQKQb.jpg', name: 'Cute Girl', time: 'Today at 9:34 AM', message: 'hello', level: 'Admin' },
    ],
  }
]

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setSendMessage:
      state[_.findIndex(state, { nameRoom: action.data.nameRoom })].data.push({ avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', message: action.data.message, level: 'Member' });
      return state;

    case actionTypes.setSendGif:
      state[_.findIndex(state, { nameRoom: action.data.nameRoom })].data.push({ avatar: 'https://i.imgur.com/VjnUSxab.jpg', name: 'Hinataaaaaaa', time: 'Today at 4:45 PM', gif: action.data.gif, level: 'Member' });
      return state;

    default:
      return state;
  }
}

export default myReducer;