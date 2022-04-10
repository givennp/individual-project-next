import { applyMiddleware, combineReducers, createStore } from "redux";
import {userReducer} from "./reducers/user";
import thunk from "redux-thunk"

// object yang masuk ke dalam combineReducer akan menjadi
// parameter "state" di callback function useSelector

const rootReducer = combineReducers({
  auth: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;
