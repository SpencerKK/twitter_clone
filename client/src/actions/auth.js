import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   AUTH_ERROR,
   USER_LOADED,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
} from "./types";
import axios from "axios";

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
         "http://localhost:5010/api/users/register",
         body,
         config
      );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

   } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
         alert(errors[0].msg);
      }

      dispatch({
         type: REGISTER_FAIL,
      });
   }
};
