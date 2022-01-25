import { combineReducers } from "redux";
import userReducer from "./user_reducer";

//이곳에선 결국 모든 리듀서들을 하나로 모아준다 ROOT!!!
const rootReducers = combineReducers({
  userReducer,
});

export default rootReducers;
