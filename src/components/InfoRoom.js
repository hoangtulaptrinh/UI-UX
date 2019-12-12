import React, { useState, useRef } from 'react';
import './InfoRoom.css';
import { connect } from 'react-redux';
import _ from 'lodash'
import classNames from 'classnames'
import IntroRoom from './Collapse/IntroRoom'
import { base_link } from '../actions';
import { TiDelete } from 'react-icons/ti'

function InfoRoom(props) {
  const ahihiRef = useRef();
  const testRef = useRef();
  const [indexDiv, setIndexDiv] = useState(-1);
  const [divStyle, setdivStyle] = useState({});
  var ListRoomArr;
  if (props.currentRoom === -1) {
    ListRoomArr = []
  }
  let isAdmin = false;
  if (props.currentRoom !== -1) {
    ListRoomArr = _.uniqBy(_.map(_.find(props.dataRoom, { id: props.currentRoom }).Member, (item) => ({
      id: item.id,
      avatar: item.attributes.avatarUrl,
      name: item.attributes.name,
      level: item.attributes.level
    })), 'id');
    if (_.filter(ListRoomArr, { level: 'admin' })[0] !== undefined && props.currentUser.id === _.filter(ListRoomArr, { level: 'admin' })[0].id) {
      isAdmin = true;
    }
  }
  const lightTheme = props.changeTheme;
  const showInfoDiv = (e, index) => {
    setIndexDiv(index)
    document.addEventListener('click', clickOutSide)
    if (window.innerHeight - e.target.offsetTop - ahihiRef.current.scrollTop < 0) {
      return setdivStyle({
        position: 'absolute',
        top: e.target.offsetTop - ahihiRef.current.scrollTop - 250,
      })
    }
    if (e.target.offsetTop - ahihiRef.current.scrollTop > 250) {
      return setdivStyle({
        position: 'absolute',
        top: e.target.offsetTop - ahihiRef.current.scrollTop - 200,
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
  const deleteThisUser = (id) => {
    console.log(id)
  }
  return (
    <div
      className={classNames('InfoRoom', {
        HideThisDiv: props.showInfoRoom === false,
        InfoRoomLightTheme: lightTheme === true,
      })}
    >
      <div className='Header-InfoRoom' >
        <IntroRoom isAdmin={isAdmin} />
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

          {
            ListRoomArr.length !== 0 ?

              <div className='User-InfoRoom'>
                <div className='Avatar-InfoRoom' ref={testRef}>
                  {
                    _.filter(ListRoomArr, { level: 'admin' })[0].avatar === null ?
                      <img src='https://i.imgur.com/dDb0SJeb.jpg' alt='Img-User'
                        onClick={(e) => showInfoDiv(e, 99999)}
                      />
                      :
                      <img src={`${base_link}${_.filter(ListRoomArr, { level: 'admin' })[0].avatar}`} alt='Img-User'
                        onClick={(e) => showInfoDiv(e, 99999)}
                      />
                  }
                </div>
                <div className='Name-User-InfoRoom'>
                  <p>{_.filter(ListRoomArr, { level: 'admin' })[0].name}</p>
                </div>
                <div
                  className={classNames('AhihiTest', {
                    addZindexCss: 99999 === indexDiv,
                  })}
                  style={divStyle}>
                  <div className='Top'>
                    {
                      _.filter(ListRoomArr, { level: 'admin' })[0].avatar === null ?
                        <img src='https://i.imgur.com/dDb0SJeb.jpg' alt='Img-User' />
                        :
                        <img src={`${base_link}${_.filter(ListRoomArr, { level: 'admin' })[0].avatar}`} alt='Img-User' />
                    }
                    <div className='name-show-info'>
                      <p>{_.filter(ListRoomArr, { level: 'admin' })[0].name}</p>
                      <p
                        className={classNames('levelAdmin', {
                          levelAdminLightTheme: lightTheme === true,
                        })}
                      >Admin</p>
                    </div>
                  </div>
                </div>
              </div>
              :
              null
          }

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

          {
            ListRoomArr.length !== 0 ?

              <div className='Member' >
                {_.map(_.filter(ListRoomArr, { level: 'member' }), (item, index) =>
                  <div className='User-InfoRoom' key={index} >
                    <div className='Avatar-InfoRoom'>
                      {item.avatar === null ?
                        <img src='https://i.imgur.com/dDb0SJeb.jpg' alt='Img-User' onClick={(e) => showInfoDiv(e, index)} />
                        :
                        <img src={`${base_link}${item.avatar}`} alt='Img-User' onClick={(e) => showInfoDiv(e, index)} />
                      }
                    </div>
                    <div className='Name-User-InfoRoom'>
                      <p>{item.name}</p>
                    </div>
                    <div className='div-delete-member'>
                      {
                        props.currentUser.id === _.filter(ListRoomArr, { level: 'admin' })[0].id ?
                          <TiDelete className='delete-member' onClick={() => deleteThisUser(item.id)} />
                          :
                          null
                      }
                    </div>
                    {/* Member-Info */}
                    <div
                      className={classNames('AhihiTest', {
                        addZindexCss: index === indexDiv,
                      })}
                      style={divStyle}>
                      <div className='Top'>
                        {item.avatar === null ?
                          <img src='https://i.imgur.com/dDb0SJeb.jpg' alt='Img-User' />
                          :
                          <img src={`${base_link}${item.avatar}`} alt='Img-User' />
                        }
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
              :
              null
          }
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
    changeVietNamLanguage: state.changeVietNamLanguage,
    reRender: state.reRender,
    currentUser: state.currentUser,
  }
}

export default connect(mapStatetoProps)(InfoRoom);