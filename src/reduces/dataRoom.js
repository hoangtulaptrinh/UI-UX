// import actionTypes from '../const/actionTypes';

var initialState = [
  {
    nameRoom: 'Work', type: 'Work', numberNotificationUnRead: '2', data: [
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
    nameRoom: 'Shopping', type: 'Shopping', numberNotificationUnRead: '4', data: [
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
    nameRoom: 'Party', type: 'Party', numberNotificationUnRead: '6', data: [
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
    default:
      return state;
  }
}

export default myReducer;