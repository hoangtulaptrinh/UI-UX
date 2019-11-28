import actionTypes from '../const/actionTypes';
import * as apiCaller from '../components/Api/apiCaller'
import axios from 'axios'

export const getApi = (data) => {
  var config = {
    headers: { 'Authorization': "Bearer " + "DbU7k37iHYV2ZtQYPizFQEkm" }
  };
  return (dispatch) => {
    axios.get(
      'http://c539d822.ngrok.io/api/joined_rooms',
      config
    ).then((response) => {
      console.log(response.data.data)
    }).catch((error) => {
      console.log(error)
    });
  }
}

export const login = (data) => {
  const obj = {
    user: {
      email: data.userName,
      password: data.passWord,
      remember_me: data.checkRememberMe
    }
  }
  return (dispatch) => {
    apiCaller.request_infused_by_data('http://c539d822.ngrok.io/api/login', 'post', obj)
      .then(res => {
        dispatch(setCurrentUser(res.data.data))
        // console.log(111)
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export const setCurrentUser = (data) => { return { type: actionTypes.setCurrentUser, data: data } }

export const getListRoom = (data) => { return { type: actionTypes.getListRoom, data: data } }

export const setCurrentRoom = (data) => { return { type: actionTypes.setCurrentRoom, data: data } }

export const setShowInfoRoom = () => { return { type: actionTypes.setShowInfoRoom } }

export const setChangeTheme = () => { return { type: actionTypes.setChangeTheme } }

export const setChangeVietNamLanguage = () => { return { type: actionTypes.setChangeVietNamLanguage } }

export const setSendMessage = (data) => { return { type: actionTypes.setSendMessage, data: data } }

export const setValueMessage = (data) => { return { type: actionTypes.setValueMessage, data: data } }

export const setSendGif = (data) => { return { type: actionTypes.setSendGif, data: data } }