import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   AUTH_ERROR,
   USER_LOADED,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT
} from "./types";

import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

// load user
export const loadUser = () => async (dispatch) => {
   if (localStorage.token) {
      setAuthToken(localStorage.token);
   }

   try {
      const res = await axios.get("http://localhost:5000/api/users");

      dispatch({
         type: USER_LOADED,
         payload: res.data,
      });
   } catch (err) {
      dispatch({
         type: AUTH_ERROR,
      });
   }
};

// register user
export const register = ({ screenName, email, password }) => async (
   dispatch
) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   const body = JSON.stringify({ screenName, email, password });

   try {
      const res = await axios.post(
         "http://localhost:5000/api/users/register",
         body,
         config
      );

      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data,
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => alert(error.msg));
      }

      dispatch({
         type: REGISTER_FAIL,
      });
   }
};

// login user
export const login = ({ email, password }) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   const body = JSON.stringify({ email, password });

   try {
      const res = await axios.post(
         "http://localhost:5000/api/users/login",
         body,
         config
      );

      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data,
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         errors.forEach((error) => alert(error.msg));
      }

      dispatch({
         type: LOGIN_FAIL,
      });
   }
};


// logout user
export const logout = () => dispatch => {
   dispatch({ type: LOGOUT });
 };
