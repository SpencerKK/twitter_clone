import { NEW_USER_FOLLOWS } from "./types";
import axios from "axios";

export const followUser = ({ followed_id }) => async (dispatch) => {
   try {
      const res = await axios.post(
         "http://localhost:5000/api/follows/follow/" + followed_id
      );

      dispatch({
         type: NEW_USER_FOLLOWS,
      });
   } catch (err) {
      const error = err.response.data.msg;
      alert(error);
   }
};
