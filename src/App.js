import React, { useEffect } from 'react';
import './App.css';
import ListRoom from './components/ListRoom'
import ContentRoom from './components/ContentRoom'
import InfoRoom from './components/InfoRoom'
import * as actions from './actions/index';
import { connect } from 'react-redux';
import classNames from 'classnames'

function App(props) {
  useEffect(() => {
    props.getApi(props.currentUser.attributes.authToken);
  }, [])
  return (
    <div
      className={classNames('App', {
        BackGroundIMG: props.currentRoom === -1
      })}
    >
      <ListRoom />
      <ContentRoom />
      <InfoRoom />
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser,
    currentRoom: state.currentRoom
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getApi: (token) => { dispatch(actions.getApi(token)) }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);