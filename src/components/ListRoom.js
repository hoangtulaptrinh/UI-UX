import React, { useState } from 'react';
import './ListRoom.css';
import _ from 'lodash'
import { MdWork } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';
import { GiLargeDress, GiMusicalNotes } from 'react-icons/gi'
import classNames from 'classnames'
import AddMember from './Modal/AddMember'
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { useHistory } from "react-router-dom";
import CreateRoom from './Modal/CreateRoom'
import ChangeInfo from './Modal/ChangeInfo'

function ListRoom(props) {
  let history = useHistory();
  const [currentRoomMouseDown, setCurrentRoomMouseDown] = useState(-1);
  const [currentRoomOnClick, setCurrentRoomOnClick] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const onClickRoom = (id) => {
    setCurrentRoomOnClick(id)
    props.setCurrentRoom(id)
  }
  const searchRoom = (e) => {
    setInputValue(e.target.value)
  }
  const ListRoomArr = _.filter(_.map(props.dataRoom, n => ({
    nameRoom: n.nameRoom,
    type: n.type,
    numberNotificationUnRead: n.numberNotificationUnRead,
    id: n.id
  })), n => (_.includes(n.nameRoom.toLowerCase(), inputValue.toLowerCase())))
  const lightTheme = props.changeTheme;
  const logOut = () => {
    history.goBack();
    props.setCurrentRoom(-1);
    props.setAllowLogin();
  }
  return (
    <div
      className={classNames('ListRoom', {
        ListRoomLightTheme: lightTheme === true,
      })}
    >
      <div
        className={classNames('Header-ListRoom', {
          HeaderListRoomLightTheme: lightTheme === true,
        })}
      >
        <div className='Top-Top'>
          <div className='Top-Header-ListRoom'>
            <h4>ddtsoft</h4>
          </div>
          <div className='LogOut' onClick={logOut} >
            {
              props.changeVietNamLanguage ?
                <p>Log Out</p>
                :
                <p>{props.dataVietNamLanguage.LogOut}</p>
            }
          </div>
        </div>
        <div className='Bot-Bot'>
          <div className='Bot-Header-ListRoom-Img'>
            <ChangeInfo />
          </div>
          <div className='Bot-Header-ListRoom-Name'>
            <FaCircle className='Icon-Circle' />
            <h6>{props.currentUser.attributes.name}</h6>
          </div>
        </div>
      </div>

      <div className='Body-ListRoom'>
        <div className='create-room'>
          <CreateRoom />
          {
            props.changeVietNamLanguage ?
              <p>Create A New Room</p>
              :
              <p>{props.dataVietNamLanguage.CreateANewRoom}</p>
          }
        </div>
        <div className="wrapper">
          <div className="search-icon">
            <input
              className={classNames('search-circle', {
                SearchCircleLightTheme: lightTheme === true,
              })}

              type="text" onChange={searchRoom} />
            <div className="search-bar" />
          </div>
        </div>

        <div className='Show-ListRoom'>
          {
            _.map(ListRoomArr, (item, index) =>
              <div
                className={classNames('Room', {
                  RoomSelected: currentRoomOnClick === item.id,
                  RemoveHover: currentRoomMouseDown === item.id
                })}
                key={index}
                onClick={() => onClickRoom(item.id)}
                onMouseDown={() => setCurrentRoomMouseDown(item.id)}
              >
                <div
                  className={classNames('Icon-And-NameRoom', {
                    IconAndNameRoomLightTheme: lightTheme === true,
                  })}
                >
                  {
                    item.type === 'Work' ?
                      <MdWork className='Icon-Left' />
                      :
                      item.type === 'Shopping' ?
                        <GiLargeDress className='Icon-Left' />
                        :
                        item.type === 'Party' ?
                          <GiMusicalNotes />
                          : null
                  }
                  <div className='NameRoom'>
                    {item.nameRoom}
                  </div>
                </div>
                <div
                  className={classNames('AddMember-And-NotificationUnRead', {
                    MoveToCenter: currentRoomOnClick === item.id || item.numberNotificationUnRead === 0,
                  })}
                >
                  <AddMember />
                  <div
                    className={classNames('NotificationUnRead', {
                      NotificationRead: currentRoomOnClick === item.id,
                      HideNotificationRead: item.numberNotificationUnRead === 0
                    })}
                  >
                    {
                      item.numberNotificationUnRead
                    }
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>

    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    changeTheme: state.changeTheme,
    listRoom: state.listRoom,
    currentRoom: state.currentRoom,
    currentUser: state.currentUser,
    dataVietNamLanguage: state.dataVietNamLanguage,
    changeVietNamLanguage: state.changeVietNamLanguage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentRoom: (data) => { dispatch(actions.setCurrentRoom(data)) },
    setAllowLogin: () => { dispatch(actions.setAllowLogin(false)) },
    setCurrentUser: () => { dispatch(actions.setCurrentUser({})) }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ListRoom);