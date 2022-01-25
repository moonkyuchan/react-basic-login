import "../action/user_action";

//파라미터로 이전 스테이트와 어떻게 바꿀지 액션을 가져온다
const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, loginSuccess: action.payload };
      break;
    default:
      return state;
  }
};

export default userReducer;
