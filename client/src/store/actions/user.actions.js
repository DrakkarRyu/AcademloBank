import axios from "axios";

import { usersActions } from "../slices/user.slice";

const API_URL = "http://localhost:9666/api/v1/users";

export const login = (accountNumber, password) => {
  return async (dispatch) => {
    try {
      // API REQUEST
      const res = await axios.post(API_URL);
      console.log(res);
      dispatch(usersActions.login(accountNumber, password));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signup = (name, password) => {
  return async (dispatch) => {
    try {
      // API REQUEST
      const res = await axios.post(API_URL);
      console.log(res);
      dispatch(usersActions.signup(name, password));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(usersActions.logout());
    } catch (error) {
      console.log(error);
    }
  };
};
