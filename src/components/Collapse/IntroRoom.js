import React, { useState } from 'react';
import { Collapse, CardBody, Card, Button } from 'reactstrap';
import { connect } from 'react-redux';
import './IntroRoom.css'
import _ from 'lodash'
import classNames from 'classnames'
import * as actions from '../../actions/index';

const IntroRoom = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const lightTheme = props.changeTheme;
  const removeThisRoomHere = () => {
    console.log(props.isAdmin)
    props.setCurrentRoom(-1);
  }
  return (
    <div >
      <div className='IntroRoom' onClick={toggle}>
        {
          props.changeVietNamLanguage ?
            <p>Info Room</p>
            :
            <p>{props.dataVietNamLanguage.InfoRoom}</p>
        }
      </div>
      <Collapse isOpen={isOpen}>
        <Card>
          <CardBody
            className={classNames('Body-IntroRoom', {
              BodyIntroRoomLightTheme: lightTheme === false
            })}
          >
            {
              props.currentRoom !== -1 ?
                _.find(props.dataRoom, { id: props.currentRoom }).Intro
                :
                null
            }
            {
              props.isAdmin === true ?
                <Button outline color="danger" className='remove-btn-room'
                  onClick={removeThisRoomHere}
                >
                  {
                    props.changeVietNamLanguage ?
                      <p>Remove This Room</p>
                      :
                      <p>{props.dataVietNamLanguage.RemoveThisRoom}</p>
                  }
                </Button>
                :
                null
            }
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    currentRoom: state.currentRoom,
    changeTheme: state.changeTheme,
    dataVietNamLanguage: state.dataVietNamLanguage,
    changeVietNamLanguage: state.changeVietNamLanguage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentRoom: (data) => { dispatch(actions.setCurrentRoom(data)) }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(IntroRoom);