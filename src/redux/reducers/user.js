import user_types from "./types/user"

const initial_state = {
  id: 0,
  username: "",
  email: "",
  bio: "",
  avatar: "",
};

const userReducer = (state = initial_state, action) => {
    if (action.type === user_types.LOGIN_USER){
        return {
            ...state,
            username: action.payload.username,
            email: action.payload.email,
            id: action.payload.id,
            bio: action.payload.bio,
            avatar: action.payload.avatar
        }
    } else if (action.type === user_types.LOGOUT_USER){
        return initial_state
    }
    return state
}

export default userReducer