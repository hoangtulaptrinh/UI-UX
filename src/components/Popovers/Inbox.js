import React from 'react';
import { PopoverBody, UncontrolledPopover, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { AiOutlineMessage } from 'react-icons/ai'
import './Inbox.css'

const Inbox = (props) => {
  return (
    <div className='IconPopover'>
      <div id="PopoverLegacy99" >
        <AiOutlineMessage className='mess-mess-mess' />
      </div>
      <UncontrolledPopover className='All-Popover' trigger="legacy" placement="bottom-start" target="PopoverLegacy99" hideArrow={false} >
        <PopoverBody >
          <FormGroup className='secret-message'>
            <Label for="example" >Secret message</Label>
            <Input id="example" className='secret-input' placeholder="Your Secret message" />
          </FormGroup>
        </PopoverBody>
      </UncontrolledPopover>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    changeTheme: state.changeTheme,
  }
}

export default connect(mapStatetoProps)(Inbox);