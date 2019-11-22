import React, { useState, useRef } from 'react';
import './InfoRoom.css';
import { connect } from 'react-redux';
import _ from 'lodash'
import classNames from 'classnames'

function InfoRoom(props) {
  const ahihiRef = useRef();
  const testRef = useRef();
  const [indexDiv, setIndexDiv] = useState(-1);
  const [divStyle, setdivStyle] = useState({});
  const ListRoomArr = _.map(_.find(props.dataRoom, { nameRoom: props.currentRoom }).data, (item) => ({
    avatar: item.avatar,
    name: item.name,
    level: item.level
  }))
  const lightTheme = props.changeTheme;
  const showInfoDiv = (e, index) => {
    setIndexDiv(index)
    document.addEventListener('click', clickOutSide)
    if (e.target.offsetTop - ahihiRef.current.scrollTop > 250) {
       return setdivStyle({
        position: 'absolute',
        top: e.target.offsetTop - ahihiRef.current.scrollTop - 200,
      })
    }
    if (window.innerHeight - e.target.offsetTop - ahihiRef.current.scrollTop < 250) {
      return setdivStyle({
        position: 'absolute',
        top: e.target.offsetTop - ahihiRef.current.scrollTop - 500,
      })
    }
    else {
      return setdivStyle({
        position: 'absolute',
        top: e.target.offsetTop - ahihiRef.current.scrollTop,
      })
    }
  }
  const clickOutSide = (event) => {
    const { target } = event;
    if (!ahihiRef.current.contains(target)) {
      setIndexDiv(-1)
      document.removeEventListener('click', clickOutSide)
    }
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
      <div ref={ahihiRef}
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
            <div className='Avatar-InfoRoom' ref={testRef}>
              <img src={_.filter(ListRoomArr, { level: 'Admin' })[0].avatar} alt='Img-User'
                onClick={(e) => showInfoDiv(e, 99999)}
              />
            </div>
            <div className='Name-User-InfoRoom'>
              <p>{_.filter(ListRoomArr, { level: 'Admin' })[0].name}</p>
            </div>
            {/* infoADmin */}
            <div
              className={classNames('AhihiTest', {
                addZindexCss: 99999 === indexDiv,
              })}
              style={divStyle}>
              <div className='Top'>
                <img src={_.filter(ListRoomArr, { level: 'Admin' })[0].avatar} alt='Img-User' />
                <div className='name-show-info'>
                  <p>{_.filter(ListRoomArr, { level: 'Admin' })[0].name}</p>
                  <p
                    className={classNames('levelAdmin', {
                      levelAdminLightTheme: lightTheme === true,
                    })}
                  >Admin</p>
                </div>
              </div>
            </div>
            {/* infoADmin */}
          </div>
        </div>

        <div className='Admin' >
          <div className='Title-InfoRoom'>
            <p className='Title-InfoRoom-Admin'>
              {
                props.changeVietNamLanguage ?
                  <p>Member</p>
                  :
                  <p>{props.dataVietNamLanguage.Member}</p>
              }
            </p>
          </div>
          <div className='Member' >
            {_.map(_.filter(ListRoomArr, { level: 'Member' }), (item, index) =>
              <div className='User-InfoRoom' key={index} >
                <div className='Avatar-InfoRoom'>
                  <img src={item.avatar} alt='Img-User' onClick={(e) => showInfoDiv(e, index)} />
                </div>
                <div className='Name-User-InfoRoom'>
                  <p>{item.name}</p>
                </div>
                {/* Member-Info */}
                <div
                  className={classNames('AhihiTest', {
                    addZindexCss: index === indexDiv,
                  })}
                  style={divStyle}>
                  <div className='Top'>
                    <img src={item.avatar} alt='Img-User' />
                    <div className='name-show-info'>
                      <p>{item.name}</p>
                      <p
                        className={classNames('levelMember', {
                          levelMemberLightTheme: lightTheme === true,
                        })}
                      >Member</p>
                    </div>
                  </div>
                </div>
                {/* Member-Info */}
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