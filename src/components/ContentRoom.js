import React, { useState, useRef } from 'react';
import './ContentRoom.css';
import { FaFolderPlus, FaRegSmileWink } from 'react-icons/fa';
import classNames from 'classnames'
import { connect } from 'react-redux';
import _ from 'lodash'

function ContentRoom(props) {

  const wrapperRef = useRef(); //hook
  const [clickOnInput, setClickOnInput] = useState(false);
  const clickOnThisInput = () => {
    setClickOnInput(true);
    document.addEventListener('click', clickOutSide)
  }
  const clickOutSide = (event) => {
    const { target } = event;
    if (!wrapperRef.current.contains(target)) {
      setClickOnInput(false)
      document.removeEventListener('click', clickOutSide)
    }
  }
  return (
    <div className="ContentRoom">
      <div className='Header-ContentRoom'>
        Header-ContentRoom
      </div>

      <div className="main-room" id="scrollbar-style">
        {
          _.map(_.find(props.dataRoom, { nameRoom: props.currentRoom }).data, (item, index) =>
            <div className='Chat-Message' key={index} >
              <div className='Custom-Container'>
                <img src={item.avatar} alt='Img-User' />
                <div className='Name-Time-Message'>
                  <div className='Name-Time'>
                    <p className='Name'>{item.name}</p>
                    <p className='Time'>{item.time}</p>
                  </div>
                  <p className='Show-Message'>{item.message}</p>
                </div>
              </div>
            </div>
          )
        }
      </div>

      <div className='Footer-ContentRoom'>
        <div
          className={classNames('Message', {
            ClickMessage: clickOnInput === true
          })}
        >
          <FaFolderPlus
            className={classNames('Footer-Icon', {
              ClickIcon: clickOnInput === true
            })}
          />
          <input className='Footer-Input'
            ref={wrapperRef}
            onClick={clickOnThisInput}
          />
          <FaRegSmileWink
            className={classNames('Footer-Icon', {
              ClickIcon: clickOnInput === true
            })}
          />
        </div>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    currentRoom: state.currentRoom
  }
}

export default connect(mapStatetoProps)(ContentRoom);