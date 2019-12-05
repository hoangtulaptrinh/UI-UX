import React, { useState, useEffect, useRef } from 'react';
import './ChangeInfo.css'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Modal, Button, FormGroup, Label, Input } from 'reactstrap';
import classNames from 'classnames'

const ChangeInfo = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const nameUser = useRef();
  const passUser = useRef();
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
    setAvatar(files[0])
  }
  const LetToChangeInfo = () => {
    // props.changeInfoUser(props.currentUser.attributes.authToken, avatar)
    console.log(avatar, nameUser.current.value, passUser.current.value)
    toggle()
  }
  const lightTheme = props.changeTheme;
  console.log(avatar)
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
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="text" name="email" id="exampleEmail" placeholder="name" ref={nameUser} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password" ref={passUser} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Avatar</Label>
            <Input type="file" name="file" id="exampleFile"
              onChange={onFileChange}
            />
          </FormGroup>
          <Button outline color="success" onClick={LetToChangeInfo}
            className={classNames('ChangeInfoBtn', {
              ChangeInfoBtnLightTheme: lightTheme === false
            })}
          >
            Submit
          </Button>
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
    changeInfoUser: (token, img) => { dispatch(actions.changeInfoUser({ token: token, img: img })) },
    getRoomMember: (token, idRoom) => { dispatch(actions.getRoomMember({ token: token, idRoom: idRoom })) }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(ChangeInfo)