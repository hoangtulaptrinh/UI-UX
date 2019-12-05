import actionTypes from '../const/actionTypes';
import * as apiCaller from '../components/Api/apiCaller'
import axios from 'axios'

export const base_link = 'http://9fc5028b.ngrok.io/';

export const getApi = (token) => {
  var config = {
    headers: { 'Authorization': "Bearer " + token }
  };
  return (dispatch) => {
    axios.get(
      `${base_link}api/joined_rooms`,
      config
    ).then((res) => {
      dispatch(setDataRoom(res.data.data))
    }).catch((error) => {
      console.log(error)
    });
  }
}

export const getRoomMember = (data) => {
  var config = {
    headers: { 'Authorization': "Bearer " + data.token }
  };
  return (dispatch) => {
    axios.get(
      `${base_link}api/rooms/${data.idRoom}/room_members`,
      config
    ).then((res) => {
      dispatch(addMemberToRoom(res.data.data, data.idRoom))
    }).catch((error) => {
      console.log(error)
    });
  }
}

export const addMemberToThisRoom = (data) => {
  const obj = {
    invite: {
      user_id: data.idUser
    }
  }
  var config = {
    headers: { 'Authorization': "Bearer " + data.token }
  };
  return (dispatch) => {
    axios.post(
      `${base_link}api/rooms/${data.idRoom}/invite`, obj, config)
      .then((res) => {
        dispatch(setReRender())
      }).catch((error) => {
        console.log(error)
      });
  }
}

export const createANewRoom = (data) => {
  const obj = {
    room: {
      name: data.name,
      description: data.description,
      room_type: data.room_type
    }
  }
  var config = {
    headers: { 'Authorization': "Bearer " + data.token }
  };
  return (dispatch) => {
    axios.post(
      `${base_link}api/rooms`, obj, config)
      .then((res) => {
        dispatch(getApi(data.token))
      }).catch((error) => {
        console.log(error)
      });
  }
}

export const getAllUsers = () => {
  return (dispatch) => {
    axios.get(
      `${base_link}api/users`,
    ).then((res) => {
      dispatch(setAllUser(res.data.data))
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
    apiCaller.request_infused_by_data(`${base_link}api/login`, 'post', obj)
      .then(res => {
        dispatch(setCurrentUser(res.data.data))
      })
      .then(res => {
        dispatch(setAllowLogin(true))
      })
      .catch(error => {
        console.log(error.response.data.errors)
        dispatch(setAllowLogin(false))
        dispatch(setStatusLogin(error.response.data.errors))
      });
  }
}

export const register = (data) => {
  const obj = {
    user: {
      name: data.name,
      email: data.mail,
      password: data.pass,
      password_confirmation: data.repeatPass
    }
  };
  return (dispatch) => {
    apiCaller.request_infused_by_data(`${base_link}api/signup`, 'post', obj)
      .then(res => {
        dispatch(setAllowRegister(true))
      })
      .catch(error => {
        console.log(error.response.data)
        dispatch(setStatusRegister(error.response.data.errors))
      });
  }
}

export const letSendMessage = (data) => {
  const obj = {
    message: {
      content: data.value
    }
  }
  var config = {
    headers: { 'Authorization': "Bearer " + data.token }
  };
  return () => {
    axios.post(`${base_link}api/rooms/${data.idRoom}/messages`, obj, config)
      .catch(error => {
        console.log(error.response.data.errors)
      });
  }
}

export const changeInfoUser = (data) => {
  let fd = new FormData();
  fd.append('user[avatar]', data.img)
  var config = {
    headers: {
      'Authorization': "Bearer " + data.token,
      'Content-Type': 'multipart/form-data'
    }
  };
  return (dispatch) => {
    axios.put(`${base_link}api/user`, fd, config)
      .then(res => {
        dispatch(letChangeInfoUser(res.data.data))
        dispatch(setReRender())
      })
      .catch(error => {
        console.log(error)
      });
  }
}

export const letChangeInfoUser = (data) => { return { type: actionTypes.letChangeInfoUser, data: data } }

export const setReRender = () => { return { type: actionTypes.setReRender } }

export const setAllUser = (data) => { return { type: actionTypes.setAllUser, data: data } }

export const addMemberToRoom = (data, idRoom) => { return { type: actionTypes.addMemberToRoom, data: data, idRoom: idRoom } }

export const setStatusRegister = (data) => { return { type: actionTypes.setStatusRegister, data: data } }

export const setStatusLogin = (data) => { return { type: actionTypes.setStatusLogin, data: data } }

export const setAllowLogin = (data) => { return { type: actionTypes.setAllowLogin, data: data } }

export const setAllowRegister = (data) => { return { type: actionTypes.setAllowRegister, data: data } }

export const setDataRoom = (data) => { return { type: actionTypes.setDataRoom, data: data } }

export const setCurrentUser = (data) => { return { type: actionTypes.setCurrentUser, data: data } }

export const getListRoom = (data) => { return { type: actionTypes.getListRoom, data: data } }

export const setCurrentRoom = (data) => { return { type: actionTypes.setCurrentRoom, data: data } }

export const setShowInfoRoom = () => { return { type: actionTypes.setShowInfoRoom } }

export const setChangeTheme = () => { return { type: actionTypes.setChangeTheme } }

export const setChangeVietNamLanguage = () => { return { type: actionTypes.setChangeVietNamLanguage } }

export const setSendMessage = (data) => { return { type: actionTypes.setSendMessage, data: data } }

export const setValueMessage = (data) => { return { type: actionTypes.setValueMessage, data: data } }

export const setSendGif = (data) => { return { type: actionTypes.setSendGif, data: data } }