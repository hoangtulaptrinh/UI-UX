import React, { useEffect } from 'react';
import './App.css';
import ListRoom from './components/ListRoom'
import ContentRoom from './components/ContentRoom'
import InfoRoom from './components/InfoRoom'
import * as actions from './actions/index';
import { connect } from 'react-redux';

function App(props) {
  useEffect(() => {
    props.getApi();
  }, [])
   console.log(props.currentUser)
  return (
    <div className="App">
      <ListRoom />
      <ContentRoom />
      <InfoRoom />
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getApi: (data) => { dispatch(actions.getApi(data)) }
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(App);