import { RENDER_CONNECT, RENDER_ACTIVE_USERS, UNRENDER_CONNECT } from "../types";
import axios from "axios";

export const renderConnectSubs = () => (dispatch) => {
   dispatch({ type: RENDER_CONNECT });
};

export const unrenderConnectSubs = () => (dispatch) => {
   dispatch({ type: UNRENDER_CONNECT })
}

export const renderActiveUsers = () => async (dispatch) => {
   try {
      const res = await axios.get("http://localhost:5000/api/follows/getActiveUsersList")

      dispatch({
         type: RENDER_ACTIVE_USERS,
         payload: res.data
      })

   } catch (err) {
      alert(err.message);
   }
}