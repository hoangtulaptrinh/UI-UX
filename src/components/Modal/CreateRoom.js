import React, { useState } from 'react';
import { Modal, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { TiGroup } from 'react-icons/ti'
import './CreateRoom.css'
import { connect } from 'react-redux';
import classNames from 'classnames'
// import * as actions from '../../actions/index';

const CreateRoom = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle1 = () => setDropdownOpen(prevState => !prevState);
  var NameRoom, Description, RoomType;
  if (props.changeVietNamLanguage === true) {
    NameRoom = 'Name Room'
    Description = 'Description'
  }
  if (props.changeVietNamLanguage === false) {
    NameRoom = 'Tên Phòng'
    Description = 'Miêu Tả Qua Về Phòng'
  }
  const [roomType, setRoomType] = useState('Room Type');
  const lightTheme = props.changeTheme;
  return (
    <div>
      <TiGroup className='TiGroup' color="danger" onClick={toggle} />
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <div className="login-page">
          <div
            className={classNames('form', {
              FormLightTheme: lightTheme === false,
            })}
          >
            <input type="text" placeholder={NameRoom} />
            <input type="text" placeholder={Description} />
            <Dropdown isOpen={dropdownOpen} toggle={toggle1}>
              <DropdownToggle className='Drop-Down' caret>
                {roomType}
              </DropdownToggle>
              <DropdownMenu>
                <div className='type-type' onClick={() => {
                  setRoomType('Work')
                  toggle1()
                }}>Work</div>
                <div className='type-type' onClick={() => {
                  setRoomType('Shopping')
                  toggle1()
                }}>Shopping</div>
                <div className='type-type' onClick={() => {
                  setRoomType('Party')
                  toggle1()
                }}>Party</div>
                <div className='type-type' onClick={() => {
                  setRoomType('Study')
                  toggle1()
                }}>Study</div>
                <div className='type-type' onClick={() => {
                  setRoomType('Game')
                  toggle1()
                }}>Game</div>
                <div className='type-type' onClick={() => {
                  setRoomType('Music')
                  toggle1()
                }}>Music</div>
                <div className='type-type' onClick={() => {
                  setRoomType('Movie')
                  toggle1()
                }}>Movie</div>
              </DropdownMenu>
            </Dropdown>
            <button
              className={classNames('btn-btn', {
                BtnBtnLightTheme: lightTheme === false,
              })}
            >Create</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    changeTheme: state.changeTheme,
    currentRoom: state.currentRoom,
    currentUser: state.currentUser,
    dataVietNamLanguage: state.dataVietNamLanguage,
    changeVietNamLanguage: state.changeVietNamLanguage,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(CreateRoom)