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
import { Tooltip } from 'reactstrap';
import ActionCable from 'actioncable';

function ContentRoom(props) {
  console.log(props.isNewRoom)
  // action cable
  const [messagesCable] = useState({});
  const [oneMessages, setOneMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  //
  const startListening = () => {
    console.log("Kết Nối Với Phòng: ", props.currentRoom);
    props.setIsNewRoom(false)
    messagesCable.cable = ActionCable.createConsumer(
      `${actions.base_link}cable?token=${props.currentUser.attributes.authToken}&room_id=${props.currentRoom}`
    );
    messagesCable.channel = messagesCable.cable.subscriptions.create(
      {
        channel: "MessagesChannel"
      },
      {
        //chạy khi kết nối thành công vs ruby khi component này didMount 
        connected: () => {
          if (messages.length === 0) {
            messagesCable.channel.getInitialMessages(); //lấy tin nhắn mới về
          }
        },
        //chạy khi ruby có gì muốn nói với FE
        received: data => {
          if (data.type === "receive") {
            const mapIdDataToInt = _.map(data.messages.data, n => ({
              id: parseInt(n.id),
              attributes: n.attributes,
              relationships: {
                room: n.relationships.room,
                user: {
                  data: {
                    id: parseInt(n.relationships.user.data.id),
                    type: n.relationships.user.data.type,
                    name: _.find(data.messages.included, { 'id': `${n.relationships.user.data.id}` }).attributes.name,
                    avatarUrl: _.find(data.messages.included, { 'id': `${n.relationships.user.data.id}` }).attributes.avatarUrl
                  }
                }
              },
              type: n.type
            }))
            setOneMessages(mapIdDataToInt)
          }
          ///////////////////
          if (data.type === "receive_latest") {
            const mapIdDataToInt = _.map(data.messages.data, n => ({
              id: parseInt(n.id),
              attributes: n.attributes,
              relationships: {
                room: n.relationships.room,
                user: {
                  data: {
                    id: parseInt(n.relationships.user.data.id),
                    type: n.relationships.user.data.type,
                    name: _.find(data.messages.included, { 'id': `${n.relationships.user.data.id}` }).attributes.name,
                    avatarUrl: _.find(data.messages.included, { 'id': `${n.relationships.user.data.id}` }).attributes.avatarUrl
                  }
                }
              },
              type: n.type
            }))
            if (mapIdDataToInt.length !== 0) {
              setMessages(mapIdDataToInt)
            }
            nextTick(() => {
              // khi lấy tin nhắn cũ thì chuyển xuống cuối để đọc tin nhắn mới nhất
              mainRoomRef.current.scrollTop = mainRoomRef.current.scrollHeight
            })
          }
        },
        //lấy tin nhắn cũ về
        getInitialMessages: () => {
          return messagesCable.channel.perform("receive_latest", {
            total_messages: 15
          });
        }
      }
    );
  }
  //
  const changeRoom = () => {
    //TypeError: Cannot read property 'unsubscribe' of undefined 
    // tức là cái obj chứa unsubscribe bị undefined chứ không phải unsubscribe bị undefined
    if (props.currentRoom !== -1) {
      if (messagesCable.channel !== undefined) {
        messagesCable.channel.unsubscribe();
        console.log("Ngắt Kết Nối");
      }
      setMessages([]);
    }
  }
  //
  //
  // action cable
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => {
    setTooltipOpen(!tooltipOpen);
  }
  //
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
      if (messagesCable.channel !== undefined && props.currentRoom === -1) {
        messagesCable.channel.unsubscribe();
        console.log("Ngắt Kết Nối");
      }
    };
  })
  //
  useEffect(
    () => {
      changeRoom();
      if (props.currentRoom !== -1) {
        props.getRoomMember(props.currentUser.attributes.authToken, props.currentRoom)
      }
    },
    [props.currentRoom]
  );
  useEffect(
    () => {
      setMessages(_.concat(messages, oneMessages))
      nextTick(() => {
        // khi nhận đc tin nhắn mới thì chuyển xuống cuối để đọc tin nhắn mới nhất
        mainRoomRef.current.scrollTop = mainRoomRef.current.scrollHeight
      })
    },
    [oneMessages]
  );
  useEffect(
    () => {
      if (props.currentRoom !== -1 && messages.length === 0) {
        console.log(messages)
        startListening();
      }
    },
    [messages]
  );
  const sendMessage = (event) => {
    // valueMessage.trim() loại bỏ khoảng trống để check empty text area
    if (event.keyCode === 13 && !event.shiftKey && valueMessage.trim() !== '' && clickOnInput === true && props.currentRoom !== -1) {
      props.letSendMessage(props.currentUser.attributes.authToken, props.currentRoom, valueMessage);
      props.setValueMessage('');
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
    props.letSendMessage(props.currentUser.attributes.authToken, props.currentRoom, `![Image](${item})`);
    setShowGif(!showGif)
  }
  const lightTheme = props.changeTheme;
  return (
    <div
      className={classNames('ContentRoom', {
        ContentRoomLightTheme: lightTheme === true,
        MaxWidth: props.showInfoRoom === false,
      })}
    >
      <div className='Header-ContentRoom'>
        <p className='Name-Room'># {
          props.currentRoom !== -1 ?
            _.find(props.dataRoom, { id: props.currentRoom }).nameRoom
            :
            null
        }</p>
        {/* <PieChart /> */}
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
          props.currentRoom !== -1 ?
            _.map(messages, (item, index) =>
              <div className='Chat-Message' key={index} >
                <div
                  className={classNames('Custom-Container', {
                    CustomContainerLightTheme: lightTheme === true
                  })}
                >
                  {
                    item.relationships.user.data.avatarUrl === null ?
                      <img src='https://i.imgur.com/dDb0SJeb.jpg' alt='Img-User' href="#" id="TooltipExample" />
                      :
                      <img src={`${actions.base_link}${item.relationships.user.data.avatarUrl}`} alt='Img-User' href="#" id="TooltipExample" />
                  }
                  <Tooltip className='Tooltip' placement="right" isOpen={tooltipOpen} target="TooltipExample" toggle={toggle}>
                    <div className='Info-User-On-Chat'>
                    </div>
                  </Tooltip>
                  <div
                    className={classNames('Name-Time-Message', {
                      NameTimeMessageLightTheme: lightTheme === true
                    })}
                  >
                    <div className='Name-Time'>
                      <p className='Name'>{item.relationships.user.data.name}</p>
                      <p className='Time'>{item.attributes.created_at}</p>
                    </div>
                    {
                      item.attributes.content !== '' ?
                        <div className='Show-Message' dangerouslySetInnerHTML={{ __html: toBr(marked(item.attributes.content)) }} />
                        :
                        null
                    }
                  </div>
                </div>
              </div>
            )
            :
            <div className='No-Room'>
              {
                props.changeVietNamLanguage ?
                  <p>You haven't entered any room yet</p>
                  :
                  <p>{props.dataVietNamLanguage.YouHaveNotEnteredAnyRoomYet}</p>
              }
            </div>
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
    changeVietNamLanguage: state.changeVietNamLanguage,
    currentUser: state.currentUser,
    allowLogin: state.allowLogin,
    isNewRoom: state.isNewRoom
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setShowInfoRoom: () => { dispatch(actions.setShowInfoRoom()) },
    setSendMessage: (nameRoom, message) => { dispatch(actions.setSendMessage({ nameRoom: nameRoom, message: message })) },
    setValueMessage: (data) => { dispatch(actions.setValueMessage(data)) },
    setSendGif: (nameRoom, gif) => { dispatch(actions.setSendGif({ nameRoom: nameRoom, gif: gif })) },
    letSendMessage: (token, idRoom, value) => { dispatch(actions.letSendMessage({ token: token, idRoom: idRoom, value: value })) },
    getRoomMember: (token, idRoom) => { dispatch(actions.getRoomMember({ token: token, idRoom: idRoom })) },
    setIsNewRoom: (data) => { dispatch(actions.setIsNewRoom(data)) }
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(ContentRoom);