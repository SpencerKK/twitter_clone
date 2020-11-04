import { POST_COMMENT } from "./types";
import axios from "axios";

export const postComment = ({ postId, content }) => async (dispatch) => {
   const config = {
      headers: {
         "Content-Type": "application/json",
      },
   };

   const body = JSON.stringify({ content });

   try {
      await axios.post(
         "http://localhost:5000/api/comments/comment/" + postId,
         body,
         config
      );
   } catch (err) {
      const error = err.response.data.msg;
      alert(error);
   }
};
