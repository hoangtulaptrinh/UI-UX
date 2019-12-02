import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MdPersonAdd } from 'react-icons/md';
import { IoMdPersonAdd } from 'react-icons/io'
import './AddMember.css'
import classNames from 'classnames'
import { connect } from 'react-redux';

const AddMember = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const lightTheme = props.changeTheme;
  // console.log(props.currentUser.attributes.authToken)
  // console.log(props.currentRoom)
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
                type="text" />
              <div className="search-bar" />
            </div>
          </div>
          <div
            className={classNames('Arr-List-Member', {
              ArrListMemberLightTheme: lightTheme === true,
            })}
            id="scrollbarAddMember">
            <div className='Member-To-Add'>
              <div className='User-Add-Member'>
                <div className='Img-Member-To-Add'>
                  <img src='https://i.imgur.com/VjnUSxab.jpg' alt='Add-Img-User' />
                </div>
                <div className='Name-Member-To-Add'>
                  Member
              </div>
              </div>
              <IoMdPersonAdd
                className={classNames('Icon-AddMember', {
                  IconAddMemberLightTheme: lightTheme === true,
                })} />
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    changeTheme: state.changeTheme,
    dataVietNamLanguage: state.dataVietNamLanguage,
    changeVietNamLanguage: state.changeVietNamLanguage,
    currentUser: state.currentUser,
    currentRoom: state.currentRoom,
  }
}

export default connect(mapStatetoProps)(AddMember);