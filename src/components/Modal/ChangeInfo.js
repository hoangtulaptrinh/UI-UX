import React, { useState, useEffect, useRef } from 'react';
import './ChangeInfo.css'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Modal } from 'reactstrap';
import classNames from 'classnames';

const ChangeInfo = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  useEffect(
    () => {
      if (props.currentRoom !== -1 && modal === false) {
        props.getRoomMember(props.currentUser.attributes.authToken, props.currentRoom)
      }
    },
    [modal]
  );
  const toggle = () => setModal(!modal);
  const onFileChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) {
      console.log('no files');
    }
    props.changeInfoUser(props.currentUser.attributes.authToken, files[0], props.currentRoom)
    toggle()
  }
  const lightTheme = props.changeTheme;
  return (
    <div>
      <div className='div-change-avatar' onClick={toggle}>
        {
          props.currentUser.attributes.avatarUrl === null ?
            <img src='https://i.imgur.com/dDb0SJeb.jpg' alt='Img-User' />
            :
            <img src={`${actions.base_link}${props.currentUser.attributes.avatarUrl}`} alt='Img-User' />
        }
      </div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <div
          className={classNames('Change-Info-User-Body', {
            ChangeInfoBodyLightTheme: lightTheme === false
          })}
        >
          <input type="file" name="file" id="exampleFile"
            onChange={onFileChange}
          />
        </div>
      </Modal>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    reRender: state.reRender,
    currentRoom: state.currentRoom,
    changeTheme: state.changeTheme
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeInfoUser: (token, img, idRoom) => { dispatch(actions.changeInfoUser({ token: token, img: img, idRoom: idRoom })) },
    getRoomMember: (token, idRoom) => { dispatch(actions.getRoomMember({ token: token, idRoom: idRoom })) }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ChangeInfo)