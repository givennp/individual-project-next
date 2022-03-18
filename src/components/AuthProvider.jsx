import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import jsCookie from "js-cookie";
import user_types from "../redux/reducers/types/user";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUserData = jsCookie.get("user_data");
    
    if (savedUserData) {
      const parsedUserData = JSON.parse(savedUserData);
      
      dispatch({
        type: user_types.LOGIN_USER,
        payload: parsedUserData,
      });
    }
  }, []);
  return children;
};
export default AuthProvider;