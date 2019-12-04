import actionTypes from '../const/actionTypes';
import _ from 'lodash'

var initialState = []
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.addMemberToRoom:
      console.log('add-add')
      _.find(state, { id: action.idRoom }).Member = action.data
      return state;

    case actionTypes.setDataRoom:
      const dataRoom = _.map(action.data, (n) => (
        {
          id: parseInt(n.id),
          nameRoom: n.attributes.name,
          type: n.attributes.room_type,
          numberNotificationUnRead: n.attributes.unread,
          Intro: n.attributes.description,
          Member: []
        }
      ))
      return dataRoom;

    default:
      return state;
  }
}

export default myReducer;