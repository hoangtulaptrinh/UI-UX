// import actionTypes from '../const/actionTypes';

var initialState = {
  InfoRoom: 'Thông Tin Phòng',
  Admin: 'Người Quản Trị',
  Member: 'Thành Viên',
  AddMemberToThisRoom: 'Thêm Nhân Viên Vào Phòng Này',
  CurrentNumberOfPeopleInTheRoom: 'Số Người Hiện Tại Trong Phòng',
  OnlinePeople: 'Số Người Trực Tuyến',
  YouHaveNotEnteredAnyRoomYet:'Bạn chưa vào phòng Nào',
  LogOut:'Đăng Xuất',
  CreateANewRoom:'Tạo Phòng Mới'
};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default myReducer;