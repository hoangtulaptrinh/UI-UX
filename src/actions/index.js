import actionTypes from '../const/actionTypes';

export const setCurrentRoom = (data) => { return { type: actionTypes.setCurrentRoom, data: data } }

export const setShowInfoRoom = () => { return { type: actionTypes.setShowInfoRoom } }

export const setChangeTheme = () => { return { type: actionTypes.setChangeTheme } }

export const setChangeVietNamLanguage = () => { return { type: actionTypes.setChangeVietNamLanguage } }

export const setSendMessage = (data) => { return { type: actionTypes.setSendMessage, data: data } }

export const setValueMessage = (data) => { return { type: actionTypes.setValueMessage, data: data } }

export const setSendGif = (data) => { return { type: actionTypes.setSendGif, data: data } }