import React from 'react';
import './SwitchLanguage.css'
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

const SwitchLanguage = (props) => {
  const letSwitchLanguage = () => {
    props.setChangeVietNamLanguage();
  }
  return (
    <div className='SwitchLanguage'>
      <label className="rocker rocker-small">
        <input type="checkbox" onClick={letSwitchLanguage} />
        <span className="switch-left">En</span>
        <span className="switch-right">Vi</span>
      </label>
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
const mapDispatchToProps = (dispatch) => {
  return {
    setChangeVietNamLanguage: () => { dispatch(actions.setChangeVietNamLanguage()) },
  }
}
export default connect(mapStatetoProps, mapDispatchToProps)(SwitchLanguage);