import {
    GET_FOLLOWING_POSTS,
    GET_FOLLOWING_POSTS_FAIL
} from "./types";
import axios from "axios";


// // get posts users a user is following
export const getFollowingPosts = () => async (dispatch) => {
    try {

        const res = await axios.get("http://localhost:5000/api/posts/getFollowingPosts");

        dispatch({
            type: GET_FOLLOWING_POSTS,
            payload: res.data
        })

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => alert(err.message));
        }

        dispatch({
            type: GET_FOLLOWING_POSTS_FAIL
        })
    }
}