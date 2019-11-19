// import actionTypes from '../const/actionTypes';

var initialState = {
    InfoRoom:'Thông Tin Phòng',
    Admin:'Người Quản Trị',
    Member:'Thành Viên',
    AddMemberToThisRoom:'Thêm Nhân Viên Vào Phòng Này'
};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default myReducer;