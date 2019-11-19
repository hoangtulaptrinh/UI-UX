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
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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