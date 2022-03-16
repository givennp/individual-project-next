import { combineReducers } from "redux";
import userReducer from "./reducers/user";

// object yang masuk ke dalam combineReducer akan menjadi
// parameter "state" di callback function useSelector

const rootReducer = combineReducers({
  auth: userReducer,
});

export default rootReducer;
