// import actionTypes from '../const/actionTypes';

var initialState = {
  InfoRoom: 'Thông tin phòng',
  Admin: 'Người quản trị',
  Member: 'Thành viên',
  AddMemberToThisRoom: 'Thêm thành viên vào phòng này',
  CurrentNumberOfPeopleInTheRoom: 'Số người hiện tại trong phòng',
  OnlinePeople: 'Số người trực tuyến',
  YouHaveNotEnteredAnyRoomYet: 'Bạn chưa vào phòng nào',
  LogOut: 'Đăng xuất',
  CreateANewRoom: 'Tạo phòng mới',
  NameRoom: 'Tên phòng',
  Description: 'Mô tả qua về phòng',
  RemoveThisRoom: 'Xóa phòng này'
};
var myReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default myReducer;
