import jsCookie from "js-cookie";
import axiosInstance from "../../configs/api";
import { user_types } from "../reducers/types/user";


export const userLogin = (values, setSubmitting) => {
  return async (dispatch) => {
    try {
      const res = await axiosInstance.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      const userResponse = res.data.result;

      jsCookie.set("auth_token", userResponse.token);

      dispatch({
        type: user_types.LOGIN_USER,
        payload: userResponse.user,
      });

      setSubmitting(false);
    } catch (err) {
      console.log(err);
      dispatch({
        type: user_types.INVALID_USER,
        payload: err.response.data.message,
      });
      setSubmitting(false);
    }
  };
};
