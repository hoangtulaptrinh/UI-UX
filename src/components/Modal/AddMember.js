import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MdPersonAdd, MdBeenhere } from 'react-icons/md';
import { IoMdPersonAdd } from 'react-icons/io'
import './AddMember.css'
import classNames from 'classnames'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import _ from 'lodash'

const AddMember = (props) => {
  const [inputValue, setInputValue] = useState('');
  const searchUser = (e) => {
    setInputValue(e.target.value)
  }
  const {
    className
  } = props;
  const [modal, setModal] = useState(false);
  const [reRender, setReRender] = useState(false);
  useEffect(
    () => {
      if (modal === true) {
        props.getAllUsers()
        console.log('Get User')
      }
    },
    [modal]
  );
  var listUser;
  if (props.currentRoom === -1) {
    listUser = [];
  }
  if (props.currentRoom !== -1) {
    const fullUser = _.map(props.allUser, n => ({
      id: parseInt(n.id),
      name: n.attributes.name
    }))
    const fullIdUser = _.map(props.allUser, n => parseInt(n.id))
    const idUserOnThisRoom = _.map(_.find(props.dataRoom, { id: props.currentRoom }).Member, item => parseInt(item.id))
    _.remove(fullIdUser, i => _.includes(idUserOnThisRoom, i));
    listUser = _.filter(_.map(fullUser, user => ({
      id: user.id,
      name: user.name,
      onThisRoom: _.includes(fullIdUser, user.id)
    })), n => (_.includes(n.name.toLowerCase(), inputValue.toLowerCase())))
  }
  const toggle = () => setModal(!modal);
  const lightTheme = props.changeTheme;
  const addThisMemberToThisRoom = async (idUser) => {
    await props.addMemberToThisRoom(props.currentUser.attributes.authToken, idUser, props.currentRoom)
    props.getRoomMember(props.currentUser.attributes.authToken, props.currentRoom)
    setReRender(!reRender)
  }
  return (
    <div className='Model-AddMember'>
      <MdPersonAdd onClick={toggle}
        className={classNames('Icon-AddMember', {
          IconAddMemberLightTheme: lightTheme === true,
        })}
      />
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader
          className={classNames('Modal-Header', {
            ModalHeaderLightTheme: lightTheme === false,
          })}
          toggle={toggle}>
          {
            props.changeVietNamLanguage ?
              <p>Add Member To This Room</p>
              :
              <p>{props.dataVietNamLanguage.AddMemberToThisRoom}</p>
          }
        </ModalHeader>
        <ModalBody
          className={classNames('ModalBody', {
            ModalBodyLightTheme: lightTheme === false,
          })}
        >
          {/* css kính lúp để ở file ListRoom.css */}
          <div className="wrapper AddMember-Filter">
            <div className="search-icon">
              <input
                className={classNames('search-circle', {
                  SearchCircleLightTheme: lightTheme === true,
                })}
                type="text" onChange={searchUser} />
              <div className="search-bar" />
            </div>
          </div>
          <div
            className={classNames('Arr-List-Member', {
              ArrListMemberLightTheme: lightTheme === true,
            })}
            id="scrollbarAddMember">
            {listUser.length !== 0 ?
              _.map(listUser, (item, index) =>
                <div className='Member-To-Add' key={index}>
                  <div className='User-Add-Member'>
                    <div className='Img-Member-To-Add'>
                      <img src='https://i.imgur.com/VjnUSxab.jpg' alt='Add-Img-User' />
                    </div>
                    <div className='Name-Member-To-Add'>
                      {item.name}
                    </div>
                  </div>
                  {item.onThisRoom === true ?
                    <IoMdPersonAdd
                      className={classNames('Icon-AddMember', {
                        IconAddMemberLightTheme: lightTheme === true,
                      })}
                      onClick={() => addThisMemberToThisRoom(item.id)}
                    />
                    :
                    <MdBeenhere
                      className={classNames('Icon-OnThisRoom', {
                        IconAddMemberLightTheme: lightTheme === true,
                      })} />
                  }
                </div>
              )
              :
              null
            }
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    changeTheme: state.changeTheme,
    dataVietNamLanguage: state.dataVietNamLanguage,
    changeVietNamLanguage: state.changeVietNamLanguage,
    currentUser: state.currentUser,
    currentRoom: state.currentRoom,
    allUser: state.allUser,
    reRender: state.reRender
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => { dispatch(actions.getAllUsers()) },
    addMemberToThisRoom: (token, idUser, idRoom) => { dispatch(actions.addMemberToThisRoom({ token: token, idUser: idUser, idRoom: idRoom })) },
    getRoomMember: (token, idRoom) => { dispatch(actions.getRoomMember({ token: token, idRoom: idRoom })) },
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(AddMember);