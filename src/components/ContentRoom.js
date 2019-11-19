import React, { useState, useRef } from 'react';
import './ContentRoom.css';
import { FaFolderPlus, FaRegSmileWink } from 'react-icons/fa';
import classNames from 'classnames'
import { connect } from 'react-redux';
import _ from 'lodash'
import { MdPeople } from 'react-icons/md';
import * as actions from '../actions/index';
import DayNight from './Switch/DayNight'
import SwitchLanguage from './Modal/SwitchLanguage'

function ContentRoom(props) {

  const wrapperRef = useRef(); //hook
  const [clickOnInput, setClickOnInput] = useState(false);
  const clickOnThisInput = () => {
    setClickOnInput(true);
    document.addEventListener('click', clickOutSide)
  }
  const clickOutSide = (event) => {
    const { target } = event;
    if (!wrapperRef.current.contains(target)) {
      setClickOnInput(false)
      document.removeEventListener('click', clickOutSide)
    }
  }
  const showInfoRoom = () => {
    props.setShowInfoRoom();
  }
  const lightTheme = props.changeTheme;
  return (
    <div
      className={classNames('ContentRoom', {
        ContentRoomLightTheme: lightTheme === true,
      })}
    >
      <div className='Header-ContentRoom'>
        <p># {props.currentRoom}</p>
        <div className='Icon-Header-ContentRoom'>
          <SwitchLanguage />
          <div className='Switch-Day-Night'>
            <DayNight />
          </div>
          <MdPeople
            className={classNames('', {
              MdPeopleLightTheme: lightTheme === true,
              LightThisIcon: props.showInfoRoom === true,
              MdPeopleLightThemeLightThisIcon: lightTheme === true && props.showInfoRoom === true
            })}
            onClick={showInfoRoom} />
        </div>
      </div>
      <div
        className={classNames('main-room', {
          MainRoomLightTheme: lightTheme === true
        })}
        id="scrollbar-style">
        {
          _.map(_.find(props.dataRoom, { nameRoom: props.currentRoom }).data, (item, index) =>
            <div className='Chat-Message' key={index} >
              <div
                className={classNames('Custom-Container', {
                  CustomContainerLightTheme: lightTheme === true
                })}
              >
                <img src={item.avatar} alt='Img-User' />
                <div
                  className={classNames('Name-Time-Message', {
                    NameTimeMessageLightTheme: lightTheme === true
                  })}
                >
                  <div className='Name-Time'>
                    <p className='Name'>{item.name}</p>
                    <p className='Time'>{item.time}</p>
                  </div>
                  <p className='Show-Message'>{item.message}</p>
                </div>
              </div>
            </div>
          )
        }
      </div>

      <div
        className={classNames('Footer-ContentRoom', {
          FooterContentRoomLightTheme: lightTheme === true
        })}
      >
        <div
          className={classNames('Message', {
            ClickMessage: clickOnInput === true,
            MessageLightTheme: lightTheme === true,
            ClickMessageMessageLightTheme: clickOnInput === true && lightTheme === true
          })}
        >
          <FaFolderPlus
            className={classNames('Footer-Icon', {
              ClickIcon: clickOnInput === true,
              FooterIconLightTheme: lightTheme === true,
              ClickIconFooterIconLightTheme: clickOnInput === true && lightTheme === true
            })}
          />
          <input className='Footer-Input'
            ref={wrapperRef}
            onClick={clickOnThisInput}
          />
          <FaRegSmileWink
            className={classNames('Footer-Icon', {
              ClickIcon: clickOnInput === true,
              FooterIconLightTheme: lightTheme === true,
              ClickIconFooterIconLightTheme: clickOnInput === true && lightTheme === true
            })}
          />
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
    changeTheme: state.changeTheme
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setShowInfoRoom: () => { dispatch(actions.setShowInfoRoom()) },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ContentRoom);