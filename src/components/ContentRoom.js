import React, { useState, useRef, useEffect } from 'react';
import './ContentRoom.css';
import { FaFolderPlus } from 'react-icons/fa';
import classNames from 'classnames'
import { connect } from 'react-redux';
import _ from 'lodash'
import { MdPeople, MdGif } from 'react-icons/md';
import * as actions from '../actions/index';
import DayNight from './Switch/DayNight'
import SwitchLanguage from './Modal/SwitchLanguage'
import IconPopover from './Popovers/Icon'
import { nextTick } from 'q';
import Masonry from 'react-masonry-css'
import marked from 'marked';
import toBr from 'newline-to-br';
import PieChart from './Popovers/PieChart'

function ContentRoom(props) {
  const valueMessage = props.valueMessage;
  const wrapperRef = useRef(); //hook
  const mainRoomRef = useRef(); //hook
  const [clickOnInput, setClickOnInput] = useState(false);
  const [showGif, setShowGif] = useState(false);
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
  useEffect(() => {
    document.addEventListener('keydown', sendMessage)
    return function cleanup() {
      document.removeEventListener('keydown', sendMessage)
    };
  });
  const sendMessage = (event) => {
    // valueMessage.trim() loại bỏ khoảng trống để check empty text area
    if (event.keyCode === 13 && !event.shiftKey && valueMessage.trim() !== '' && clickOnInput === true) {
      props.setSendMessage(props.currentRoom, valueMessage);
      props.setValueMessage('');
      // khi send messenger thì chuyển xuống cuối để đọc tin nhắn mới nhất
      mainRoomRef.current.scrollTop = mainRoomRef.current.scrollHeight
    }
  }
  const showInfoRoom = () => {
    props.setShowInfoRoom();
  }
  const changeInputValue = (e) => {
    props.setValueMessage(e.target.value);
  }
  const addEmoji = (item) => {
    props.setValueMessage(`${valueMessage}${item}`)
  }
  const letShowGif = (item) => {
    props.setSendGif(props.currentRoom, item)
    setShowGif(!showGif)
    //nextTich là hàm call back đợi cho mọi thứ render (virtual dom) xong xuôi hết mới chạy 
    nextTick(() => {
      // khi send messenger thì chuyển xuống cuối để đọc tin nhắn mới nhất
      mainRoomRef.current.scrollTop = mainRoomRef.current.scrollHeight
    })
  }
  const lightTheme = props.changeTheme;
  return (
    <div
      className={classNames('ContentRoom', {
        ContentRoomLightTheme: lightTheme === true,
        MaxWidth: props.showInfoRoom === false
      })}
    >
      <div className='Header-ContentRoom'>
        <p className='Name-Room'># {props.currentRoom}</p>
        {/* số người hiện tại trong phòng dùng uniqBy để lọc bỏ trùng ặp về tên */}
        <div className='Number-People-Room'>
          {props.changeVietNamLanguage ?
            <p>Current number of people in the room : {_.uniqBy(_.find(props.dataRoom, { nameRoom: props.currentRoom }).data, 'name').length}</p>
            :
            <p>{props.dataVietNamLanguage.CurrentNumberOfPeopleInTheRoom} : {_.uniqBy(_.find(props.dataRoom, { nameRoom: props.currentRoom }).data, 'name').length}</p>
          }
          {props.changeVietNamLanguage ?
            <p>Online people : ???</p>
            :
            <p>{props.dataVietNamLanguage.OnlinePeople} : ???</p>
          }
        </div>
        <PieChart />
        <div className='Icon-Header-ContentRoom'>
          <SwitchLanguage />
          <div className='Switch-Day-Night'>
            <DayNight />
          </div>
          <MdPeople
            className={classNames('MdPeople', {
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
        id="scrollbar-style"
        ref={mainRoomRef}
      >
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
                  {
                    item.message !== undefined ?
                      <div className='Show-Message' dangerouslySetInnerHTML={{ __html: toBr(marked(item.message)) }} />
                      :
                      <img src={item.gif} alt='gif' />
                  }
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
          <textarea className='Footer-Input'
            type="textarea"
            ref={wrapperRef}
            onClick={clickOnThisInput}
            onChange={changeInputValue}
            value={valueMessage}
          />
          <div className='Footer-Icon-Right'>
            <MdGif
              className={classNames('Footer-Icon Gif-Icon', {
                ClickIcon: clickOnInput === true,
                FooterIconLightTheme: lightTheme === true,
                ClickIconFooterIconLightTheme: clickOnInput === true && lightTheme === true
              })}
              onClick={() => setShowGif(!showGif)}
            />
            <div
              className={classNames('Footer-Icon Icon-Popover', {
                ClickIcon: clickOnInput === true,
                FooterIconLightTheme: lightTheme === true,
                ClickIconFooterIconLightTheme: clickOnInput === true && lightTheme === true
              })}
            >
              <IconPopover addEmoji={addEmoji} />
            </div>
          </div>
        </div>
        <div className={classNames('test', {
          testLightTheme: lightTheme === true,
          ShowGif: showGif === true
        })}
          id="test-scrollbar-style">
          <Masonry
            breakpointCols={5}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {_.map(props.arrGif, (item, index) => (
              <div className='div-gif' key={index}>
                <img className='img-gif'
                  src={item}
                  alt='gif'
                  onClick={() => letShowGif(item)}
                />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div >
  );
}

const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    currentRoom: state.currentRoom,
    showInfoRoom: state.showInfoRoom,
    changeTheme: state.changeTheme,
    arrGif: state.arrGif,
    valueMessage: state.valueMessage,
    dataVietNamLanguage: state.dataVietNamLanguage,
    changeVietNamLanguage: state.changeVietNamLanguage
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setShowInfoRoom: () => { dispatch(actions.setShowInfoRoom()) },
    setSendMessage: (nameRoom, message) => { dispatch(actions.setSendMessage({ nameRoom: nameRoom, message: message })) },
    setValueMessage: (data) => { dispatch(actions.setValueMessage(data)) },
    setSendGif: (nameRoom, gif) => { dispatch(actions.setSendGif({ nameRoom: nameRoom, gif: gif })) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ContentRoom);