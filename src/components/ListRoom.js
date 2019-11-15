import React, { useState } from 'react';
import './ListRoom.css';
import _ from 'lodash'
import { MdWork } from 'react-icons/md';
import classNames from 'classnames'
import AddMember from './Modal/AddMember'

function ListRoom() {
  const searchRoom = (e) => {
    console.log(e.target.value)
  }
  const [currentRoomMouseDown, setCurrentRoomMouseDown] = useState('');
  const [currentRoomOnClick, setCurrentRoomOnClick] = useState('');
  const ListRoomArr = [
    { name: 'Room 1', type: 'Work', numberNotificationUnRead: '2' },
    { name: 'Room 2', type: 'Work', numberNotificationUnRead: '4' },
    { name: 'Room 3', type: 'Work', numberNotificationUnRead: '6' }
  ]
  const onClickRoom = (name) => {
    setCurrentRoomOnClick(name)
  }
  return (
    <div className="ListRoom">
      <div className='Header-ListRoom'>
        {currentRoomMouseDown}
      </div>

      <div className='Body-ListRoom'>
        <div className="wrapper">
          <div className="search-icon">
            <input className="search-circle" type="text" onChange={searchRoom} />
            <div className="search-bar" />
          </div>
        </div>

        <div className='Show-ListRoom'>
          {
            _.map(ListRoomArr, (item, index) =>
              <div
                className={classNames('Room', {
                  RoomSelected: currentRoomOnClick === item.name,
                  RemoveHover: currentRoomMouseDown === item.name
                })}
                key={index}
                onClick={() => onClickRoom(item.name)}
                onMouseDown={() => setCurrentRoomMouseDown(item.name)}
              >
                <div className='Icon-And-NameRoom'>
                  <MdWork className='Icon-Left' />
                  <div className='NameRoom'>
                    {item.name}
                  </div>
                </div>
                <div
                  className={classNames('AddMember-And-NotificationUnRead', {
                    MoveToCenter: currentRoomOnClick === item.name,
                  })}
                >
                  <AddMember />
                  <div
                    className={classNames('NotificationUnRead', {
                      NotificationRead: currentRoomOnClick === item.name,
                    })}
                  >
                    {item.numberNotificationUnRead}
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

export default ListRoom;