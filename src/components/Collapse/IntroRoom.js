import React, { useState } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import { connect } from 'react-redux';
import './IntroRoom.css'
import _ from 'lodash'
import classNames from 'classnames'

const IntroRoom = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const lightTheme = props.changeTheme;
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
              <p>
                {_.find(props.dataRoom, { nameRoom: props.currentRoom }).Intro}
              </p>
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
    changeVietNamLanguage: state.changeVietNamLanguage
  }
}

export default connect(mapStatetoProps)(IntroRoom);