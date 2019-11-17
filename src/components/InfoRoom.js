import React from 'react';
import './InfoRoom.css';
import { connect } from 'react-redux';
import _ from 'lodash'
import classNames from 'classnames'

function InfoRoom(props) {
  const ListRoomArr = _.map(_.find(props.dataRoom, { nameRoom: props.currentRoom }).data, (item) => ({
    avatar: item.avatar,
    name: item.name,
    level: item.level
  }))
  return (
    <div
      className={classNames('InfoRoom', {
        HideThisDiv: props.showInfoRoom === false
      })}
    >
      <div className='Header-InfoRoom'>
        <p>Info Room</p>
      </div>
      <div className='Body-InfoRoom' id="scrollbar">

        <div className='Admin'>
          <div className='Title-InfoRoom'>
            <p className='Title-InfoRoom-Admin'>Admin</p>
          </div>
          <div className='User-InfoRoom'>
            <div className='Avatar-InfoRoom'>
              <img src={_.filter(ListRoomArr, { level: 'Admin' })[0].avatar} alt='Img-User' />
            </div>
            <div className='Name-User-InfoRoom'>
              <p>{_.filter(ListRoomArr, { level: 'Admin' })[0].name}</p>
            </div>
          </div>
        </div>

        <div className='Admin'>
          <div className='Title-InfoRoom'>
            <p className='Title-InfoRoom-Admin'>Member</p>
          </div>
          <div className='Member'>
            {_.map(ListRoomArr, (item, index) =>
              <div className='User-InfoRoom' key={index}>
                <div className='Avatar-InfoRoom'>
                  <img src={item.avatar} alt='Img-User' />
                </div>
                <div className='Name-User-InfoRoom'>
                  <p>{item.name}</p>
                </div>
              </div>)
            }
          </div>
        </div>

      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    currentRoom: state.currentRoom,
    showInfoRoom: state.showInfoRoom
  }
}

export default connect(mapStatetoProps)(InfoRoom);