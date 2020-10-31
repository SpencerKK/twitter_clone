import { GET_SINGLE_POST } from "./types";
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
      const errors = err.response.data.errors;
      if (errors) {
         errors.forEach((err) => alert(err.message));
      }
   }
};

// for some reason, passing postId into the getSinglePost function isn't being identified. I just need to refactor the code in postcard function i think
