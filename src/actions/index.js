import actionTypes from '../const/actionTypes';

export const setCurrentRoom = (data) => { return { type: actionTypes.setCurrentRoom, data: data } }

export const setShowInfoRoom = () => { return { type: actionTypes.setShowInfoRoom } }