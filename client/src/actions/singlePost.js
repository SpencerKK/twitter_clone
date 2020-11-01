import { GET_SINGLE_POST } from "./types";
import { GET_POST_COMMENTS } from "./types";
import axios from "axios";

// get single post
export const getSinglePost = (postId) => async (dispatch) => {
   try {
      let res = await axios.get(
         "http://localhost:5000/api/posts/singlePost/" + postId
      );

      dispatch({
         type: GET_SINGLE_POST,
         payload: res.data,
      });
   } catch (err) {
      if (err) {
         alert(err);
      }
   }
};

// get post comments
export const getPostComments = (postId) => async (dispatch) => {
   try {
      let res = await axios.get(
         "http://localhost:5000/api/comments/getPostComments/" + postId
      );

      dispatch({
         type: GET_POST_COMMENTS,
         payload: res.data,
      });
   } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach((err) => alert(err.message));
      }
   }
};
