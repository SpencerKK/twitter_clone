import {
    GET_MY_RECENT_POSTS
} from "./types";
import axios from "axios";

// getMyRecentPosts
export const getMyRecentPosts = () => async (dispatch) => {
    try {
        let res = await axios.get("http://localhost:5000/api/posts/getMyRecentPosts");

        dispatch({
            type: GET_MY_RECENT_POSTS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(err => alert(err.message));
        }
    }
}