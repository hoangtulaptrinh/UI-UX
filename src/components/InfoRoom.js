import React, { useState, useRef } from 'react';
import './InfoRoom.css';
import { connect } from 'react-redux';
import _ from 'lodash'
import classNames from 'classnames'

function InfoRoom(props) {
  const ahihiRef = useRef();
  const [indexDiv, setIndexDiv] = useState(-1);
  const [divStyle, setdivStyle] = useState({});
  const ListRoomArr = _.map(_.find(props.dataRoom, { nameRoom: props.currentRoom }).data, (item) => ({
    avatar: item.avatar,
    name: item.name,
    level: item.level
  }))
  const lightTheme = props.changeTheme;
  const showInfoDiv = (e, index) => {
    setdivStyle({
      position: 'absolute',
      top: e.target.offsetTop,
    })
    setIndexDiv(index)
    console.log(e.target.offsetTop)
    console.log(e.target)
    console.log(ahihiRef)
  }
  return (
    <div
      className={classNames('InfoRoom', {
        HideThisDiv: props.showInfoRoom === false,
        InfoRoomLightTheme: lightTheme === true,
      })}
    >
      <div className='Header-InfoRoom' >
        {
          props.changeVietNamLanguage ?
            <p>Info Room</p>
            :
            <p>{props.dataVietNamLanguage.InfoRoom}</p>
        }
      </div>
      <div
        className={classNames('Body-InfoRoom', {
          BodyInfoRoomLightTheme: lightTheme === true,
        })}
        id="scrollbar">

        <div className='Admin' >
          <div className='Title-InfoRoom'>
            <p className='Title-InfoRoom-Admin'>
              {
                props.changeVietNamLanguage ?
                  <p>Admin</p>
                  :
                  <p>{props.dataVietNamLanguage.Admin}</p>
              }
            </p>
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

        <div className='Admin' ref={ahihiRef}>
          <div className='Title-InfoRoom'>
            <p className='Title-InfoRoom-Admin'>
              {
                props.changeVietNamLanguage ?
                  <p>Admin</p>
                  :
                  <p>{props.dataVietNamLanguage.Admin}</p>
              }
            </p>
          </div>
          <div className='Member' >
            {_.map(ListRoomArr, (item, index) =>
              <div className='User-InfoRoom' key={index} onClick={(e) => showInfoDiv(e, index)} >
                <div className='Avatar-InfoRoom'>
                  <img src={item.avatar} alt='Img-User' />
                </div>
                <div className='Name-User-InfoRoom'>
                  <p>{item.name}</p>
                </div>
                <div
                  className={classNames('AhihiTest', {
                    addZindexCss: index === indexDiv,
                  })}
                  style={divStyle}>
                  <img src={item.avatar} alt='Img-User' />
                  <div className='name-show-info'>
                    <p>{item.name}</p>
                  </div>
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
    showInfoRoom: state.showInfoRoom,
    changeTheme: state.changeTheme,
    dataVietNamLanguage: state.dataVietNamLanguage,
    changeVietNamLanguage: state.changeVietNamLanguage
  }
}

export default connect(mapStatetoProps)(InfoRoom);