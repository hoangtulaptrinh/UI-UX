import React from 'react';
import './DayNight.scss';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

function DayNight(props) {
  const changeTheme = () => {
    props.setChangeTheme();
  }
  return (
    <div className="toggleWrapper">
      <input type="checkbox" className="dn" id="dn" onChange={changeTheme} />
      <label for="dn" className="toggle">
        <span className="toggle__handler">
          <span className="crater crater--1"></span>
          <span className="crater crater--2"></span>
          <span className="crater crater--3"></span>
        </span>
        <span className="star star--1"></span>
        <span className="star star--2"></span>
        <span className="star star--3"></span>
        <span className="star star--4"></span>
        <span className="star star--5"></span>
        <span className="star star--6"></span>
      </label>
    </div>
  )
}
const mapStatetoProps = (state) => {
  return {
    dataRoom: state.dataRoom,
    changeTheme: state.changeTheme
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setChangeTheme: () => { dispatch(actions.setChangeTheme()) },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(DayNight);