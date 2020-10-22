import axios from "axios";
import { LIKE_POST } from "../actions/types";

export const likePost = (postId) => async (dispatch) => {
   try {
      await axios.post("http://localhost:5000/api/likes/like/" + postId);

      dispatch({
         type: LIKE_POST,
      });
   } catch (err) {
      const error = err.response.data.msg;
      alert(error);
   }
};
