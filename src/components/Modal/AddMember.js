import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MdPersonAdd } from 'react-icons/md';
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
  return (
    <div className='Model-AddMember'>
      <MdPersonAdd onClick={toggle}
        className={classNames('Icon-AddMember', {
          IconAddMemberLightTheme: lightTheme === true,
        })}
      />
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {
            props.changeVietNamLanguage ?
              <p>Add Member To This Room</p>
              :
              <p>{props.dataVietNamLanguage.AddMemberToThisRoom}</p>
          }
        </ModalHeader>
        <ModalBody className='ModalBody'>
          {/* css kính lúp để ở file ListRoom.css */}
          <div className="wrapper">
            <div className="search-icon">
              <input
                className={classNames('search-circle', {
                  SearchCircleLightTheme: lightTheme === true,
                })}
                type="text" />
              <div className="search-bar" />
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
    changeVietNamLanguage: state.changeVietNamLanguage
  }
}

export default connect(mapStatetoProps)(AddMember);