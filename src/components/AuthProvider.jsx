import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import {user_types} from "../redux/reducers/types/user";
import axiosInstance from "../configs/api";


const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(async () => {
    const userToken = jsCookie.get("auth_token");

    if (userToken) {
      try {
        const userResponse = await axiosInstance.get("/auth/refresh-token");

        jsCookie.set("auth_token", userResponse?.data?.result?.token || "");

        dispatch({
          type: user_types.LOGIN_USER,
          payload: userResponse?.data?.result?.user,
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  return children;
};
export default AuthProvider;